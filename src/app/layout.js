import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MY SHIRT",
  description: "3d-project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body 
        className={inter.className}>
        {children}
        </body>
    </html>
  );
}
