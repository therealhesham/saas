import { randomBytes, scryptSync } from "node:crypto";

const password = process.argv[2];

if (!password) {
  console.error("الاستخدام: npm run admin:password -- \"الباسورد الجديد\"");
  process.exit(1);
}

if (password.length < 8) {
  console.error("الباسورد لازم يكون 8 حروف على الأقل");
  process.exit(1);
}

const salt = randomBytes(16).toString("hex");
const derived = scryptSync(password, salt, 32).toString("hex");

console.log("\nحط السطر ده في ملف .env:\n");
console.log(`ADMIN_PASSWORD_HASH="${salt}:${derived}"\n`);
