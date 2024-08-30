import React from "react";

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

// Functional component with React.FC type and optional NavbarProps
const Navigation: React.FC<NavbarProps> = () => {
  return (
    <nav className={styles.navbar}>
      <ul className="flex gap-16 items-center">
        <Links links={links} />
      </ul>
    </nav>
  );
};

export default Navigation;
