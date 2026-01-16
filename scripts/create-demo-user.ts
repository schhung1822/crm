/**
 * Script to create a demo user for testing
 * Run: npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/create-demo-user.ts
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: { user: "admin" },
    });

    if (existingUser) {
      console.log("❌ User 'admin' already exists!");
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Create demo user
    const user = await prisma.user.create({
      data: {
        user: "admin",
        email: "admin@example.com",
        password: hashedPassword,
        name: "Administrator",
        role: "admin",
        phone: "0123456789",
        status: "active",
      },
    });

    console.log("✅ Demo user created successfully!");
    console.log("📧 Username: admin");
    console.log("🔑 Password: admin123");
    console.log("👤 User ID:", user.id);
  } catch (error) {
    console.error("❌ Error creating demo user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
