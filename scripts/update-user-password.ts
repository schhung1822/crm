/**
 * Script to update/hash password for existing user
 * Run: npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/update-user-password.ts
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  try {
    // Prompt for username
    const username = process.argv[2] || "admin";
    const newPassword = process.argv[3] || "admin123";

    console.log(`\n🔍 Looking for user: ${username}`);

    // Find user
    const user = await prisma.user.findFirst({
      where: { user: username },
    });

    if (!user) {
      console.log(`❌ User '${username}' not found!`);
      console.log("\n💡 Available users:");
      
      const allUsers = await prisma.user.findMany({
        select: { id: true, user: true, email: true },
        take: 10,
      });
      
      allUsers.forEach(u => {
        console.log(`   - ${u.user} (${u.email})`);
      });
      
      return;
    }

    console.log(`✅ User found: ${user.user} (${user.email})`);
    console.log(`📝 Current password (first 20 chars): ${user.password?.substring(0, 20)}...`);

    // Check if password is already hashed (bcrypt hashes start with $2)
    const isAlreadyHashed = user.password?.startsWith("$2");
    
    if (isAlreadyHashed) {
      console.log(`\n⚠️  Password appears to be already hashed.`);
      console.log(`Do you want to reset it to: "${newPassword}"?`);
    }

    // Hash new password
    console.log(`\n🔐 Hashing password: "${newPassword}"`);
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user
    await prisma.user.update({
      where: { id: user.id },
      data: { 
        password: hashedPassword,
        status: "active",
      },
    });

    console.log(`\n✅ Password updated successfully!`);
    console.log(`\n📋 Login credentials:`);
    console.log(`   Username: ${user.user}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Password: ${newPassword}`);
    console.log(`\n🌐 Login at: http://localhost:3000/auth/v2/login\n`);

  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

console.log(`
╔═══════════════════════════════════════╗
║   Update User Password Script         ║
╚═══════════════════════════════════════╝

Usage:
  npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/update-user-password.ts [username] [password]

Examples:
  npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/update-user-password.ts admin admin123
  npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/update-user-password.ts user@example.com newpass123
`);

main();
