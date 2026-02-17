'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Music, Play, Pause, Volume2 } from 'lucide-react';

export default function AnthemPage() {
  const t = useTranslations('anthem');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--primary)] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Music className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('title')}</h1>
          <p className="text-xl text-white/90">{t('subtitle')}</p>
        </div>
      </section>

      {/* Audio Player */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-[var(--primary-light)] to-[var(--secondary-light)] rounded-[var(--radius-xl)] p-8 text-center">
          <audio
            ref={audioRef}
            src="/international-anthem.mp3"
            onEnded={handleEnded}
            preload="metadata"
          />

          <button
            onClick={togglePlay}
            className="w-24 h-24 mx-auto mb-6 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            aria-label={isPlaying ? t('pauseButton') : t('playButton')}
          >
            {isPlaying ? (
              <Pause className="w-10 h-10" />
            ) : (
              <Play className="w-10 h-10 ml-1" />
            )}
          </button>

          <p className="text-lg font-medium text-[var(--gray-700)]">
            {isPlaying ? t('pauseButton') : t('playButton')}
          </p>

          <div className="flex items-center justify-center gap-2 mt-4 text-[var(--gray-500)]">
            <Volume2 className="w-5 h-5" />
            <span className="text-sm">International Solidarity Anthem</span>
          </div>
        </div>
      </section>

      {/* Lyrics */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white border border-[var(--gray-200)] rounded-[var(--radius-xl)] p-8 md:p-12">
          <h2 className="text-2xl font-bold text-[var(--gray-900)] mb-8 text-center">
            {t('title')}
          </h2>

          <div className="prose prose-lg max-w-none">
            {t('lyrics').split('\n\n').map((verse, index) => (
              <p
                key={index}
                className="text-[var(--gray-700)] leading-relaxed mb-6 text-center whitespace-pre-line"
              >
                {verse}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[var(--gray-50)] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-[var(--gray-900)] mb-4">
            {t('subtitle')}
          </h3>
          <p className="text-[var(--gray-600)] max-w-2xl mx-auto">
            {t('lyrics').split('\n').find(line => line.includes('연대') || line.includes('unite') || line.includes('uníos') || line.includes('unissez') || line.includes('vereinigt') || line.includes('团结') || line.includes('連帯'))}
          </p>
        </div>
      </section>
    </div>
  );
}
