'use client'

interface SkillCardProps {
  skill: string;
  logo?: string; // url del logo
  darkMode: boolean;
}

export default function SkillCard({ skill, logo, darkMode }: SkillCardProps) {
  const borderClass = darkMode ? 'border-gray-800' : 'border-gray-200';

  return (
    <div className={`border ${borderClass} p-6 rounded-lg hover:scale-105 transition-transform flex items-center justify-center relative h-36 w-36 bg-white dark:bg-gray-900 shadow-md`}>
      {logo ? (
        <>
          <img src={logo} alt={skill} className="h-16 w-16 object-contain" />
          <div className="absolute inset-0 bg-black bg-opacity-60 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
            <p className="font-bold uppercase">{skill}</p>
          </div>
        </>
      ) : (
        <p className="font-bold uppercase text-center">{skill}</p>
      )}
    </div>
  );
}
