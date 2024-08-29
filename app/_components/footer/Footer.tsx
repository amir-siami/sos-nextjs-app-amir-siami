import React from "react";
import styles from "./Footer.module.css"; // Assuming you want to use CSS Modules for styling

// Define an interface for the props, if you plan to pass any in the future
interface FooterProps {
  // Add any props you want to use here
}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>
          Iran SOS. All rights reserved. ©{new Date().getFullYear()}
        </p>
        <ul className={styles.socialLinks}>
          <li>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              فیسبوک
            </a>
          </li>
          <li>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              توییتر
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              لینکداین
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
