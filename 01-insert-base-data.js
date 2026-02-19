// ============================================================
// SAMPLE DATA - CATEGORIES AND USERS
// Insert base data for the platform
// ============================================================

print("\n" + "=".repeat(60));
print("INSERTING SAMPLE DATA - CATEGORIES & USERS");
print("=".repeat(60) + "\n");

// ------------------------------------------------------------
// INSERT CATEGORIES
// ------------------------------------------------------------

const categories = db.categories.insertMany([
  {
    name: "Web Development",
    slug: "web-development",
    description: "Learn modern web development technologies",
    createdAt: new Date()
  },
  {
    name: "Data Science",
    slug: "data-science",
    description: "Master data analysis and machine learning",
    createdAt: new Date()
  },
  {
    name: "Mobile Development",
    slug: "mobile-development",
    description: "Build mobile applications",
    createdAt: new Date()
  },
  {
    name: "Design",
    slug: "design",
    description: "UI/UX and graphic design courses",
    createdAt: new Date()
  },
  {
    name: "Business",
    slug: "business",
    description: "Business and entrepreneurship",
    createdAt: new Date()
  }
]);

print("✅ Inserted " + Object.keys(categories.insertedIds).length + " categories");

// Store category IDs for reference
const webDevCategoryId = categories.insertedIds[0];
const dataScCategoryId = categories.insertedIds[1];
const mobileCategoryId = categories.insertedIds[2];
const designCategoryId = categories.insertedIds[3];
const businessCategoryId = categories.insertedIds[4];

// ------------------------------------------------------------
// INSERT USERS (INSTRUCTORS AND STUDENTS)
// ------------------------------------------------------------

const users = db.users.insertMany([
  // INSTRUCTORS
  {
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@example.com",
    password: "hashed_password_123",
    role: "instructor",
    isVerified: true,
    bio: "Full-stack developer with 10 years experience",
    profileImage: "https://example.com/sarah.jpg",
    createdAt: new Date()
  },
  {
    name: "Prof. Michael Chen",
    email: "michael.chen@example.com",
    password: "hashed_password_456",
    role: "instructor",
    isVerified: true,
    bio: "Data scientist and ML expert",
    profileImage: "https://example.com/michael.jpg",
    createdAt: new Date()
  },
  {
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    password: "hashed_password_789",
    role: "instructor",
    isVerified: true,
    bio: "Mobile app developer specializing in React Native",
    profileImage: "https://example.com/emily.jpg",
    createdAt: new Date()
  },
  // STUDENTS
  {
    name: "John Smith",
    email: "john.smith@example.com",
    password: "hashed_password_111",
    role: "student",
    isVerified: true,
    createdAt: new Date()
  },
  {
    name: "Priya Patel",
    email: "priya.patel@example.com",
    password: "hashed_password_222",
    role: "student",
    isVerified: true,
    createdAt: new Date()
  },
  {
    name: "David Kim",
    email: "david.kim@example.com",
    password: "hashed_password_333",
    role: "student",
    isVerified: true,
    createdAt: new Date()
  },
  {
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    password: "hashed_password_444",
    role: "student",
    isVerified: true,
    createdAt: new Date()
  },
  {
    name: "Ahmed Hassan",
    email: "ahmed.hassan@example.com",
    password: "hashed_password_555",
    role: "student",
    isVerified: true,
    createdAt: new Date()
  }
]);

print("✅ Inserted " + Object.keys(users.insertedIds).length + " users");
print("   - 3 Instructors");
print("   - 5 Students");

// Store user IDs for reference
const instructor1Id = users.insertedIds[0];
const instructor2Id = users.insertedIds[1];
const instructor3Id = users.insertedIds[2];
const student1Id = users.insertedIds[3];
const student2Id = users.insertedIds[4];
const student3Id = users.insertedIds[5];
const student4Id = users.insertedIds[6];
const student5Id = users.insertedIds[7];

print("\n✅ Base data insertion completed!\n");
