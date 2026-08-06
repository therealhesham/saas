-- Prisma Migrate بيعمل "shadow database" مؤقتة عشان يحسب الفرق بين المايجريشنز.
-- من غير الصلاحية دي بيفشل بخطأ P3014 / P1010.
-- الصلاحية محدودة على أسماء الشادو داتابيز بس، مش على كل السيرفر.
GRANT ALL PRIVILEGES ON `prisma_migrate_shadow_db%`.* TO 'rawaes'@'%';
FLUSH PRIVILEGES;
