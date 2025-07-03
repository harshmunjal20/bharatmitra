import React, { useState, useContext } from 'react';
import { Scholarship, ScholarshipCriteria } from '../types';
import { RECOMMENDED_SCHOLARSHIPS } from '../constants';
import { UserContext } from '../contexts/UserContext';
import ScholarshipCard from '../components/ScholarshipCard';

const STATES_OF_INDIA = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi"
];

const COURSES = ["B.Tech", "B.Com", "BBA", "BA", "B.Sc", "BCA"];

const ScholarshipPage: React.FC = () => {
  const [criteria, setCriteria] = useState({
    age: '',
    course: '',
    caste: '',
    income: '',
    state: ''
  });
  const [results, setResults] = useState<Scholarship[]>([]);
  const [searched, setSearched] = useState(false);
  const { addTokens } = useContext(UserContext);
  const [profileCompleted, setProfileCompleted] = useState(false);

  const [errors, setErrors] = useState({
    age: false,
    course: false,
    caste: false,
    income: false,
    state: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCriteria(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: false }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      age: !criteria.age,
      course: !criteria.course,
      caste: !criteria.caste,
      income: !criteria.income,
      state: !criteria.state,
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    if (!profileCompleted) {
      addTokens(10);
      setProfileCompleted(true);
    }

    const ageNum = parseInt(criteria.age);
    const incomeNum = parseInt(criteria.income);

    const filtered = RECOMMENDED_SCHOLARSHIPS.filter(s => {
      const { eligibility } = s;

      const ageMatch =
        (!eligibility.minAge || ageNum >= eligibility.minAge) &&
        (!eligibility.maxAge || ageNum <= eligibility.maxAge);

      const courseMatch = !eligibility.course || eligibility.course.includes(criteria.course);
      const casteMatch = !eligibility.caste || eligibility.caste.includes(criteria.caste);
      const incomeMatch = !eligibility.maxIncome || incomeNum <= eligibility.maxIncome;
      const stateMatch = !eligibility.state || eligibility.state.includes(criteria.state);

      return ageMatch && courseMatch && casteMatch && incomeMatch && stateMatch;
    });

    setResults(filtered);
    setSearched(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-red-50 px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-red-700 mb-2 drop-shadow-md">Scholarship Finder</h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Fill in your details to find scholarships that match your profile. You get <span className="font-bold text-green-700">10 tokens</span> for completing your profile!
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-12 max-w-6xl mx-auto">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={criteria.age}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border ${errors.age ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
              placeholder="Enter your age"
            />
            {errors.age && <p className="text-red-600 text-sm mt-1">Age is required.</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
            <select
              name="course"
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border ${errors.course ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
            >
              <option value="">Select Course</option>
              {COURSES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errors.course && <p className="text-red-600 text-sm mt-1">Course is required.</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Caste Category</label>
            <select
              name="caste"
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border ${errors.caste ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
            >
              <option value="">Select Caste</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="EBC">EBC</option>
              <option value="DNT">DNT</option>
            </select>
            {errors.caste && <p className="text-red-600 text-sm mt-1">Caste category is required.</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Annual Family Income (₹)</label>
            <input
              type="number"
              name="income"
              value={criteria.income}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border ${errors.income ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
              placeholder="Enter income"
            />
            {errors.income && <p className="text-red-600 text-sm mt-1">Income is required.</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <select
              name="state"
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
            >
              <option value="">Select State</option>
              {STATES_OF_INDIA.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            {errors.state && <p className="text-red-600 text-sm mt-1">State is required.</p>}
          </div>

          <div className="lg:col-span-1">
            <button type="submit" className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition-colors shadow-md">Find Scholarships</button>
          </div>
        </form>
      </div>

      <div className="max-w-6xl mx-auto">
        {searched && results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map(s => <ScholarshipCard key={s.id} scholarship={s} />)}
          </div>
        )}

        {searched && results.length === 0 && (
          <div className="text-center bg-white rounded-xl p-8 shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">No Matching Scholarships Found</h3>
            <p className="text-gray-600 mt-2">Try adjusting your search criteria. Many general scholarships are available on the National Scholarship Portal.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScholarshipPage;