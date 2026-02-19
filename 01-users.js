// ============================================================
// USERS COLLECTION SCHEMA
// Manages both students and instructors
// ============================================================

db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "password", "role"],
      properties: {
        name: {
          bsonType: "string",
          description: "Name is required and must be a string"
        },
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          description: "Email must be a valid email address"
        },
        password: {
          bsonType: "string",
          minLength: 6,
          description: "Password must be at least 6 characters"
        },
        role: {
          enum: ["student", "instructor"],
          description: "Role must be either student or instructor"
        },
        isVerified: {
          bsonType: "bool",
          description: "Verification status"
        },
        createdAt: {
          bsonType: "date",
          description: "Account creation timestamp"
        },
        profileImage: {
          bsonType: "string",
          description: "Profile image URL"
        },
        bio: {
          bsonType: "string",
          description: "User biography"
        }
      }
    }
  }
});

// Create indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ role: 1 });

print("✅ Users collection created with validation and indexes");
