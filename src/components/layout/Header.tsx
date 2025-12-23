"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import styles from "./Header.module.css";
import { useContent } from "../../hooks/useContent"; // adatta il path reale

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { content } = useContent("header");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { path: "/", label: content.menu_home || "Home" },
    { path: "/chi-siamo", label: content.menu_chisiamo || "Chi Siamo" },
    { path: "/servizi", label: content.menu_servizi || "Servizi" },
    { path: "/contatti", label: content.menu_contatti || "Contatti" },
  ];

  // qui rimetti il tuo JSX completo, usando solo `content.*` e `menuItems`
  // importante: nessun .forEach / fetch dentro Header
}
