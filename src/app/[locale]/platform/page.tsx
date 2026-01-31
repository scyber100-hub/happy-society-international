import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import {
  Heart,
  Shield,
  Leaf,
  Scale,
  Bot,
  Vote,
  Users,
  ArrowRight,
  Check,
  BookOpen,
} from 'lucide-react';

export default async function PlatformPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PlatformContent />;
}

function PlatformContent() {
  const t = useTranslations('platform');
  const tCta = useTranslations('cta');

  const articles = [
    { key: 'article1', icon: Heart, color: 'bg-pink-500' },
    { key: 'article2', icon: Shield, color: 'bg-blue-500' },
    { key: 'article3', icon: Leaf, color: 'bg-green-500' },
    { key: 'article4', icon: Scale, color: 'bg-orange-500' },
    { key: 'article5', icon: Bot, color: 'bg-purple-500' },
    { key: 'article6', icon: Vote, color: 'bg-teal-500' },
    { key: 'article7', icon: Users, color: 'bg-indigo-500' },
  ] as const;

  const hasPrinciples = (key: string): boolean => {
    return ['article2', 'article3', 'article4', 'article5', 'article6'].includes(key);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="text-xl text-white/80">{t('subtitle')}</p>
        </div>
      </section>

      {/* Preamble */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[var(--gray-900)] mb-4">
            {t('preamble.title')}
          </h2>
          <div className="w-20 h-1 bg-[var(--primary)] mx-auto" />
        </div>

        <div className="bg-[var(--primary-light)] rounded-[var(--radius-xl)] p-8 md:p-12">
          <div className="prose prose-lg max-w-none text-[var(--gray-700)]">
            {t('preamble.content')
              .split('\n\n')
              .map((paragraph, index) => (
                <p key={index} className="leading-relaxed mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="bg-[var(--gray-50)] py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-8">
            {articles.map(({ key, icon: Icon, color }) => (
              <div
                key={key}
                className="bg-white rounded-[var(--radius-xl)] overflow-hidden shadow-sm"
              >
                <div className={`${color} text-white px-6 py-4 flex items-center gap-3`}>
                  <Icon className="w-6 h-6" />
                  <h3 className="text-lg md:text-xl font-bold">{t(`articles.${key}.title`)}</h3>
                </div>
                <div className="p-6">
                  <div className="prose max-w-none text-[var(--gray-700)] mb-4">
                    {t(`articles.${key}.content`)
                      .split('\n\n')
                      .map((paragraph, index) => (
                        <p key={index} className="leading-relaxed mb-3 last:mb-0">
                          {paragraph}
                        </p>
                      ))}
                  </div>

                  {hasPrinciples(key) && (
                    <div className="mt-4 pt-4 border-t border-[var(--gray-200)]">
                      <p className="text-sm font-semibold text-[var(--gray-500)] mb-3">
                        공동 원칙 / Shared Principles:
                      </p>
                      <ul className="space-y-2">
                        {(t.raw(`articles.${key}.principles`) as string[]).map(
                          (principle, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Check className="w-5 h-5 text-[var(--primary)] mt-0.5 flex-shrink-0" />
                              <span className="text-[var(--gray-700)]">{principle}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appendix */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-4">
            {t('appendix.title')}
          </h2>
          <div className="w-20 h-1 bg-[var(--primary)] mx-auto" />
        </div>

        <div className="bg-[var(--secondary-light)] rounded-[var(--radius-xl)] p-8 border-l-4 border-[var(--secondary)]">
          <ul className="space-y-3">
            {(t.raw('appendix.principles') as string[]).map((principle, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[var(--secondary)] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-[var(--gray-700)]">{principle}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Conclusion */}
      <section className="bg-[var(--primary)] text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">{t('conclusion.title')}</h2>
            <div className="w-20 h-1 bg-white/30 mx-auto" />
          </div>

          <div className="prose prose-lg prose-invert max-w-none text-center">
            {t('conclusion.content')
              .split('\n\n')
              .map((paragraph, index) => (
                <p key={index} className="leading-relaxed mb-4 last:mb-0 text-white/90">
                  {paragraph}
                </p>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--gray-900)] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">{tCta('title')}</h2>
          <p className="text-xl text-white/80 mb-8">{tCta('description')}</p>
          <Link
            href="/join"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--primary)] text-white font-semibold rounded-[var(--radius-md)] hover:bg-[var(--primary-dark)] transition-colors"
          >
            {tCta('button')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
