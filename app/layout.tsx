import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";

const montserrat = localFont({
  src: "./fonts/Montserrat-VariableFont_wght.ttf",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Otel Müşteri Kayıt Uygulaması",
  description: "Halime Gildan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${montserrat.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
