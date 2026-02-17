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

// Dummy data
const dummyChapters: Chapter[] = [
  {
    id: '1',
    country_code: 'KR',
    country_name_en: 'South Korea',
    country_name_native: '대한민국',
    status: 'established',
    founded_at: '2024-01-01',
    website_url: 'https://frontend-one-phi-28.vercel.app/',
    contact_email: 'korea@happysociety.international',
    description_en: 'The birthplace of the Happy Society movement, leading the way for progressive politics in East Asia.',
    description_native: '행복사회당의 발상지, 동아시아 진보 정치를 이끌어 나갑니다.',
    member_count: 10000,
    leader_name: null,
    social_links: {},
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    country_code: 'JP',
    country_name_en: 'Japan',
    country_name_native: '日本',
    status: 'forming',
    founded_at: null,
    website_url: null,
    contact_email: 'japan@happysociety.international',
    description_en: 'Building a progressive coalition in Japan for social welfare and worker rights.',
    description_native: null,
    member_count: 250,
    leader_name: null,
    social_links: {},
    created_at: '2024-06-01T00:00:00Z',
  },
  {
    id: '3',
    country_code: 'CN',
    country_name_en: 'China',
    country_name_native: '中国',
    status: 'forming',
    founded_at: null,
    website_url: null,
    contact_email: 'china@happysociety.international',
    description_en: 'Connecting progressive voices across China for mutual aid and solidarity.',
    description_native: null,
    member_count: 180,
    leader_name: null,
    social_links: {},
    created_at: '2024-07-01T00:00:00Z',
  },
  {
    id: '4',
    country_code: 'US',
    country_name_en: 'United States',
    country_name_native: null,
    status: 'forming',
    founded_at: null,
    website_url: null,
    contact_email: 'usa@happysociety.international',
    description_en: 'Organizing for a more equitable and happy society in the United States.',
    description_native: null,
    member_count: 520,
    leader_name: null,
    social_links: {},
    created_at: '2024-05-01T00:00:00Z',
  },
  {
    id: '5',
    country_code: 'DE',
    country_name_en: 'Germany',
    country_name_native: 'Deutschland',
    status: 'forming',
    founded_at: null,
    website_url: null,
    contact_email: 'germany@happysociety.international',
    description_en: 'Promoting progressive values and social democracy in Germany.',
    description_native: null,
    member_count: 310,
    leader_name: null,
    social_links: {},
    created_at: '2024-08-01T00:00:00Z',
  },
  {
    id: '6',
    country_code: 'ES',
    country_name_en: 'Spain',
    country_name_native: 'España',
    status: 'forming',
    founded_at: null,
    website_url: null,
    contact_email: 'spain@happysociety.international',
    description_en: 'Uniting progressive movements across Spain for social justice.',
    description_native: null,
    member_count: 200,
    leader_name: null,
    social_links: {},
    created_at: '2024-09-01T00:00:00Z',
  },
  {
    id: '7',
    country_code: 'FR',
    country_name_en: 'France',
    country_name_native: 'France',
    status: 'forming',
    founded_at: null,
    website_url: null,
    contact_email: 'france@happysociety.international',
    description_en: 'Building solidarity networks for a happier France.',
    description_native: null,
    member_count: 280,
    leader_name: null,
    social_links: {},
    created_at: '2024-10-01T00:00:00Z',
  },
];

// API functions (dummy implementations)
export async function getChapters(): Promise<Chapter[]> {
  return dummyChapters.sort((a, b) => {
    const order = { active: 0, established: 1, forming: 2, inactive: 3 };
    return order[a.status] - order[b.status];
  });
}

export async function getChapterByCountry(countryCode: string): Promise<Chapter | null> {
  return dummyChapters.find((c) => c.country_code === countryCode) || null;
}

export async function getActivePartners(): Promise<Partner[]> {
  return [
    {
      id: '1',
      organization_name: 'Progressive International',
      organization_type: 'civil_society',
      country_code: 'INT',
      website_url: 'https://progressive.international',
      contact_email: 'info@progressive.international',
      contact_person: null,
      description: 'A global network of progressive forces united behind a shared vision.',
      partnership_level: 'founding',
      status: 'active',
      logo_url: null,
      social_links: {},
      member_count: null,
    },
    {
      id: '2',
      organization_name: 'Global Unions Federation',
      organization_type: 'union',
      country_code: 'INT',
      website_url: null,
      contact_email: 'contact@globalunions.org',
      contact_person: null,
      description: 'Representing workers worldwide for fair labor standards.',
      partnership_level: 'partner',
      status: 'active',
      logo_url: null,
      social_links: {},
      member_count: 50000,
    },
  ];
}

export async function submitContact(contact: Contact): Promise<void> {
  console.log('Contact form submitted (dummy):', contact);
}

export async function subscribeNewsletter(subscriber: NewsletterSubscriber): Promise<void> {
  console.log('Newsletter subscription (dummy):', subscriber);
}

export async function registerMember(member: Omit<Member, 'id' | 'joined_at' | 'status'>): Promise<void> {
  console.log('Member registered (dummy):', member);
}

export async function applyForChapter(chapterApplication: {
  country_code: string;
  country_name_en: string;
  country_name_native?: string;
  contact_email: string;
  leader_name: string;
  description_en?: string;
}): Promise<void> {
  console.log('Chapter application (dummy):', chapterApplication);
}

export async function applyForPartnership(partner: Omit<Partner, 'id' | 'status' | 'joined_at' | 'approved_at'>): Promise<void> {
  console.log('Partnership application (dummy):', partner);
}
