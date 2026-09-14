import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scry AI — Evidence before execution",
  description: "AI research desk for tokenized US stocks.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
