"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-yellow-100/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-yellow-200/50 hover:shadow-xl transition-all duration-300">
        <div className="flex gap-2">
          <button
            onClick={() => switchLocale("en")}
            className={`p-2 rounded-full transition-all duration-300 ${
              locale === "en"
                ? "bg-yellow-400/80 scale-110"
                : "hover:bg-yellow-200/50"
            }`}
            title="Switch to English"
          >
            🇬🇧
          </button>
          <button
            onClick={() => switchLocale("hr")}
            className={`p-2 rounded-full transition-all duration-300 ${
              locale === "hr"
                ? "bg-yellow-400/80 scale-110"
                : "hover:bg-yellow-200/50"
            }`}
            title="Switch to Croatian"
          >
            🇭🇷
          </button>
        </div>
      </div>
    </div>
  );
}
