import React from 'react';
import { PokemonChronoEntry, EpochId } from '../types';
import { chronoAudio } from '../lib/audioEngine';
import { Sparkles, Compass } from 'lucide-react';

interface PokemonCardProps {
  pokemon: PokemonChronoEntry;
  epochId: EpochId;
  onSelect: (pokemon: PokemonChronoEntry) => void;
}

const TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Normal: { bg: 'bg-stone-200', text: 'text-stone-800', border: 'border-stone-400' },
  Fire: { bg: 'bg-amber-100', text: 'text-amber-900', border: 'border-amber-500' },
  Water: { bg: 'bg-sky-100', text: 'text-sky-900', border: 'border-sky-500' },
  Grass: { bg: 'bg-emerald-100', text: 'text-emerald-900', border: 'border-emerald-500' },
  Electric: { bg: 'bg-yellow-100', text: 'text-yellow-900', border: 'border-yellow-500' },
  Ice: { bg: 'bg-cyan-100', text: 'text-cyan-900', border: 'border-cyan-400' },
  Fighting: { bg: 'bg-red-100', text: 'text-red-900', border: 'border-red-600' },
  Poison: { bg: 'bg-purple-100', text: 'text-purple-900', border: 'border-purple-500' },
  Ground: { bg: 'bg-amber-100', text: 'text-amber-950', border: 'border-amber-700' },
  Flying: { bg: 'bg-indigo-100', text: 'text-indigo-900', border: 'border-indigo-400' },
  Psychic: { bg: 'bg-pink-100', text: 'text-pink-900', border: 'border-pink-500' },
  Bug: { bg: 'bg-lime-100', text: 'text-lime-900', border: 'border-lime-600' },
  Rock: { bg: 'bg-stone-300', text: 'text-stone-900', border: 'border-stone-600' },
  Ghost: { bg: 'bg-violet-100', text: 'text-violet-950', border: 'border-violet-600' },
  Dragon: { bg: 'bg-indigo-200', text: 'text-indigo-950', border: 'border-indigo-700' },
  Steel: { bg: 'bg-slate-200', text: 'text-slate-900', border: 'border-slate-500' },
  Dark: { bg: 'bg-zinc-300', text: 'text-zinc-950', border: 'border-zinc-700' },
  Fairy: { bg: 'bg-rose-100', text: 'text-rose-900', border: 'border-rose-400' },
};

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  epochId,
  onSelect,
}) => {
  const handleClick = () => {
    chronoAudio.playLayerPeel(0);
    onSelect(pokemon);
  };

  // 5 Epoch Visual Card Styling
  const getCardStyle = () => {
    switch (epochId) {
      case 'primordial':
        return 'bg-[#3A261B] text-[#F5EBE1] border-2 border-[#9C4221] shadow-paper-md hover:border-[#D97706]';
      case 'drift':
        return 'bg-[#FAF6EE] text-[#2D2318] border-2 border-[#C5A059] shadow-paper-md hover:border-[#8A6D4B]';
      case 'feudal':
        return 'bg-[#222E25] text-[#F3EFE6] border-2 border-[#8C3A2E] shadow-paper-md hover:border-[#D4AF37]';
      case 'modern':
        return 'bg-[#FAF6EE] text-[#1E252B] border-2 border-[#DEC6AE] shadow-paper-md hover:border-[#D95A47]';
      case 'future':
      default:
        return 'bg-[#0F172A] text-[#E2E8F0] border-2 border-[#0284C7] shadow-[0_0_20px_rgba(2,132,199,0.25)] hover:border-[#38BDF8]';
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`group cursor-pointer p-4 rounded-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between select-none relative overflow-hidden ${getCardStyle()}`}
    >
      {/* Top Meta: Dex # & Binomial Tag */}
      <div className="flex items-center justify-between gap-2 font-mono text-[10px] border-b border-current/15 pb-2 mb-3">
        <span className="font-bold opacity-80">#{String(pokemon.national_id).padStart(4, '0')}</span>
        <span className="truncate italic opacity-75 font-serif text-xs">{pokemon.binomial_name}</span>
      </div>

      {/* Central Illustration Frame with Epoch Filtering */}
      <div className="relative aspect-square flex items-center justify-center p-3 rounded-lg bg-black/5 overflow-hidden my-2">
        {/* Subtle grid backing */}
        <div className="absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] [background-size:12px_12px] opacity-10 pointer-events-none" />

        <img
          src={pokemon.sprites.artwork}
          alt={pokemon.name}
          loading="lazy"
          className="w-full h-full object-contain filter group-hover:scale-105 transition-transform duration-300 drop-shadow-[2px_4px_6px_rgba(0,0,0,0.25)]"
          onError={(e) => {
            // Fallback to front sprite if artwork fails
            (e.target as HTMLImageElement).src = pokemon.sprites.icon;
          }}
        />

        {/* Japanese Name Watermark */}
        {pokemon.japanese_name && (
          <span className="absolute bottom-1 right-2 text-base font-bold opacity-15 pointer-events-none">
            {pokemon.japanese_name}
          </span>
        )}
      </div>

      {/* Bottom Info: Name, Types, Base Stat Total */}
      <div className="space-y-2 mt-2">
        <div>
          <h3 className="text-lg sm:text-xl font-serif font-bold tracking-tight group-hover:text-[#D97706] transition-colors line-clamp-1">
            {pokemon.name}
          </h3>
          <div className="text-[11px] font-mono opacity-70 italic line-clamp-1">
            The {pokemon.genus}
          </div>
        </div>

        {/* Type Badges */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {pokemon.types.map((t) => {
            const c = TYPE_COLORS[t] || { bg: 'bg-stone-100', text: 'text-stone-800', border: 'border-stone-400' };
            return (
              <span
                key={t}
                className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase border ${c.bg} ${c.text} ${c.border}`}
              >
                {t}
              </span>
            );
          })}
          <span className="ml-auto font-mono text-[10px] opacity-70">
            BST: <strong>{pokemon.stats.bst}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};
