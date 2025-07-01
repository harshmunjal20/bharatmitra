import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { REDEEM_PERKS } from '../constants';
import PerkCard from '../components/PerkCard';
import Confetti from 'react-confetti';

const RedeemPage: React.FC = () => {
  const { tokenBalance, deductTokens } = useContext(UserContext);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleRedeem = (perkId: string, price: number) => {
    if (deductTokens(price)) {
      setNotification({
        message: '🎉 Redemption successful! You will be contacted shortly.',
        type: 'success',
      });
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      setNotification({
        message: '❌ Not enough tokens to redeem this perk.',
        type: 'error',
      });
    }

    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div
      className="min-h-screen px-4 py-12"
      style={{ backgroundColor: '#fff6f7' }}
    >
      {/* Confetti */}
      {showConfetti && <Confetti numberOfPieces={200} recycle={false} />}

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-red-700 mb-2 drop-shadow-md">
          🎁 Redeem Your Tokens
        </h1>
        <p className="text-lg text-gray-700">
          Use your hard-earned tokens to unlock exclusive perks and rewards.
        </p>
      </div>

      {/* Notification */}
      {notification && (
        <div
          className={`p-4 mb-8 rounded-lg max-w-xl mx-auto text-center font-semibold shadow transition-all duration-300 ${
            notification.type === 'success'
              ? 'bg-green-100 text-green-800 border border-green-300'
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Perk Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {REDEEM_PERKS.map((perk) => (
          <PerkCard
            key={perk.id}
            perk={perk}
            userTokens={tokenBalance}
            onRedeem={handleRedeem}
          />
        ))}
      </div>
    </div>
  );
};

export default RedeemPage;
