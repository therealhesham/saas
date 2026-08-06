import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: "روائس — منظومة منتجات تدير أعمالك بالكامل",
  description:
    "ستة منتجات سحابية متكاملة: إدارة العملاء، التحليلات، الأتمتة، الدعم، الفوترة، والموارد البشرية — بحساب واحد وبيانات موحّدة.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
