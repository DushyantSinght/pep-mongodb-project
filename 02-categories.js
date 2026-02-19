// ============================================================
// CATEGORIES COLLECTION SCHEMA
// Course categorization system
// ============================================================

db.createCollection("categories", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "slug"],
      properties: {
        name: {
          bsonType: "string",
          description: "Category name is required"
        },
        slug: {
          bsonType: "string",
          description: "URL-friendly slug"
        },
        description: {
          bsonType: "string",
          description: "Category description"
        },
        createdAt: {
          bsonType: "date",
          description: "Creation timestamp"
        }
      }
    }
  }
});

// Create indexes
db.categories.createIndex({ slug: 1 }, { unique: true });

print("✅ Categories collection created with validation and indexes");
