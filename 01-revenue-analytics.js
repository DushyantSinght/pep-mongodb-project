// ============================================================
// AGGREGATION PIPELINES - REVENUE & COURSE ANALYTICS
// Complex data transformations and analysis
// ============================================================

print("\n" + "=".repeat(60));
print("AGGREGATION PIPELINES - PART 1");
print("=".repeat(60) + "\n");

// ============================================================
// 1. TOP 3 HIGHEST RATED COURSES
// ============================================================

print("1. TOP 3 HIGHEST RATED COURSES:\n");

db.courses.aggregate([
  {
    $match: { rating: { $exists: true, $gt: 0 } }
  },
  {
    $lookup: {
      from: "users",
      localField: "instructorId",
      foreignField: "_id",
      as: "instructor"
    }
  },
  { $unwind: "$instructor" },
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
    $project: {
      _id: 0,
      title: 1,
      rating: 1,
      totalStudents: 1,
      price: 1,
      instructor: "$instructor.name",
      category: "$category.name"
    }
  },
  { $sort: { rating: -1, totalStudents: -1 } },
  { $limit: 3 }
]).forEach(printjson);

// ============================================================
// 2. TOTAL REVENUE PER COURSE
// ============================================================

print("\n2. TOTAL REVENUE PER COURSE:\n");

db.payments.aggregate([
  {
    $match: { paymentStatus: "completed" }
  },
  {
    $group: {
      _id: "$courseId",
      totalRevenue: { $sum: "$amount" },
      totalEnrollments: { $count: {} }
    }
  },
  {
    $lookup: {
      from: "courses",
      localField: "_id",
      foreignField: "_id",
      as: "courseInfo"
    }
  },
  { $unwind: "$courseInfo" },
  {
    $project: {
      _id: 0,
      courseTitle: "$courseInfo.title",
      coursePrice: "$courseInfo.price",
      totalRevenue: 1,
      totalEnrollments: 1,
      averageRevenuePerStudent: {
        $round: [{ $divide: ["$totalRevenue", "$totalEnrollments"] }, 2]
      }
    }
  },
  { $sort: { totalRevenue: -1 } }
]).forEach(printjson);

// ============================================================
// 3. INSTRUCTOR-WISE EARNINGS
// ============================================================

print("\n3. INSTRUCTOR-WISE EARNINGS:\n");

db.payments.aggregate([
  {
    $match: { paymentStatus: "completed" }
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
    $group: {
      _id: "$course.instructorId",
      totalEarnings: { $sum: "$amount" },
      totalSales: { $count: {} },
      coursesSold: { $addToSet: "$courseId" }
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
      instructorEmail: "$instructor.email",
      totalEarnings: 1,
      totalSales: 1,
      numberOfCourses: { $size: "$coursesSold" },
      averageEarningsPerSale: {
        $round: [{ $divide: ["$totalEarnings", "$totalSales"] }, 2]
      }
    }
  },
  { $sort: { totalEarnings: -1 } }
]).forEach(printjson);

// ============================================================
// 4. MONTHLY REVENUE REPORT
// ============================================================

print("\n4. MONTHLY REVENUE REPORT (2024):\n");

db.payments.aggregate([
  {
    $match: {
      paymentStatus: "completed",
      createdAt: {
        $gte: new Date("2024-01-01"),
        $lt: new Date("2025-01-01")
      }
    }
  },
  {
    $group: {
      _id: {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" }
      },
      totalRevenue: { $sum: "$amount" },
      totalTransactions: { $count: {} },
      averageTransactionValue: { $avg: "$amount" }
    }
  },
  {
    $project: {
      _id: 0,
      year: "$_id.year",
      month: "$_id.month",
      monthName: {
        $switch: {
          branches: [
            { case: { $eq: ["$_id.month", 1] }, then: "January" },
            { case: { $eq: ["$_id.month", 2] }, then: "February" },
            { case: { $eq: ["$_id.month", 3] }, then: "March" },
            { case: { $eq: ["$_id.month", 4] }, then: "April" },
            { case: { $eq: ["$_id.month", 5] }, then: "May" },
            { case: { $eq: ["$_id.month", 6] }, then: "June" },
            { case: { $eq: ["$_id.month", 7] }, then: "July" },
            { case: { $eq: ["$_id.month", 8] }, then: "August" },
            { case: { $eq: ["$_id.month", 9] }, then: "September" },
            { case: { $eq: ["$_id.month", 10] }, then: "October" },
            { case: { $eq: ["$_id.month", 11] }, then: "November" },
            { case: { $eq: ["$_id.month", 12] }, then: "December" }
          ],
          default: "Unknown"
        }
      },
      totalRevenue: { $round: ["$totalRevenue", 2] },
      totalTransactions: 1,
      averageTransactionValue: { $round: ["$averageTransactionValue", 2] }
    }
  },
  { $sort: { year: 1, month: 1 } }
]).forEach(printjson);

// ============================================================
// 5. COURSE PERFORMANCE METRICS
// ============================================================

print("\n5. COURSE PERFORMANCE METRICS:\n");

db.courses.aggregate([
  {
    $lookup: {
      from: "enrollments",
      localField: "_id",
      foreignField: "courseId",
      as: "enrollments"
    }
  },
  {
    $lookup: {
      from: "reviews",
      localField: "_id",
      foreignField: "courseId",
      as: "reviews"
    }
  },
  {
    $project: {
      _id: 0,
      courseTitle: "$title",
      price: 1,
      rating: 1,
      totalStudents: 1,
      actualEnrollments: { $size: "$enrollments" },
      totalReviews: { $size: "$reviews" },
      averageProgress: {
        $round: [{ $avg: "$enrollments.progress" }, 2]
      },
      completionRate: {
        $round: [
          {
            $multiply: [
              {
                $divide: [
                  {
                    $size: {
                      $filter: {
                        input: "$enrollments",
                        cond: { $eq: ["$$this.progress", 100] }
                      }
                    }
                  },
                  {
                    $cond: [
                      { $eq: [{ $size: "$enrollments" }, 0] },
                      1,
                      { $size: "$enrollments" }
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
  { $sort: { averageProgress: -1 } }
]).forEach(printjson);

// ============================================================
// 6. DAILY REVENUE TREND (Last 30 Days)
// ============================================================

print("\n6. DAILY REVENUE TREND (LAST 30 DAYS):\n");

const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

db.payments.aggregate([
  {
    $match: {
      paymentStatus: "completed",
      createdAt: { $gte: thirtyDaysAgo }
    }
  },
  {
    $group: {
      _id: {
        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
      },
      dailyRevenue: { $sum: "$amount" },
      transactionCount: { $count: {} }
    }
  },
  {
    $project: {
      _id: 0,
      date: "$_id",
      dailyRevenue: 1,
      transactionCount: 1
    }
  },
  { $sort: { date: -1 } },
  { $limit: 10 }
]).forEach(printjson);

print("\n✅ Revenue and course analytics completed!\n");
