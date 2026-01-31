# Image Download Instructions

Amazon has anti-scraping measures, so we need to manually get the image URLs. Here's the easiest way:

## Method 1: Manual Image URL Collection (Recommended)

### Step 1: Get Image URLs from Amazon

For each product:

1. Open the Amazon link in your browser
2. Right-click on the main product image
3. Select "Copy image address" or "Copy image link"
4. Paste it into the batch file

### Step 2: Create Batch File

Create a file like `scripts/batch1-images.json`:

```json
[
  {
    "productId": "el-010",
    "imageUrl": "https://m.media-amazon.com/images/I/51abc123.jpg"
  },
  {
    "productId": "el-012",
    "imageUrl": "https://m.media-amazon.com/images/I/51xyz789.jpg"
  }
]
```

### Step 3: Run the Script

```bash
node scripts/manual-image-mapper.js scripts/batch1-images.json
```

## Method 2: Browser Extension (Faster for Multiple Products)

1. Install a browser extension like "Image Downloader" or "Download All Images"
2. Visit each Amazon product page
3. Use the extension to download the main product image
4. Rename downloaded images to match product IDs (e.g., `el-010.jpg`)
5. Move them to `public/products/` folder
6. Run the update script:

```bash
node scripts/update-product-images.js
```

## Method 3: Use Amazon Product Advertising API

If you have many products, consider:
- Sign up for Amazon Product Advertising API
- Use official API to get product images
- This is the most reliable method for bulk operations

## Quick Guide for Your Current Batch

For the 6 products in batch1:

1. Visit each URL in your browser
2. Right-click the main product image → Copy image address
3. Create `scripts/batch1-images.json` with the format above
4. Run: `node scripts/manual-image-mapper.js scripts/batch1-images.json`

This will:
- Download all images to `public/products/`
- Update `all-products.json` automatically
- Keep your old images as backup in the `images` array
