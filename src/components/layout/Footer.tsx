'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Heart, Send, CheckCircle } from 'lucide-react';
import { subscribeNewsletter } from '@/lib/supabase';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('footer');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await subscribeNewsletter({ email });
      setIsSubscribed(true);
      setEmail('');
    } catch (err) {
      console.error(err);
      setError('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[var(--gray-900)] text-white">
      {/* Newsletter Section */}
      <div className="border-b border-[var(--gray-800)]">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-2">{t('newsletter')}</h3>
            <p className="text-[var(--gray-400)] mb-6">
              Stay updated on the global progressive movement. Get news, events, and action alerts.
            </p>

            {isSubscribed ? (
              <div className="flex items-center justify-center gap-2 text-green-400">
                <CheckCircle className="w-5 h-5" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-4 py-3 bg-[var(--gray-800)] border border-[var(--gray-700)] rounded-lg text-white placeholder-[var(--gray-500)] focus:outline-none focus:border-[var(--primary)]"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-[var(--primary)] text-white font-semibold rounded-lg hover:bg-[var(--primary-dark)] transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </form>
            )}
            {error && (
              <p className="text-red-400 text-sm mt-2">{error}</p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo-circle.png"
                alt="Happy Society International"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
              <span className="font-bold text-lg">Happy Society</span>
            </div>
            <p className="text-[var(--gray-400)] text-sm">
              {t('tagline')}
            </p>
          </div>

          {/* About Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('about')}</h3>
            <ul className="space-y-2 text-sm text-[var(--gray-400)]">
              <li>
                <Link href="/declaration" className="hover:text-white transition-colors">
                  {t('declaration')}
                </Link>
              </li>
              <li>
                <Link href="/platform" className="hover:text-white transition-colors">
                  {t('platform')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Involved Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('getInvolved')}</h3>
            <ul className="space-y-2 text-sm text-[var(--gray-400)]">
              <li>
                <Link href="/join" className="hover:text-white transition-colors">
                  {t('join')}
                </Link>
              </li>
              <li>
                <Link href="/chapters" className="hover:text-white transition-colors">
                  {t('chapters')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('connect')}</h3>
            <ul className="space-y-2 text-sm text-[var(--gray-400)]">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {t('contact')}
                </Link>
              </li>
              <li>
                <a
                  href="mailto:contact@happysociety.international"
                  className="hover:text-white transition-colors"
                >
                  contact@happysociety.international
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[var(--gray-800)] mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[var(--gray-400)]">
              {t('copyright')}
            </p>
            <p className="text-sm text-[var(--gray-400)] flex items-center gap-1">
              <Heart className="w-4 h-4 text-[var(--primary)]" />
              {t('solidarity')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
