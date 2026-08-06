# روائس — الموقع التعريفي

موقع عربي RTL مبني على Next.js 16 + Tailwind v4 + Prisma + MySQL.
المنتجات المعروضة في الصفحة الرئيسية بتتدار من لوحة تحكم محمية.

## التشغيل السريع

```bash
cp .env.example .env       # وحط رابط قاعدة البيانات
npm install
npm run db:check           # يتأكد إن الاتصال شغال
npm run db:deploy          # ينشئ الجداول
npm run db:seed            # يدخّل المنتجات الأساسية
npm run dev
```

- الموقع: `http://localhost:3000`
- لوحة التحكم: `http://localhost:3000/admin`

## قاعدة البيانات

الكود مش مرتبط بمكان قاعدة البيانات — الفرق كله في `DATABASE_URL`.

### قاعدة بيانات خارجية (الوضع المستهدف)

بدّل `DATABASE_URL` في `.env` لرابط الاستضافة، اتأكد إن الاتصال شغال، وبعدين
طبّق المايجريشنز:

```bash
npm run db:check     # بيتأكد من الاتصال ويشخّص المشكلة لو فشل
npm run db:deploy    # بيعمل الجداول
npm run db:seed      # اختياري — بيدخل المنتجات الأساسية
```

استخدم `db:deploy` **مش** `db:migrate` على قاعدة خارجية. السبب إن
`prisma migrate dev` بيعمل داتابيز مؤقتة (shadow database) عشان يقارن
المايجريشنز، وأغلب الاستضافات المُدارة مابتديش صلاحية إنشاء داتابيز.
أما `migrate deploy` فبيطبّق ملفات المايجريشن الجاهزة على طول من غير
ما يحتاج الصلاحية دي.

نقاط مهمة في رابط الاتصال الخارجي:

| الحالة | الحل |
|---|---|
| الاستضافة بتفرض SSL | ضيف `?sslaccept=strict` في آخر الرابط |
| شهادة self-signed | `?sslaccept=accept_invalid_certs` |
| الباسورد فيه `@ : / ? #` | اعملهم URL-encode (`@` تبقى `%40`) |
| الاتصال بيترفض | اسمح للـ IP بتاع السيرفر في firewall الاستضافة |

> `next build` بيولّد الصفحة الرئيسية ساعة البناء، يعني لازم قاعدة البيانات
> تكون شغالة ومتاحة وقت البناء مش وقت التشغيل بس.

## لوحة التحكم

محمية بباسورد واحد. الجلسة كوكي `HttpOnly` موقّعة بـ HMAC، والحماية على
طبقتين: `proxy.ts` بيمنع الوصول للصفحات، وكل Server Action بينادي
`requireAdmin()` بنفسه — لأن الـ Server Actions ممكن تتنادى بـ POST مباشر
من غير ما تعدّي على الصفحة أصلاً.

لتغيير الباسورد:

```bash
npm run admin:password -- "الباسورد الجديد"
# وحط السطر الناتج في .env
```

قبل أي نشر حقيقي **لازم** تغيّر `AUTH_SECRET` لقيمة عشوائية:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## صورة اللاب توب في الهيرو

حط الصورة في `public/screenshots/hero.png` (أو `.jpg` / `.webp`) وهتظهر
تلقائياً من غير تعديل كود. لو الملف مش موجود بتتعرض واجهة بديلة مرسومة
بالـ HTML. التفاصيل في `public/screenshots/README.md`.

## التشغيل بالدوكر

```bash
npm run docker:build     # يبني الصورة
npm run docker:run       # يشغّلها على http://localhost:3000
npm run docker:logs      # يتابع السجلات
npm run docker:stop      # يوقّفها
```

الصورة multi-stage وبتستخدم `output: "standalone"`، يعني بتاخد بس الملفات
المطلوبة للتشغيل مش `node_modules` كلها. وبتشتغل بمستخدم `nextjs` مش root.

**الأسرار وقت التشغيل:** `DATABASE_URL` و `AUTH_SECRET` و `ADMIN_PASSWORD_HASH`
بتتمرّر بـ `--env-file .env`، فمش متخبّية جوه الصورة. و `.dockerignore` بيمنع
`.env` من دخول الـ build context أصلاً.

**البناء مش محتاج قاعدة بيانات.** الصفحة الرئيسية `dynamic` (بتترسم مع كل
طلب)، فـ `next build` مابيستعلمش من الداتابيز خالص. يعني تقدر تبني الصورة في
CI أو على أي جهاز مش شايف الداتابيز. الـ `--secret` في الـ Dockerfile اختياري
(`required=false`) وموجود لو احتجت متغيّر وقت البناء لاحقاً — وهو `--secret`
مش `ARG` عشان ما يتسجّلش في طبقات الصورة ولا في `docker history`.

**تضيف سكرين شوت من غير إعادة بناء:** مجلد `public/screenshots` متعمله mount
كـ volume، فتحط الصورة وتعمل `npm run docker:stop && npm run docker:run`.

**لو حبيت تبني يدوي** من غير السكربت:

```bash
docker build -t rawaes-site .
```

**لو الداتابيز وقعت وقت التشغيل** الصفحة بترجع 200 عادي، بس سكشن المنتجات
وعدّادها بيتخفوا والخطأ بيتسجّل في اللوج — مش بتطلع صفحة 500.

### مهم: `ALLOWED_ORIGINS` وراء reverse proxy

لو لوحة الأدمن طلّعت **"This page couldn't load. A server error occurred."**
فالسبب شبه المؤكد إن الدومين مش مضاف في `ALLOWED_ORIGINS`.

Next بيعمل فحص CSRF على الـ Server Actions بيقارن هيدر `Origin` بالـ
`x-forwarded-host` الجاي من الـ proxy. لو مختلفوا بيلغي الـ action ويطلّع
الرسالة دي. الحل تحط دوميناتك في `.env`:

```bash
ALLOWED_ORIGINS="rawaes.com,www.rawaes.com"
```

> بيتقري وقت **البناء** مش وقت التشغيل — أي تغيير فيه محتاج إعادة بناء الصورة.
> `npm run docker:build` بيمرّره تلقائياً وبيحذّرك لو فاضي.

### الكوكي على HTTP

كوكي الجلسة بتبقى `Secure` حسب بروتوكول الطلب الفعلي (`x-forwarded-proto`)
مش حسب `NODE_ENV`. يعني بتشتغل على HTTP دلوقتي وبتترفّع لـ Secure أوتوماتيك
لما تنقل لـ HTTPS من غير أي تعديل. تقدر تفرضها بـ `COOKIE_SECURE=true|false`.

> البناء محتاج حوالي **2GB** مساحة فاضية. لو طلع `ENOSPC` شوف `df -h /`.

## أوامر مفيدة

| الأمر | الوظيفة |
|---|---|
| `npm run db:check` | فحص الاتصال بقاعدة البيانات وتشخيص أسباب الفشل |
| `npm run db:studio` | واجهة Prisma لتصفح البيانات |
| `npm run db:seed` | إدخال المنتجات الأساسية (بـ upsert، آمن التكرار) |
| `npm run db:deploy` | تطبيق المايجريشنز على قاعدة خارجية |

## ملاحظات تقنية

- **Node.js**: Prisma 6 مستخدم بدل 7 لأن 7 محتاج Node ‏20.19+ والجهاز على 20.18.
  لو رفّعت Node تقدر ترفّع Prisma.
- **`proxy.ts`**: في Next.js 16 اتغيّر اسم `middleware` لـ `proxy` والـ runtime
  بقى nodejs دايماً.
- **الأيقونات**: من `lucide-react` و `react-icons` بس. أسماء الأيقونات
  المخزّنة في الداتابيز بتتحوّل لمكوّنات عبر allowlist في `lib/product-icons.ts`
  عشان محدش يقدر يحقن اسم عشوائي من اللوحة.
