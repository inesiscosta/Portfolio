import { cookies } from "next/headers";
import { ThemeProvider } from "@/utils/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/styles/globals.css";

export const metadata = {
  title: "Inês Costa",
  description: "Developer Portfolio",
};

export default async function Layout({ children }: { children: React.ReactNode }) {
  const themeCookie = (await cookies()).get("theme")?.value;
  const theme = themeCookie === "light" || themeCookie === "dark" ? themeCookie : undefined;

  return (
    <html lang="en" className={theme}>
      <body>
        <ThemeProvider initialTheme={theme}>
          <Navbar/>
          <main>{children}</main>
          <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
