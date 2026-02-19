// ============================================================
// CRUD OPERATIONS - CREATE, UPDATE, DELETE
// Demonstrating data modification operations
// ============================================================

print("\n" + "=".repeat(60));
print("CREATE, UPDATE & DELETE OPERATIONS");
print("=".repeat(60) + "\n");

// ============================================================
// CREATE OPERATIONS
// ============================================================

print("--- CREATE OPERATIONS ---\n");

// 1. Create New Student
print("1. Creating new student...");
const newStudent = db.users.insertOne({
  name: "Lisa Anderson",
  email: "lisa.anderson@example.com",
  password: "hashed_password_999",
  role: "student",
  isVerified: false,
  createdAt: new Date()
});
print("✅ Created student with ID: " + newStudent.insertedId);

// 2. Create New Course
print("\n2. Creating new course...");
const instructor = db.users.findOne({ email: "sarah.johnson@example.com" });
const category = db.categories.findOne({ slug: "web-development" });

const newCourse = db.courses.insertOne({
  title: "Full Stack JavaScript with Node.js",
  description: "Master server-side JavaScript development",
  price: 3499,
  instructorId: instructor._id,
  categoryId: category._id,
  level: "beginner",
  rating: 0,
  totalStudents: 0,
  thumbnail: "https://example.com/nodejs-course.jpg",
  duration: 2400,
  isPublished: true,
  createdAt: new Date(),
  updatedAt: new Date()
});
print("✅ Created course with ID: " + newCourse.insertedId);

// 3. Create New Review
print("\n3. Creating new review...");
const student = db.users.findOne({ email: "john.smith@example.com" });
const course = db.courses.findOne({ title: /Advanced JavaScript/ });

const newReview = db.reviews.insertOne({
  courseId: course._id,
  studentId: student._id,
  rating: 5,
  comment: "Amazing deep dive into JavaScript!",
  isVerifiedPurchase: true,
  createdAt: new Date(),
  updatedAt: new Date()
});
print("✅ Created review with ID: " + newReview.insertedId);

// ============================================================
// UPDATE OPERATIONS
// ============================================================

print("\n--- UPDATE OPERATIONS ---\n");

// 1. Update Course Rating
print("1. Updating course rating...");
const mernCourse = db.courses.findOne({ title: /MERN Stack/ });
const updateRating = db.courses.updateOne(
  { _id: mernCourse._id },
  {
    $set: {
      rating: 4.9,
      totalStudents: 1252,
      updatedAt: new Date()
    }
  }
);
print("✅ Modified " + updateRating.modifiedCount + " document(s)");

// 2. Update Student Progress
print("\n2. Updating enrollment progress...");
const johnStudent = db.users.findOne({ email: "john.smith@example.com" });
const enrollment = db.enrollments.findOne({
  studentId: johnStudent._id,
  courseId: mernCourse._id
});

if (enrollment) {
  const updateProgress = db.enrollments.updateOne(
    { _id: enrollment._id },
    {
      $set: {
        progress: 90,
        lastAccessedAt: new Date()
      }
    }
  );
  print("✅ Modified " + updateProgress.modifiedCount + " document(s)");
} else {
  print("⚠️  Enrollment not found");
}

// 3. Verify User Email
print("\n3. Verifying user email...");
const verifyUser = db.users.updateOne(
  { email: "lisa.anderson@example.com" },
  { $set: { isVerified: true } }
);
print("✅ Modified " + verifyUser.modifiedCount + " document(s)");

// 4. Update Multiple Courses (Publish All)
print("\n4. Publishing all unpublished courses...");
const publishCourses = db.courses.updateMany(
  { isPublished: { $ne: true } },
  {
    $set: {
      isPublished: true,
      updatedAt: new Date()
    }
  }
);
print("✅ Modified " + publishCourses.modifiedCount + " document(s)");

// 5. Increment Student Count
print("\n5. Incrementing student count...");
const pythonCourse = db.courses.findOne({ title: /Python for Data Science/ });
const incrementStudents = db.courses.updateOne(
  { _id: pythonCourse._id },
  { $inc: { totalStudents: 1 } }
);
print("✅ Modified " + incrementStudents.modifiedCount + " document(s)");

// 6. Add Completed Lesson to Enrollment
print("\n6. Adding completed lesson...");
if (enrollment) {
  const lesson = db.lessons.findOne({ courseId: mernCourse._id, order: 4 });
  const addLesson = db.enrollments.updateOne(
    { _id: enrollment._id },
    {
      $push: { completedLessons: lesson._id }
    }
  );
  print("✅ Modified " + addLesson.modifiedCount + " document(s)");
}

// 7. Update Review
print("\n7. Updating existing review...");
if (newReview.insertedId) {
  const updateReview = db.reviews.updateOne(
    { _id: newReview.insertedId },
    {
      $set: {
        comment: "Amazing deep dive into JavaScript! Updated after completion.",
        updatedAt: new Date()
      }
    }
  );
  print("✅ Modified " + updateReview.modifiedCount + " document(s)");
}

// ============================================================
// DELETE OPERATIONS
// ============================================================

print("\n--- DELETE OPERATIONS ---\n");

// 1. Soft Delete Review (Archive)
print("1. Soft deleting a review...");
const reactNativeCourse = db.courses.findOne({ title: /React Native/ });
const davidStudent = db.users.findOne({ email: "david.kim@example.com" });

const softDeleteReview = db.reviews.updateOne(
  { courseId: reactNativeCourse._id, studentId: davidStudent._id },
  {
    $set: {
      isDeleted: true,
      deletedAt: new Date()
    }
  }
);
print("✅ Soft deleted " + softDeleteReview.modifiedCount + " review(s)");

// 2. Delete Unverified Old Users
print("\n2. Deleting unverified users older than 30 days...");
const oldDate = new Date();
oldDate.setDate(oldDate.getDate() - 30);

const deleteUnverified = db.users.deleteMany({
  isVerified: false,
  createdAt: { $lt: oldDate }
});
print("✅ Deleted " + deleteUnverified.deletedCount + " user(s)");

// 3. Delete Failed Payments
print("\n3. Deleting failed payments...");
const deleteFailedPayments = db.payments.deleteMany({
  paymentStatus: "failed"
});
print("✅ Deleted " + deleteFailedPayments.deletedCount + " payment(s)");

// 4. Delete Specific Lesson
print("\n4. Deleting a lesson...");
// Find a lesson to delete (create a test lesson first)
const testLesson = db.lessons.insertOne({
  courseId: mernCourse._id,
  title: "Test Lesson - To Be Deleted",
  videoUrl: "https://example.com/test.mp4",
  duration: 10,
  order: 999,
  isFree: false,
  createdAt: new Date()
});

const deleteLesson = db.lessons.deleteOne({ _id: testLesson.insertedId });
print("✅ Deleted " + deleteLesson.deletedCount + " lesson(s)");

// 5. Delete Course Reviews (for demonstration)
print("\n5. Deleting test review...");
if (newReview.insertedId) {
  const deleteReview = db.reviews.deleteOne({ _id: newReview.insertedId });
  print("✅ Deleted " + deleteReview.deletedCount + " review(s)");
}

// ============================================================
// COMPLEX UPDATE: UPSERT
// ============================================================

print("\n--- UPSERT OPERATION ---\n");

print("1. Upsert operation (insert if not exists)...");
const upsertResult = db.categories.updateOne(
  { slug: "artificial-intelligence" },
  {
    $set: {
      name: "Artificial Intelligence",
      description: "AI and ML courses",
      createdAt: new Date()
    }
  },
  { upsert: true }
);

if (upsertResult.upsertedId) {
  print("✅ Inserted new document with ID: " + upsertResult.upsertedId);
} else {
  print("✅ Updated existing document");
}

print("\n✅ All CRUD operations completed!\n");
