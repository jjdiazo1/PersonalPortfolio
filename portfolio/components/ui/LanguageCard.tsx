'use client'

interface LanguageCardProps {
  lang: string;
  level: string;
  darkMode: boolean;
}

const levelMap: Record<string, number> = {
  A1: 25,
  A2: 40,
  B1: 55,
  B2: 70,
  C1: 85,
  Native: 100
};

const flagMap: Record<string, string> = {
  English: '🇬🇧',
  Spanish: '🇪🇸',
  French: '🇫🇷',
  Japanese: '🇯🇵'
};

export default function LanguageCard({ lang, level, darkMode }: LanguageCardProps) {
  const progress = levelMap[level] || 0;
  const flag = flagMap[lang] || '🏳️';
  const borderClass = darkMode ? 'border-gray-800' : 'border-gray-200';
  const bgClass = darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900';
  const barBg = darkMode ? 'bg-gray-700' : 'bg-gray-200';
  const progressColor = darkMode ? 'bg-green-500' : 'bg-blue-500';

  return (
    <div
      className={`border ${borderClass} ${bgClass} p-6 rounded-lg hover:scale-105 transition-transform flex flex-col items-center justify-between h-44 shadow-md`}
    >
      <div className="text-3xl mb-2">{flag}</div>
      <div className="flex items-center gap-2 mb-4">
        <h3 className="font-bold text-xl uppercase">{lang}</h3>
      </div>
      <div className={`w-full ${barBg} h-3 rounded-full overflow-hidden`}>
        <div
          className={`h-3 rounded-full ${progressColor} transition-all duration-500`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm font-light uppercase mt-2">{level}</p>
    </div>
  );
}
