import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
const manrope = localFont({
  src: "../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
});
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      "https://matheus-sathler-portfolio.matheus-sathler2020.chatgpt.site",
  ),
  title: {
    default: "Matheus Sathler — Desenvolvimento & Tecnologia",
    template: "%s | Matheus Sathler",
  },
  description:
    "Portfólio de Matheus Sathler. Desenvolvedor em formação em Guarujá, SP. Projetos, aprendizado e uma trajetória em construção na tecnologia.",
  openGraph: {
    title: "Matheus Sathler — Ideias em soluções digitais",
    description:
      "Desenvolvimento de sistemas, aprendizado contínuo e projetos com propósito.",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Matheus Sathler — Portfólio",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  icons: { icon: "/logo.svg" },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#111312" };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={manrope.variable}>{children}</body>
    </html>
  );
}
