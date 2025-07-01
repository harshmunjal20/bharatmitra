import { Scheme, LeaderboardUser, Scholarship, RedeemPerk } from './types';
import { StoreIcon } from './components/icons/StoreIcon';
import { ScholarshipIcon } from './components/icons/ScholarshipIcon';


export const RECOMMENDED_SCHEMES: Scheme[] = [
  {
    id: '1',
    title: 'National Scholarship for Students',
    department: 'Ministry of Education',
    description: 'Scholarship for meritorious students across India.',
    eligibility: 'Students scoring above 80% in Class 12',
    link: 'https://scholarships.gov.in',
    category: 'Student',
    tags: ['student', 'urgent'],
  },
  {
    id: '2',
    title: 'PM Kisan Scheme',
    department: 'Ministry of Agriculture',
    description: 'Direct income support for farmers.',
    eligibility: 'Small and marginal farmers',
    link: 'https://pmkisan.gov.in',
    category: 'Farmer',
    tags: ['farmer'],
  },
  {
    id: '3',
    title: 'Mahila Samman Yojana',
    department: 'Women & Child Development',
    description: 'Support scheme for women entrepreneurs.',
    eligibility: 'Women aged 18-40 with a business idea',
    link: 'https://wcd.nic.in',
    category: 'Women',
    tags: ['women'],
  },
  // Add more schemes similarly
];

export const LEADERBOARD_DATA = [
  {
    rank: 1,
    previousRank: 2,
    name: 'Ramesh Kumar',
    location: 'Punjab',
    tokens: 250,
    image: 'https://i.pravatar.cc/150?img=1',
    bio: 'Educator from Punjab',
    tokenHistory: [180, 190, 210, 230, 250]
  },
  {
    rank: 2,
    previousRank: 1,
    name: 'Sunita Devi',
    location: 'Uttar Pradesh',
    tokens: 235,
    image: 'https://i.pravatar.cc/150?img=2',
    bio: 'Student Advocate',
    tokenHistory: [200, 210, 225, 240, 235]
  },
  // ... add others similarly
];


export const SCHOLARSHIPS_DATA: Scholarship[] = [
  {
    id: 'nsp-central-merit',
    name: 'Central Sector Scheme of Scholarship for College and University Students',
    provider: 'Department of Higher Education',
    amount: '₹10,000 - ₹20,000 per annum',
    deadline: 'Oct 31, 2024',
    link: 'https://scholarships.gov.in/',
    eligibility: {
      maxIncome: 800000,
      minAge: 17,
      maxAge: 22,
      course: ['B.A.', 'B.Com', 'B.Sc.', 'B.Tech', 'MBBS'],
    },
  },
  {
    id: 'pragati',
    name: 'AICTE Pragati Scholarship for Girls',
    provider: 'AICTE',
    amount: '₹50,000 per annum',
    deadline: 'Nov 30, 2024',
    link: 'https://www.aicte-india.org/schemes/students-development-schemes/Pragati',
    eligibility: {
      course: ['B.Tech', 'B.E.'],
      maxIncome: 800000,
    },
  },
   {
    id: 'pm-yasasvi',
    name: 'PM YASASVI Scheme',
    provider: 'Ministry of Social Justice & Empowerment',
    amount: 'Up to ₹1,25,000',
    deadline: 'Sep 30, 2024',
    link: 'https://yet.nta.ac.in/',
    eligibility: {
      caste: ['OBC', 'EBC', 'DNT'],
      maxIncome: 250000,
    },
  },
  {
    id: 'up-scholarship',
    name: 'UP Post Matric Scholarship',
    provider: 'Government of Uttar Pradesh',
    amount: 'Varies',
    deadline: 'Dec 15, 2024',
    link: 'https://scholarship.up.gov.in/',
    eligibility: {
      state: ['Uttar Pradesh'],
      maxIncome: 200000,
    },
  }
];


export const REDEEM_PERKS: RedeemPerk[] = [
    {
        id: 'resume-review',
        name: 'AI Resume Review',
        description: 'Get an expert-level review of your resume, highlighting strengths and areas for improvement.',
        price: 50,
        icon: ScholarshipIcon
    },
    {
        id: 'study-pdf',
        name: 'Exclusive Study Materials PDF',
        description: 'Download a PDF with curated study notes for competitive exams.',
        price: 75,
        icon: StoreIcon
    },
    {
        id: 'mock-interview',
        name: 'Mock Interview Session',
        description: 'A 30-minute one-on-one mock interview session with an AI career coach.',
        price: 150,
        icon: ScholarshipIcon
    }
];