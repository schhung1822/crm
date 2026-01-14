const { execSync } = require('child_process');

// Only run prisma generate if DATABASE_URL is set
if (process.env.DATABASE_URL) {
  console.log('DATABASE_URL found, generating Prisma client...');
  try {
    execSync('prisma generate', { stdio: 'inherit' });
  } catch (error) {
    console.error('Failed to generate Prisma client:', error.message);
    process.exit(1);
  }
} else {
  console.log('DATABASE_URL not found, skipping Prisma generation. Set DATABASE_URL in your hosting environment variables.');
}
