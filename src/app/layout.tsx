'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { useUIStore } from "@/store/useUIStore";
import { useEffect, useState } from "react";
import { clsx } from "clsx";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { theme, density } = useUIStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <html><body></body></html>;

  return (
    <html lang="en" className={theme}>
      <body 
        className={clsx(inter.className, "antialiased min-h-screen bg-bg-main overflow-hidden")}
        data-density={density}
      >
        {children}
      </body>
    </html>
  );
}