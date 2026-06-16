import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Algoritma Perencanaan Hidup",
  description: "Perencanaan hidup komprehensif berbasis Computational Thinking dan nilai-nilai Islam.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: { url: "/apple-icon.png", sizes: "180x180" },
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" id="html-root">
      <body className={`${inter.variable} ${poppins.variable} antialiased min-h-screen flex flex-col`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
