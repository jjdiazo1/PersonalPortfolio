'use client'

interface LanguageCardProps {
  lang: string;
  level: string;
  darkMode: boolean;
}

export default function LanguageCard({ lang, level, darkMode }: LanguageCardProps) {
  const borderClass = darkMode ? 'border-gray-800' : 'border-gray-200';
  return (
    <div className={`border ${borderClass} p-6 rounded-lg hover:scale-[1.05] transition-transform flex flex-col items-center justify-center h-40`}>
      <h3 className="font-bold text-xl uppercase text-center mb-2">{lang}</h3>
      <p className="text-sm uppercase font-light text-center">{level}</p>
    </div>
  );
}
