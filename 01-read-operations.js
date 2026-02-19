// ============================================================
// CRUD OPERATIONS - READ QUERIES
// Various read operations demonstrating MongoDB queries
// ============================================================

print("\n" + "=".repeat(60));
print("READ OPERATIONS");
print("=".repeat(60) + "\n");

// ------------------------------------------------------------
// 1. Find All Instructors
// ------------------------------------------------------------

print("1. ALL INSTRUCTORS:\n");
db.users.find(
  { role: "instructor" },
  { name: 1, email: 1, bio: 1, _id: 0 }
).forEach(printjson);

// ------------------------------------------------------------
// 2. Find Courses by Specific Instructor
// ------------------------------------------------------------

print("\n2. COURSES BY DR. SARAH JOHNSON:\n");
const instructor = db.users.findOne({ email: "sarah.johnson@example.com" });
if (instructor) {
  db.courses.find(
    { instructorId: instructor._id },
    { title: 1, price: 1, rating: 1, totalStudents: 1, _id: 0 }
  ).forEach(printjson);
}

// ------------------------------------------------------------
// 3. Find Courses in Specific Category
// ------------------------------------------------------------

print("\n3. WEB DEVELOPMENT COURSES:\n");
const webDevCategory = db.categories.findOne({ slug: "web-development" });
if (webDevCategory) {
  db.courses.find(
    { categoryId: webDevCategory._id },
    { title: 1, level: 1, price: 1, rating: 1, _id: 0 }
  ).forEach(printjson);
}

// ------------------------------------------------------------
// 4. Find High-Rated Courses (Rating > 4.5)
// ------------------------------------------------------------

print("\n4. HIGH-RATED COURSES (>4.5):\n");
db.courses.find(
  { rating: { $gt: 4.5 } },
  { title: 1, rating: 1, totalStudents: 1, price: 1, _id: 0 }
).sort({ rating: -1 }).forEach(printjson);

// ------------------------------------------------------------
// 5. Find All Free Lessons
// ------------------------------------------------------------

print("\n5. FREE PREVIEW LESSONS:\n");
db.lessons.aggregate([
  { $match: { isFree: true } },
  {
    $lookup: {
      from: "courses",
      localField: "courseId",
      foreignField: "_id",
      as: "course"
    }
  },
  { $unwind: "$course" },
  {
    $project: {
      _id: 0,
      lessonTitle: "$title",
      courseTitle: "$course.title",
      duration: 1
    }
  }
]).forEach(printjson);

// ------------------------------------------------------------
// 6. Find Students Enrolled in a Specific Course
// ------------------------------------------------------------

print("\n6. STUDENTS ENROLLED IN MERN STACK COURSE:\n");
const mernCourse = db.courses.findOne({ title: /MERN Stack/ });
if (mernCourse) {
  db.enrollments.aggregate([
    { $match: { courseId: mernCourse._id } },
    {
      $lookup: {
        from: "users",
        localField: "studentId",
        foreignField: "_id",
        as: "student"
      }
    },
    { $unwind: "$student" },
    {
      $project: {
        _id: 0,
        studentName: "$student.name",
        studentEmail: "$student.email",
        progress: 1,
        enrolledAt: 1
      }
    },
    { $sort: { progress: -1 } }
  ]).forEach(printjson);
}

// ------------------------------------------------------------
// 7. Find Completed Payments
// ------------------------------------------------------------

print("\n7. RECENT COMPLETED PAYMENTS:\n");
db.payments.find(
  { paymentStatus: "completed" },
  { transactionId: 1, amount: 1, paymentMethod: 1, createdAt: 1, _id: 0 }
).sort({ createdAt: -1 }).limit(5).forEach(printjson);

// ------------------------------------------------------------
// 8. Find Courses with Price Range
// ------------------------------------------------------------

print("\n8. AFFORDABLE COURSES (₹3000 - ₹5000):\n");
db.courses.find(
  {
    price: { $gte: 3000, $lte: 5000 }
  },
  { title: 1, price: 1, level: 1, _id: 0 }
).sort({ price: 1 }).forEach(printjson);

// ------------------------------------------------------------
// 9. Find Students with High Progress
// ------------------------------------------------------------

print("\n9. STUDENTS WITH >70% PROGRESS:\n");
db.enrollments.aggregate([
  { $match: { progress: { $gt: 70 } } },
  {
    $lookup: {
      from: "users",
      localField: "studentId",
      foreignField: "_id",
      as: "student"
    }
  },
  { $unwind: "$student" },
  {
    $lookup: {
      from: "courses",
      localField: "courseId",
      foreignField: "_id",
      as: "course"
    }
  },
  { $unwind: "$course" },
  {
    $project: {
      _id: 0,
      studentName: "$student.name",
      courseTitle: "$course.title",
      progress: 1,
      certificateIssued: 1
    }
  },
  { $sort: { progress: -1 } }
]).forEach(printjson);

// ------------------------------------------------------------
// 10. Text Search on Courses
// ------------------------------------------------------------

print("\n10. SEARCH COURSES - 'JavaScript':\n");
db.courses.find(
  { $text: { $search: "JavaScript" } },
  { title: 1, description: 1, score: { $meta: "textScore" }, _id: 0 }
).sort({ score: { $meta: "textScore" } }).forEach(printjson);

print("\n✅ Read operations completed!\n");
