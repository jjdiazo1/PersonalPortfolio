'use client'

interface SkillCardProps {
  skill: string;
  darkMode: boolean;
}

export default function SkillCard({ skill, darkMode }: SkillCardProps) {
  const borderClass = darkMode ? 'border-gray-800' : 'border-gray-200';
  return (
    <div className={`border ${borderClass} p-6 rounded-lg hover:scale-[1.05] transition-transform flex flex-col items-center justify-center text-center h-32`}>
      <p className="font-bold uppercase break-words">{skill}</p>
    </div>
  );
}
