const translations = {
  en: {
    "nav.home": "Home",
    "nav.blog": "Blog",
    "nav.football": "Football",
    "nav.cricket": "Cricket",
    "nav.analysis": "Analysis",
    "nav.gallery": "Gallery",
    "nav.about": "About",
    "nav.contact": "Contact",

    "hero.since": "Since 1987",
    "hero.headline": "Expert Football & Cricket Journalism",
    "hero.subheadline":
      "Authoritative match reports, tactical analysis, and insider commentary from William Powell — FWA Life Member.",
    "hero.cta": "Read the full preview",

    "blog.title": "Blog",
    "blog.subtitle": "All articles by William Powell.",
    "blog.readMore": "Read full article",
    "blog.noArticles": "No articles found.",
    "blog.search": "Search articles...",
    "blog.readMoreArrow": "Read more",

    "gallery.title": "Gallery",

    "category.all": "All",
    "category.football": "Football",
    "category.cricket": "Cricket",
    "category.analysis": "Analysis",

    "football.title": "Football",
    "football.subtitle": "Premier League, EFL, and international football coverage.",
    "cricket.title": "Cricket",
    "cricket.subtitle": "County Championship, Test cricket, and international coverage.",
    "analysis.title": "Analysis",
    "analysis.subtitle": "In-depth tactical analysis and expert commentary.",

    "latest": "Latest Articles",
    "related": "Related Articles",
    "minRead": "min read",

    "newsletter.title": "Stay in the Game",
    "newsletter.subtitle": "Get William's latest articles delivered to your inbox.",
    "newsletter.placeholder": "your@email.com",
    "newsletter.button": "Subscribe",
    "newsletter.thanks": "Thanks for subscribing!",

    "footer.tagline":
      "Expert football and cricket journalism by William Powell, FWA Life Member and sports writer since 1987.",
    "footer.navigation": "Navigation",
    "footer.connect": "Connect",
    "footer.press": "Press enquiries welcome.",
    "footer.getInTouch": "Get in touch",
    "footer.copyright": "CUVA Sports. All rights reserved.",

    "filter.sort": "Sort:",
    "filter.newest": "Newest",
    "filter.oldest": "Oldest",
    "filter.noResults": "No match reports found for this filter.",
  },
  ur: {
    "nav.home": "ہوم",
    "nav.blog": "بلاگ",
    "nav.football": "فٹ بال",
    "nav.cricket": "کرکٹ",
    "nav.analysis": "تجزیہ",
    "nav.gallery": "گیلری",
    "nav.about": "ہمارے بارے میں",
    "nav.contact": "رابطہ",

    "hero.since": "1987 سے",
    "hero.headline": "ماہر فٹ بال اور کرکٹ صحافت",
    "hero.subheadline":
      "ولیم پاول کی مستند میچ رپورٹس، تکنیکی تجزیہ، اور اندرونی تبصرہ — FWA لائف ممبر۔",
    "hero.cta": "مکمل پیش نظارہ پڑھیں",

    "blog.title": "بلاگ",
    "blog.subtitle": "ولیم پاول کے تمام مضامین۔",
    "blog.readMore": "مکمل مضمون پڑھیں",
    "blog.noArticles": "کوئی مضمون نہیں ملا۔",
    "blog.search": "مضامین تلاش کریں...",
    "blog.readMoreArrow": "مزید پڑھیں",

    "gallery.title": "گیلری",

    "category.all": "سب",
    "category.football": "فٹ بال",
    "category.cricket": "کرکٹ",
    "category.analysis": "تجزیہ",

    "football.title": "فٹ بال",
    "football.subtitle": "پریمیئر لیگ، ای ایف ایل، اور بین الاقوامی فٹ بال کوریج۔",
    "cricket.title": "کرکٹ",
    "cricket.subtitle": "کاؤنٹی چیمپئن شپ، ٹیسٹ کرکٹ، اور بین الاقوامی کوریج۔",
    "analysis.title": "تجزیہ",
    "analysis.subtitle": "گہرا تکنیکی تجزیہ اور ماہر تبصرہ۔",

    "latest": "تازہ ترین مضامین",
    "related": "متعلقہ مضامین",
    "minRead": "منٹ پڑھیں",

    "newsletter.title": "کھیل سے جڑے رہیں",
    "newsletter.subtitle": "ولیم کے تازہ ترین مضامین اپنے ان باکس میں حاصل کریں۔",
    "newsletter.placeholder": "آپ کی ای میل",
    "newsletter.button": "سبسکرائب کریں",
    "newsletter.thanks": "سبسکرائب کرنے کا شکریہ!",

    "footer.tagline":
      "ولیم پاول کی ماہر فٹ بال اور کرکٹ صحافت، FWA لائف ممبر اور 1987 سے کھیل کے مصنف۔",
    "footer.navigation": "نیویگیشن",
    "footer.connect": "رابطہ کریں",
    "footer.press": "پریس استفسارات خوش آمدید۔",
    "footer.getInTouch": "رابطہ کریں",
    "footer.copyright": "کووا سپورٹس۔ جملہ حقوق محفوظ ہیں۔",

    "filter.sort": "ترتیب:",
    "filter.newest": "تازہ ترین",
    "filter.oldest": "پرانے",
    "filter.noResults": "اس فلٹر کے لیے کوئی میچ رپورٹ نہیں ملی۔",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
export type Lang = "en" | "ur";

export function getTranslation(lang: Lang, key: TranslationKey): string {
  return translations[lang][key] || translations.en[key] || key;
}

export default translations;
