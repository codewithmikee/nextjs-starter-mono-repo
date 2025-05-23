import '@shared/src/ui/globals.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@shared/globals.css";
import { cn } from "@shared/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShadcnUI Components Showcase",
  description: "A showcase of all shadcnui components from the shared package",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <div className="relative flex min-h-screen flex-col">
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
