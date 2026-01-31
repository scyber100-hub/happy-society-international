'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { User, Flag, Users, Check, ArrowRight, Mail, Globe, X, CheckCircle } from 'lucide-react';
import { subscribeNewsletter } from '@/lib/supabase';

type ModalType = 'individual' | 'chapter' | 'partner' | null;

export default function JoinPage() {
  const t = useTranslations('join');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Individual form state
  const [individualForm, setIndividualForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    country: '',
    interests: [] as string[],
    wantsNewsletter: true
  });

  // Chapter form state
  const [chapterForm, setChapterForm] = useState({
    countryCode: '',
    countryName: '',
    countryNameNative: '',
    leaderName: '',
    contactEmail: '',
    description: ''
  });

  // Partner form state
  const [partnerForm, setPartnerForm] = useState({
    organizationName: '',
    organizationType: 'ngo' as const,
    countryCode: '',
    contactEmail: '',
    contactPerson: '',
    website: '',
    description: ''
  });

  const individualBenefits = t.raw('individual.benefits') as string[];
  const chapterSteps = t.raw('chapter.steps') as string[];

  const handleIndividualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await subscribeNewsletter({
        email: individualForm.email,
        name: `${individualForm.firstName} ${individualForm.lastName}`,
        country_code: individualForm.country,
        topics: ['membership', ...individualForm.interests]
      });
      setIsSuccess(true);
    } catch (err) {
      setError('Failed to submit. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChapterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // For chapter applications, we send an email notification
      const mailtoLink = `mailto:chapters@happysociety.international?subject=Chapter Application: ${chapterForm.countryName}&body=Country: ${chapterForm.countryName}%0AContact: ${chapterForm.leaderName}%0AEmail: ${chapterForm.contactEmail}%0A%0ADescription:%0A${encodeURIComponent(chapterForm.description)}`;
      window.location.href = mailtoLink;
      setIsSuccess(true);
    } catch (err) {
      setError('Failed to submit. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const mailtoLink = `mailto:partners@happysociety.international?subject=Partnership Application: ${partnerForm.organizationName}&body=Organization: ${partnerForm.organizationName}%0AType: ${partnerForm.organizationType}%0ACountry: ${partnerForm.countryCode}%0AContact: ${partnerForm.contactPerson}%0AEmail: ${partnerForm.contactEmail}%0AWebsite: ${partnerForm.website}%0A%0ADescription:%0A${encodeURIComponent(partnerForm.description)}`;
      window.location.href = mailtoLink;
      setIsSuccess(true);
    } catch (err) {
      setError('Failed to submit. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setIsSuccess(false);
    setError(null);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-[var(--primary)] text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('title')}</h1>
          <p className="text-xl text-white/90">{t('subtitle')}</p>
        </div>
      </section>

      {/* Join Options */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Individual Membership */}
          <div className="bg-white border-2 border-[var(--gray-200)] rounded-[var(--radius-xl)] overflow-hidden hover:border-[var(--primary)] transition-colors">
            <div className="bg-[var(--primary-light)] p-6 text-center">
              <div className="w-16 h-16 bg-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[var(--gray-900)]">
                {t('individual.title')}
              </h3>
            </div>
            <div className="p-6">
              <p className="text-[var(--gray-600)] mb-6">{t('individual.description')}</p>
              <ul className="space-y-3 mb-6">
                {individualBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[var(--primary)] mt-0.5 flex-shrink-0" />
                    <span className="text-[var(--gray-700)] text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setActiveModal('individual')}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--primary)] text-white font-semibold rounded-[var(--radius-md)] hover:bg-[var(--primary-dark)] transition-colors"
              >
                {t('individual.button')}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Start a Chapter */}
          <div className="bg-white border-2 border-[var(--primary)] rounded-[var(--radius-xl)] overflow-hidden relative">
            <div className="absolute top-0 right-0 bg-[var(--secondary)] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              Featured
            </div>
            <div className="bg-[var(--primary)] p-6 text-center text-white">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Flag className="w-8 h-8 text-[var(--primary)]" />
              </div>
              <h3 className="text-xl font-bold">{t('chapter.title')}</h3>
            </div>
            <div className="p-6">
              <p className="text-[var(--gray-600)] mb-6">{t('chapter.description')}</p>
              <ol className="space-y-3 mb-6">
                {chapterSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[var(--primary-light)] text-[var(--primary)] rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-[var(--gray-700)] text-sm">{step}</span>
                  </li>
                ))}
              </ol>
              <button
                onClick={() => setActiveModal('chapter')}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--primary)] text-white font-semibold rounded-[var(--radius-md)] hover:bg-[var(--primary-dark)] transition-colors"
              >
                {t('chapter.button')}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Partner Organization */}
          <div className="bg-white border-2 border-[var(--gray-200)] rounded-[var(--radius-xl)] overflow-hidden hover:border-[var(--primary)] transition-colors">
            <div className="bg-[var(--primary-light)] p-6 text-center">
              <div className="w-16 h-16 bg-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[var(--gray-900)]">
                {t('partner.title')}
              </h3>
            </div>
            <div className="p-6">
              <p className="text-[var(--gray-600)] mb-6">{t('partner.description')}</p>
              <div className="space-y-3 mb-6 text-sm text-[var(--gray-700)]">
                <p>We welcome partnerships with:</p>
                <ul className="list-disc list-inside space-y-1 text-[var(--gray-600)]">
                  <li>Progressive political parties</li>
                  <li>Labor unions and worker organizations</li>
                  <li>Civil society and advocacy groups</li>
                  <li>Academic and research institutions</li>
                </ul>
              </div>
              <button
                onClick={() => setActiveModal('partner')}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--primary)] text-white font-semibold rounded-[var(--radius-md)] hover:bg-[var(--primary-dark)] transition-colors"
              >
                {t('partner.button')}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-[var(--gray-50)] py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--gray-900)] mb-4">Get in Touch</h2>
            <p className="text-[var(--gray-600)]">
              Have questions? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-[var(--radius-lg)] p-6 border border-[var(--gray-200)]">
              <Mail className="w-8 h-8 text-[var(--primary)] mb-4" />
              <h3 className="font-bold text-[var(--gray-900)] mb-2">Email</h3>
              <a
                href="mailto:hello@happysociety.international"
                className="text-[var(--primary)] hover:underline"
              >
                hello@happysociety.international
              </a>
            </div>
            <div className="bg-white rounded-[var(--radius-lg)] p-6 border border-[var(--gray-200)]">
              <Globe className="w-8 h-8 text-[var(--primary)] mb-4" />
              <h3 className="font-bold text-[var(--gray-900)] mb-2">Social</h3>
              <p className="text-[var(--gray-600)]">
                Follow us on social media for updates on our global movement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[var(--primary)] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Another World Is Possible
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join us in building a global movement for a society where everyone—not just the
            wealthy and powerful—can live with dignity and happiness.
          </p>
        </div>
      </section>

      {/* Modals */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {activeModal === 'individual' && t('individual.title')}
                {activeModal === 'chapter' && t('chapter.title')}
                {activeModal === 'partner' && t('partner.title')}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600 mb-6">
                    {activeModal === 'individual' && "Welcome to the movement! You'll receive updates soon."}
                    {activeModal === 'chapter' && "Your application has been submitted. We'll be in touch."}
                    {activeModal === 'partner' && "Thank you for your interest. We'll review and contact you."}
                  </p>
                  <button
                    onClick={closeModal}
                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                      {error}
                    </div>
                  )}

                  {/* Individual Form */}
                  {activeModal === 'individual' && (
                    <form onSubmit={handleIndividualSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                          <input
                            type="text"
                            required
                            value={individualForm.firstName}
                            onChange={(e) => setIndividualForm(prev => ({ ...prev, firstName: e.target.value }))}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                          <input
                            type="text"
                            required
                            value={individualForm.lastName}
                            onChange={(e) => setIndividualForm(prev => ({ ...prev, lastName: e.target.value }))}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                        <input
                          type="email"
                          required
                          value={individualForm.email}
                          onChange={(e) => setIndividualForm(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <input
                          type="text"
                          value={individualForm.country}
                          onChange={(e) => setIndividualForm(prev => ({ ...prev, country: e.target.value }))}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="e.g., US, KR, JP"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="newsletter"
                          checked={individualForm.wantsNewsletter}
                          onChange={(e) => setIndividualForm(prev => ({ ...prev, wantsNewsletter: e.target.checked }))}
                          className="w-4 h-4 text-primary"
                        />
                        <label htmlFor="newsletter" className="text-sm text-gray-700">
                          Subscribe to newsletter updates
                        </label>
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50"
                      >
                        {isSubmitting ? 'Submitting...' : 'Join the Movement'}
                      </button>
                    </form>
                  )}

                  {/* Chapter Form */}
                  {activeModal === 'chapter' && (
                    <form onSubmit={handleChapterSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Country Code *</label>
                          <input
                            type="text"
                            required
                            maxLength={2}
                            value={chapterForm.countryCode}
                            onChange={(e) => setChapterForm(prev => ({ ...prev, countryCode: e.target.value.toUpperCase() }))}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="e.g., US"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Country Name *</label>
                          <input
                            type="text"
                            required
                            value={chapterForm.countryName}
                            onChange={(e) => setChapterForm(prev => ({ ...prev, countryName: e.target.value }))}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="e.g., United States"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country Name (Native)</label>
                        <input
                          type="text"
                          value={chapterForm.countryNameNative}
                          onChange={(e) => setChapterForm(prev => ({ ...prev, countryNameNative: e.target.value }))}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="e.g., 日本"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={chapterForm.leaderName}
                          onChange={(e) => setChapterForm(prev => ({ ...prev, leaderName: e.target.value }))}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email *</label>
                        <input
                          type="email"
                          required
                          value={chapterForm.contactEmail}
                          onChange={(e) => setChapterForm(prev => ({ ...prev, contactEmail: e.target.value }))}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Why start a chapter?</label>
                        <textarea
                          value={chapterForm.description}
                          onChange={(e) => setChapterForm(prev => ({ ...prev, description: e.target.value }))}
                          rows={4}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                          placeholder="Tell us about your vision for the chapter..."
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50"
                      >
                        {isSubmitting ? 'Submitting...' : 'Apply to Start a Chapter'}
                      </button>
                    </form>
                  )}

                  {/* Partner Form */}
                  {activeModal === 'partner' && (
                    <form onSubmit={handlePartnerSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name *</label>
                        <input
                          type="text"
                          required
                          value={partnerForm.organizationName}
                          onChange={(e) => setPartnerForm(prev => ({ ...prev, organizationName: e.target.value }))}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Organization Type *</label>
                          <select
                            value={partnerForm.organizationType}
                            onChange={(e) => setPartnerForm(prev => ({ ...prev, organizationType: e.target.value as typeof partnerForm.organizationType }))}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            <option value="political_party">Political Party</option>
                            <option value="union">Labor Union</option>
                            <option value="ngo">NGO</option>
                            <option value="civil_society">Civil Society</option>
                            <option value="academic">Academic</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Country Code *</label>
                          <input
                            type="text"
                            required
                            maxLength={2}
                            value={partnerForm.countryCode}
                            onChange={(e) => setPartnerForm(prev => ({ ...prev, countryCode: e.target.value.toUpperCase() }))}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="e.g., US"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person *</label>
                        <input
                          type="text"
                          required
                          value={partnerForm.contactPerson}
                          onChange={(e) => setPartnerForm(prev => ({ ...prev, contactPerson: e.target.value }))}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email *</label>
                        <input
                          type="email"
                          required
                          value={partnerForm.contactEmail}
                          onChange={(e) => setPartnerForm(prev => ({ ...prev, contactEmail: e.target.value }))}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                        <input
                          type="url"
                          value={partnerForm.website}
                          onChange={(e) => setPartnerForm(prev => ({ ...prev, website: e.target.value }))}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="https://"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">About Your Organization</label>
                        <textarea
                          value={partnerForm.description}
                          onChange={(e) => setPartnerForm(prev => ({ ...prev, description: e.target.value }))}
                          rows={4}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                          placeholder="Tell us about your organization..."
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50"
                      >
                        {isSubmitting ? 'Submitting...' : 'Apply for Partnership'}
                      </button>
                    </form>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
