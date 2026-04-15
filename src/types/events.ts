export interface EventItem {
  title: string;
  isChecked: boolean;
}

export interface TimelineEvent {
  title: string;
  description: string;
  date: string;
  extendedDescription: string;
  isChecked: boolean;
  iconType: 'promotion' | 'award' | 'achievement' | 'advanced' | 'work' | 'school';
  events: EventItem[];
}

export type Events = TimelineEvent[]; 