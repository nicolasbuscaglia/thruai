import Header from "@/components/Header/Header";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Theme } from "@/components/Theme";
import { MainContainer } from "@/components/MainContainer";
import { Providers } from "@/redux/provider";
import { GoogleAuthProviders } from "@/auth/GoogleAuthProvider";
import { AuthProvider } from "@/components/Auth/AuthProvider";
import { FilesProvider } from "@/context/FilesContext";
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
            <AuthProvider>
              <FilesProvider>
                <Theme>
                  <Header />
                  <MainContainer>{children}</MainContainer>
                </Theme>
              </FilesProvider>
            </AuthProvider>
          </Providers>
        </GoogleAuthProviders>
      </body>
    </html>
  );
}
