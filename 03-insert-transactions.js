// ============================================================
// SAMPLE DATA - PAYMENTS, ENROLLMENTS, AND REVIEWS
// Insert transaction and engagement data
// ============================================================

print("\n" + "=".repeat(60));
print("INSERTING SAMPLE DATA - PAYMENTS, ENROLLMENTS & REVIEWS");
print("=".repeat(60) + "\n");

// Retrieve IDs from existing data
const students = db.users.find({ role: "student" }).toArray();
const courses = db.courses.find().toArray();
const lessons = db.lessons.find().toArray();

const student1Id = students[0]._id;
const student2Id = students[1]._id;
const student3Id = students[2]._id;
const student4Id = students[3]._id;
const student5Id = students[4]._id;

const course1Id = courses[0]._id; // MERN
const course2Id = courses[1]._id; // Python DS
const course3Id = courses[2]._id; // React Native
const course4Id = courses[3]._id; // Advanced JS
const course5Id = courses[4]._id; // TensorFlow

// ------------------------------------------------------------
// INSERT PAYMENTS
// ------------------------------------------------------------

const payments = db.payments.insertMany([
  {
    studentId: student1Id,
    courseId: course1Id,
    amount: 4999,
    paymentStatus: "completed",
    transactionId: "TXN001234567",
    paymentMethod: "card",
    createdAt: new Date("2024-03-01")
  },
  {
    studentId: student1Id,
    courseId: course4Id,
    amount: 2999,
    paymentStatus: "completed",
    transactionId: "TXN001234568",
    paymentMethod: "upi",
    createdAt: new Date("2024-03-15")
  },
  {
    studentId: student2Id,
    courseId: course2Id,
    amount: 5999,
    paymentStatus: "completed",
    transactionId: "TXN001234569",
    paymentMethod: "card",
    createdAt: new Date("2024-03-05")
  },
  {
    studentId: student3Id,
    courseId: course1Id,
    amount: 4999,
    paymentStatus: "completed",
    transactionId: "TXN001234570",
    paymentMethod: "upi",
    createdAt: new Date("2024-03-08")
  },
  {
    studentId: student3Id,
    courseId: course3Id,
    amount: 3999,
    paymentStatus: "completed",
    transactionId: "TXN001234571",
    paymentMethod: "card",
    createdAt: new Date("2024-03-12")
  },
  {
    studentId: student4Id,
    courseId: course2Id,
    amount: 5999,
    paymentStatus: "completed",
    transactionId: "TXN001234572",
    paymentMethod: "upi",
    createdAt: new Date("2024-03-10")
  },
  {
    studentId: student5Id,
    courseId: course5Id,
    amount: 6999,
    paymentStatus: "completed",
    transactionId: "TXN001234573",
    paymentMethod: "card",
    createdAt: new Date("2024-03-14")
  }
]);

print("✅ Inserted " + Object.keys(payments.insertedIds).length + " payments");

// Get lesson IDs for completed lessons
const mernLessons = db.lessons.find({ courseId: course1Id }).sort({ order: 1 }).toArray();
const dsLessons = db.lessons.find({ courseId: course2Id }).sort({ order: 1 }).toArray();
const rnLessons = db.lessons.find({ courseId: course3Id }).sort({ order: 1 }).toArray();

// ------------------------------------------------------------
// INSERT ENROLLMENTS
// ------------------------------------------------------------

const enrollments = db.enrollments.insertMany([
  {
    studentId: student1Id,
    courseId: course1Id,
    enrolledAt: new Date("2024-03-01"),
    paymentId: payments.insertedIds[0],
    progress: 75,
    completedLessons: [mernLessons[0]._id, mernLessons[1]._id, mernLessons[2]._id],
    lastAccessedAt: new Date(),
    certificateIssued: false
  },
  {
    studentId: student1Id,
    courseId: course4Id,
    enrolledAt: new Date("2024-03-15"),
    paymentId: payments.insertedIds[1],
    progress: 30,
    completedLessons: [],
    lastAccessedAt: new Date(),
    certificateIssued: false
  },
  {
    studentId: student2Id,
    courseId: course2Id,
    enrolledAt: new Date("2024-03-05"),
    paymentId: payments.insertedIds[2],
    progress: 100,
    completedLessons: [dsLessons[0]._id, dsLessons[1]._id, dsLessons[2]._id],
    lastAccessedAt: new Date("2024-04-01"),
    certificateIssued: true
  },
  {
    studentId: student3Id,
    courseId: course1Id,
    enrolledAt: new Date("2024-03-08"),
    paymentId: payments.insertedIds[3],
    progress: 50,
    completedLessons: [mernLessons[0]._id, mernLessons[1]._id],
    lastAccessedAt: new Date(),
    certificateIssued: false
  },
  {
    studentId: student3Id,
    courseId: course3Id,
    enrolledAt: new Date("2024-03-12"),
    paymentId: payments.insertedIds[4],
    progress: 60,
    completedLessons: [rnLessons[0]._id, rnLessons[1]._id],
    lastAccessedAt: new Date(),
    certificateIssued: false
  },
  {
    studentId: student4Id,
    courseId: course2Id,
    enrolledAt: new Date("2024-03-10"),
    paymentId: payments.insertedIds[5],
    progress: 85,
    completedLessons: [dsLessons[0]._id, dsLessons[1]._id],
    lastAccessedAt: new Date(),
    certificateIssued: false
  },
  {
    studentId: student5Id,
    courseId: course5Id,
    enrolledAt: new Date("2024-03-14"),
    paymentId: payments.insertedIds[6],
    progress: 20,
    completedLessons: [],
    lastAccessedAt: new Date(),
    certificateIssued: false
  }
]);

print("✅ Inserted " + Object.keys(enrollments.insertedIds).length + " enrollments");

// ------------------------------------------------------------
// INSERT REVIEWS
// ------------------------------------------------------------

const reviews = db.reviews.insertMany([
  {
    courseId: course1Id,
    studentId: student1Id,
    rating: 5,
    comment: "Excellent course! Very comprehensive and well-structured.",
    isVerifiedPurchase: true,
    createdAt: new Date("2024-03-20"),
    updatedAt: new Date("2024-03-20")
  },
  {
    courseId: course1Id,
    studentId: student3Id,
    rating: 4,
    comment: "Great content but could use more practical examples.",
    isVerifiedPurchase: true,
    createdAt: new Date("2024-03-22"),
    updatedAt: new Date("2024-03-22")
  },
  {
    courseId: course2Id,
    studentId: student2Id,
    rating: 5,
    comment: "Best data science course I've taken. Highly recommended!",
    isVerifiedPurchase: true,
    createdAt: new Date("2024-04-01"),
    updatedAt: new Date("2024-04-01")
  },
  {
    courseId: course2Id,
    studentId: student4Id,
    rating: 5,
    comment: "Prof. Chen explains complex concepts very clearly.",
    isVerifiedPurchase: true,
    createdAt: new Date("2024-03-25"),
    updatedAt: new Date("2024-03-25")
  },
  {
    courseId: course3Id,
    studentId: student3Id,
    rating: 4,
    comment: "Good course for learning React Native basics.",
    isVerifiedPurchase: true,
    createdAt: new Date("2024-03-28"),
    updatedAt: new Date("2024-03-28")
  },
  {
    courseId: course5Id,
    studentId: student5Id,
    rating: 5,
    comment: "Mind-blowing deep learning content!",
    isVerifiedPurchase: true,
    createdAt: new Date("2024-03-30"),
    updatedAt: new Date("2024-03-30")
  }
]);

print("✅ Inserted " + Object.keys(reviews.insertedIds).length + " reviews");
print("\n✅ All transactional data insertion completed!\n");
