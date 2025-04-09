import Link from "next/link";
import DarkModeToggle from "@/components/ToggleTheme";

export default function Navbar() {
  return (
    <nav>
      <ul className="navbar">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/projects">Projects</Link></li>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
      <DarkModeToggle/>
    </nav>
  );
}
