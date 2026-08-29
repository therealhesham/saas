import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { ContactModalProvider } from "@/components/contact-modal-context";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: "روائس — منظومة منتجات تدير أعمالك بالكامل",
  description:
    "ستة منتجات سحابية متكاملة: إدارة العملاء، التحليلات، الأتمتة، الدعم، الفوترة، والموارد البشرية — بحساب واحد وبيانات موحّدة.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
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
      <body className="min-h-full flex flex-col">
        <ContactModalProvider>{children}</ContactModalProvider>
      </body>
    </html>
  );
}

