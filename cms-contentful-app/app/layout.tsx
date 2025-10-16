import "./globals.css";
import ApplyHtmlClass from "./components/ApplyHtmlClass";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Aplica a classe variável apenas no cliente para evitar mismatch */}
        <ApplyHtmlClass className={inter.variable} />
        <section className="min-h-screen">
          <main>{children}</main>
        </section>
      </body>
    </html>
  );
}