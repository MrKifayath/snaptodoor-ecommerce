const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

// Configuration
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'products');
const PRODUCTS_FILE = path.join(__dirname, '..', 'all-products.json');
const IMAGE_MAPPING_FILE = path.join(__dirname, 'image-mapping.json');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  console.log(`✓ Created directory: ${OUTPUT_DIR}`);
}

/**
 * Download image from URL
 */
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const request = protocol.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadImage(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve(filepath);
      });

      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => {});
        reject(err);
      });
    });

    request.on('error', (err) => {
      reject(err);
    });

    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

/**
 * Extract first product link from Amazon search results
 */
async function getFirstProductFromSearch(searchUrl) {
  return new Promise((resolve, reject) => {
    const protocol = searchUrl.startsWith('https') ? https : http;
    
    protocol.get(searchUrl, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        // Look for product links in search results
        // Pattern: /dp/ASIN or /gp/product/ASIN
        const patterns = [
          /href="([^"]*\/dp\/[A-Z0-9]{10}[^"]*)"/,
          /href="([^"]*\/gp\/product\/[A-Z0-9]{10}[^"]*)"/,
        ];

        for (const pattern of patterns) {
          const match = data.match(pattern);
          if (match && match[1]) {
            let productPath = match[1];
            // Clean up the URL
            productPath = productPath.split('?')[0]; // Remove query params
            productPath = productPath.replace(/&amp;/g, '&');
            
            // Build full URL
            const fullUrl = productPath.startsWith('http') 
              ? productPath 
              : `https://www.amazon.in${productPath}`;
            
            resolve(fullUrl);
            return;
          }
        }

        reject(new Error('Could not find product in search results'));
      });
    }).on('error', reject);
  });
}

/**
 * Extract image URL from Amazon product page
 */
async function extractAmazonImageUrl(productUrl) {
  return new Promise((resolve, reject) => {
    const protocol = productUrl.startsWith('https') ? https : http;
    
    protocol.get(productUrl, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        // Try to find the main product image
        // Amazon uses various patterns, we'll try multiple approaches
        const patterns = [
          /"hiRes":"([^"]+)"/,
          /"large":"([^"]+)"/,
          /data-old-hires="([^"]+)"/,
          /data-a-dynamic-image="{&quot;([^&]+)&quot;/,
          /"landingImageUrl":"([^"]+)"/,
        ];

        for (const pattern of patterns) {
          const match = data.match(pattern);
          if (match && match[1]) {
            let imageUrl = match[1];
            // Decode if needed
            imageUrl = imageUrl.replace(/\\u002F/g, '/');
            imageUrl = imageUrl.replace(/\\_/g, '_');
            resolve(imageUrl);
            return;
          }
        }

        reject(new Error('Could not find image URL in page'));
      });
    }).on('error', reject);
  });
}

/**
 * Process a batch of Amazon links
 */
async function processBatch(batch) {
  const results = [];
  
  for (const item of batch) {
    const { productId, amazonUrl } = item;
    
    try {
      console.log(`\n📦 Processing: ${productId}`);
      console.log(`   URL: ${amazonUrl}`);
      
      let finalProductUrl = amazonUrl;
      
      // Check if it's a search URL
      if (amazonUrl.includes('/s?') || amazonUrl.includes('k=')) {
        console.log('   🔍 Search link detected, finding first product...');
        finalProductUrl = await getFirstProductFromSearch(amazonUrl);
        console.log(`   ✓ Found product: ${finalProductUrl}`);
      }
      
      // Extract image URL from Amazon page
      console.log('   Extracting image URL...');
      const imageUrl = await extractAmazonImageUrl(finalProductUrl);
      console.log(`   ✓ Found image: ${imageUrl.substring(0, 60)}...`);
      
      // Determine file extension
      const urlObj = new URL(imageUrl);
      const ext = path.extname(urlObj.pathname) || '.jpg';
      const filename = `${productId}${ext}`;
      const filepath = path.join(OUTPUT_DIR, filename);
      
      // Download image
      console.log('   Downloading...');
      await downloadImage(imageUrl, filepath);
      console.log(`   ✓ Saved: ${filename}`);
      
      results.push({
        productId,
        success: true,
        filename,
        localPath: `/products/${filename}`,
        originalUrl: amazonUrl,
        productUrl: finalProductUrl,
        imageUrl
      });
      
    } catch (error) {
      console.error(`   ✗ Error: ${error.message}`);
      results.push({
        productId,
        success: false,
        error: error.message,
        originalUrl: amazonUrl
      });
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  return results;
}

/**
 * Update products JSON with new image paths
 */
function updateProductsJson(mappings) {
  try {
    const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
    let updatedCount = 0;
    
    for (const mapping of mappings) {
      if (mapping.success) {
        const product = products.find(p => p.id === mapping.productId);
        if (product) {
          // Keep old image as backup in images array
          if (!product.images) {
            product.images = [];
          }
          if (product.image && !product.images.includes(product.image)) {
            product.images.push(product.image);
          }
          
          // Set new image
          product.image = mapping.localPath;
          updatedCount++;
        }
      }
    }
    
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    console.log(`\n✓ Updated ${updatedCount} products in ${PRODUCTS_FILE}`);
    
  } catch (error) {
    console.error(`\n✗ Error updating products JSON: ${error.message}`);
  }
}

/**
 * Save mapping results
 */
function saveMappings(results) {
  let existingMappings = [];
  
  if (fs.existsSync(IMAGE_MAPPING_FILE)) {
    existingMappings = JSON.parse(fs.readFileSync(IMAGE_MAPPING_FILE, 'utf8'));
  }
  
  const allMappings = [...existingMappings, ...results];
  fs.writeFileSync(IMAGE_MAPPING_FILE, JSON.stringify(allMappings, null, 2));
  console.log(`\n✓ Saved mappings to ${IMAGE_MAPPING_FILE}`);
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Amazon Image Downloader\n');
  console.log('='.repeat(50));
  
  // Check if batch file exists
  const batchFile = process.argv[2];
  
  if (!batchFile) {
    console.log('\nUsage: node download-amazon-images.js <batch-file.json>');
    console.log('\nBatch file format:');
    console.log(JSON.stringify([
      {
        productId: "el-008",
        amazonUrl: "https://www.amazon.in/dp/B0XXXXXXXX"
      },
      {
        productId: "el-009",
        amazonUrl: "https://www.amazon.in/dp/B0YYYYYYYY"
      }
    ], null, 2));
    process.exit(1);
  }
  
  if (!fs.existsSync(batchFile)) {
    console.error(`\n✗ Batch file not found: ${batchFile}`);
    process.exit(1);
  }
  
  // Load batch
  const batch = JSON.parse(fs.readFileSync(batchFile, 'utf8'));
  console.log(`\n📋 Loaded ${batch.length} items from batch file`);
  
  // Process batch
  const results = await processBatch(batch);
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Summary:');
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  console.log(`   ✓ Successful: ${successful}`);
  console.log(`   ✗ Failed: ${failed}`);
  
  // Save mappings
  saveMappings(results);
  
  // Update products JSON
  if (successful > 0) {
    updateProductsJson(results);
  }
  
  console.log('\n✅ Done!\n');
}

// Run
main().catch(console.error);
