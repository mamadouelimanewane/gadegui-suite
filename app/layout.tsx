import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gade Gui — Ecosystème Digital Agro-Industriel",
  description: "10 applications numériques pour Gade Gui Agro Industrial Park — Dakar, Sénégal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ minHeight: "100vh", background: "#020d07" }}>{children}</body>
    </html>
  );
}
