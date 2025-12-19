
export interface BrandProfile {
  name: string;
  vibe: 'friendly' | 'energy' | 'classy' | 'witty';
  audience: string;
  hook: string;
}

export interface MenuItemMapping {
  id: string;
  name: string;
  photoUrl: string | null;
}

export interface AssetLibrary {
  logoUrl: string | null;
  menuUrl: string | null;
  menuItems: MenuItemMapping[];
  photos: {
    garden: string[];
    hall: string[];
    kitchen: string[];
    exterior: string[];
  };
}

export type DayName = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

export type PostType = 'post' | 'story';

export interface ScheduledContent {
  id: string;
  type: PostType;
  time: string;
  focus: 'Food Focus' | 'Event/Vibe' | 'Promo' | 'Behind the scenes';
  aspectRatio: '4:5' | '9:16' | '1:1';
}

export interface DaySchedule {
  date: string; // ISO string for the day
  items: ScheduledContent[];
}
