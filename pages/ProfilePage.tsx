import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

type TokenHistoryEntry = {
  id: string;
  date: string;
  description: string;
  tokens: number;
};

const ProfilePage: React.FC = () => {
  const { tokenBalance } = useContext(UserContext);

  const [tokenHistory, setTokenHistory] = useState<TokenHistoryEntry[]>([]);
  const [redeemedPerks, setRedeemedPerks] = useState<string[]>([]);
  const [appliedSchemes, setAppliedSchemes] = useState<string[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch('/api/history');
        const data = await res.json();
        setTokenHistory(data.tokenHistory || []);
        setRedeemedPerks(data.redeemedPerks || []);
        setAppliedSchemes(data.appliedSchemes || []);
      } catch (err) {
        console.error('Failed to load history:', err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-8">
        <h1 className="text-3xl font-bold text-center text-bharat-blue-900">👤 Your Profile</h1>

        <div className="text-center text-lg text-gray-700">
          <p><strong>🎯 Current Token Balance:</strong> {tokenBalance}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-bharat-blue-800 mb-2">📜 Applied Schemes</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {appliedSchemes.length > 0 ? (
              appliedSchemes.map((scheme, i) => <li key={i}>{scheme}</li>)
            ) : (
              <li>No schemes applied yet.</li>
            )}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-bharat-blue-800 mb-2">🎁 Redeemed Perks</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {redeemedPerks.length > 0 ? (
              redeemedPerks.map((perk, i) => <li key={i}>{perk}</li>)
            ) : (
              <li>No perks redeemed yet.</li>
            )}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-bharat-blue-800 mb-2">📊 Token History</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-left border">
              <thead className="bg-bharat-blue-50 text-bharat-blue-900">
                <tr>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Description</th>
                  <th className="p-2 border">Tokens</th>
                </tr>
              </thead>
              <tbody>
                {tokenHistory.length > 0 ? (
                  tokenHistory.map((entry) => (
                    <tr key={entry.id}>
                      <td className="p-2 border">{entry.date}</td>
                      <td className="p-2 border">{entry.description}</td>
                      <td className="p-2 border">{entry.tokens}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center p-4">
                      No token history available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
