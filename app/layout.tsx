import Navbar from "./components/Navbar";
import "./globals.css";
import SplashWrapper from "@/app/components/SplashWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <SplashWrapper>{children}</SplashWrapper>
      </body>
    </html>
  );
}
