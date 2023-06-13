import Header from "@/components/Header/Header";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Theme } from "@/components/Theme";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

export const metadata = {
  title: "ThruAI",
  description: "By ThruAI team",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Theme>
          <Header />
          {children}
        </Theme>
      </body>
    </html>
  );
}
