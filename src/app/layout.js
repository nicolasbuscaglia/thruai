import Header from "@/components/Header/Header";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Theme } from "@/components/Theme";
import { MainContainer } from "@/components/MainContainer";
import { Providers } from "@/redux/provider";
import { GoogleAuthProviders } from "@/auth/GoogleAuthProvider";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

export const metadata = {
  title: "ThruAi",
  description: "By ThruAi team",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <GoogleAuthProviders>
          <Providers>
            <Theme>
              <Header />
              <MainContainer>{children}</MainContainer>
            </Theme>
          </Providers>
        </GoogleAuthProviders>
      </body>
    </html>
  );
}
