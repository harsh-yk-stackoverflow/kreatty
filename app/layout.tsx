import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kreatty — Creator partnerships, made meaningful",
  description:
    "Kreatty connects ambitious brands with the creators who move culture. Thoughtful partnerships, beautifully managed campaigns.",
  applicationName: "Kreatty",
  openGraph: {
    title: "Kreatty — Creator partnerships, made meaningful",
    description:
      "A creator-first influencer marketing agency building partnerships that feel right and deliver more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
