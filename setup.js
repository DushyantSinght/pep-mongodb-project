// ============================================================
// MONGODB E-LEARNING PLATFORM - MASTER SETUP SCRIPT
// Executes all scripts in the correct order
// ============================================================

print("\n");
print("╔" + "═".repeat(78) + "╗");
print("║" + " ".repeat(15) + "🎓 MONGODB E-LEARNING PLATFORM" + " ".repeat(32) + "║");
print("║" + " ".repeat(20) + "Mini Capstone Project" + " ".repeat(37) + "║");
print("╚" + "═".repeat(78) + "╝");

print("\n" + "=".repeat(80));
print("PHASE 1: CREATING DATABASE SCHEMA");
print("=".repeat(80));

// Load all schema files
print("\nCreating collections with validation...\n");

load('schemas/01-users.js');
load('schemas/02-categories.js');
load('schemas/03-courses.js');
load('schemas/04-lessons.js');
load('schemas/05-enrollments.js');
load('schemas/06-reviews.js');
load('schemas/07-payments.js');

print("\n✅ All collections created successfully!");

// ============================================================

print("\n" + "=".repeat(80));
print("PHASE 2: INSERTING SAMPLE DATA");
print("=".repeat(80));

load('data/01-insert-base-data.js');
load('data/02-insert-courses-lessons.js');
load('data/03-insert-transactions.js');

print("\n✅ All sample data inserted successfully!");

// ============================================================

print("\n" + "=".repeat(80));
print("PHASE 3: CRUD OPERATIONS DEMONSTRATION");
print("=".repeat(80));

load('queries/01-read-operations.js');
load('queries/02-create-update-delete.js');

print("\n✅ All CRUD operations completed successfully!");

// ============================================================

print("\n" + "=".repeat(80));
print("PHASE 4: AGGREGATION PIPELINES");
print("=".repeat(80));

load('aggregations/01-revenue-analytics.js');
load('aggregations/02-engagement-analytics.js');

print("\n✅ All aggregation pipelines executed successfully!");

// ============================================================

print("\n" + "=".repeat(80));
print("PHASE 5: DATABASE STATISTICS");
print("=".repeat(80));

print("\n📊 COLLECTION STATISTICS:\n");
print("- Users: " + db.users.countDocuments());
print("- Categories: " + db.categories.countDocuments());
print("- Courses: " + db.courses.countDocuments());
print("- Lessons: " + db.lessons.countDocuments());
print("- Enrollments: " + db.enrollments.countDocuments());
print("- Reviews: " + db.reviews.countDocuments());
print("- Payments: " + db.payments.countDocuments());

print("\n📈 INDEX INFORMATION:\n");
print("- Users indexes: " + db.users.getIndexes().length);
print("- Courses indexes: " + db.courses.getIndexes().length);
print("- Enrollments indexes: " + db.enrollments.getIndexes().length);
print("- Reviews indexes: " + db.reviews.getIndexes().length);
print("- Payments indexes: " + db.payments.getIndexes().length);

// ============================================================

print("\n" + "=".repeat(80));
print("✅ SETUP COMPLETE!");
print("=".repeat(80));

print("\n🎉 MongoDB E-Learning Platform database is ready!");
print("📚 Features implemented:");
print("   ✓ 7 collections with JSON Schema validation");
print("   ✓ 15+ indexes for optimal performance");
print("   ✓ Complete sample data");
print("   ✓ CRUD operations demonstrated");
print("   ✓ 13+ aggregation pipelines");
print("   ✓ Revenue analytics");
print("   ✓ Student engagement tracking");
print("   ✓ Category performance analysis");
print("\n🚀 Ready for MERN Stack integration!\n");
