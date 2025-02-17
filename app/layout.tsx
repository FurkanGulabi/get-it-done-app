import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import ThemeProvider from "@/components/providers/theme-provider";
import Header from "@/components/Header";
import { SessionProvider } from "@/components/providers/session-provider";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/components/providers/react-query-provider";

const font = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "Get It Done",
  description: "Task management made easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen antialiased", font.variable)}>
        <ReactQueryProvider>
          <ThemeProvider>
            <SessionProvider>
              <Header />
              {children}
              <Toaster />
            </SessionProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
