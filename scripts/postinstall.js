const { execSync } = require("child_process");

// Always run prisma generate for build
console.log("Generating Prisma client...");
try {
  // Use a dummy DATABASE_URL if not set, just for generation
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = "postgresql://dummy:dummy@localhost:5432/dummy";
    console.log("No DATABASE_URL found, using dummy URL for client generation");
  }
  execSync("prisma generate", { stdio: "inherit" });
  console.log("Prisma client generated successfully");
} catch (error) {
  console.error("Failed to generate Prisma client:", error.message);
  process.exit(1);
}
