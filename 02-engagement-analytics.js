// ============================================================
// AGGREGATION PIPELINES - STUDENT ENGAGEMENT & CATEGORIES
// User behavior and category performance analysis
// ============================================================

print("\n" + "=".repeat(60));
print("AGGREGATION PIPELINES - PART 2");
print("=".repeat(60) + "\n");

// ============================================================
// 1. STUDENT ENGAGEMENT ANALYTICS
// ============================================================

print("1. STUDENT ENGAGEMENT ANALYTICS:\n");

db.enrollments.aggregate([
  {
    $group: {
      _id: "$studentId",
      totalCourses: { $count: {} },
      averageProgress: { $avg: "$progress" },
      certificatesEarned: {
        $sum: { $cond: ["$certificateIssued", 1, 0] }
      },
      totalLessonsCompleted: {
        $sum: { $size: "$completedLessons" }
      },
      lastActive: { $max: "$lastAccessedAt" }
    }
  },
  {
    $lookup: {
      from: "users",
      localField: "_id",
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
      totalCourses: 1,
      averageProgress: { $round: ["$averageProgress", 2] },
      certificatesEarned: 1,
      totalLessonsCompleted: 1,
      lastActive: 1,
      engagementScore: {
        $round: [
          {
            $add: [
              { $multiply: ["$averageProgress", 0.6] },
              { $multiply: ["$totalCourses", 10] },
              { $multiply: ["$certificatesEarned", 20] }
            ]
          },
          2
        ]
      }
    }
  },
  { $sort: { engagementScore: -1 } }
]).forEach(printjson);

// ============================================================
// 2. CATEGORY-WISE PERFORMANCE
// ============================================================

print("\n2. CATEGORY-WISE PERFORMANCE:\n");

db.courses.aggregate([
  {
    $lookup: {
      from: "categories",
      localField: "categoryId",
      foreignField: "_id",
      as: "category"
    }
  },
  { $unwind: "$category" },
  {
    $group: {
      _id: "$categoryId",
      categoryName: { $first: "$category.name" },
      totalCourses: { $count: {} },
      averageRating: { $avg: "$rating" },
      totalStudents: { $sum: "$totalStudents" },
      averagePrice: { $avg: "$price" },
      totalRevenue: {
        $sum: { $multiply: ["$price", "$totalStudents"] }
      }
    }
  },
  {
    $project: {
      _id: 0,
      categoryName: 1,
      totalCourses: 1,
      averageRating: { $round: ["$averageRating", 2] },
      totalStudents: 1,
      averagePrice: { $round: ["$averagePrice", 2] },
      estimatedRevenue: { $round: ["$totalRevenue", 2] }
    }
  },
  { $sort: { totalStudents: -1 } }
]).forEach(printjson);

// ============================================================
// 3. STUDENT COURSE COMPLETION STATUS
// ============================================================

print("\n3. STUDENT COURSE COMPLETION STATUS:\n");

db.enrollments.aggregate([
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
      status: {
        $switch: {
          branches: [
            { case: { $eq: ["$progress", 100] }, then: "Completed" },
            { case: { $gte: ["$progress", 75] }, then: "Almost Done" },
            { case: { $gte: ["$progress", 50] }, then: "In Progress" },
            { case: { $gte: ["$progress", 25] }, then: "Getting Started" },
            { case: { $lt: ["$progress", 25] }, then: "Just Started" }
          ],
          default: "Not Started"
        }
      },
      enrolledAt: 1,
      certificateIssued: 1
    }
  },
  { $sort: { progress: -1 } }
]).forEach(printjson);

// ============================================================
// 4. COURSE RATING DISTRIBUTION
// ============================================================

print("\n4. COURSE RATING DISTRIBUTION:\n");

db.reviews.aggregate([
  {
    $group: {
      _id: "$rating",
      count: { $count: {} }
    }
  },
  {
    $project: {
      _id: 0,
      rating: "$_id",
      count: 1,
      stars: {
        $concat: [
          { $toString: "$_id" },
          " ",
          {
            $reduce: {
              input: { $range: [0, "$_id"] },
              initialValue: "",
              in: { $concat: ["$$value", "⭐"] }
            }
          }
        ]
      }
    }
  },
  { $sort: { rating: -1 } }
]).forEach(printjson);

// ============================================================
// 5. INSTRUCTOR COURSE PORTFOLIO
// ============================================================

print("\n5. INSTRUCTOR COURSE PORTFOLIO:\n");

db.courses.aggregate([
  {
    $group: {
      _id: "$instructorId",
      totalCourses: { $count: {} },
      averageRating: { $avg: "$rating" },
      totalStudents: { $sum: "$totalStudents" },
      courseLevels: {
        $push: "$level"
      },
      courseList: {
        $push: {
          title: "$title",
          rating: "$rating",
          students: "$totalStudents"
        }
      }
    }
  },
  {
    $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "_id",
      as: "instructor"
    }
  },
  { $unwind: "$instructor" },
  {
    $project: {
      _id: 0,
      instructorName: "$instructor.name",
      instructorBio: "$instructor.bio",
      totalCourses: 1,
      averageRating: { $round: ["$averageRating", 2] },
      totalStudents: 1,
      beginnerCourses: {
        $size: {
          $filter: {
            input: "$courseLevels",
            cond: { $eq: ["$$this", "beginner"] }
          }
        }
      },
      intermediateCourses: {
        $size: {
          $filter: {
            input: "$courseLevels",
            cond: { $eq: ["$$this", "intermediate"] }
          }
        }
      },
      advancedCourses: {
        $size: {
          $filter: {
            input: "$courseLevels",
            cond: { $eq: ["$$this", "advanced"] }
          }
        }
      },
      topCourse: {
        $arrayElemAt: [
          {
            $sortArray: {
              input: "$courseList",
              sortBy: { rating: -1 }
            }
          },
          0
        ]
      }
    }
  },
  { $sort: { totalStudents: -1 } }
]).forEach(printjson);

// ============================================================
// 6. PAYMENT METHOD ANALYSIS
// ============================================================

print("\n6. PAYMENT METHOD ANALYSIS:\n");

db.payments.aggregate([
  {
    $match: { paymentStatus: "completed" }
  },
  {
    $group: {
      _id: "$paymentMethod",
      totalTransactions: { $count: {} },
      totalRevenue: { $sum: "$amount" },
      averageTransactionValue: { $avg: "$amount" }
    }
  },
  {
    $project: {
      _id: 0,
      paymentMethod: {
        $switch: {
          branches: [
            { case: { $eq: ["$_id", "card"] }, then: "Credit/Debit Card" },
            { case: { $eq: ["$_id", "upi"] }, then: "UPI" },
            { case: { $eq: ["$_id", "netbanking"] }, then: "Net Banking" },
            { case: { $eq: ["$_id", "wallet"] }, then: "Digital Wallet" }
          ],
          default: "Other"
        }
      },
      totalTransactions: 1,
      totalRevenue: { $round: ["$totalRevenue", 2] },
      averageTransactionValue: { $round: ["$averageTransactionValue", 2] },
      percentageOfTotal: {
        $multiply: [
          {
            $divide: [
              "$totalTransactions",
              { $literal: 7 } // Total payments in our sample
            ]
          },
          100
        ]
      }
    }
  },
  { $sort: { totalRevenue: -1 } }
]).forEach(printjson);

// ============================================================
// 7. LESSON COMPLETION ANALYTICS
// ============================================================

print("\n7. LESSON COMPLETION ANALYTICS:\n");

db.lessons.aggregate([
  {
    $lookup: {
      from: "enrollments",
      let: { lessonId: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: {
              $in: ["$$lessonId", "$completedLessons"]
            }
          }
        }
      ],
      as: "completions"
    }
  },
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
      courseTitle: "$course.title",
      lessonTitle: "$title",
      lessonOrder: "$order",
      duration: 1,
      isFree: 1,
      completionCount: { $size: "$completions" },
      completionRate: {
        $round: [
          {
            $multiply: [
              {
                $divide: [
                  { $size: "$completions" },
                  {
                    $cond: [
                      { $eq: ["$course.totalStudents", 0] },
                      1,
                      "$course.totalStudents"
                    ]
                  }
                ]
              },
              100
            ]
          },
          2
        ]
      }
    }
  },
  { $sort: { completionRate: -1 } },
  { $limit: 10 }
]).forEach(printjson);

print("\n✅ Student engagement and category analytics completed!\n");
