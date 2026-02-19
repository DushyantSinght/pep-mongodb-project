// ============================================================
// COURSES COLLECTION SCHEMA
// Core course information
// ============================================================

db.createCollection("courses", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "description", "price", "instructorId", "categoryId", "level"],
      properties: {
        title: {
          bsonType: "string",
          description: "Course title is required"
        },
        description: {
          bsonType: "string",
          description: "Course description is required"
        },
        price: {
          bsonType: "number",
          minimum: 0,
          description: "Price must be a positive number"
        },
        instructorId: {
          bsonType: "objectId",
          description: "Reference to users collection (instructor)"
        },
        categoryId: {
          bsonType: "objectId",
          description: "Reference to categories collection"
        },
        level: {
          enum: ["beginner", "intermediate", "advanced"],
          description: "Course difficulty level"
        },
        rating: {
          bsonType: "number",
          minimum: 0,
          maximum: 5,
          description: "Average rating between 0 and 5"
        },
        totalStudents: {
          bsonType: "int",
          minimum: 0,
          description: "Total enrolled students"
        },
        thumbnail: {
          bsonType: "string",
          description: "Course thumbnail URL"
        },
        duration: {
          bsonType: "int",
          description: "Total course duration in minutes"
        },
        createdAt: {
          bsonType: "date",
          description: "Course creation date"
        },
        updatedAt: {
          bsonType: "date",
          description: "Last update date"
        },
        isPublished: {
          bsonType: "bool",
          description: "Publication status"
        }
      }
    }
  }
});

// Create indexes
db.courses.createIndex({ instructorId: 1 });
db.courses.createIndex({ categoryId: 1 });
db.courses.createIndex({ rating: -1 });
db.courses.createIndex({ price: 1 });
db.courses.createIndex({ title: "text", description: "text" });

print("✅ Courses collection created with validation and indexes");
