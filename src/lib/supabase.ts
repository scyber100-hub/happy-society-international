import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Chapter {
  id: string;
  country_code: string;
  country_name_en: string;
  country_name_native: string | null;
  status: 'forming' | 'established' | 'active' | 'inactive';
  founded_at: string | null;
  website_url: string | null;
  contact_email: string | null;
  description_en: string | null;
  description_native: string | null;
  member_count: number;
  leader_name: string | null;
  social_links: Record<string, string>;
  created_at: string;
}

export interface Member {
  id: string;
  user_id: string | null;
  email: string;
  first_name: string;
  last_name: string;
  country_code: string;
  chapter_id: string | null;
  preferred_language: string;
  membership_type: 'supporter' | 'member' | 'organizer' | 'leader';
  status: 'pending' | 'active' | 'inactive' | 'suspended';
  bio: string | null;
  interests: string[] | null;
  skills: string[] | null;
  wants_newsletter: boolean;
  wants_event_updates: boolean;
  joined_at: string;
}

export interface Partner {
  id: string;
  organization_name: string;
  organization_type: 'political_party' | 'union' | 'ngo' | 'civil_society' | 'academic' | 'other';
  country_code: string;
  website_url: string | null;
  contact_email: string;
  contact_person: string | null;
  description: string | null;
  partnership_level: 'affiliate' | 'partner' | 'ally' | 'founding';
  status: 'pending' | 'approved' | 'active' | 'inactive';
  logo_url: string | null;
  social_links: Record<string, string>;
  member_count: number | null;
}

export interface Contact {
  id?: string;
  name: string;
  email: string;
  country_code?: string;
  subject: string;
  category: 'general' | 'membership' | 'chapter' | 'partnership' | 'press' | 'other';
  message: string;
  preferred_language?: string;
}

export interface NewsletterSubscriber {
  id?: string;
  email: string;
  name?: string;
  country_code?: string;
  preferred_language?: string;
  topics?: string[];
}

// API functions
export async function getChapters(): Promise<Chapter[]> {
  const { data, error } = await supabase
    .from('intl_chapters')
    .select('*')
    .order('status', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getChapterByCountry(countryCode: string): Promise<Chapter | null> {
  const { data, error } = await supabase
    .from('intl_chapters')
    .select('*')
    .eq('country_code', countryCode)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function getActivePartners(): Promise<Partner[]> {
  const { data, error } = await supabase
    .from('intl_partners')
    .select('*')
    .in('status', ['approved', 'active'])
    .order('partnership_level', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function submitContact(contact: Contact): Promise<void> {
  const { error } = await supabase
    .from('intl_contacts')
    .insert(contact);

  if (error) throw error;
}

export async function subscribeNewsletter(subscriber: NewsletterSubscriber): Promise<void> {
  const { error } = await supabase
    .from('intl_newsletter_subscribers')
    .insert(subscriber);

  if (error) throw error;
}

export async function registerMember(member: Omit<Member, 'id' | 'joined_at' | 'status'>): Promise<void> {
  const { error } = await supabase
    .from('intl_members')
    .insert(member);

  if (error) throw error;
}

export async function applyForChapter(chapterApplication: {
  country_code: string;
  country_name_en: string;
  country_name_native?: string;
  contact_email: string;
  leader_name: string;
  description_en?: string;
}): Promise<void> {
  const { error } = await supabase
    .from('intl_chapters')
    .insert({
      ...chapterApplication,
      status: 'forming'
    });

  if (error) throw error;
}

export async function applyForPartnership(partner: Omit<Partner, 'id' | 'status' | 'joined_at' | 'approved_at'>): Promise<void> {
  const { error } = await supabase
    .from('intl_partners')
    .insert({
      ...partner,
      status: 'pending'
    });

  if (error) throw error;
}
