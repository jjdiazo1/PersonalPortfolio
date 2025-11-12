'use client'

interface ContactSectionProps {
  darkMode: boolean;
}

export default function ContactSection({ darkMode }: ContactSectionProps) {
  const borderClass = darkMode ? 'border-gray-800' : 'border-gray-200';

  const contacts = [
    { label: "Email", icon: "✉️", href: "mailto:jj.diazorg@gmail.com" },
    { label: "LinkedIn", icon: "🔗", href: "https://www.linkedin.com/in/jjdiazo1/" },
    { label: "GitHub", icon: "📁", href: "https://github.com/jjdiazo1" }
  ];

  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-4xl font-bold text-center mb-12">Get In Touch</h2>
        <div className={`border ${borderClass} p-8 rounded-lg mb-8`}>
          <p className="text-lg text-center mb-8">
            Interested in working together? Feel free to reach out through any of the following channels.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {contacts.map(contact => (
              <a key={contact.label} href={contact.href} target="_blank" rel="noopener noreferrer" className="group">
                <div className={`p-4 border ${borderClass} rounded-lg group-hover:border-indigo-500 transition-colors`}>
                  <span className="block text-2xl mb-2">{contact.icon}</span>
                  <span className="block font-medium">{contact.label}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
