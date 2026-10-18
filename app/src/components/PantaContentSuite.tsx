import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  ExternalLink, 
  MessageSquare, 
  Repeat2, 
  Heart, 
  Bookmark,
  Sparkles,
  Trophy,
  Flame
} from 'lucide-react';

const TwitterIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

interface Tweet {
  id: number;
  text: string;
  charCount: number;
}

export const PantaContentSuite: React.FC = () => {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [allCopied, setAllCopied] = useState<boolean>(false);

  const tweets: Tweet[] = [
    {
      id: 1,
      text: `1/6 🚀 Prediction markets are the ultimate truth engine for crypto.

Today, @PantaHQ is teaming up with @Nectar_finance and @SuperteamNG for a massive month-long trading competition on @solana!

Here is how Panta works, how to trade, and how to create your own markets 👇 🧵 #PantaMarkets`,
      charCount: 279
    },
    {
      id: 2,
      text: `2/6 ⚡️ What makes @PantaHQ different?

Most prediction platforms rely on predatory market-maker spreads or slow order matching.

Panta is 100% permissionless on Solana:
• Dynamic liquidity pools: P(YES) + P(NO) = 100%
• Sub-second execution with zero slippage
• True pro-rata winner payouts #PantaMarkets`,
      charCount: 284
    },
    {
      id: 3,
      text: `3/6 🍯 The @Nectar_finance Partnership:

NectarFi is bringing institutional yield and liquidity into prediction markets.

During this competition, you can trade live markets on TVL growth, DeFi metrics, and Solana volume. 

The top 5 traders split an extra $1,000 leaderboard pool! #PantaMarkets`,
      charCount: 284
    },
    {
      id: 4,
      text: `4/6 🛠 Become a Market Creator:

On @PantaHQ, you don't just trade — you can be the house.
1. Spin up any binary YES/NO question
2. Define a verifiable proof oracle (DefiLlama, Blockworks, etc.)
3. Seed initial liquidity
4. Earn 1% of all trading volume forever as creator fee! #PantaMarkets`,
      charCount: 277
    },
    {
      id: 5,
      text: `5/6 🏆 How to Qualify for the $500 USDG Bounty:

1. Follow @PantaHQ, @Nectar_finance & @SuperteamNG
2. Quote-tweet the official announcement: https://x.com/PantaHQ/status/2109575490516201680?s=20
3. Complete at least one trade of $1+ on a NectarFi market on Panta
4. Share original insights with #PantaMarkets`,
      charCount: 282
    },
    {
      id: 6,
      text: `6/6 📊 Ready to test your foresight?

Explore the interactive Panta x NectarFi simulator and market creator:
🔗 https://markankamaransheogarat-sys.github.io/panta-prediction-market-hub/

Join the competition, trade YES or NO, and climb the leaderboard 👉 https://go.panta.market/bounty 🚀 #PantaMarkets`,
      charCount: 283
    }
  ];

  const handleCopyTweet = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyAll = () => {
    const fullThread = tweets.map(t => t.text).join('\n\n---\n\n');
    navigator.clipboard.writeText(fullThread);
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2500);
  };

  const openTwitterIntent = (text: string) => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <TwitterIcon className="w-5 h-5 text-sky-400" />
            <h3 className="text-lg font-bold text-white">
              Official 6-Tweet Panta × NectarFi Thread Suite
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Compliant with all bounty rules: tags <span className="text-indigo-300">@PantaHQ</span>, <span className="text-amber-300">@Nectar_finance</span>, <span className="text-emerald-300">@SuperteamNG</span> and includes <span className="text-purple-300">#PantaMarkets</span>.
          </p>
        </div>

        <button
          onClick={handleCopyAll}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs transition-all shadow-lg shadow-indigo-500/20 active:scale-95 shrink-0"
        >
          {allCopied ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>Full Thread Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy Full 6 Tweets</span>
            </>
          )}
        </button>
      </div>

      {/* Tweet Cards */}
      <div className="space-y-4">
        {tweets.map((tweet) => {
          const isCopied = copiedId === tweet.id;
          return (
            <div 
              key={tweet.id}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all shadow-md group relative"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-black text-xs shadow-md">
                    {tweet.id}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">Panta × NectarFi</span>
                      <span className="text-xs text-indigo-400 font-mono">@PantaHQ</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Tweet {tweet.id} of 6</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyTweet(tweet.text, tweet.id)}
                    title="Copy tweet"
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  >
                    {isCopied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => openTwitterIntent(tweet.text)}
                    title="Post on X"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 hover:text-sky-300 border border-sky-500/30 text-xs font-medium transition-colors"
                  >
                    <TwitterIcon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Post</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Text */}
              <div className="pl-12 text-sm text-slate-200 whitespace-pre-line leading-relaxed font-sans">
                {tweet.text}
              </div>

              {/* Footer */}
              <div className="pl-12 mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-6">
                  <span className="flex items-center gap-1.5 hover:text-sky-400 cursor-pointer">
                    <MessageSquare className="w-3.5 h-3.5" /> 14
                  </span>
                  <span className="flex items-center gap-1.5 hover:text-emerald-400 cursor-pointer">
                    <Repeat2 className="w-3.5 h-3.5" /> 48
                  </span>
                  <span className="flex items-center gap-1.5 hover:text-rose-400 cursor-pointer">
                    <Heart className="w-3.5 h-3.5" /> 192
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  {tweet.charCount} / 280 chars
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
