const puppeteer = require('puppeteer');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

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

    request.on('error', reject);
    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

/**
 * Extract image URL from Amazon product page using Puppeteer
 */
async function extractImageFromAmazon(page, url) {
  console.log('   Loading page...');
  
  // Navigate to the page
  await page.goto(url, { 
    waitUntil: 'domcontentloaded',
    timeout: 60000 
  });
  
  // Wait for images to load
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Try multiple selectors for the main product image
  const imageUrl = await page.evaluate(() => {
    // Try different selectors
    const selectors = [
      '#landingImage',
      '#imgBlkFront',
      '#main-image',
      '.a-dynamic-image',
      '[data-a-dynamic-image]',
      'img[data-old-hires]',
      '#imageBlock img',
      '#imageBlockContainer img',
      '#imgTagWrapperId img',
    ];
    
    for (const selector of selectors) {
      const img = document.querySelector(selector);
      if (img) {
        // Try to get the highest quality image
        const hiRes = img.getAttribute('data-old-hires') || 
                     img.getAttribute('data-a-hires') ||
                     img.getAttribute('data-zoom-hires') ||
                     img.src;
        
        if (hiRes && hiRes.startsWith('http')) {
          return hiRes;
        }
      }
    }
    
    // Try to extract from data-a-dynamic-image JSON
    const dynamicImgElements = document.querySelectorAll('[data-a-dynamic-image]');
    for (const elem of dynamicImgElements) {
      try {
        const data = elem.getAttribute('data-a-dynamic-image');
        if (data) {
          const parsed = JSON.parse(data);
          const urls = Object.keys(parsed);
          if (urls.length > 0) {
            return urls[0];
          }
        }
      } catch (e) {}
    }
    
    // Fallback: try to find any large product image
    const allImages = Array.from(document.querySelectorAll('img'));
    for (const img of allImages) {
      if (img.src && img.src.includes('images-amazon') && img.width > 300) {
        return img.src;
      }
    }
    
    return null;
  });
  
  if (!imageUrl) {
    throw new Error('Could not find product image');
  }
  
  return imageUrl;
}

/**
 * Get first product URL from search results
 */
async function getFirstProductFromSearch(page, searchUrl) {
  console.log('   Loading search results...');
  
  await page.goto(searchUrl, { 
    waitUntil: 'networkidle2',
    timeout: 60000 
  });
  
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Extract first product link
  const productUrl = await page.evaluate(() => {
    const selectors = [
      'h2.s-line-clamp-2 a',
      '.s-result-item h2 a',
      '[data-component-type="s-search-result"] h2 a',
      '.s-product-image-container a',
    ];
    
    for (const selector of selectors) {
      const link = document.querySelector(selector);
      if (link && link.href) {
        return link.href;
      }
    }
    
    return null;
  });
  
  if (!productUrl) {
    throw new Error('Could not find product in search results');
  }
  
  return productUrl;
}

/**
 * Process batch
 */
async function processBatch(batch) {
  const results = [];
  
  console.log('🌐 Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
    ]
  });
  
  try {
    const page = await browser.newPage();
    
    // Set a realistic user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    // Set viewport
    await page.setViewport({ width: 1920, height: 1080 });
    
    for (const item of batch) {
      const { productId, amazonUrl } = item;
      
      try {
        console.log(`\n📦 Processing: ${productId}`);
        console.log(`   URL: ${amazonUrl}`);
        
        let finalProductUrl = amazonUrl;
        
        // Check if it's a search URL
        if (amazonUrl.includes('/s?') || amazonUrl.includes('k=')) {
          console.log('   🔍 Search link detected, finding first product...');
          finalProductUrl = await getFirstProductFromSearch(page, amazonUrl);
          console.log(`   ✓ Found product: ${finalProductUrl}`);
        }
        
        // Extract image URL
        const imageUrl = await extractImageFromAmazon(page, finalProductUrl);
        console.log(`   ✓ Found image: ${imageUrl.substring(0, 60)}...`);
        
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
      
      // Delay between requests
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
  } finally {
    await browser.close();
    console.log('\n🌐 Browser closed');
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
 * Save mappings
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
  console.log('🚀 Amazon Image Downloader (Puppeteer)\n');
  console.log('='.repeat(50));
  
  const batchFile = process.argv[2];
  
  if (!batchFile) {
    console.log('\nUsage: node download-with-puppeteer.js <batch-file.json>');
    console.log('\nBatch file format:');
    console.log(JSON.stringify([
      {
        productId: "el-008",
        amazonUrl: "https://www.amazon.in/dp/B0XXXXXXXX"
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
  
  saveMappings(results);
  
  if (successful > 0) {
    updateProductsJson(results);
  }
  
  console.log('\n✅ Done!\n');
}

main().catch(console.error);
