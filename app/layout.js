import { Geist, Geist_Mono } from "next/font/google";
import { Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  variable: "--font-urdu",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Mufti Habibullah Qasmi - Islamic Scholar",
  description:
    "Official website of Mufti Habibullah Qasmi - Islamic scholar, researcher, and spiritual guide",
  authors: [{ name: "Musab Hassan" }],
  icon: {
    icon: "/favicon.ico",
  },
  keywords: [
    "Mufti Habibullah Qasmi",
    "Islamic Scholar",
    "Islamic Researcher",
    "Spiritual Guide",
    "Islamic Teachings",
    "Fatwas",
    "Islamic Articles",
    "Islamic Lectures",
    "Islamic Website",
    "Islamic Knowledge",
    "Islamic Guidance",
  ],

  openGraph: {
    title: "Mufti Habibullah Qasmi - Islamic Scholar",
    description:
      "Official website of Mufti Habibullah Qasmi - Islamic scholar, researcher, and spiritual guide",
    url: "https://www.habibulummat.com",
    siteName: "Mufti Habibullah Qasmi",
    alternates: {
      canonical: "https://www.habibulummat.com/en",
    },
    images: [
      {
        url: "https://www.habibulummat.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mufti Habibullah Qasmi - Islamic Scholar",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} ${notoNastaliqUrdu.variable} antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
