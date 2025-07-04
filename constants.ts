import { Scheme, LeaderboardUser, RedeemPerk } from './types';
import { StoreIcon } from './components/icons/StoreIcon';
import { ScholarshipIcon } from './components/icons/ScholarshipIcon';
import { Scholarship } from './types';

export const RECOMMENDED_SCHOLARSHIPS: Scholarship[] = [
   {
    id: '1',
    name: 'AICTE Pragati Scholarship for Girls',
    provider: 'AICTE',
    deadline: '31 August 2025',
    amount: '₹50,000/year',
    link: 'https://aicte-india.org/schemes/students-development-schemes',
    eligibility: {
      minAge: 18,
      maxAge: 30,
      course: ['B.Tech'],
      caste: ['OBC', 'SC', 'ST'],
      maxIncome: 800000,
      state: ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir']
    },
  },
  {
    id: '2',
    name: 'Post Matric Scholarship for SC Students',
    provider: 'State Government (UP)',
    deadline: '15 September 2025',
    amount: '₹12,000/year',
    link: 'https://scholarship.up.gov.in',
    eligibility: {
      minAge : 18,
      maxAge: 30,
      course: ['B.Com', 'BA', 'B.Sc'],
      caste: ['SC'],
      maxIncome: 250000,
      state: ['Uttar Pradesh'],
    },
  },
  {
    id: '3',
    name: 'Merit-cum-Means Scholarship',
    provider: 'Ministry of Minority Affairs',
    deadline: '10 September 2025',
    amount: '₹20,000/year',
    link: 'https://scholarships.gov.in',
    eligibility: {
      minAge: 18,
      maxAge: 30,
      course: ['B.Tech'],
      caste: ['OBC', 'EBC'],
      maxIncome: 250000,
      state: ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir']
    },
  },
  {
    id: '4',
    name: 'Saksham Scholarship for Differently Abled Students',
    provider: 'AICTE',
    deadline: '20 August 2025',
    amount: '₹50,000/year',
    link: 'https://aicte-india.org/schemes/students-development-schemes',
    eligibility: {
      minAge: 18,
      maxAge: 30,
      course: ['B.Tech', 'Diploma'],
      caste: ['General'],
      maxIncome: 800000,
      state: ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir']
    },
  },
  {
    id: '5',
    name: 'State Merit Scholarship',
    provider: 'Kerala Government',
    deadline: '10 October 2025',
    amount: '₹10,000/year',
    link: 'https://dcescholarship.kerala.gov.in',
    eligibility: {
      minAge: 18,
      maxAge: 30,
      course: ['B.Sc'],
      caste: ['General', 'OBC'],
      maxIncome: 600000,
      state: ['Kerala'],
    },
  },
  {
    id: '6',
    name: 'Ishan Uday Scholarship for North Eastern Students',
    provider: 'UGC',
    deadline: '5 September 2025',
    amount: '₹7,800/month',
    link: 'https://scholarships.gov.in',
    eligibility: {
      minAge: 18,
      maxAge: 25,
      course: ['B.Tech', 'BA'],
      caste: ['General'],
      maxIncome: 450000,
      state: ['Assam', 'Meghalaya', 'Nagaland', 'Tripura'],
    },
  },
  {
    id: '7',
    name: 'EBC Post Matric Scholarship',
    provider: 'Bihar Government',
    deadline: '20 October 2025',
    amount: '₹10,000/year',
    link: 'https://pmsonline.bih.nic.in',
    eligibility: {
      minAge: 18,
      maxAge: 30,
      course: ['BA', 'B.Com', 'B.Sc'],
      caste: ['EBC'],
      maxIncome: 200000,
      state: ['Bihar'],
    },
  },
  {
    id: '8',
    name: 'National Means-cum-Merit Scholarship (NMMS)',
    provider: 'Ministry of Education',
    deadline: '30 September 2025',
    amount: '₹12,000/year',
    link: 'https://scholarships.gov.in',
    eligibility: {
      minAge: 13,
      maxAge: 16,
      course: ['8th', '9th', '10th'],
      caste: ['General'],
      maxIncome: 150000,
      state: ['All'],
    },
  },
  {
  id: '9',
  name: 'Vahani Scholarship',
  provider: 'Vahani Scholarship Trust',
  deadline: '20 November 2025',
  amount: 'Full Tuition + Living',
  link: 'https://www.vahanischolarship.com/',
  eligibility: {
    minAge: 17,
    maxAge: 23,
    course: ['Any UG'],
    caste: ['SC', 'ST'],
    incomeRange: 'Below ₹1 Lakh',
    state: ['Bihar', 'Jharkhand', 'West Bengal']
  }
},
{
  id: '10',
  name: 'Tata Capital Pankh Scholarship',
  provider: 'Tata Capital',
  deadline: '1 October 2025',
  amount: '₹12,000–₹20,000/year',
  link: 'https://www.vidyasaarathi.co.in/',
  eligibility: {
    minAge: 17,
    maxAge: 26,
    course: ['B.Com', 'BBA', 'B.Sc'],
    caste: ['OBC', 'General'],
    incomeRange: '₹1 Lakh – ₹5 Lakh',
    state: ['Maharashtra', 'Gujarat', 'Rajasthan']
  }
},
{
  id: '11',
  name: 'GSK Scholars Program',
  provider: 'GlaxoSmithKline',
  deadline: '15 September 2025',
  amount: '₹80,000/year',
  link: 'https://www.vidyasaarathi.co.in/',
  eligibility: {
    minAge: 18,
    maxAge: 30,
    course: ['B.Pharm', 'B.Sc Nursing'],
    caste: ['All'],
    incomeRange: '₹1 Lakh – ₹5 Lakh',
    state: ['Tamil Nadu', 'Karnataka', 'Kerala']
  }
},
{
  id: '12',
  name: 'Siemens India Scholarship',
  provider: 'Siemens India',
  deadline: '30 August 2025',
  amount: '₹50,000/year + mentoring',
  link: 'https://www.siemens.co.in/',
  eligibility: {
    minAge: 18,
    maxAge: 22,
    course: ['B.Tech'],
    caste: ['All'],
    incomeRange: 'Below ₹1 Lakh',
    state: ['Maharashtra', 'Delhi', 'Haryana', 'Gujarat']
  }
},
{
  id: '13',
  name: 'Santoor Women’s Scholarship',
  provider: 'Wipro Foundation',
  deadline: '25 August 2025',
  amount: '₹24,000/year',
  link: 'https://www.santoorscholarship.com/',
  eligibility: {
    minAge: 17,
    maxAge: 23,
    course: ['BA', 'BSc'],
    caste: ['All'],
    incomeRange: '₹1 Lakh – ₹5 Lakh',
    state: ['Karnataka', 'Andhra Pradesh', 'Telangana']
  }
},
{
  id: '14',
  name: 'Kotak Shiksha Nidhi',
  provider: 'Kotak Education Foundation',
  deadline: '10 October 2025',
  amount: 'Full Fees Reimbursement',
  link: 'https://kotakeducation.org/',
  eligibility: {
    minAge: 18,
    maxAge: 28,
    course: ['B.Com', 'B.Sc', 'BA'],
    caste: ['All'],
    incomeRange: 'Below ₹1 Lakh',
    state: ['All states except J&K']
  }
},
{
  id: '15',
  name: 'NSDL Shiksha Sahyog',
  provider: 'NSDL e-Gov',
  deadline: '31 August 2025',
  amount: '₹12,000/year',
  link: 'https://www.vidyasaarathi.co.in/',
  eligibility: {
    minAge: 17,
    maxAge: 25,
    course: ['B.Com', 'BBA', 'BA'],
    caste: ['All'],
    incomeRange: '₹5 Lakh – ₹10 Lakh',
    state: ['Uttar Pradesh', 'Madhya Pradesh', 'Delhi']
  }
},
{
  id: '16',
  name: 'Nabanna Scholarship',
  provider: 'West Bengal Government',
  deadline: '30 September 2025',
  amount: '₹10,000/year',
  link: 'https://wbcmo.gov.in/',
  eligibility: {
    minAge: 17,
    maxAge: 25,
    course: ['Any'],
    caste: ['All'],
    incomeRange: 'Below ₹1 Lakh',
    state: ['West Bengal']
  }
},
{
  id: '17',
  name: 'Indira Gandhi PG Scholarship for Single Girl Child',
  provider: 'UGC',
  deadline: '10 December 2025',
  amount: '₹36,200/year',
  link: 'https://www.ugc.ac.in/',
  eligibility: {
    minAge: 20,
    maxAge: 30,
    course: ['PG'],
    caste: ['All'],
    incomeRange: '₹1 Lakh – ₹5 Lakh',
    state: ['All']
  }
},
{
  id: '18',
  name: 'ONGC Scholarship for SC/ST',
  provider: 'ONGC Foundation',
  deadline: '1 November 2025',
  amount: '₹48,000/year',
  link: 'https://www.ongcscholar.org/',
  eligibility: {
    minAge: 17,
    maxAge: 30,
    course: ['Engineering', 'MBBS', 'MBA'],
    caste: ['SC', 'ST'],
    incomeRange: '₹1 Lakh – ₹5 Lakh',
    state: ['Rajasthan', 'Odisha', 'Jharkhand', 'Chhattisgarh']
  }
},

    {
    id: '31',
    name: 'Girl Child Education Incentive',
    provider: 'Haryana Government',
    deadline: '10 October 2025',
    amount: '₹5,000/year',
    link: 'https://haryanascbc.gov.in/',
    eligibility: {
      minAge: 18,
      maxAge: 25,
      course: ['BA', 'B.Com'],
      caste: ['General', 'OBC'],
      maxIncome: 200000,
      state: ['Haryana'],
    },
  },
  {
    id: '32',
    name: 'Kanya Vidya Dhan Yojana',
    provider: 'UP Government',
    deadline: '25 August 2025',
    amount: '₹30,000 one-time',
    link: 'https://scholarship.up.gov.in',
    eligibility: {
      minAge: 18,
      maxAge: 22,
      course: ['BA', 'B.Sc', 'B.Com'],
      caste: ['SC', 'ST'],
      maxIncome: 200000,
      state: ['Uttar Pradesh'],
    },
  },
  {
    id: '33',
    name: 'Jharkhand E-Kalyan for Minority Students',
    provider: 'Jharkhand Government',
    deadline: '30 October 2025',
    amount: '₹15,000/year',
    link: 'https://ekalyan.cgg.gov.in/',
    eligibility: {
      minAge: 18,
      maxAge: 30,
      course: ['B.Com', 'BA'],
      caste: ['Minority'],
      maxIncome: 250000,
      state: ['Jharkhand'],
    },
  },
  {
    id: '34',
    name: 'Medhavi National Scholarship',
    provider: 'Human Resource Development Mission',
    deadline: '15 September 2025',
    amount: '₹8,000/month',
    link: 'https://medhavionline.org',
    eligibility: {
      minAge: 18,
      maxAge: 28,
      course: ['Any'],
      caste: ['All'],
      maxIncome: 600000,
      state: ['All'],
    },
  },
  {
    id: '35',
    name: 'Himachal Pradesh Indira Gandhi Utkrisht Chhatravriti Yojana',
    provider: 'HP Government',
    deadline: '1 September 2025',
    amount: '₹10,000/year',
    link: 'https://scholarships.gov.in',
    eligibility: {
      minAge: 18,
      maxAge: 25,
      course: ['B.Sc'],
      caste: ['General'],
      maxIncome: 300000,
      state: ['Himachal Pradesh'],
    },
  },
  {
    id: '36',
    name: 'Odisha PRERANA Scholarship',
    provider: 'Odisha Government',
    deadline: '5 October 2025',
    amount: '₹10,000/year',
    link: 'https://mpsc.mp.nic.in',
    eligibility: {
      minAge: 18,
      maxAge: 30,
      course: ['BA', 'B.Com', 'B.Sc'],
      caste: ['SC', 'ST', 'OBC'],
      maxIncome: 250000,
      state: ['Odisha'],
    },
  },
  {
    id: '37',
    name: 'Jnanabhumi Post-Matric Scholarship',
    provider: 'Andhra Pradesh Government',
    deadline: '20 October 2025',
    amount: '₹15,000/year',
    link: 'https://jnanabhumi.ap.gov.in',
    eligibility: {
      minAge: 18,
      maxAge: 28,
      course: ['B.Tech', 'BBA'],
      caste: ['SC', 'ST', 'OBC'],
      maxIncome: 250000,
      state: ['Andhra Pradesh'],
    },
  },
  {
    id: '38',
    name: 'ePASS Telangana Post-Matric Scholarship',
    provider: 'Telangana Government',
    deadline: '25 October 2025',
    amount: '₹10,000/year',
    link: 'https://telanganaepass.cgg.gov.in',
    eligibility: {
      minAge: 18,
      maxAge: 28,
      course: ['BA', 'B.Com', 'B.Sc'],
      caste: ['OBC', 'SC'],
      maxIncome: 200000,
      state: ['Telangana'],
    },
  },
  {
    id: '39',
    name: 'Madhya Pradesh Gaon Ki Beti Scholarship',
    provider: 'MP Government',
    deadline: '12 September 2025',
    amount: '₹5,000/year',
    link: 'https://mpscholarshipportal.mp.nic.in',
    eligibility: {
      minAge: 18,
      maxAge: 22,
      course: ['B.Sc', 'BA'],
      caste: ['All'],
      maxIncome: 300000,
      state: ['Madhya Pradesh'],
    },
  },
  {
    id: '40',
    name: 'Gujarat Post-Matric Scholarship for OBC',
    provider: 'Gujarat Government',
    deadline: '10 September 2025',
    amount: '₹12,000/year',
    link: 'https://digitalgujarat.gov.in',
    eligibility: {
      minAge: 18,
      maxAge: 30,
      course: ['BA', 'B.Com'],
      caste: ['OBC'],
      maxIncome: 250000,
      state: ['Gujarat'],
    },
  },
  {
    id: '41',
    name: 'Punjab Ashirwad Scholarship',
    provider: 'Punjab Government',
    deadline: '10 October 2025',
    amount: '₹13,000/year',
    link: 'https://punjabscholarships.gov.in',
    eligibility: {
      minAge: 18,
      maxAge: 28,
      course: ['B.Sc', 'B.Com'],
      caste: ['SC'],
      maxIncome: 200000,
      state: ['Punjab'],
    },
  },
  {
    id: '42',
    name: 'Bihar Chief Minister Kanya Utthan Yojana',
    provider: 'Bihar Government',
    deadline: '18 October 2025',
    amount: '₹25,000 one-time',
    link: 'https://ekalyan.bih.nic.in',
    eligibility: {
      minAge: 18,
      maxAge: 22,
      course: ['BA'],
      caste: ['All'],
      maxIncome: 300000,
      state: ['Bihar'],
    },
  },
{
  id: '31',
  name: 'L&T Build India Scholarship',
  provider: 'Larsen & Toubro',
  deadline: '10 September 2025',
  amount: '₹36,000/year + Job Offer',
  link: 'https://www.lntecc.com',
  eligibility: {
    minAge: 18,
    maxAge: 28,
    course: ['Civil Engineering'],
    caste: ['General', 'OBC', 'SC'],
    maxIncome: 500000,
    state: ['Maharashtra', 'Tamil Nadu', 'Karnataka', 'Andhra Pradesh'],
  },
},
{
  id: '32',
  name: 'HDFC Educational Crisis Scholarship',
  provider: 'HDFC Bank',
  deadline: '15 August 2025',
  amount: '₹25,000/year',
  link: 'https://www.hdfcbank.com',
  eligibility: {
    minAge: 17,
    maxAge: 30,
    course: ['B.Com', 'B.Sc', 'Diploma'],
    caste: ['General', 'OBC', 'SC', 'ST'],
    maxIncome: 360000,
    state: ['Uttar Pradesh', 'Delhi', 'Haryana', 'Punjab'],
  },
},
{
  id: '33',
  name: 'Vidyadhan Scholarship',
  provider: 'SDF Foundation',
  deadline: '20 July 2025',
  amount: '₹10,000/year',
  link: 'https://www.vidyadhan.org',
  eligibility: {
    minAge: 17,
    maxAge: 24,
    course: ['BA', 'B.Sc'],
    caste: ['SC', 'OBC', 'General'],
    maxIncome: 200000,
    state: ['Telangana', 'Karnataka', 'Odisha', 'Maharashtra'],
  },
},
{
  id: '34',
  name: 'LIC Golden Jubilee Scholarship',
  provider: 'LIC',
  deadline: '30 September 2025',
  amount: '₹20,000/year',
  link: 'https://licindia.in',
  eligibility: {
    minAge: 17,
    maxAge: 25,
    course: ['B.Tech', 'B.A.', 'B.Com'],
    caste: ['SC', 'ST', 'OBC', 'EWS'],
    maxIncome: 250000,
    state: ['Bihar', 'West Bengal', 'Jharkhand', 'Assam'],
  },
},
{
  id: '35',
  name: 'Fair and Lovely Scholarship',
  provider: 'Glow & Lovely Foundation',
  deadline: '10 October 2025',
  amount: '₹25,000/year',
  link: 'https://www.glowandlovelycareers.in',
  eligibility: {
    minAge: 17,
    maxAge: 25,
    course: ['Any'],
    caste: ['General', 'OBC'],
    maxIncome: 300000,
    state: ['Kerala', 'Tamil Nadu', 'Karnataka', 'Andhra Pradesh'],
  },
},
{
  id: '36',
  name: 'ONGC Scholarship for OBC Students',
  provider: 'ONGC',
  deadline: '1 November 2025',
  amount: '₹48,000/year',
  link: 'https://ongcscholar.org',
  eligibility: {
    minAge: 18,
    maxAge: 30,
    course: ['Engineering', 'MBA', 'MBBS'],
    caste: ['OBC'],
    maxIncome: 200000,
    state: ['Maharashtra', 'Odisha', 'Uttar Pradesh'],
  },
},
{
  id: '37',
  name: 'Colgate Keep India Smiling Foundation Scholarship',
  provider: 'Colgate-Palmolive',
  deadline: '30 September 2025',
  amount: '₹20,000/year',
  link: 'https://www.colgatecares.co.in',
  eligibility: {
    minAge: 17,
    maxAge: 25,
    course: ['B.Sc', 'B.Com', 'BA'],
    caste: ['Any'],
    maxIncome: 500000,
    state: ['Tamil Nadu', 'Gujarat', 'Rajasthan', 'Delhi'],
  },
},
{
  id: '38',
  name: 'Maulana Azad National Scholarship',
  provider: 'MAEF',
  deadline: '31 August 2025',
  amount: '₹12,000/year',
  link: 'https://www.maef.nic.in',
  eligibility: {
    minAge: 17,
    maxAge: 24,
    course: ['BA', 'B.Com'],
    caste: ['Minority'],
    maxIncome: 200000,
    state: ['Uttar Pradesh', 'Madhya Pradesh', 'Bihar', 'West Bengal'],
  },
},
{
  id: '39',
  name: 'Bhumi Fellowship',
  provider: 'Bhumi Organization',
  deadline: '15 July 2025',
  amount: '₹18,000/month',
  link: 'https://fellowship.bhumi.ngo',
  eligibility: {
    minAge: 21,
    maxAge: 30,
    course: ['Any Graduate'],
    caste: ['Any'],
    maxIncome: 600000,
    state: ['Tamil Nadu', 'Karnataka'],
  },
},
{
  id: '40',
  name: 'Sitaram Jindal Foundation Scholarship',
  provider: 'Jindal Foundation',
  deadline: '30 November 2025',
  amount: '₹12,000/year',
  link: 'http://www.sitaramjindalfoundation.org',
  eligibility: {
    minAge: 17,
    maxAge: 26,
    course: ['Diploma', 'B.Com', 'B.Sc'],
    caste: ['OBC', 'SC', 'General'],
    maxIncome: 400000,
    state: ['Odisha', 'Jharkhand', 'Karnataka', 'West Bengal'],
  },
},

 {
  id: '41',
  name: 'Haryana Merit Scholarship Scheme',
  provider: 'Haryana Government',
  deadline: '5 September 2025',
  amount: '₹12,000/year',
  link: 'https://harchhatravratti.highereduhry.ac.in',
  eligibility: {
    minAge: 17,
    maxAge: 26,
    course: ['BA', 'B.Sc', 'B.Com'],
    caste: ['General', 'OBC'],
    maxIncome: 300000,
    state: ['Haryana'],
  },
},
{
  id: '42',
  name: 'Telangana ePASS Post Matric Scholarship',
  provider: 'Telangana Government',
  deadline: '30 September 2025',
  amount: '₹20,000/year',
  link: 'https://telanganaepass.cgg.gov.in',
  eligibility: {
    minAge: 17,
    maxAge: 30,
    course: ['B.Tech', 'B.Com', 'BA'],
    caste: ['SC', 'ST', 'OBC'],
    maxIncome: 200000,
    state: ['Telangana'],
  },
},
{
  id: '43',
  name: 'Rajasthan CM Higher Education Scholarship',
  provider: 'Rajasthan Government',
  deadline: '10 October 2025',
  amount: '₹5,000/year',
  link: 'https://hte.rajasthan.gov.in',
  eligibility: {
    minAge: 18,
    maxAge: 25,
    course: ['BA', 'B.Sc'],
    caste: ['EWS', 'General'],
    maxIncome: 250000,
    state: ['Rajasthan'],
  },
},
{
  id: '44',
  name: 'Goa Education Trust Scholarship',
  provider: 'British Council',
  deadline: '1 August 2025',
  amount: '₹25,000/year',
  link: 'https://www.britishcouncil.in',
  eligibility: {
    minAge: 18,
    maxAge: 30,
    course: ['Any UG'],
    caste: ['Any'],
    maxIncome: 500000,
    state: ['Goa'],
  },
},
{
  id: '45',
  name: 'Mizoram Scholarship Board Scheme',
  provider: 'Mizoram Government',
  deadline: '15 September 2025',
  amount: '₹10,000/year',
  link: 'https://scholarship.mizoram.gov.in',
  eligibility: {
    minAge: 17,
    maxAge: 26,
    course: ['B.Com', 'BA', 'B.Sc'],
    caste: ['ST'],
    maxIncome: 200000,
    state: ['Mizoram'],
  },
},
{
  id: '46',
  name: 'Nagaland Post-Matric Scholarship',
  provider: 'Nagaland Government',
  deadline: '30 September 2025',
  amount: '₹15,000/year',
  link: 'https://scholarship.nagaland.gov.in',
  eligibility: {
    minAge: 17,
    maxAge: 27,
    course: ['Diploma', 'BA'],
    caste: ['ST'],
    maxIncome: 200000,
    state: ['Nagaland'],
  },
},
{
  id: '47',
  name: 'Assam Means-cum-Merit Scholarship',
  provider: 'Assam Government',
  deadline: '15 August 2025',
  amount: '₹10,000/year',
  link: 'https://directorateofhighereducation.assam.gov.in',
  eligibility: {
    minAge: 17,
    maxAge: 25,
    course: ['B.Sc', 'BA'],
    caste: ['General', 'OBC'],
    maxIncome: 250000,
    state: ['Assam'],
  },
},
{
  id: '48',
  name: 'Punjab Ashirwad Scholarship',
  provider: 'Punjab Government',
  deadline: '5 October 2025',
  amount: '₹12,000/year',
  link: 'https://punjabscholarships.gov.in',
  eligibility: {
    minAge: 18,
    maxAge: 28,
    course: ['B.Com', 'Diploma'],
    caste: ['SC'],
    maxIncome: 250000,
    state: ['Punjab'],
  },
},
{
  id: '49',
  name: 'Tripura Higher Education Scholarship',
  provider: 'Tripura Government',
  deadline: '20 September 2025',
  amount: '₹15,000/year',
  link: 'https://highereducation.tripura.gov.in',
  eligibility: {
    minAge: 17,
    maxAge: 25,
    course: ['B.Sc', 'BA', 'B.Com'],
    caste: ['ST', 'OBC'],
    maxIncome: 200000,
    state: ['Tripura'],
  },
},
{
  id: '50',
  name: 'Jammu and Kashmir PMSSS',
  provider: 'AICTE',
  deadline: '25 August 2025',
  amount: '₹1,00,000/year + Hostel',
  link: 'https://aicte-jk-scholarship-gov.in',
  eligibility: {
    minAge: 18,
    maxAge: 30,
    course: ['B.Tech', 'B.Sc'],
    caste: ['Any'],
    maxIncome: 800000,
    state: ['Jammu and Kashmir'],
  },
}


];


export const RECOMMENDED_SCHEMES: Scheme[] = [
  {
    id: '1',
    title: 'National Scholarship for Students',
    department: 'Ministry of Education',
    description: 'Scholarship for meritorious students across India.',
    eligibility: 'Students scoring above 80% in Class 12',
    link: 'https://scholarships.gov.in',
    category: 'Student',
    income: '1-5 Lakhs',
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
    income: '1-5 Lakhs',
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
    income: '1-5 Lakhs',
    tags: ['women'],
  },
  {
    id: '4',
    title: 'Stand Up India Scheme',
    department: 'Department of Financial Services',
    description: 'Loan facility for women and SC/ST entrepreneurs.',
    eligibility: 'SC/ST or women entrepreneurs above 18 years',
    link: 'https://standupmitra.in',
    category: 'Entrepreneur',
    income: '5-10 Lakhs',
    tags: ['entrepreneur', 'SC', 'women'],
  },
  {
    id: '5',
    title: 'e-Shram Card Benefit Scheme',
    department: 'Ministry of Labour and Employment',
    description: 'Insurance and welfare for unorganized workers.',
    eligibility: 'Unorganized sector workers aged 16–59',
    link: 'https://eshram.gov.in',
    category: 'Laborer',
    income: '< 1 Lakh',
    tags: ['laborer'],
  },
  {
    id: '6',
    title: 'Atal Pension Yojana',
    department: 'PFRDA',
    description: 'Monthly pension for low-income workers post-retirement.',
    eligibility: 'Age 18-40 and not under income tax slab',
    link: 'https://npscra.nsdl.co.in',
    category: 'Laborer',
    income: '1-5 Lakhs',
    tags: ['retirement'],
  },
  {
    id: '7',
    title: 'PM Vishwakarma Yojana',
    department: 'Ministry of Skill Development',
    description: 'Loan and training support for artisans & craftsmen.',
    eligibility: 'Traditional artisans & craftsmen',
    link: 'https://pmvishwakarma.gov.in',
    category: 'Industrial Worker',
    income: '1-5 Lakhs',
    tags: ['artisan'],
  },
  {
    id: '8',
    title: 'PM Awas Yojana - Urban',
    department: 'MoHUA',
    description: 'Housing subsidy for urban low-income families.',
    eligibility: 'EWS, LIG, MIG',
    link: 'https://pmaymis.gov.in',
    category: 'Laborer',
    income: '1-5 Lakhs',
    tags: ['housing'],
  },
  {
    id: '9',
    title: 'Sukanya Samriddhi Yojana',
    department: 'Ministry of Finance',
    description: 'Savings for girl child’s education & marriage.',
    eligibility: 'Parents of girl child under 10 years',
    link: 'https://www.indiapost.gov.in',
    category: 'Women',
    income: '< 1 Lakh',
    tags: ['girl'],
  },
  {
    id: '10',
    title: 'Apprenticeship Promotion Scheme',
    department: 'Ministry of Skill Dev',
    description: 'Incentive for industrial apprenticeships.',
    eligibility: 'Min class 5 and 14 years old',
    link: 'https://apprenticeshipindia.gov.in',
    category: 'Industrial Worker',
    income: '1-5 Lakhs',
    tags: ['apprentice'],
  },
  {
    id: '11',
    title: 'Jan Dhan Yojana',
    department: 'Ministry of Finance',
    description: 'Zero balance bank accounts for poor.',
    eligibility: 'All citizens without bank accounts',
    link: 'https://pmjdy.gov.in',
    category: 'Laborer',
    income: '< 1 Lakh',
    tags: ['banking'],
  },
  {
    id: '12',
    title: 'Nai Roshni Scheme',
    department: 'Minority Affairs',
    description: 'Leadership training for minority women.',
    eligibility: 'Minority women aged 18–65',
    link: 'https://minorityaffairs.gov.in',
    category: 'Women',
    income: '1-5 Lakhs',
    tags: ['minority'],
  },
  {
    id: '13',
    title: 'PM Mudra Yojana',
    department: 'Ministry of Finance',
    description: 'Loans to non-corporate small businesses.',
    eligibility: 'Small business owners',
    link: 'https://www.mudra.org.in',
    category: 'Entrepreneur',
    income: '5-10 Lakhs',
    tags: ['business'],
  },
  {
    id: '14',
    title: 'Krishi Sinchai Yojana',
    department: 'Ministry of Jal Shakti',
    description: 'Irrigation facilities for farmers.',
    eligibility: 'Small & marginal farmers',
    link: 'https://pmksy.gov.in',
    category: 'Farmer',
    income: '1-5 Lakhs',
    tags: ['farmer'],
  },
  {
    id: '15',
    title: 'Ujjwala Yojana',
    department: 'Petroleum Ministry',
    description: 'Free LPG connection for BPL families.',
    eligibility: 'BPL families',
    link: 'https://pmuy.gov.in',
    category: 'Laborer',
    income: '< 1 Lakh',
    tags: ['gas'],
  },
  {
    id: '16',
    title: 'Start-up India Scheme',
    department: 'DPIIT',
    description: 'Tax benefits and loans for startups.',
    eligibility: 'Startups recognized by DPIIT',
    link: 'https://www.startupindia.gov.in',
    category: 'Entrepreneur',
    income: '> 10 Lakhs',
    tags: ['startup'],
  },
  {
    id: '17',
    title: 'FPO Scheme',
    department: 'MoA',
    description: 'Support for Farmer Producer Organizations.',
    eligibility: 'Farmer groups/collectives',
    link: 'https://sfacindia.com',
    category: 'Farmer',
    income: '1-5 Lakhs',
    tags: ['farmer'],
  },
  {
    id: '18',
    title: 'PMSBY Insurance',
    department: 'Ministry of Finance',
    description: '₹2L insurance for accidental death.',
    eligibility: 'Age 18–70 bank holders',
    link: 'https://jansuraksha.gov.in',
    category: 'Laborer',
    income: '< 1 Lakh',
    tags: ['insurance'],
  },
  {
    id: '19',
    title: 'SC/ST Entrepreneur Scheme',
    department: 'NSIC',
    description: 'Loan and training for SC/ST entrepreneurs.',
    eligibility: 'SC/ST business owners',
    link: 'https://nsic.co.in',
    category: 'Entrepreneur',
    income: '5-10 Lakhs',
    tags: ['SC', 'ST'],
  },
  {
    id: '20',
    title: 'Kanya Vivah Yojana',
    department: 'State Govts',
    description: 'Financial aid for girl’s marriage.',
    eligibility: 'Low-income parents of girls',
    link: 'https://www.cmsvy.upsdc.gov.in/index.php',
    category: 'Women',
    income: '< 1 Lakh',
    tags: ['marriage'],
  },
  {
    id: '21',
    title: 'Manav Garima Yojana',
    department: 'Gujarat Govt',
    description: 'Tools and kits for SC entrepreneurs.',
    eligibility: 'SC applicants below poverty line',
    link: 'https://www.bing.com/ck/a?!&&p=719a4346be5c8551708729246d60727735c6d4c6614cfa7147100bd88ab9b433JmltdHM9MTc1MTUwMDgwMA&ptn=3&ver=2&hsh=4&fclid=213968c5-425d-6806-0fe8-7ec743846980&psq=Manav+Garima+Yojana&u=a1aHR0cHM6Ly93d3cubXlzY2hlbWUuZ292LmluL2hpL3NjaGVtZXMvbWd5&ntb=1',
    category: 'Entrepreneur',
    income: '< 1 Lakh',
    tags: ['SC'],
  },
  {
    id: '22',
    title: 'Old Age Pension Yojana',
    department: 'Social Welfare Dept',
    description: 'Monthly pension for elderly people.',
    eligibility: 'Senior citizens without income',
    link: 'https://nsap.nic.in/circular.do?method=aboutus',
    category: 'Laborer',
    income: '< 1 Lakh',
    tags: ['senior'],
  },
  {
    id: '23',
    title: 'Self-Employment Scheme for Shopkeepers',
    department: 'MSME',
    description: 'Loans and subsidies for small shopkeepers.',
    eligibility: 'Registered small shop owners',
    link: 'https://labour.gov.in/nps-traders',
    category: 'Shopkeeper',
    income: '1-5 Lakhs',
    tags: ['shopkeeper'],
  },
  {
    id: '24',
    title: 'Gram Udyog Yojana',
    department: 'Ministry of Micro, Small & Medium Enterprises',
    description: 'Support for village industries and self-employment.',
    eligibility: 'Rural artisans and small entrepreneurs',
    link: 'https://msme.gov.in',
    category: 'Industrial',
    tags: ['self-employment', 'rural'],
    income: '1–5 Lakhs',
  },
  {
    id: '25',
    title: 'Labor Welfare Housing Scheme',
    department: 'Ministry of Labour & Employment',
    description: 'Affordable housing for registered laborers.',
    eligibility: 'Construction workers and laborers',
    link: 'https://labour.gov.in',
    category: 'Laborer',
    tags: ['housing', 'labor'],
    income: '1–5 Lakhs',
  },
  {
    id: '26',
    title: 'Digital India Shopkeeper Scheme',
    department: 'Ministry of Electronics & IT',
    description: 'Support for shopkeepers to go digital.',
    eligibility: 'Retailers and shop owners',
    link: 'https://digitalindia.gov.in',
    category: 'Shopkeeper',
    tags: ['digital', 'retail'],
    income: '> 10 Lakhs',
  },
  {
    id: '27',
    title: 'Kisan Credit Card (KCC)',
    department: 'Ministry of Agriculture',
    description: 'Short-term credit support for farmers.',
    eligibility: 'All small and marginal farmers',
    link: 'https://pmkisan.gov.in',
    category: 'Farmer',
    tags: ['credit', 'loan'],
    income: '1–5 Lakhs',
  },
  {
    id: '28',
    title: 'Entrepreneurship Scheme for Women',
    department: 'Ministry of Women & Child Development',
    description: 'Financial aid to women to start micro businesses.',
    eligibility: 'Women aged 18–50 with a business plan',
    link: 'https://wcd.nic.in',
    category: 'Women',
    tags: ['entrepreneur', 'startup'],
    income: '5–10 Lakhs',
  },
  {
    id: '29',
    title: 'Street Vendor Rehabilitation Scheme',
    department: 'Ministry of Housing & Urban Affairs',
    description: 'Loan and subsidy for registered street vendors.',
    eligibility: 'Street vendors with proof of ID',
    link: 'https://pmsvanidhi.mohua.gov.in',
    category: 'Laborer',
    tags: ['loan', 'vendor'],
    income: '< 1 Lakh',
  },
  {
    id: '30',
    title: 'Export Incentive Scheme for MSMEs',
    department: 'Ministry of Commerce',
    description: 'Subsidy on exports for registered MSMEs.',
    eligibility: 'MSMEs registered with Udyam portal',
    link: 'https://msme.gov.in',
    category: 'Industrial',
    tags: ['export', 'industry'],
    income: '> 10 Lakhs',
  },
  {
    id: '31',
    title: 'Pension for Unorganized Workers',
    department: 'Ministry of Labour & Employment',
    description: 'Monthly pension post age 60 for informal sector workers.',
    eligibility: 'Unorganized sector workers aged 18–40',
    link: 'https://maandhan.in',
    category: 'Laborer',
    tags: ['pension', 'unorganized'],
    income: '< 1 Lakh',
  },
  {
    id: '32',
    title: 'Startup India Seed Fund',
    department: 'Ministry of Commerce & Industry',
    description: 'Seed funding for startups in Tier-2/3 cities.',
    eligibility: 'New startups with innovation potential',
    link: 'https://startupindia.gov.in',
    category: 'Industrial',
    tags: ['startup', 'innovation'],
    income: '5–10 Lakhs',
  },
  {
    id: '33',
    title: 'Credit Guarantee Scheme for Shopkeepers',
    department: 'Ministry of Finance',
    description: 'Loan support with credit guarantee for small businesses.',
    eligibility: 'Shopkeepers with valid Udyam registration',
    link: 'https://msme.gov.in',
    category: 'Shopkeeper',
    tags: ['loan', 'credit'],
    income: '1–5 Lakhs',
  }
];



export const LEADERBOARD_DATA: LeaderboardUser[] = [
  { rank: 1, name: 'Ramesh Kumar', location: 'Punjab', tokens: 250, avatarUrl: 'https://i.pravatar.cc/150?img=1' },
  { rank: 2, name: 'Sunita Devi', location: 'Uttar Pradesh', tokens: 235, avatarUrl: 'https://i.pravatar.cc/150?img=5' },
  { rank: 3, name: 'Arjun Singh', location: 'Rajasthan', tokens: 210, avatarUrl: 'https://i.pravatar.cc/150?img=3' },
  { rank: 4, name: 'Ramesh Sharma', location: 'Maharashtra', tokens: 198, avatarUrl: 'https://i.pravatar.cc/150?img=8' },
  { rank: 5, name: 'Amit Patel', location: 'Gujarat', tokens: 180, avatarUrl: 'https://i.pravatar.cc/150?img=7' },
  { rank: 6, name: 'Vaibhav Reddy', location: 'Andhra Pradesh', tokens: 172, avatarUrl: 'https://i.pravatar.cc/150?img=11' },
  { rank: 7, name: 'Sandeep Tiwari', location: 'Madhya Pradesh', tokens: 165, avatarUrl: 'https://i.pravatar.cc/150?img=12' },
  { rank: 8, name: 'Arjun Das', location: 'West Bengal', tokens: 150, avatarUrl: 'https://i.pravatar.cc/150?img=14' },
];

// constants.ts
export type Perk = {
  id: string;
  title: string;
  description: string;
  icon: string;
  price: number;
  category: 'Premium' | 'Mentorship' | 'Exam' | 'Daily' | 'Mystery';
};

export const REDEEM_PERKS: Perk[] = [
  // Premium (2)
  { id:'premium-1', title:'Premium Scheme Access', description:'Unlock detailed guides and eligibility calculators.', icon:'🏆', price:60, category:'Premium' },
  { id:'premium-2', title:'Exclusive Webinar Access', description:'Attend govt strategy sessions.', icon:'🎤', price:50, category:'Premium' },
  // Mentorship (3)
  { id:'mentorship-1', title:'1-on-1 Mentor Call', description:'Talk to a scheme advisor.', icon:'📞', price:40, category:'Mentorship' },
  { id:'mentorship-2', title:'Resume Review Session', description:'Get your resume reviewed.', icon:'📝', price:30, category:'Mentorship' },
  { id:'mentorship-3', title:'Mock Interview (Govt Jobs)', description:'Simulated interview session.', icon:'🎯', price:35, category:'Mentorship' },
  // Exam (3)
  { id:'exam-1', title:'Exam Prep Kit', description:'Practice material for exams.', icon:'📚', price:25, category:'Exam' },
  { id:'exam-2', title:'Current Affairs Digest', description:'Monthly exam-focused PDF.', icon:'📰', price:15, category:'Exam' },
  { id:'exam-3', title:'Solved PYQ Papers', description:'Papers with solutions.', icon:'📄', price:20, category:'Exam' },
  // Daily (3)
  { id:'daily-1', title:'Daily Scheme Tip', description:'Daily scheme notifications.', icon:'📅', price:5, category:'Daily' },
  { id:'daily-2', title:'Token Booster – Ad Watch', description:'Earn 10 tokens by watching a video.', icon:'🎥', price:0, category:'Daily' },
  { id:'bonus-2', title:'Badge of Supporter', description:'Earn a profile badge.', icon:'🏅', price:5, category:'Daily' },
  // Mystery (2)
  { id:'mystery-1', title:'🎁 Mystery Box', description:'Get a surprise reward!', icon:'🎁', price:10, category:'Mystery' },
  { id:'mystery-2', title:'Secret Scheme Reveal', description:'Unlock hidden schemes.', icon:'🔍', price:15, category:'Mystery' },
];