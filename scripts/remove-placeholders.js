const fs = require('fs');
const path = require('path');

const PRODUCTS_FILE = path.join(__dirname, '..', 'all-products.json');

console.log('🗑️  Removing products with placeholder images...\n');

// Read existing products
const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
console.log(`📋 Current products: ${products.length}`);

// Filter to keep only products with downloaded images
const productsWithImages = products.filter(p => {
  return p.image && p.image.startsWith('/products/');
});

const productsWithPlaceholders = products.filter(p => {
  return p.image && p.image.includes('unsplash');
});

console.log(`\n📊 Analysis:`);
console.log(`   ✓ Products with downloaded images: ${productsWithImages.length}`);
console.log(`   ✗ Products with placeholder images: ${productsWithPlaceholders.length}`);

console.log(`\n🗑️  Removing products with placeholders:`);
productsWithPlaceholders.forEach(p => {
  console.log(`   ${p.id} - ${p.name}`);
});

// Save filtered products
fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(productsWithImages, null, 2));
console.log(`\n✅ Saved ${productsWithImages.length} products to ${PRODUCTS_FILE}`);

console.log('\n📊 Final breakdown by category:');
const byCategory = {};
productsWithImages.forEach(p => {
  byCategory[p.category] = (byCategory[p.category] || 0) + 1;
});
Object.entries(byCategory).forEach(([cat, count]) => {
  console.log(`   ${cat}: ${count}`);
});

console.log('\n✅ Done!\n');
