import React, { useState } from 'react';
import { Scheme } from '../types';
import { RECOMMENDED_SCHEMES } from '../constants';
import SchemeCard from '../components/SchemeCard';

const categories = ['All', 'Student', 'Farmer', 'Employment', 'Women'];
const tags = ['urgent', 'women', 'student'];

const FilteredSchemesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredSchemes = RECOMMENDED_SCHEMES.filter((scheme: Scheme) => {
    const matchSearch =
      scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchCategory =
      selectedCategory === 'All' ||
      scheme.category?.toLowerCase() === selectedCategory.toLowerCase();

    const matchTags =
      activeTags.length === 0 ||
      activeTags.every((tag) => scheme.tags?.includes(tag));

    return matchSearch && matchCategory && matchTags;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-rose-50 to-red-50 px-4 sm:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-red-800 mb-3">Browse Schemes</h1>
        <p className="text-gray-700 text-sm sm:text-base">
          Search and filter to find schemes tailored to you.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by title or description"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300 w-full sm:w-64"
        />

        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
          
        </select>

        {/* Tag Checkboxes */}
        {tags.map((tag) => (
          <label key={tag} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={activeTags.includes(tag)}
              onChange={() => toggleTag(tag)}
              className="accent-red-600"
            />
            <span className="capitalize">{tag}</span>
          </label>
        ))}
      </div>

      {/* Results */}
      {filteredSchemes.length === 0 ? (
        <p className="text-center text-gray-600">No schemes match your criteria.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredSchemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FilteredSchemesPage;
