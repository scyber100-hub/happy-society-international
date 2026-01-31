import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { ArrowRight, Quote, Globe } from 'lucide-react';

export default async function DeclarationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DeclarationContent />;
}

function DeclarationContent() {
  const t = useTranslations('declaration');
  const tCta = useTranslations('cta');

  const sections = ['section1', 'section2', 'section3', 'section4', 'section5', 'section6'] as const;

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Globe className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <p className="text-lg text-white/80 mb-4">{t('subtitle')}</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('title')}</h1>
          <p className="text-2xl md:text-3xl font-semibold text-[var(--secondary)]">
            {t('slogan')}
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-[var(--primary-light)] rounded-[var(--radius-xl)] p-8 md:p-12 relative">
          <Quote className="absolute top-6 left-6 w-12 h-12 text-[var(--primary)] opacity-20" />
          <div className="prose prose-lg max-w-none text-[var(--gray-700)] space-y-6 relative z-10">
            {t('intro')
              .split('\n\n')
              .map((paragraph, index) => (
                <p key={index} className="leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
          </div>
        </div>
      </section>

      {/* Main Sections */}
      <section className="bg-[var(--gray-50)] py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-12">
            {sections.map((sectionKey) => (
              <div
                key={sectionKey}
                className="bg-white rounded-[var(--radius-xl)] p-8 shadow-sm"
              >
                <h2 className="text-xl md:text-2xl font-bold text-[var(--primary)] mb-6">
                  {t(`sections.${sectionKey}.title`)}
                </h2>
                <div className="prose prose-lg max-w-none text-[var(--gray-700)]">
                  {t(`sections.${sectionKey}.content`)
                    .split('\n\n')
                    .map((paragraph, index) => (
                      <p key={index} className="leading-relaxed mb-4 last:mb-0">
                        {paragraph.split('\n').map((line, lineIndex) => (
                          <span key={lineIndex}>
                            {line}
                            {lineIndex < paragraph.split('\n').length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--gray-900)] mb-4">
            {t('conclusion.title')}
          </h2>
          <div className="w-20 h-1 bg-[var(--primary)] mx-auto" />
        </div>

        <div className="bg-[var(--primary)] text-white rounded-[var(--radius-xl)] p-8 md:p-12">
          <div className="prose prose-lg prose-invert max-w-none">
            {t('conclusion.content')
              .split('\n\n')
              .map((paragraph, index) => (
                <p key={index} className="leading-relaxed mb-4 last:mb-0 text-white/90">
                  {paragraph.split('\n').map((line, lineIndex) => (
                    <span key={lineIndex}>
                      {line}
                      {lineIndex < paragraph.split('\n').length - 1 && <br />}
                    </span>
                  ))}
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
