import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      <div>
        <Navbar />
          <main>{children}</main>
        <Footer />
      </div>
    </body>
  </html>
);

export default Layout;
