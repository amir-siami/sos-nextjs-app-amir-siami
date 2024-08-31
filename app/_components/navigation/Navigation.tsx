"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation"; // Import useRouter and usePathname from next/navigation
import Links, { LinkItem } from "./links/Links";
import styles from "./Navigation.module.css";

// Define an interface for the props, if you plan to pass any in the future
interface NavbarProps {
  // Add any props you want to use here
}

const links: LinkItem[] = [
  { title: "صفحه اصلی", path: "/" },
  { title: "بلاگ", path: "/blog" },
  { title: "مراکز خدمات درمانی", path: "/center" },
  { title: "شعبه‌های ما", path: "/branch" },
  { title: "سوالات متداول", path: "/faq" },
  { title: "درباره ما", path: "/about" },
  { title: "ادمین", path: "/admin" },
];

const Navigation: React.FC<NavbarProps> = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Get the current pathname

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // Effect to close the mobile menu on route change
  useEffect(() => {
    // Close the mobile menu whenever the pathname changes
    setMobileMenuOpen(false);
  }, [pathname]); // Dependency array includes pathname

  return (
    <nav className={styles.navbar}>
      {/* Hamburger Icon for Mobile */}
      <div
        className={`${styles.hamburger} ${isMobileMenuOpen ? "open" : ""}`}
        onClick={toggleMobileMenu}
      >
        <div className={styles["hamburger-icon"]}></div>
        <div className={styles["hamburger-icon"]}></div>
        <div className={styles["hamburger-icon"]}></div>
      </div>

      {/* Overlay */}
      <div
        className={`${styles.overlay} ${isMobileMenuOpen ? styles.active : ""}`}
        onClick={toggleMobileMenu}
      ></div>

      {/* Navigation Menu */}
      <ul className={`${isMobileMenuOpen ? styles.active : ""}`}>
        <Links links={links} />
      </ul>
    </nav>
  );
};

export default Navigation;
