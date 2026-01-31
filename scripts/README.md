# Amazon Image Downloader

This script downloads product images from Amazon links and maps them to your products.

## How to Use

### 1. Create a Batch File

Create a JSON file with your product IDs and Amazon URLs:

```json
[
  {
    "productId": "el-008",
    "amazonUrl": "https://www.amazon.in/dp/B0XXXXXXXXX"
  },
  {
    "productId": "fa-001",
    "amazonUrl": "https://www.amazon.in/dp/B0YYYYYYYYY"
  }
]
```

Save it as `batch1.json` (or any name you prefer).

### 2. Run the Script

```bash
node scripts/download-amazon-images.js scripts/batch1.json
```

### 3. What Happens

The script will:
- Extract the main product image from each Amazon page
- Download images to `public/products/` folder
- Name them as `{productId}.jpg` (e.g., `el-008.jpg`)
- Update `all-products.json` with new image paths
- Save a mapping log in `scripts/image-mapping.json`

### 4. Process Multiple Batches

You can create multiple batch files and run them one by one:

```bash
node scripts/download-amazon-images.js scripts/batch1.json
node scripts/download-amazon-images.js scripts/batch2.json
node scripts/download-amazon-images.js scripts/batch3.json
```

## Batch File Tips

- Use your product IDs exactly as they appear in `all-products.json`
- Amazon URLs can be in any format (full URL or shortened)
- Process 10-20 products per batch to avoid rate limiting
- The script adds a 1-second delay between downloads

## Troubleshooting

**Image not found:**
- Amazon's HTML structure varies; the script tries multiple patterns
- Try opening the URL in a browser to verify it works
- Some products may have restricted images

**Download fails:**
- Check your internet connection
- Amazon may be rate-limiting; wait a few minutes and retry
- Try a different Amazon URL for the same product

**Product not updated:**
- Verify the productId matches exactly (case-sensitive)
- Check `scripts/image-mapping.json` for the mapping result

## Output

- **Images:** `public/products/{productId}.jpg`
- **Mappings:** `scripts/image-mapping.json` (log of all downloads)
- **Updated:** `all-products.json` (with new image paths)
