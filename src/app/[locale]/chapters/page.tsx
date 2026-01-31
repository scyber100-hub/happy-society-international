'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ArrowRight, Globe, Users, MapPin, ExternalLink, CheckCircle, Clock } from 'lucide-react';
import { getChapters, type Chapter } from '@/lib/supabase';

// Country flag emoji helper
function getCountryFlag(countryCode: string): string {
  try {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  } catch {
    return '🌍';
  }
}

export default function ChaptersPage() {
  const t = useTranslations('chapters');
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadChapters() {
      try {
        const data = await getChapters();
        setChapters(data);
      } catch (error) {
        console.error('Failed to load chapters:', error);
        // Fallback to static data if DB fails
        setChapters([{
          id: '1',
          country_code: 'KR',
          country_name_en: 'South Korea',
          country_name_native: '대한민국',
          status: 'established',
          founded_at: '2024-01-01',
          website_url: 'https://frontend-one-phi-28.vercel.app/',
          contact_email: null,
          description_en: 'The birthplace of the Happy Society movement, leading the way for progressive politics in East Asia.',
          description_native: null,
          member_count: 10000,
          leader_name: null,
          social_links: {},
          created_at: new Date().toISOString()
        }]);
      } finally {
        setIsLoading(false);
      }
    }
    loadChapters();
  }, []);

  const establishedChapters = chapters.filter(c => c.status === 'established' || c.status === 'active');
  const formingChapters = chapters.filter(c => c.status === 'forming');

  // Static forming countries for display (in case no DB data)
  const staticFormingCountries = [
    { country: 'Japan', flag: '🇯🇵' },
    { country: 'Taiwan', flag: '🇹🇼' },
    { country: 'USA', flag: '🇺🇸' },
    { country: 'Germany', flag: '🇩🇪' },
    { country: 'Spain', flag: '🇪🇸' },
    { country: 'France', flag: '🇫🇷' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--primary)] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Globe className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('title')}</h1>
          <p className="text-xl text-white/90">{t('subtitle')}</p>
        </div>
      </section>

      {/* Established Chapters */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading chapters...</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h2 className="text-3xl font-bold text-[var(--gray-900)]">
                  {t('established')} Chapters
                </h2>
              </div>
              <div className="w-20 h-1 bg-[var(--primary)] mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {establishedChapters.map((chapter) => (
                <a
                  key={chapter.id}
                  href={chapter.website_url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-[var(--gray-200)] rounded-[var(--radius-xl)] overflow-hidden hover:shadow-lg hover:border-[var(--primary)] transition-all block cursor-pointer"
                >
                  <div className="bg-[var(--primary-light)] p-6 text-center">
                    <span className="text-6xl">{getCountryFlag(chapter.country_code)}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-[var(--gray-900)]">
                        {chapter.country_name_en}
                      </h3>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                        {t('established')}
                      </span>
                    </div>
                    {chapter.country_name_native && (
                      <p className="text-[var(--gray-500)] text-sm mb-2">{chapter.country_name_native}</p>
                    )}
                    <p className="text-[var(--gray-600)] text-sm mb-4">
                      {chapter.description_en}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-[var(--gray-500)]">
                      {chapter.member_count > 0 && (
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {chapter.member_count.toLocaleString()}+
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-[var(--primary)]">
                        <ExternalLink className="w-4 h-4" />
                        Visit Website
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Forming Chapters */}
      <section className="bg-[var(--gray-50)] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-amber-600" />
              <h2 className="text-3xl font-bold text-[var(--gray-900)]">
                {t('forming')} Chapters
              </h2>
            </div>
            <p className="text-[var(--gray-600)]">
              Progressive allies working to establish Happy Society parties in their countries
            </p>
            <div className="w-20 h-1 bg-[var(--primary)] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {formingChapters.length > 0
              ? formingChapters.map((chapter) => (
                  <div
                    key={chapter.id}
                    className="bg-white border border-[var(--gray-200)] rounded-[var(--radius-lg)] p-4 text-center hover:border-[var(--primary)] transition-colors"
                  >
                    <span className="text-4xl mb-2 block">{getCountryFlag(chapter.country_code)}</span>
                    <span className="text-sm font-medium text-[var(--gray-700)]">
                      {chapter.country_name_en}
                    </span>
                  </div>
                ))
              : staticFormingCountries.map((country) => (
                  <div
                    key={country.country}
                    className="bg-white border border-[var(--gray-200)] rounded-[var(--radius-lg)] p-4 text-center hover:border-[var(--primary)] transition-colors"
                  >
                    <span className="text-4xl mb-2 block">{country.flag}</span>
                    <span className="text-sm font-medium text-[var(--gray-700)]">
                      {country.country}
                    </span>
                  </div>
                ))
            }
          </div>
        </div>
      </section>

      {/* World Map Placeholder */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-[var(--primary-light)] rounded-[var(--radius-xl)] p-12 text-center">
            <Globe className="w-24 h-24 mx-auto mb-6 text-[var(--primary)] opacity-50" />
            <h3 className="text-2xl font-bold text-[var(--gray-900)] mb-4">
              Growing Global Movement
            </h3>
            <p className="text-[var(--gray-600)] max-w-2xl mx-auto mb-8">
              From Seoul to San Francisco, from Berlin to Buenos Aires, progressive citizens are
              joining together to build a new kind of politics—one that puts people over profits,
              happiness over GDP, and dignity over efficiency.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white rounded-[var(--radius-md)] px-6 py-3">
                <div className="text-3xl font-bold text-[var(--primary)]">
                  {chapters.length || 7}
                </div>
                <div className="text-sm text-[var(--gray-600)]">Countries</div>
              </div>
              <div className="bg-white rounded-[var(--radius-md)] px-6 py-3">
                <div className="text-3xl font-bold text-[var(--primary)]">7</div>
                <div className="text-sm text-[var(--gray-600)]">Languages</div>
              </div>
              <div className="bg-white rounded-[var(--radius-md)] px-6 py-3">
                <div className="text-3xl font-bold text-[var(--primary)]">1</div>
                <div className="text-sm text-[var(--gray-600)]">Movement</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Start a Chapter CTA */}
      <section className="bg-[var(--primary)] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <MapPin className="w-12 h-12 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-bold mb-4">{t('startChapter')}</h2>
          <p className="text-xl text-white/90 mb-8">{t('startChapterDesc')}</p>
          <Link
            href="/join"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[var(--primary)] font-semibold rounded-[var(--radius-md)] hover:bg-white/90 transition-colors"
          >
            {t('learnHow')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
