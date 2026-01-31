const fs = require('fs');
const path = require('path');

const PRODUCTS_FILE = path.join(__dirname, '..', 'all-products.json');

// Batch 8 - New electronics and personal care products
const newProducts = [
  {
    "id": "el-049",
    "name": "Logitech K120 USB Wired Keyboard",
    "description": "Full-size, spill-resistant wired keyboard for reliable everyday typing.",
    "price": 599,
    "originalPrice": 995,
    "category": "electronics",
    "subcategory": "accessories",
    "image": "/products/el-049.jpg",
    "rating": 4.3,
    "reviews": 89234,
    "inStock": true,
    "brand": "Logitech",
    "features": ["Wired", "Spill-Resistant", "Full-Size", "USB"]
  },
  {
    "id": "el-050",
    "name": "HP K1500 USB Wired Keyboard",
    "description": "Durable full-size wired keyboard with shortcut keys for office use.",
    "price": 499,
    "originalPrice": 799,
    "category": "electronics",
    "subcategory": "accessories",
    "image": "/products/el-050.jpg",
    "rating": 4.2,
    "reviews": 67890,
    "inStock": true,
    "brand": "HP",
    "features": ["Wired", "Full-Size", "Shortcut Keys", "Office"]
  },
  {
    "id": "el-051",
    "name": "TP-Link TL-WN725N 150Mbps USB WiFi Adapter",
    "description": "Nano USB Wi-Fi adapter for desktops and laptops with plug-and-play setup.",
    "price": 399,
    "originalPrice": 599,
    "category": "electronics",
    "subcategory": "accessories",
    "image": "/products/el-051.jpg",
    "rating": 4.1,
    "reviews": 123456,
    "inStock": true,
    "brand": "TP-Link",
    "features": ["150Mbps", "Nano Size", "Plug-and-Play", "USB"]
  },
  {
    "id": "el-052",
    "name": "Seagate Expansion 1TB Portable External Hard Drive",
    "description": "Portable 1TB external HDD for easy file storage and backups (USB 3.0).",
    "price": 3499,
    "originalPrice": 4999,
    "category": "electronics",
    "subcategory": "storage",
    "image": "/products/el-052.jpg",
    "rating": 4.5,
    "reviews": 234567,
    "inStock": true,
    "brand": "Seagate",
    "features": ["1TB", "USB 3.0", "Portable", "Backup"]
  },
  {
    "id": "el-053",
    "name": "AmazonBasics 3-Button USB Wired Mouse",
    "description": "Simple, reliable wired optical mouse with 3 buttons and plug-and-play USB.",
    "price": 299,
    "originalPrice": 499,
    "category": "electronics",
    "subcategory": "accessories",
    "image": "/products/el-053.jpg",
    "rating": 4.0,
    "reviews": 156789,
    "inStock": true,
    "brand": "AmazonBasics",
    "features": ["Wired", "3-Button", "Optical", "USB"]
  },
  {
    "id": "el-054",
    "name": "Samsung EVO Plus 128GB microSDXC Memory Card",
    "description": "High-speed 128GB microSD card with adapter suitable for phones, cameras, and drones.",
    "price": 999,
    "originalPrice": 1599,
    "category": "electronics",
    "subcategory": "storage",
    "image": "/products/el-054.jpg",
    "rating": 4.6,
    "reviews": 345678,
    "inStock": true,
    "brand": "Samsung",
    "features": ["128GB", "High-Speed", "With Adapter", "UHS-I"]
  },
  {
    "id": "el-055",
    "name": "Anker PowerLine II USB-C Cable",
    "description": "Reinforced fast-charging USB-C cable from Anker (multiple lengths/models available).",
    "price": 799,
    "originalPrice": 1299,
    "category": "electronics",
    "subcategory": "accessories",
    "image": "/products/el-055.jpg",
    "rating": 4.5,
    "reviews": 89234,
    "inStock": true,
    "brand": "Anker",
    "features": ["USB-C", "Fast Charging", "Reinforced", "Durable"]
  },
  {
    "id": "pc-016",
    "name": "Philips BT1210/15 Beard Trimmer",
    "description": "Cordless beard trimmer with skin-friendly blades and multiple length settings.",
    "price": 899,
    "originalPrice": 1495,
    "category": "personal-care",
    "subcategory": "grooming",
    "image": "/products/pc-016.jpg",
    "rating": 4.2,
    "reviews": 45678,
    "inStock": true,
    "brand": "Philips",
    "features": ["Cordless", "Skin-Friendly", "Multiple Lengths", "Series 1000"]
  }
];

console.log('📦 Adding batch 8 products...\n');

// Read existing products
const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
console.log(`📋 Current products: ${products.length}`);

// Add new products
products.push(...newProducts);
console.log(`✅ New products added: ${newProducts.length}`);
console.log(`📋 Total products: ${products.length}`);

// Save
fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
console.log(`\n✅ Saved to ${PRODUCTS_FILE}`);

console.log('\n📦 Added products:');
newProducts.forEach(p => {
  console.log(`   ${p.id} - ${p.name}`);
});

console.log('\n✅ Done!\n');
