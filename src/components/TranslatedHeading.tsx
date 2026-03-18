"use client";

import { useLanguage } from "@/lib/LanguageContext";
import { TranslationKey } from "@/lib/translations";

interface TranslatedHeadingProps {
  titleKey: TranslationKey;
  subtitleKey?: TranslationKey;
  as?: "h1" | "h2";
}

export default function TranslatedHeading({
  titleKey,
  subtitleKey,
  as: Tag = "h1",
}: TranslatedHeadingProps) {
  const { t } = useLanguage();

  return (
    <>
      <Tag className={`font-heading font-bold text-navy mb-2 ${Tag === "h1" ? "text-5xl" : "text-3xl"}`}>
        {t(titleKey)}
      </Tag>
      {Tag === "h1" && <div className="h-1 bg-gold mb-4 w-0 animate-[growWidth_0.6s_ease-out_forwards]" />}
      {subtitleKey && (
        <p className="text-gray-500 mb-8">{t(subtitleKey)}</p>
      )}
    </>
  );
}
