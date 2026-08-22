import type { Metadata } from "next";
import ThemeProvider from "@/component/theme-provider";
import AuthSessionProvider from "@/component/auth-session-provider";
import "./globals.css";
import Navbar from "@/component/navbar";
import Footer from "@/component/ui/footer";

export const metadata: Metadata = {
  title: "Chandogya Prodigies",
  description: "Gurukul-based skill development platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthSessionProvider>
          <ThemeProvider>
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
