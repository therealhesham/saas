# syntax=docker/dockerfile:1

# ملاحظة: Next.js 16 محتاج Node 20.9 على الأقل.
# openssl مطلوب لمحرّك Prisma على Alpine، و libc6-compat لبعض الحزم الأصلية.
FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat openssl


# ---------- 1) الاعتماديات ----------
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# schema لازم يكون موجود لأن @prisma/client بيشغّل generate في postinstall
COPY prisma ./prisma
RUN npm ci


# ---------- 2) البناء ----------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# بيتولّد جوه الكونتينر عشان يطلع بمحرّك musl الصح بتاع Alpine
RUN npx prisma generate

# الصفحة الرئيسية بتتولّد وقت البناء وبتقرأ المنتجات من الداتابيز،
# فالرابط لازم يكون متاح هنا. بنمرّره كـ secret مش ARG عشان ما يتسجّلش
# في طبقات الصورة ولا في docker history.
RUN --mount=type=secret,id=database_url \
    DATABASE_URL="$(cat /run/secrets/database_url)" \
    npm run build


# ---------- 3) التشغيل ----------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# بيوقّف تجميع بيانات الاستخدام اللي Next بيبعتها
ENV NEXT_TELEMETRY_DISABLED=1

# مستخدم غير root — لو حصل اختراق ميبقاش معاه صلاحيات كاملة
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# public لازم تتنسخ يدوي — سيرفر standalone مابيضمّهاش تلقائياً.
# ومهمة هنا بالذات لأن lib/screenshots.ts بيقرأ public/screenshots وقت التشغيل.
COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
