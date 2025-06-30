export enum MessageSender {
  USER = 'user',
  AI = 'ai',
}

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  text: string;
  timestamp: string;
}

export interface Scheme {
  id: string;
  title: string;
  department: string;
  description: string;
  eligibility: string;
  link: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  location: string;
  tokens: number;
  avatarUrl: string;
}

export interface Scholarship {
  id: string;
  name: string;
  provider: string;
  amount: string;
  deadline: string;
  link: string;
  eligibility: {
    minAge?: number;
    maxAge?: number;
    course?: string[];
    caste?: string[];
    maxIncome?: number;
    state?: string[];
  };
}

export interface ScholarshipCriteria {
  age: number | null;
  course: string;
  caste: string;
  income: number | null;
  state: string;
}

export interface RedeemPerk {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}