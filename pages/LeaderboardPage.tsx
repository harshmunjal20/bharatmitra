import React from 'react';
import { LEADERBOARD_DATA } from '../constants';
import LeaderboardItem from '../components/LeaderboardItem';

const LeaderboardPage: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-fixed bg-[url('https://www.transparenttextures.com/patterns/flower.png')] bg-red-50 bg-blend-overlay bg-opacity-80 px-4 py-12"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-red-700 mb-3 drop-shadow-lg">
          🏆 Community Leaderboard
        </h1>
        <p className="text-md sm:text-lg text-gray-700">
          Top users earning tokens by learning and sharing knowledge.
        </p>
      </div>

      {/* Leaderboard Container */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl border-t-4 border-red-600 shadow-xl hover:shadow-2xl hover:shadow-red-300 transition-all duration-300 overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 bg-gray-100 border-b border-gray-200">
          <div className="grid grid-cols-12 gap-4 text-left font-bold text-sm text-gray-600 uppercase tracking-wider">
            <span className="col-span-1">#</span>
            <span className="col-span-5">User</span>
            <span className="col-span-3">Location</span>
            <span className="col-span-3 text-right">Tokens</span>
          </div>
        </div>

        {/* User Rows */}
        <div className="divide-y divide-gray-200">
          {LEADERBOARD_DATA.map((user, index) => (
            <LeaderboardItem key={user.rank} user={user} isTopThree={index < 3} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
