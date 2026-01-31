const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Configuration
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'products');
const PRODUCTS_FILE = path.join(__dirname, '..', 'all-products.json');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
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
 * Process batch with direct image URLs
 */
async function processBatch(batch) {
  const results = [];
  
  for (const item of batch) {
    const { productId, imageUrl } = item;
    
    try {
      console.log(`\n📦 Processing: ${productId}`);
      console.log(`   Image URL: ${imageUrl.substring(0, 60)}...`);
      
      // Determine file extension
      const ext = path.extname(new URL(imageUrl).pathname) || '.jpg';
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
        imageUrl
      });
      
    } catch (error) {
      console.error(`   ✗ Error: ${error.message}`);
      results.push({
        productId,
        success: false,
        error: error.message,
        imageUrl: item.imageUrl
      });
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  return results;
}

/**
 * Update products JSON
 */
function updateProductsJson(mappings) {
  try {
    const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
    let updatedCount = 0;
    
    for (const mapping of mappings) {
      if (mapping.success) {
        const product = products.find(p => p.id === mapping.productId);
        if (product) {
          if (!product.images) {
            product.images = [];
          }
          if (product.image && !product.images.includes(product.image)) {
            product.images.push(product.image);
          }
          
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
 * Main function
 */
async function main() {
  console.log('🚀 Manual Image Mapper\n');
  console.log('='.repeat(50));
  
  const batchFile = process.argv[2];
  
  if (!batchFile) {
    console.log('\nUsage: node manual-image-mapper.js <batch-file.json>');
    console.log('\nBatch file format (with direct image URLs):');
    console.log(JSON.stringify([
      {
        productId: "el-008",
        imageUrl: "https://m.media-amazon.com/images/I/51abc123.jpg"
      }
    ], null, 2));
    process.exit(1);
  }
  
  if (!fs.existsSync(batchFile)) {
    console.error(`\n✗ Batch file not found: ${batchFile}`);
    process.exit(1);
  }
  
  const batch = JSON.parse(fs.readFileSync(batchFile, 'utf8'));
  console.log(`\n📋 Loaded ${batch.length} items from batch file`);
  
  const results = await processBatch(batch);
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 Summary:');
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  console.log(`   ✓ Successful: ${successful}`);
  console.log(`   ✗ Failed: ${failed}`);
  
  if (successful > 0) {
    updateProductsJson(results);
  }
  
  console.log('\n✅ Done!\n');
}

main().catch(console.error);
