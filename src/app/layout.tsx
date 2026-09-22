import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sean's List",
  description: "A classifieds platform where listings are public and anonymized.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
