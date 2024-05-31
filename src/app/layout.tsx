import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import ImageProvider from "@/providers/ImageProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SnapShare",
  description: "Effortlessly upload, share, and track your photos, sharing your memories with loved ones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <AuthProvider>
            <ImageProvider>
              {children}
              <Toaster />
            </ImageProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
