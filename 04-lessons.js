// ============================================================
// LESSONS COLLECTION SCHEMA
// Individual lessons within courses
// ============================================================

db.createCollection("lessons", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["courseId", "title", "videoUrl", "duration", "order"],
      properties: {
        courseId: {
          bsonType: "objectId",
          description: "Reference to courses collection"
        },
        title: {
          bsonType: "string",
          description: "Lesson title is required"
        },
        videoUrl: {
          bsonType: "string",
          description: "Video URL is required"
        },
        duration: {
          bsonType: "int",
          minimum: 1,
          description: "Duration in minutes, must be positive"
        },
        order: {
          bsonType: "int",
          minimum: 1,
          description: "Lesson order in course"
        },
        description: {
          bsonType: "string",
          description: "Lesson description"
        },
        resources: {
          bsonType: "array",
          description: "Additional resources"
        },
        isFree: {
          bsonType: "bool",
          description: "Preview/Free lesson indicator"
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
db.lessons.createIndex({ courseId: 1, order: 1 });

print("✅ Lessons collection created with validation and indexes");
