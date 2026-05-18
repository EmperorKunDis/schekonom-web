import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth/context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SCH-EKONOM — Pokročilé finanční poradenství",
  description:
    "Důvěryhodný partner pro daňové poradenství, účetnictví a mzdovou agendu. Cheb a region. AI-podpořená analýza.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
