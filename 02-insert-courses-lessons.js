// ============================================================
// SAMPLE DATA - COURSES AND LESSONS
// Insert course catalog and lesson content
// ============================================================

print("\n" + "=".repeat(60));
print("INSERTING SAMPLE DATA - COURSES & LESSONS");
print("=".repeat(60) + "\n");

// Note: Run 01-insert-base-data.js first to get category and user IDs
// For standalone execution, retrieve IDs first

const webDevCategory = db.categories.findOne({ slug: "web-development" });
const dataSciCategory = db.categories.findOne({ slug: "data-science" });
const mobileCategory = db.categories.findOne({ slug: "mobile-development" });

const instructor1 = db.users.findOne({ email: "sarah.johnson@example.com" });
const instructor2 = db.users.findOne({ email: "michael.chen@example.com" });
const instructor3 = db.users.findOne({ email: "emily.rodriguez@example.com" });

// ------------------------------------------------------------
// INSERT COURSES
// ------------------------------------------------------------

const courses = db.courses.insertMany([
  {
    title: "Complete MERN Stack Development Bootcamp",
    description: "Master MongoDB, Express, React, and Node.js to build full-stack applications",
    price: 4999,
    instructorId: instructor1._id,
    categoryId: webDevCategory._id,
    level: "intermediate",
    rating: 4.8,
    totalStudents: 1250,
    thumbnail: "https://example.com/mern-course.jpg",
    duration: 3600,
    isPublished: true,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date()
  },
  {
    title: "Python for Data Science and Machine Learning",
    description: "Complete data science course from basics to advanced ML algorithms",
    price: 5999,
    instructorId: instructor2._id,
    categoryId: dataSciCategory._id,
    level: "beginner",
    rating: 4.9,
    totalStudents: 2100,
    thumbnail: "https://example.com/python-ds.jpg",
    duration: 4200,
    isPublished: true,
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date()
  },
  {
    title: "React Native Mobile App Development",
    description: "Build cross-platform mobile apps with React Native",
    price: 3999,
    instructorId: instructor3._id,
    categoryId: mobileCategory._id,
    level: "intermediate",
    rating: 4.7,
    totalStudents: 890,
    thumbnail: "https://example.com/react-native.jpg",
    duration: 2800,
    isPublished: true,
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date()
  },
  {
    title: "Advanced JavaScript Concepts",
    description: "Deep dive into closures, promises, async/await, and design patterns",
    price: 2999,
    instructorId: instructor1._id,
    categoryId: webDevCategory._id,
    level: "advanced",
    rating: 4.6,
    totalStudents: 650,
    thumbnail: "https://example.com/advanced-js.jpg",
    duration: 1800,
    isPublished: true,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date()
  },
  {
    title: "Deep Learning with TensorFlow",
    description: "Master neural networks and deep learning with TensorFlow 2.0",
    price: 6999,
    instructorId: instructor2._id,
    categoryId: dataSciCategory._id,
    level: "advanced",
    rating: 4.8,
    totalStudents: 450,
    thumbnail: "https://example.com/tensorflow.jpg",
    duration: 3200,
    isPublished: true,
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date()
  }
]);

print("✅ Inserted " + Object.keys(courses.insertedIds).length + " courses");

const course1Id = courses.insertedIds[0]; // MERN
const course2Id = courses.insertedIds[1]; // Python DS
const course3Id = courses.insertedIds[2]; // React Native
const course4Id = courses.insertedIds[3]; // Advanced JS
const course5Id = courses.insertedIds[4]; // TensorFlow

// ------------------------------------------------------------
// INSERT LESSONS
// ------------------------------------------------------------

const lessons = db.lessons.insertMany([
  // MERN Stack Course Lessons
  {
    courseId: course1Id,
    title: "Introduction to MERN Stack",
    videoUrl: "https://example.com/videos/mern-intro.mp4",
    duration: 15,
    order: 1,
    description: "Overview of MERN stack technologies",
    isFree: true,
    createdAt: new Date()
  },
  {
    courseId: course1Id,
    title: "MongoDB Fundamentals",
    videoUrl: "https://example.com/videos/mongodb-basics.mp4",
    duration: 45,
    order: 2,
    description: "Learn MongoDB database basics",
    isFree: false,
    createdAt: new Date()
  },
  {
    courseId: course1Id,
    title: "Express.js REST APIs",
    videoUrl: "https://example.com/videos/express-api.mp4",
    duration: 60,
    order: 3,
    description: "Building RESTful APIs with Express",
    isFree: false,
    createdAt: new Date()
  },
  {
    courseId: course1Id,
    title: "React Components and Hooks",
    videoUrl: "https://example.com/videos/react-hooks.mp4",
    duration: 75,
    order: 4,
    description: "Master React functional components",
    isFree: false,
    createdAt: new Date()
  },
  // Data Science Course Lessons
  {
    courseId: course2Id,
    title: "Python Basics for Data Science",
    videoUrl: "https://example.com/videos/python-basics.mp4",
    duration: 30,
    order: 1,
    description: "Python fundamentals",
    isFree: true,
    createdAt: new Date()
  },
  {
    courseId: course2Id,
    title: "NumPy and Pandas",
    videoUrl: "https://example.com/videos/numpy-pandas.mp4",
    duration: 50,
    order: 2,
    description: "Data manipulation with NumPy and Pandas",
    isFree: false,
    createdAt: new Date()
  },
  {
    courseId: course2Id,
    title: "Machine Learning Algorithms",
    videoUrl: "https://example.com/videos/ml-algorithms.mp4",
    duration: 90,
    order: 3,
    description: "Supervised and unsupervised learning",
    isFree: false,
    createdAt: new Date()
  },
  // React Native Course Lessons
  {
    courseId: course3Id,
    title: "React Native Setup",
    videoUrl: "https://example.com/videos/rn-setup.mp4",
    duration: 20,
    order: 1,
    description: "Setting up development environment",
    isFree: true,
    createdAt: new Date()
  },
  {
    courseId: course3Id,
    title: "Navigation in React Native",
    videoUrl: "https://example.com/videos/rn-navigation.mp4",
    duration: 40,
    order: 2,
    description: "React Navigation library",
    isFree: false,
    createdAt: new Date()
  },
  {
    courseId: course3Id,
    title: "Building UI Components",
    videoUrl: "https://example.com/videos/rn-ui.mp4",
    duration: 55,
    order: 3,
    description: "Creating reusable UI components",
    isFree: false,
    createdAt: new Date()
  }
]);

print("✅ Inserted " + Object.keys(lessons.insertedIds).length + " lessons");
print("   - MERN Stack: 4 lessons");
print("   - Python Data Science: 3 lessons");
print("   - React Native: 3 lessons\n");
