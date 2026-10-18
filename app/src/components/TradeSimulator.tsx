import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Coins, 
  ExternalLink, 
  ShieldCheck, 
  ArrowRight,
  Info,
  CheckCircle2,
  Percent
} from 'lucide-react';
import { PantaMarket } from './NectarFiMarketsBoard';

interface Props {
  selectedMarket: PantaMarket | null;
  selectedPosition: 'YES' | 'NO';
}

export const TradeSimulator: React.FC<Props> = ({ 
  selectedMarket: propMarket, 
  selectedPosition: propPosition 
}) => {
  const defaultMarket: PantaMarket = {
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
  };

  const market = propMarket || defaultMarket;
  const [position, setPosition] = useState<'YES' | 'NO'>(propPosition || 'YES');
  const [tradeAmount, setTradeAmount] = useState<number>(50);

  // Pool simulation math
  const baseProb = position === 'YES' ? market.yesProb : market.noProb;
  const initialPoolSize = market.liquidityUsdc;
  const winningPool = (initialPoolSize * baseProb) / 100;
  const losingPool = initialPoolSize - winningPool;

  // New pool after trade
  const newWinningPool = winningPool + tradeAmount;
  const newTotalPool = initialPoolSize + tradeAmount;
  const postTradeProb = Math.min(99, Math.round((newWinningPool / newTotalPool) * 100));

  // If your side wins, you take your share of the loser's pool
  // Payout = Investment + (Investment / NewWinningPool) * LosingPool
  const winningsFromLoserPool = (tradeAmount / newWinningPool) * losingPool;
  const totalPayout = tradeAmount + winningsFromLoserPool;
  const netProfit = totalPayout - tradeAmount;
  const roiPercent = (netProfit / tradeAmount) * 100;
  const multiplier = (totalPayout / tradeAmount).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-900 border border-indigo-500/30 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
            Panta Shared Liquidity Mechanics
          </span>
          <span className="text-xs text-slate-400">Zero Centralized Spread • 100% Pro-Rata</span>
        </div>
        <h2 className="text-2xl font-black text-white">
          Interactive Position &amp; Payout Simulator
        </h2>
        <p className="text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
          Simulate how your trade impacts the market probability on Solana and calculate your exact return when the event resolves.
        </p>

        {/* Selected Market Info */}
        <div className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider">Simulated Market</span>
            <h4 className="font-bold text-white text-base mt-0.5">{market.title}</h4>
            <span className="text-xs text-slate-400">Pool Liquidity: ${market.liquidityUsdc.toLocaleString()} USDC • Resolves: {market.resolutionDate}</span>
          </div>

          {/* YES / NO Toggle */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800 self-stretch sm:self-auto">
            <button
              onClick={() => setPosition('YES')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-black transition-all ${
                position === 'YES'
                  ? 'bg-emerald-500 text-slate-950 shadow-md scale-105'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              YES ({market.yesProb}%)
            </button>
            <button
              onClick={() => setPosition('NO')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-black transition-all ${
                position === 'NO'
                  ? 'bg-rose-500 text-white shadow-md scale-105'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              NO ({market.noProb}%)
            </button>
          </div>
        </div>

        {/* Investment Slider */}
        <div className="mt-6 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-indigo-400" />
              Your Trade Collateral
            </label>
            <span className="text-base font-mono font-bold text-white">${tradeAmount} USDC</span>
          </div>
          <input
            type="range"
            min={5}
            max={500}
            step={5}
            value={tradeAmount}
            onChange={(e) => setTradeAmount(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
          />
          <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
            <span>$5 USDC (Min)</span>
            <span>$250 USDC</span>
            <span>$500 USDC</span>
          </div>
        </div>

        {/* Output Metrics Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400">Probability Impact</span>
            <div className="text-2xl font-black text-white mt-1">
              {baseProb}% <span className="text-xs text-slate-500 font-normal">→</span> <span className="text-indigo-400">{postTradeProb}%</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Dynamic liquidity pool curve
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400">Gross Return Multiplier</span>
            <div className="text-2xl font-black text-white mt-1">
              {multiplier}×
            </div>
            <span className="text-[11px] text-emerald-400 mt-1 font-mono block">
              +${netProfit.toFixed(1)} net profit ({roiPercent.toFixed(1)}% ROI)
            </span>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-950/90 to-slate-950 border border-indigo-500/40">
            <span className="text-xs text-indigo-300 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              Total Payout Upon Win
            </span>
            <div className="text-2xl font-black text-indigo-300 mt-1">
              ${totalPayout.toFixed(1)} <span className="text-xs font-mono text-slate-400">USDC</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Pro-rata settlement to your Solana wallet
            </span>
          </div>
        </div>

        {/* Callout */}
        <div className="mt-6 p-4 rounded-xl bg-slate-950/60 border border-indigo-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-300">
            Qualify for the competition: Complete at least one trade of <strong className="text-white">$1 or more</strong> on a NectarFi market on Panta.
          </div>
          <a
            href="https://go.panta.market/bounty"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs transition-all shadow-lg shadow-indigo-500/20 active:scale-95 shrink-0"
          >
            <span>Trade on Panta Market</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
