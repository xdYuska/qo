"use client";

import { useEffect, useState } from "react";

const LANGUAGES = [
  { code: "en", label: "ENG" },
  { code: "az", label: "AZ" },
  { code: "ru", label: "RU" },
  { code: "tr", label: "TR" },
];

export default function LanguageSelector({
  className = "",
}: {
  className?: string;
}) {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const stored = localStorage.getItem("language");
    if (stored) setLanguage(stored);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setLanguage(value);
    localStorage.setItem("language", value);
    // TODO: hook this up to real translations once i18n is wired up.
  }

  return (
    <select
      value={language}
      onChange={handleChange}
      aria-label="Select language"
      className={`border rounded-md text-sm px-2 py-1.5 bg-transparent ${className}`}
    >
      {LANGUAGES.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}