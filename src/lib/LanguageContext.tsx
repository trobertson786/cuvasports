"use client";

import { createContext, useContext } from "react";
import { Lang, TranslationKey, getTranslation } from "./translations";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
  isRtl: boolean;
}

export const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => getTranslation("en", key),
  isRtl: false,
});

export function useLanguage() {
  return useContext(LanguageContext);
}
