import { Navbar } from "@/features/shared/components/navbar";
import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/features/shared/components/theme-provider";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.className} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}

        </ThemeProvider>
      </body>
    </html>
  );
}
