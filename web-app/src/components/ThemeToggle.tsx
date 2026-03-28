"use client";

import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initialize: site defaults to dark
    const html = document.documentElement;
    if (!html.classList.contains("light")) {
      html.classList.add("dark");
      html.classList.remove("light");
    } else {
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      html.classList.add("dark");
      html.classList.remove("light");
    } else {
      html.classList.remove("dark");
      html.classList.add("light");
    }
  };

  if (!mounted) return <div className="w-[70px] h-[37px] opacity-0" />;

  return (
    <label className={styles.bb8_toggle} title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}>
      <input
        className={styles.bb8_toggle__checkbox}
        type="checkbox"
        checked={isDark}
        onChange={toggleTheme}
      />
      <div className={styles.bb8_toggle__container}>
        <div className={styles.bb8_toggle__scenery}>
          <div className={styles.bb8_toggle__star}></div>
          <div className={styles.bb8_toggle__star}></div>
          <div className={styles.bb8_toggle__star}></div>
          <div className={styles.bb8_toggle__star}></div>
          <div className={styles.bb8_toggle__star}></div>
          <div className={styles.bb8_toggle__star}></div>
          <div className={styles.bb8_toggle__star}></div>
          <div className={styles.tatto_1}></div>
          <div className={styles.tatto_2}></div>
          <div className={styles.gomrassen}></div>
          <div className={styles.hermes}></div>
          <div className={styles.chenini}></div>
          <div className={styles.bb8_toggle__cloud}></div>
          <div className={styles.bb8_toggle__cloud}></div>
          <div className={styles.bb8_toggle__cloud}></div>
        </div>
        <div className={styles.bb8}>
          <div className={styles.bb8__head_container}>
            <div className={styles.bb8__antenna}></div>
            <div className={styles.bb8__antenna}></div>
            <div className={styles.bb8__head}></div>
          </div>
          <div className={styles.bb8__body}></div>
        </div>
        <div className={styles.artificial__hidden}>
          <div className={styles.bb8__shadow}></div>
        </div>
      </div>
    </label>
  );
}
