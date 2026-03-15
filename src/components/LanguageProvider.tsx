"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { LanguageContext } from "@/lib/LanguageContext";
import { Lang, getTranslation, TranslationKey } from "@/lib/translations";

export default function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem("cuva-lang") as Lang | null;
    if (stored === "en" || stored === "ur") {
      setLangState(stored);
      document.documentElement.lang = stored;
      document.documentElement.dir = stored === "ur" ? "rtl" : "ltr";
    }
  }, []);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("cuva-lang", newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === "ur" ? "rtl" : "ltr";
  }, []);

  const t = useCallback(
    (key: TranslationKey) => getTranslation(lang, key),
    [lang]
  );

  const value = useMemo(
    () => ({ lang, setLang, t, isRtl: lang === "ur" }),
    [lang, setLang, t]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}
