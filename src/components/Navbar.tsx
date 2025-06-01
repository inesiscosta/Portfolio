"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Squeeze as HamburgerMenu } from "hamburger-react";
import ThemeToggle from "@/components/ThemeToggle";
import styles from "@/styles/components/Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/ines-costa-cv.pdf", label: "CV" },
  ];

const renderNavItems = () =>
  navItems.map(({ href, label }) => (
    <li key={href} className={styles.navItem}>
      {href.endsWith('.pdf') ? (
        <a
          href={href}
          className={styles.navLink}
          download
          onClick={() => isMobile && setIsMenuOpen(false)}
        >
          {label}
        </a>
      ) : (
        <Link
          href={href}
          className={`${styles.navLink} ${!isMobile && pathname === href ? styles.current : ""}`}
          onClick={() => isMobile && setIsMenuOpen(false)}
        >
          {label}
        </Link>
      )}
    </li>
  ));

  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY !== 0);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleScroll();
    handleResize();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    if (!isMenuOpen && window.scrollY !== 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const checkScroll = () => {
        if (window.scrollY === 0) {
          setIsMenuOpen(true);
          window.removeEventListener("scroll", checkScroll);
        }
      };
      window.addEventListener("scroll", checkScroll, { passive: true });
    } else {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  return (
    <nav className={`${styles.navbar} ${isSticky ? styles.sticky : ""}`}>
      {isMobile ? (
        // Mobile navbar
        <>
          <ThemeToggle/>
          <HamburgerMenu
            size={20}
            color="var(--foreground)"
            rounded
            label="Show Menu"
            toggle={toggleMenu}
            toggled={isMenuOpen}
            duration={0.8}
          />
          <div className={`${styles.menu} ${isMenuOpen ? styles.open : ""}`}>
            <ul>{renderNavItems()}</ul>
          </div>
        </>
      ) : (
        // Desktop navbar
        <>
          <ul className={styles.navItems}>{renderNavItems()}</ul>
          <ThemeToggle/>
        </>
      )}
    </nav>
  );
}
