import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import {
  Handshake,
  Scale,
  Heart,
  Vote,
  Building,
  Bot,
  ArrowRight,
  Globe,
} from 'lucide-react';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations();

  const values = [
    { key: 'cooperation', icon: Handshake },
    { key: 'happiness', icon: Heart },
    { key: 'dignity', icon: Scale },
    { key: 'democracy', icon: Vote },
    { key: 'publicGoods', icon: Building },
    { key: 'technology', icon: Bot },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white" />
          <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-white" />
          <div className="absolute top-40 right-40 w-24 h-24 rounded-full bg-white" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Globe className="w-6 h-6" />
              <span className="text-white/80 text-sm uppercase tracking-wider">
                International Progressive Movement
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
              {t('hero.title')}
              <br />
              <span className="text-[var(--secondary)]">{t('hero.subtitle')}</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/join"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[var(--primary)] font-semibold rounded-[var(--radius-md)] hover:bg-white/90 transition-colors"
              >
                {t('hero.joinButton')}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/declaration"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-[var(--radius-md)] hover:bg-white/10 transition-colors"
              >
                {t('hero.learnMore')}
              </Link>
            </div>
          </div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 50L60 45.7C120 41.3 240 32.7 360 30.2C480 27.7 600 31.3 720 39.8C840 48.3 960 61.7 1080 65.2C1200 68.7 1320 62.3 1380 59.2L1440 56V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--gray-900)] mb-4">
              {t('values.title')}
            </h2>
            <p className="text-lg text-[var(--gray-600)] max-w-2xl mx-auto">
              {t('values.subtitle')}
            </p>
            <div className="w-20 h-1 bg-[var(--primary)] mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="bg-white border border-[var(--gray-200)] rounded-[var(--radius-xl)] p-8 hover:shadow-lg transition-shadow group"
              >
                <div className="w-14 h-14 bg-[var(--primary-light)] rounded-[var(--radius-lg)] flex items-center justify-center mb-6 group-hover:bg-[var(--primary)] transition-colors">
                  <Icon className="w-7 h-7 text-[var(--primary)] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-[var(--gray-900)] mb-3">
                  {t(`values.${key}.title`)}
                </h3>
                <p className="text-[var(--gray-600)]">
                  {t(`values.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Network Section */}
      <section className="py-20 bg-[var(--gray-50)]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--gray-900)] mb-6">
                {t('chapters.title')}
              </h2>
              <p className="text-lg text-[var(--gray-600)] mb-8">
                {t('chapters.subtitle')}
              </p>

              <div className="space-y-4">
                <a
                  href="https://frontend-one-phi-28.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white rounded-[var(--radius-lg)] border border-[var(--gray-200)] hover:border-[var(--primary)] hover:shadow-md transition-all"
                >
                  <div className="text-3xl">🇰🇷</div>
                  <div>
                    <h4 className="font-semibold text-[var(--gray-900)]">
                      {t('chapters.korea.name')}
                    </h4>
                    <p className="text-sm text-[var(--primary)]">
                      {t('chapters.korea.status')}
                    </p>
                  </div>
                  <span className="ml-auto px-3 py-1 bg-[var(--primary-light)] text-[var(--primary)] text-sm rounded-full">
                    {t('chapters.established')}
                  </span>
                </a>

                <div className="p-4 bg-[var(--primary-light)] rounded-[var(--radius-lg)] border border-[var(--primary)] border-dashed">
                  <p className="text-[var(--primary-dark)] mb-2">
                    {t('chapters.startChapterDesc')}
                  </p>
                  <Link
                    href="/join"
                    className="inline-flex items-center gap-2 text-[var(--primary)] font-semibold hover:underline"
                  >
                    {t('chapters.learnHow')}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-[var(--primary-light)] rounded-full flex items-center justify-center">
                <Globe className="w-48 h-48 text-[var(--primary)] opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-[var(--primary)]">7+</div>
                    <div className="text-[var(--gray-600)]">Languages</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[var(--primary)]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <Link
            href="/join"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[var(--primary)] font-semibold rounded-[var(--radius-md)] hover:bg-white/90 transition-colors"
          >
            {t('cta.button')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
