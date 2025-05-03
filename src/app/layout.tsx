import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/styles/globals.css";

export const metadata = {
  title: "Inês Costa",
  description: "Developer Portfolio",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      <ThemeProvider>
        <Navbar/>
        <main>{children}</main>
        <Footer/>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
