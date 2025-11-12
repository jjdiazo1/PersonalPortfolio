'use client'

interface FooterProps {
  darkMode: boolean;
}

export default function Footer({ darkMode }: FooterProps) {
  const secondaryTextClass = darkMode ? 'text-gray-400' : 'text-gray-600';
  const borderClass = darkMode ? 'border-gray-800' : 'border-gray-200';

  return (
    <footer className={`${darkMode ? 'bg-black' : 'bg-white'} ${borderClass} border-t py-8`}>
      <div className="container mx-auto px-4 text-center">
        <p className={`${secondaryTextClass} text-sm`}>
          © {new Date().getFullYear()} Juan Jose Diaz. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
