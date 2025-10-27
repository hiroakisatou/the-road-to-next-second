import { auth } from "@/futures/auth/utils/auth";

async function createTestUser() {
  try {
    console.log("Creating test user...");

    await auth.api.signUpEmail({
      body: {
        email: "test@example.com",
        password: "password123",
        name: "Test User",
      },
    });

    console.log("✅ Test user created successfully!");
    console.log("Email: test@example.com");
    console.log("Password: password123");
  } catch (error) {
    console.error("❌ Error creating test user:", error);
  }
}

createTestUser();
