// ============================================================
// PAYMENTS COLLECTION SCHEMA
// Transaction records
// ============================================================

db.createCollection("payments", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["studentId", "amount", "paymentStatus", "transactionId"],
      properties: {
        studentId: {
          bsonType: "objectId",
          description: "Reference to users collection"
        },
        courseId: {
          bsonType: "objectId",
          description: "Reference to courses collection"
        },
        amount: {
          bsonType: "number",
          minimum: 0,
          description: "Payment amount must be positive"
        },
        paymentStatus: {
          enum: ["pending", "completed", "failed", "refunded"],
          description: "Payment status"
        },
        transactionId: {
          bsonType: "string",
          description: "Unique transaction identifier"
        },
        paymentMethod: {
          bsonType: "string",
          description: "Payment method (card, upi, etc.)"
        },
        createdAt: {
          bsonType: "date",
          description: "Payment timestamp"
        },
        refundedAt: {
          bsonType: "date",
          description: "Refund timestamp"
        }
      }
    }
  }
});

// Create indexes
db.payments.createIndex({ studentId: 1 });
db.payments.createIndex({ transactionId: 1 }, { unique: true });
db.payments.createIndex({ paymentStatus: 1 });
db.payments.createIndex({ createdAt: -1 });
db.payments.createIndex({ studentId: 1, paymentStatus: 1, createdAt: -1 });

print("✅ Payments collection created with validation and indexes");
