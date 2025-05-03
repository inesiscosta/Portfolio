"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Squeeze as HamburgerMenu } from "hamburger-react";
import ThemeToggle from "@/components/ThemeToggle";
import styles from "@/styles/components/Navbar.module.css";

const Navbar = () => {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];
  
  const pathname = usePathname();
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 50);
    const handleResize = () => setIsMobile(!window.matchMedia("(min-width: 768px)").matches);
    
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    handleResize();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    if (!isMenuOpen) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setTimeout(() => setIsMenuOpen((prev) => !prev), 400);
    } else {
      setIsMenuOpen((prev) => !prev);
    }
  };

  const renderNavItems = () => navItems.map(({ href, label }) => (
    <li key={href} className={styles["nav-item"]}>
      <Link href={href} className={`${pathname === href ? styles.active : ""}`} onClick={() => isMobile && setIsMenuOpen(false)}>
        {label}
      </Link>
    </li>
  ));

  return (
    <nav className={`${styles.navbar} ${isSticky ? styles.sticky : ""}`}>
      {isMobile ? (
        <>
          <ThemeToggle/>
          <HamburgerMenu toggled={isMenuOpen} toggle={toggleMenu} size={20} rounded label="Show Menu" color="var(--foreground)" duration={0.8}/>
          <div className={`${styles["hamburger-menu-container"]} ${isMenuOpen ? styles.active : ""}`}>
            <ul>{renderNavItems()}</ul>
          </div>
        </>
      ) : (
        <>
          <ul className={styles["nav-headers"]}>{renderNavItems()}</ul>
          <ThemeToggle/>
        </>
      )}
    </nav>
  );
};

export default Navbar;
