import React, { useState } from 'react';
import { 
  TrendingUp, 
  Flame, 
  ExternalLink, 
  CheckCircle, 
  Coins, 
  Trophy, 
  Search,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export interface PantaMarket {
  id: string;
  title: string;
  category: string;
  resolutionDate: string;
  yesProb: number;
  noProb: number;
  totalVolumeUsdc: number;
  liquidityUsdc: number;
  creator: string;
  isNectarFeatured: boolean;
}

const FEATURED_MARKETS: PantaMarket[] = [
  {
    id: 'nectar-01',
    title: 'Will NectarFi Total Value Locked (TVL) exceed $15M by December 31, 2026?',
    category: 'DeFi & TVL',
    resolutionDate: 'Dec 31, 2026',
    yesProb: 68,
    noProb: 32,
    totalVolumeUsdc: 142800,
    liquidityUsdc: 45000,
    creator: 'PantaHQ',
    isNectarFeatured: true
  },
  {
    id: 'nectar-02',
    title: 'Will Solana DEX Weekly Trading Volume surpass $25B during the NectarFi Competition?',
    category: 'Solana Ecosystem',
    resolutionDate: 'Nov 30, 2026',
    yesProb: 74,
    noProb: 26,
    totalVolumeUsdc: 215400,
    liquidityUsdc: 62000,
    creator: 'Nectar_finance',
    isNectarFeatured: true
  },
  {
    id: 'nectar-03',
    title: 'Will Panta Market process over 100,000 community prediction trades in Q4?',
    category: 'Platform Growth',
    resolutionDate: 'Dec 31, 2026',
    yesProb: 58,
    noProb: 42,
    totalVolumeUsdc: 98400,
    liquidityUsdc: 31000,
    creator: 'CommunityBuilder',
    isNectarFeatured: true
  },
  {
    id: 'nectar-04',
    title: 'Will NectarFi launch its cross-margin collateral engine on Solana Mainnet before year-end?',
    category: 'Product Roadmap',
    resolutionDate: 'Dec 15, 2026',
    yesProb: 62,
    noProb: 38,
    totalVolumeUsdc: 83200,
    liquidityUsdc: 28500,
    creator: 'SolanaAlpha',
    isNectarFeatured: false
  }
];

interface Props {
  onSelectMarket: (market: PantaMarket, position: 'YES' | 'NO') => void;
}

export const NectarFiMarketsBoard: React.FC<Props> = ({ onSelectMarket }) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = FEATURED_MARKETS.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase()) || 
                          m.category.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === 'all' || m.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-purple-950/40 to-slate-900 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Panta Market × NectarFi Trading Competition
            </span>
            <span className="text-xs text-slate-400">Solana Permissionless Prediction Engine</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
            <Trophy className="w-3.5 h-3.5" />
            Prize Pool: $500 USDG Bounty + $1,000 Leaderboard
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-2">
          Trade Real-World Outcomes on Panta Market
        </h2>
        <p className="text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
          Panta is Solana’s permissionless prediction market. Pick a position (YES or NO), trade with sub-second finality, and earn yield as markets resolve.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span>100% On-Chain Solana Settlement</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Community Market Creation Enabled</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>1% Market Creator Fee Yield</span>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search prediction markets (NectarFi, TVL, Solana...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          {['all', 'DeFi & TVL', 'Solana Ecosystem', 'Platform Growth'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
              }`}
            >
              {cat === 'all' ? 'All Markets' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Markets Cards */}
      <div className="grid grid-cols-1 gap-4">
        {filtered.map((market) => (
          <div 
            key={market.id}
            className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all shadow-xl group"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                  {market.category}
                </span>
                {market.isNectarFeatured && (
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <Flame className="w-3 h-3 text-amber-400" />
                    NectarFi Competition
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                <span>Volume: <strong className="text-white">${market.totalVolumeUsdc.toLocaleString()} USDC</strong></span>
                <span>•</span>
                <span>Resolves: <strong className="text-slate-300">{market.resolutionDate}</strong></span>
              </div>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white mb-4 leading-snug">
              {market.title}
            </h3>

            {/* Position Triggers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* YES Button */}
              <button
                onClick={() => onSelectMarket(market, 'YES')}
                className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-950/20 transition-all text-left flex items-center justify-between group/yes"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black px-2 py-0.5 rounded bg-emerald-500 text-slate-950">YES</span>
                    <span className="text-sm font-black text-emerald-400 font-mono">{market.yesProb}%</span>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">Expected Payout: {(100 / market.yesProb).toFixed(2)}x</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-emerald-400 font-semibold group-hover/yes:underline flex items-center gap-1">
                    Trade YES <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>

              {/* NO Button */}
              <button
                onClick={() => onSelectMarket(market, 'NO')}
                className="p-3.5 rounded-xl bg-slate-950 border border-rose-500/30 hover:border-rose-400 hover:bg-rose-950/20 transition-all text-left flex items-center justify-between group/no"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black px-2 py-0.5 rounded bg-rose-500 text-white">NO</span>
                    <span className="text-sm font-black text-rose-400 font-mono">{market.noProb}%</span>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">Expected Payout: {(100 / market.noProb).toFixed(2)}x</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-rose-400 font-semibold group-hover/no:underline flex items-center gap-1">
                    Trade NO <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
