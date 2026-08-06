/**
 * بناء صورة الدوكر مع تمرير DATABASE_URL كـ build secret.
 *
 * بيتشغّل بـ `node --env-file=.env` فالرابط بيوصل كمتغيّر بيئة، وdocker بياخده
 * من البيئة مباشرة (env=) — فمش بيتكتب على القرص ولا بيظهر في سطر الأوامر
 * ولا بيتسجّل في docker history.
 */
import { spawnSync } from "node:child_process";

const tag = process.argv[2] ?? "rawaes-site";

if (!process.env.DATABASE_URL) {
  console.error("✗ DATABASE_URL مش موجود. اتأكد إن .env فيه السطر ده.");
  process.exit(1);
}

console.log(`بناء الصورة: ${tag}\n`);

const result = spawnSync(
  "docker",
  [
    "build",
    "--secret",
    "id=database_url,env=DATABASE_URL",
    "-t",
    tag,
    ".",
  ],
  { stdio: "inherit" },
);

if (result.error) {
  console.error(`\n✗ ${result.error.message}`);
  process.exit(1);
}

if (result.status !== 0) {
  console.error("\n✗ البناء فشل.");
  console.error("  لو الخطأ ENOSPC يبقى مساحة القرص خلصت — البناء محتاج ~2GB.");
  console.error("  شوف المتاح بـ: df -h /");
  process.exit(result.status ?? 1);
}

console.log(`\n✓ الصورة ${tag} اتبنت.`);
console.log("  شغّلها بـ: npm run docker:run");
