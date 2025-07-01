import React from 'react';
import { RedeemPerk } from '../types';
import { TokenIcon } from './icons/TokenIcon';

interface PerkCardProps {
  perk: RedeemPerk;
  userTokens: number;
  onRedeem: (perkId: string, price: number) => void;
}

const PerkCard: React.FC<PerkCardProps> = ({ perk, userTokens, onRedeem }) => {
  const canAfford = userTokens >= perk.price;

  return (
    <div
      className={`
        bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 
        border-t-4 border-red-600 flex flex-col justify-between hover:shadow-2xl 
        hover:shadow-red-300 transform hover:scale-[1.02]
      `}
    >
      <div className="p-6">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <perk.icon className="w-8 h-8 text-red-600" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-center text-red-800 mb-2">{perk.name}</h3>

        {/* Description */}
        <p className="text-gray-600 text-center text-sm">{perk.description}</p>
      </div>

      {/* Price & Button */}
      <div className="px-6 py-4 bg-gray-50 border-t">
        <div className="flex items-center justify-center text-lg font-bold text-bharat-green-700 mb-4">
          <TokenIcon className="w-5 h-5 mr-1" />
          <span>{perk.price}</span>
        </div>

        <button
          onClick={() => onRedeem(perk.id, perk.price)}
          disabled={!canAfford}
          className={`
            w-full font-bold py-2 px-4 rounded text-white transition-all duration-200
            ${canAfford
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-gray-300 cursor-not-allowed'}
          `}
        >
          {canAfford ? 'Redeem Now' : 'Not Enough Tokens'}
        </button>
      </div>
    </div>
  );
};

export default PerkCard;
