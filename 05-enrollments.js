// ============================================================
// ENROLLMENTS COLLECTION SCHEMA
// Tracks student course enrollments
// ============================================================

db.createCollection("enrollments", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["studentId", "courseId", "enrolledAt"],
      properties: {
        studentId: {
          bsonType: "objectId",
          description: "Reference to users collection (student)"
        },
        courseId: {
          bsonType: "objectId",
          description: "Reference to courses collection"
        },
        enrolledAt: {
          bsonType: "date",
          description: "Enrollment timestamp"
        },
        paymentId: {
          bsonType: "objectId",
          description: "Reference to payments collection"
        },
        progress: {
          bsonType: "number",
          minimum: 0,
          maximum: 100,
          description: "Course completion percentage"
        },
        completedLessons: {
          bsonType: "array",
          description: "Array of completed lesson IDs"
        },
        lastAccessedAt: {
          bsonType: "date",
          description: "Last access timestamp"
        },
        certificateIssued: {
          bsonType: "bool",
          description: "Certificate status"
        }
      }
    }
  }
});

// Create indexes
db.enrollments.createIndex({ studentId: 1, courseId: 1 }, { unique: true });
db.enrollments.createIndex({ courseId: 1 });

print("✅ Enrollments collection created with validation and indexes");
