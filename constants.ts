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
];

export const LEADERBOARD_DATA: LeaderboardUser[] = [
  { rank: 1, name: 'Ramesh Kumar', location: 'Punjab', tokens: 250, avatarUrl: 'https://i.pravatar.cc/150?img=1' },
  { rank: 2, name: 'Sunita Devi', location: 'Uttar Pradesh', tokens: 235, avatarUrl: 'https://i.pravatar.cc/150?img=5' },
  { rank: 3, name: 'Arjun Singh', location: 'Rajasthan', tokens: 210, avatarUrl: 'https://i.pravatar.cc/150?img=3' },
  { rank: 4, name: 'Priya Sharma', location: 'Maharashtra', tokens: 198, avatarUrl: 'https://i.pravatar.cc/150?img=8' },
  { rank: 5, name: 'Amit Patel', location: 'Gujarat', tokens: 180, avatarUrl: 'https://i.pravatar.cc/150?img=7' },
  { rank: 6, name: 'Kavita Reddy', location: 'Andhra Pradesh', tokens: 172, avatarUrl: 'https://i.pravatar.cc/150?img=11' },
  { rank: 7, name: 'Sandeep Tiwari', location: 'Madhya Pradesh', tokens: 165, avatarUrl: 'https://i.pravatar.cc/150?img=12' },
  { rank: 8, name: 'Anjali Das', location: 'West Bengal', tokens: 150, avatarUrl: 'https://i.pravatar.cc/150?img=14' },
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
  },
  {
    id: 'ntse',
    name: 'NTSE Scholarship',
    provider: 'NCERT',
    amount: '₹1,250 - ₹2,000 per month',
    deadline: 'Aug 15, 2024',
    link: 'https://ncert.nic.in',
    eligibility: {
      course: ['Class 10'],
    },
  },
  {
    id: 'inspire',
    name: 'INSPIRE Scholarship',
    provider: 'Department of Science and Technology',
    amount: '₹80,000 per annum',
    deadline: 'Oct 15, 2024',
    link: 'https://online-inspire.gov.in/',
    eligibility: {
      course: ['B.Sc.', 'M.Sc.'],
      maxIncome: 800000,
    },
  },
  {
    id: 'kvpy',
    name: 'KVPY Scholarship',
    provider: 'DST',
    amount: '₹5,000 - ₹7,000 per month',
    deadline: 'Sep 10, 2024',
    link: 'http://kvpy.iisc.ernet.in/',
    eligibility: {
      course: ['B.Sc.', 'B.Stat'],
    },
  },
  {
    id: 'saksham',
    name: 'Saksham Scholarship',
    provider: 'AICTE',
    amount: '₹50,000 per annum',
    deadline: 'Nov 30, 2024',
    link: 'https://www.aicte-india.org/schemes/students-development-schemes/Saksham',
    eligibility: {
      disability: true,
      course: ['B.Tech'],
    },
  },
  {
    id: 'ugc-obc',
    name: 'National Fellowship for OBC Students',
    provider: 'UGC',
    amount: '₹25,000 per month',
    deadline: 'Oct 10, 2024',
    link: 'https://ugc.ac.in',
    eligibility: {
      caste: ['OBC'],
    },
  },
  {
    id: 'manf',
    name: 'Maulana Azad National Fellowship',
    provider: 'Ministry of Minority Affairs',
    amount: '₹28,000 per month',
    deadline: 'Oct 30, 2024',
    link: 'https://minorityaffairs.gov.in',
    eligibility: {
      caste: ['Muslim', 'Christian', 'Sikh', 'Buddhist', 'Parsis'],
    },
  },
  {
    id: 'begum-hazrat',
    name: 'Begum Hazrat Mahal Scholarship',
    provider: 'MAEF',
    amount: 'Up to ₹12,000',
    deadline: 'Nov 10, 2024',
    link: 'https://maef.nic.in',
    eligibility: {
      gender: 'Female',
    },
  },
  {
    id: 'nmms',
    name: 'National Means-cum-Merit Scholarship',
    provider: 'MHRD',
    amount: '₹12,000 per annum',
    deadline: 'Sep 25, 2024',
    link: 'https://scholarships.gov.in',
    eligibility: {
      course: ['Class 8'],
      maxIncome: 150000,
    },
  },
  {
    id: 'ishan-uday',
    name: 'ISHAN UDAY Special Scholarship',
    provider: 'UGC',
    amount: '₹5,400 - ₹7,800 per month',
    deadline: 'Nov 25, 2024',
    link: 'https://ugc.ac.in',
    eligibility: {
      state: ['North East'],
    },
  },
  {
    id: 'pmrf',
    name: "Prime Minister's Research Fellowship (PMRF)",
    provider: 'Ministry of Education',
    amount: '₹70,000 per month',
    deadline: 'Sep 1, 2024',
    link: 'https://pmrf.in',
    eligibility: {
      course: ['PhD'],
    },
  },
  {
    id: 'aiims-fellowship',
    name: 'AIIMS Fellowship Program',
    provider: 'AIIMS',
    amount: '₹25,000 per month',
    deadline: 'Aug 30, 2024',
    link: 'https://aiimsexams.ac.in',
    eligibility: {
      course: ['MD', 'MS'],
    },
  },
  {
    id: 'csir-net',
    name: 'CSIR-UGC NET JRF',
    provider: 'CSIR',
    amount: '₹31,000 per month',
    deadline: 'Jul 31, 2024',
    link: 'https://csirnet.nta.ac.in',
    eligibility: {
      course: ['M.Sc.'],
    },
  },
  {
    id: 'ugc-net',
    name: 'UGC NET JRF',
    provider: 'UGC',
    amount: '₹31,000 per month',
    deadline: 'Aug 31, 2024',
    link: 'https://ugcnet.nta.nic.in',
    eligibility: {
      course: ['M.A.', 'M.Com', 'M.Sc.'],
    },
  },
  {
    id: 'lic-scholarship',
    name: 'LIC Golden Jubilee Scholarship',
    provider: 'LIC',
    amount: '₹10,000 per annum',
    deadline: 'Dec 15, 2024',
    link: 'https://licindia.in',
    eligibility: {
      maxIncome: 200000,
    },
  },
  {
    id: 'siemens',
    name: 'Siemens Scholarship Program',
    provider: 'Siemens India',
    amount: '₹75,000 per annum',
    deadline: 'Oct 10, 2024',
    link: 'https://www.siemens.co.in',
    eligibility: {
      course: ['B.E.', 'B.Tech'],
    },
  },
  {
    id: 'ffe',
    name: 'Foundation for Excellence Scholarship',
    provider: 'FFE India',
    amount: 'Tuition + Living Cost',
    deadline: 'Sep 15, 2024',
    link: 'https://ffe.org',
    eligibility: {
      course: ['B.Tech', 'MBBS'],
    },
  },
  {
    id: 'gate-scholarship',
    name: 'GATE Scholarship',
    provider: 'MHRD',
    amount: '₹12,400 per month',
    deadline: 'Aug 20, 2024',
    link: 'https://education.gov.in',
    eligibility: {
      course: ['M.Tech'],
    },
  },
  {
    id: 'nikon-scholarship',
    name: 'Nikon Scholarship Program',
    provider: 'Nikon India',
    amount: '₹1,00,000',
    deadline: 'Sep 30, 2024',
    link: 'https://buddy4study.com',
    eligibility: {
      course: ['Photography', 'Design'],
    },
  },
  {
    id: 'hdfc-ecs',
    name: 'HDFC Bank Parivartan ECS Scholarship',
    provider: 'HDFC Bank',
    amount: '₹15,000 to ₹75,000',
    deadline: 'Oct 5, 2024',
    link: 'https://buddy4study.com',
    eligibility: {
      maxIncome: 300000,
    },
  },
  {
    id: 'ongc-merit',
    name: 'ONGC Scholarship for Meritorious Students',
    provider: 'ONGC Foundation',
    amount: '₹48,000 per annum',
    deadline: 'Oct 25, 2024',
    link: 'https://www.ongcscholar.org',
    eligibility: {
      course: ['Engineering', 'MBBS', 'MBA', 'Geology'],
    },
  },
  {
    id: 'aditya-birla',
    name: 'Aditya Birla Scholarship',
    provider: 'Aditya Birla Group',
    amount: '₹1,80,000 per annum',
    deadline: 'Aug 15, 2024',
    link: 'https://www.adityabirlascholars.net',
    eligibility: {
      course: ['MBA', 'Law'],
    },
  },
  {
    id: 'sitaram-jindal',
    name: 'Sitaram Jindal Foundation Scholarship',
    provider: 'SJF',
    amount: '₹500 - ₹3,200 per month',
    deadline: 'Sep 1, 2024',
    link: 'http://www.sitaramjindalfoundation.org',
    eligibility: {
      maxIncome: 400000,
    },
  },
  {
    id: 'sashakt',
    name: 'Sashakt Scholarship',
    provider: 'Dr. Reddy’s Foundation',
    amount: '₹2,40,000 for 3 years',
    deadline: 'Jul 30, 2024',
    link: 'https://www.sashaktscholarship.org',
    eligibility: {
      gender: 'Female',
      course: ['B.Sc.'],
    },
  },
  {
    id: 'ongc-scst',
    name: 'ONGC Scholarship for SC/ST Students',
    provider: 'ONGC',
    amount: '₹48,000 per annum',
    deadline: 'Oct 18, 2024',
    link: 'https://www.ongcscholar.org',
    eligibility: {
      caste: ['SC', 'ST'],
    },
  },
  {
    id: 'tata-trust',
    name: 'Tata Trusts Scholarship for Education',
    provider: 'Tata Trusts',
    amount: 'Varies',
    deadline: 'Sep 20, 2024',
    link: 'https://www.tatatrusts.org',
    eligibility: {},
  },
  {
    id: 'fair-lovely',
    name: 'Fair and Lovely Foundation Scholarship',
    provider: 'Fair and Lovely Foundation',
    amount: '₹25,000 to ₹1,00,000',
    deadline: 'Sep 30, 2024',
    link: 'https://www.fairandlovelyfoundation.in',
    eligibility: {
      gender: 'Female',
      maxIncome: 300000,
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