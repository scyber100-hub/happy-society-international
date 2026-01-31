'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { locales, localeNames, localeFlags, type Locale } from '@/i18n/config';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const navItems = [
    { href: '/', label: t('home') },
    { href: '/declaration', label: t('declaration') },
    { href: '/platform', label: t('platform') },
    { href: '/chapters', label: t('chapters') },
    { href: '/join', label: t('join') },
  ];

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setIsLangOpen(false);
  };

  return (
    <header className="bg-white border-b border-[var(--gray-200)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Happy Society International"
              width={44}
              height={44}
              className="w-11 h-11"
            />
            <span className="font-bold text-lg text-[var(--gray-900)] hidden sm:block">
              Happy Society
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-[var(--primary)] ${
                  pathname === item.href
                    ? 'text-[var(--primary)]'
                    : 'text-[var(--gray-600)]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side: Language + CTA */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1 text-sm text-[var(--gray-600)] hover:text-[var(--primary)] transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{localeFlags[locale]} {localeNames[locale]}</span>
                <span className="sm:hidden">{localeFlags[locale]}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {isLangOpen && (
                <>
                  <div
                    className="fixed inset-0"
                    onClick={() => setIsLangOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-[var(--gray-200)] py-1 z-50">
                    {locales.map((l) => (
                      <button
                        key={l}
                        onClick={() => handleLocaleChange(l)}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-[var(--gray-50)] transition-colors ${
                          locale === l
                            ? 'text-[var(--primary)] bg-[var(--primary-light)]'
                            : 'text-[var(--gray-700)]'
                        }`}
                      >
                        {localeFlags[l]} {localeNames[l]}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* CTA Button */}
            <Link
              href="/join"
              className="hidden sm:inline-flex items-center px-4 py-2 bg-[var(--primary)] text-white text-sm font-medium rounded-[var(--radius-md)] hover:bg-[var(--primary-dark)] transition-colors"
            >
              {t('join')}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-[var(--gray-600)]"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-[var(--gray-200)]">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-3 text-base font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-[var(--primary)]'
                    : 'text-[var(--gray-600)]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
