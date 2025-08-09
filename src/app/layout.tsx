import type { Metadata } from "next";
import { Montserrat, Fira_Code } from "next/font/google";
import "./globals.css";
import { ResponseLogger } from "@/components/response-logger";
import { cookies } from "next/headers";

// Montserrat replaces Geist Sans
const geistSans = Montserrat({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Fira Code replaces Geist Mono
const geistMono = Fira_Code({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DataClean Pro • Midnight Edition",
  description:
    "Professional data cleaning and quality assurance platform designed for enterprise excellence. Transform datasets with sophisticated analytics and refined precision.",
  other: {
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl:
        "https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/thumbnail_62c5da61-f4fa-4705-9a2b-6580a7193d06-Ladw0WRhCAnGLY0erFFnBpIP36Uf4x",
      button: {
        title: "Open with Ohara",
        action: {
          type: "launch_frame",
          name: "DataClean Pro • Midnight Edition",
          url: "https://automobile-high-536.preview.series.engineering",
          splashImageUrl:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/9756b3248bdd48d596519e7d98958e9df5588654dadf0bb17a71fc435bcb37b3?placeholderIfAbsent=true&apiKey=ad3941e5ec034c87bd50708c966e7b84",
          splashBackgroundColor: "#0B0F2A",
        },
      },
    }),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const requestId = cookies().get("x-request-id")?.value;

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {requestId && <meta name="x-request-id" content={requestId} />}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body
        className="antialiased font-elegant-sans"
        style={{
          background: "#0B0F2A",
          color: "#FFFFFF",
          fontFamily: "var(--font-geist-sans), Montserrat, Inter, sans-serif",
        }}
      >
        {children}
        <ResponseLogger />
      </body>
    </html>
  );
}
