import React, { useState } from 'react';
import { 
  PlusCircle, 
  Sparkles, 
  Check, 
  Copy, 
  HelpCircle, 
  Layers, 
  Coins, 
  Calendar,
  ExternalLink
} from 'lucide-react';

export const MarketCreatorStudio: React.FC = () => {
  const [question, setQuestion] = useState('Will Solana process over 75,000 TPS on Mainnet before Q1 2027?');
  const [category, setCategory] = useState('Crypto & Tech');
  const [resolutionSource, setResolutionSource] = useState('Solana Compass & Blockworks Research official dashboard');
  const [resolutionDate, setResolutionDate] = useState('2027-01-01');
  const [initialLiquidity, setInitialLiquidity] = useState<number>(100);
  const [copied, setCopied] = useState<boolean>(false);

  // Creator fee is typically 1% of all subsequent trading volume
  const estimatedVolume = initialLiquidity * 15;
  const creatorPassiveEarnings = estimatedVolume * 0.01;

  const generatedPayload = JSON.stringify({
    protocol: "PantaMarket-Solana-v1",
    question: question,
    category: category,
    resolutionSource: resolutionSource,
    resolutionDate: resolutionDate,
    initialLiquidityUSDC: initialLiquidity,
    creatorFeeRate: "1.0%",
    status: "READY_FOR_PANTA_CREATION"
  }, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/70 via-slate-900 to-slate-900 border border-purple-500/30 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
            Permissionless Community Creation
          </span>
          <span className="text-xs text-amber-400 font-semibold">★ Additional Judging Consideration</span>
        </div>
        <h2 className="text-2xl font-black text-white">
          Panta Market Creator Studio
        </h2>
        <p className="text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
          Anyone can spin up a prediction market on Panta. Configure your resolution criteria, verify oracle sources, and earn 1% on every trade generated.
        </p>

        {/* Input Form */}
        <div className="space-y-4 mt-6">
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Market Question (Clear &amp; Binary YES/NO)</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
              >
                <option value="Crypto & Tech">Crypto &amp; Tech</option>
                <option value="DeFi & TVL">DeFi &amp; TVL</option>
                <option value="NectarFi Ecosystem">NectarFi Ecosystem</option>
                <option value="Global Macro">Global Macro</option>
                <option value="Sports & Culture">Sports &amp; Culture</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Resolution Date</label>
              <input
                type="date"
                value={resolutionDate}
                onChange={(e) => setResolutionDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">Primary Proof Oracle / Resolution Source</label>
            <input
              type="text"
              value={resolutionSource}
              onChange={(e) => setResolutionSource(e.target.value)}
              placeholder="e.g. DefiLlama official metrics, CoinGecko, official government statistics"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-slate-300">Seed Liquidity</label>
              <span className="text-xs font-mono font-bold text-purple-300">${initialLiquidity} USDC</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[50, 100, 250].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setInitialLiquidity(amt)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    initialLiquidity === amt
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  ${amt} USDC
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Creator Yield Output */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400">Projected 30-Day Market Volume</span>
            <div className="text-xl font-bold text-white mt-1">
              ${estimatedVolume.toLocaleString()} USDC
            </div>
            <span className="text-[11px] text-slate-500">Based on 15× velocity on community markets</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-purple-500/30">
            <span className="text-xs text-purple-300 font-semibold">1% Market Creator Fee Yield</span>
            <div className="text-xl font-bold text-purple-400 mt-1">
              +${creatorPassiveEarnings.toFixed(1)} USDC
            </div>
            <span className="text-[11px] text-slate-400">Streamed automatically to your creator wallet</span>
          </div>
        </div>

        {/* JSON Payload & Copy */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-mono text-slate-400">Generated Panta Creation Payload</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs text-purple-300 hover:text-purple-200 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Payload Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Payload</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-4 rounded-xl bg-slate-950 text-[11px] font-mono text-slate-300 overflow-x-auto border border-slate-800">
            {generatedPayload}
          </pre>
        </div>
      </div>
    </div>
  );
};
