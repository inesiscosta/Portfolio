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
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value || "";

  return (
    <html lang="en" className={theme === "dark" ? "dark" : theme === "light" ? "light" : ""}>
      <body>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
