// ============================================================
// REVIEWS COLLECTION SCHEMA
// Course ratings and reviews
// ============================================================

db.createCollection("reviews", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["courseId", "studentId", "rating"],
      properties: {
        courseId: {
          bsonType: "objectId",
          description: "Reference to courses collection"
        },
        studentId: {
          bsonType: "objectId",
          description: "Reference to users collection (student)"
        },
        rating: {
          bsonType: "int",
          minimum: 1,
          maximum: 5,
          description: "Rating must be between 1 and 5"
        },
        comment: {
          bsonType: "string",
          description: "Review comment"
        },
        createdAt: {
          bsonType: "date",
          description: "Review creation timestamp"
        },
        updatedAt: {
          bsonType: "date",
          description: "Last update timestamp"
        },
        isVerifiedPurchase: {
          bsonType: "bool",
          description: "Verified enrollment indicator"
        }
      }
    }
  }
});

// Create indexes
db.reviews.createIndex({ courseId: 1, studentId: 1 }, { unique: true });
db.reviews.createIndex({ courseId: 1 });
db.reviews.createIndex({ courseId: 1, rating: -1, createdAt: -1 });

print("✅ Reviews collection created with validation and indexes");
