import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Magic Travel",
  description: "ERP/CRM para agência de viagens"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
