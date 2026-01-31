const fs = require('fs');
const path = require('path');

// IDs to keep
const keepIds = [
  // Electronics (16)
  'el-008', 'el-009', 'el-010', 'el-012', 'el-013', 'el-015', 'el-016', 'el-017',
  'el-018', 'el-019', 'el-020', 'el-021', 'el-022', 'el-023', 'el-024', 'el-026',
  // Beauty (18)
  'be-001', 'be-002', 'be-003', 'be-004', 'be-006', 'be-007', 'be-009', 'be-010',
  'be-011', 'be-012', 'be-013', 'be-014', 'be-015', 'be-019', 'be-020', 'be-021',
  'be-022', 'be-024',
  // Personal Care (6)
  'pc-001', 'pc-010', 'pc-011', 'pc-012', 'pc-013', 'pc-014',
  // Fashion (30)
  'fa-001', 'fa-002', 'fa-003', 'fa-004', 'fa-005', 'fa-006', 'fa-007', 'fa-008',
  'fa-009', 'fa-010', 'fa-011', 'fa-012', 'fa-013', 'fa-014', 'fa-015', 'fa-016',
  'fa-017', 'fa-018', 'fa-019', 'fa-020', 'fa-021', 'fa-022', 'fa-023', 'fa-024',
  'fa-025', 'fa-026', 'fa-027', 'fa-028', 'fa-029', 'fa-030'
];

const PRODUCTS_FILE = path.join(__dirname, '..', 'all-products.json');

console.log('🔍 Filtering products...\n');

// Read products
const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
console.log(`📋 Total products before: ${products.length}`);

// Filter to keep only specified IDs
const filteredProducts = products.filter(p => keepIds.includes(p.id));
console.log(`✅ Products after filtering: ${filteredProducts.length}`);

// Check which IDs are missing
const foundIds = filteredProducts.map(p => p.id);
const missingIds = keepIds.filter(id => !foundIds.includes(id));

if (missingIds.length > 0) {
  console.log(`\n⚠️  Missing products (${missingIds.length}):`);
  missingIds.forEach(id => console.log(`   - ${id}`));
}

// Save filtered products
fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(filteredProducts, null, 2));
console.log(`\n✅ Saved ${filteredProducts.length} products to ${PRODUCTS_FILE}`);

// Summary by category
const summary = {};
filteredProducts.forEach(p => {
  summary[p.category] = (summary[p.category] || 0) + 1;
});

console.log('\n📊 Products by category:');
Object.entries(summary).forEach(([cat, count]) => {
  console.log(`   ${cat}: ${count}`);
});

console.log('\n✅ Done!\n');
