import React from 'react';
import { PokemonChronoEntry, EpochId } from '../types';
import { chronoAudio } from '../lib/audioEngine';

interface PokemonCardProps {
  pokemon: PokemonChronoEntry;
  epochId: EpochId;
  onSelect: (pokemon: PokemonChronoEntry) => void;
}

const TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Normal: { bg: 'bg-stone-200', text: 'text-stone-900', border: 'border-stone-400' },
  Fire: { bg: 'bg-amber-100', text: 'text-amber-950', border: 'border-amber-500' },
  Water: { bg: 'bg-sky-100', text: 'text-sky-950', border: 'border-sky-500' },
  Grass: { bg: 'bg-emerald-100', text: 'text-emerald-950', border: 'border-emerald-600' },
  Electric: { bg: 'bg-yellow-100', text: 'text-yellow-950', border: 'border-yellow-500' },
  Ice: { bg: 'bg-cyan-100', text: 'text-cyan-950', border: 'border-cyan-500' },
  Fighting: { bg: 'bg-red-100', text: 'text-red-950', border: 'border-red-600' },
  Poison: { bg: 'bg-purple-100', text: 'text-purple-950', border: 'border-purple-500' },
  Ground: { bg: 'bg-amber-200', text: 'text-amber-950', border: 'border-amber-700' },
  Flying: { bg: 'bg-indigo-100', text: 'text-indigo-950', border: 'border-indigo-400' },
  Psychic: { bg: 'bg-pink-100', text: 'text-pink-950', border: 'border-pink-500' },
  Bug: { bg: 'bg-lime-100', text: 'text-lime-950', border: 'border-lime-600' },
  Rock: { bg: 'bg-stone-300', text: 'text-stone-950', border: 'border-stone-600' },
  Ghost: { bg: 'bg-violet-200', text: 'text-violet-950', border: 'border-violet-600' },
  Dragon: { bg: 'bg-indigo-200', text: 'text-indigo-950', border: 'border-indigo-700' },
  Steel: { bg: 'bg-slate-200', text: 'text-slate-950', border: 'border-slate-500' },
  Dark: { bg: 'bg-zinc-300', text: 'text-zinc-950', border: 'border-zinc-700' },
  Fairy: { bg: 'bg-rose-100', text: 'text-rose-950', border: 'border-rose-400' },
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

  // 1. PRIMORDIAL POKÉ-PANGAEA: Chiseled Stone Tablet & Cave Pigment
  if (epochId === 'primordial') {
    return (
      <div
        onClick={handleClick}
        className="group cursor-pointer p-3.5 sm:p-4 rounded-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between select-none relative overflow-hidden bg-[#24150D] text-[#F7EFE8] border-2 border-[#8C3E1B] hover:border-[#E07A28] shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
      >
        <div className="flex items-center justify-between gap-1 text-[10px] font-mono border-b border-[#8C3E1B]/50 pb-2 mb-2 text-[#D2BA9F]">
          <span className="font-bold text-[#E07A28]">#{String(pokemon.national_id).padStart(4, '0')}</span>
          <span className="truncate italic font-serif">{pokemon.binomial_name}</span>
        </div>

        <div className="relative aspect-square flex items-center justify-center p-2 rounded-lg bg-black/40 border border-[#8C3E1B]/30 my-1 overflow-hidden">
          <img
            src={pokemon.sprites.artwork}
            alt={pokemon.name}
            loading="lazy"
            className="w-full h-full object-contain filter sepia-[0.4] contrast-125 group-hover:scale-105 transition-transform duration-300"
            onError={(e) => { (e.target as HTMLImageElement).src = pokemon.sprites.icon; }}
          />
        </div>

        <div className="space-y-1.5 mt-2">
          <h3 className="text-lg font-serif font-bold text-[#F7EFE8] group-hover:text-[#E07A28] transition-colors line-clamp-1">
            {pokemon.name}
          </h3>
          <div className="flex items-center justify-between text-[10px] font-mono text-[#D2BA9F]">
            <span className="truncate">{pokemon.types.join('/')}</span>
            <span className="text-[#E07A28] font-bold">BST: {pokemon.stats.bst}</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. MESOZOIC DRIFT: Aged Ernst Haeckel Botanical Herbarium Mount (HIGH CONTRAST!)
  if (epochId === 'drift') {
    return (
      <div
        onClick={handleClick}
        className="group cursor-pointer p-3.5 sm:p-4 rounded-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between select-none relative overflow-hidden bg-[#FAF3E3] text-[#1C1309] border-2 border-[#B38F56] hover:border-[#8A6225] shadow-paper-md"
      >
        {/* Brass Photo Corners */}
        <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t-2 border-l-2 border-[#8A6225]" />
        <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t-2 border-r-2 border-[#8A6225]" />

        <div className="flex items-center justify-between gap-1 text-[10px] font-mono border-b border-[#B38F56]/40 pb-2 mb-2 text-[#4A3A26]">
          <span className="font-bold text-[#8A6225]">#{String(pokemon.national_id).padStart(4, '0')}</span>
          <span className="truncate italic font-serif font-semibold">{pokemon.binomial_name}</span>
        </div>

        <div className="relative aspect-square flex items-center justify-center p-2 rounded-lg bg-[#EFE4CC] border border-[#B38F56]/30 my-1 overflow-hidden shadow-inner">
          <img
            src={pokemon.sprites.artwork}
            alt={pokemon.name}
            loading="lazy"
            className="w-full h-full object-contain filter sepia-[0.35] contrast-110 group-hover:scale-105 transition-transform duration-300"
            onError={(e) => { (e.target as HTMLImageElement).src = pokemon.sprites.icon; }}
          />
        </div>

        <div className="space-y-1.5 mt-2">
          <h3 className="text-lg font-serif font-bold text-[#1C1309] group-hover:text-[#8A6225] transition-colors line-clamp-1">
            {pokemon.name}
          </h3>
          <div className="flex items-center justify-between text-[10px] font-mono font-semibold text-[#4A3A26]">
            <span>{pokemon.types.join(' · ')}</span>
            <span className="font-bold text-[#8A6225]">BST: {pokemon.stats.bst}</span>
          </div>
        </div>
      </div>
    );
  }

  // 3. FEUDAL HISUI: Japanese Washi Woodblock Print with Lacquer Red & Gold
  if (epochId === 'feudal') {
    return (
      <div
        onClick={handleClick}
        className="group cursor-pointer p-3.5 sm:p-4 rounded-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between select-none relative overflow-hidden bg-[#18231C] text-[#F8F6EF] border-2 border-[#991B1B] hover:border-[#D4AF37] shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
      >
        {/* Red Hanko Stamp Accent */}
        <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-[#991B1B] text-white font-mono text-[8px] font-bold tracking-tighter">
          図鑑
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono border-b border-[#991B1B]/40 pb-2 mb-2 text-[#C3D1C8]">
          <span className="font-bold text-[#D4AF37]">#{String(pokemon.national_id).padStart(4, '0')}</span>
          <span className="truncate">{pokemon.japanese_name}</span>
        </div>

        <div className="relative aspect-square flex items-center justify-center p-2 rounded-lg bg-black/30 border border-[#D4AF37]/30 my-1 overflow-hidden">
          <img
            src={pokemon.sprites.artwork}
            alt={pokemon.name}
            loading="lazy"
            className="w-full h-full object-contain filter contrast-125 saturate-90 group-hover:scale-105 transition-transform duration-300"
            onError={(e) => { (e.target as HTMLImageElement).src = pokemon.sprites.icon; }}
          />
        </div>

        <div className="space-y-1.5 mt-2">
          <h3 className="text-lg font-serif font-bold text-[#F8F6EF] group-hover:text-[#D4AF37] transition-colors line-clamp-1">
            {pokemon.name}
          </h3>
          <div className="flex items-center justify-between text-[10px] font-mono text-[#C3D1C8]">
            <span className="truncate">{pokemon.types.join(' / ')}</span>
            <span className="text-[#D4AF37] font-bold">BST: {pokemon.stats.bst}</span>
          </div>
        </div>
      </div>
    );
  }

  // 4. MODERN VICTORIAN: Crisp White Museum Specimen Card (Maximum Sharpness & Contrast)
  if (epochId === 'modern') {
    return (
      <div
        onClick={handleClick}
        className="group cursor-pointer p-3.5 sm:p-4 rounded-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between select-none relative overflow-hidden bg-white text-[#111827] border-2 border-[#1E252B] shadow-[4px_4px_0px_#1E252B] hover:shadow-[6px_6px_0px_#C53030] hover:border-[#C53030]"
      >
        <div className="flex items-center justify-between gap-1 text-[10px] font-mono border-b border-[#1E252B]/20 pb-2 mb-2 text-[#374151]">
          <span className="font-bold text-[#C53030]">#{String(pokemon.national_id).padStart(4, '0')}</span>
          <span className="truncate italic font-serif font-semibold">{pokemon.binomial_name}</span>
        </div>

        <div className="relative aspect-square flex items-center justify-center p-2 rounded-lg bg-[#F8F7F4] border border-[#1E252B]/20 my-1 overflow-hidden">
          <img
            src={pokemon.sprites.artwork}
            alt={pokemon.name}
            loading="lazy"
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            onError={(e) => { (e.target as HTMLImageElement).src = pokemon.sprites.icon; }}
          />
        </div>

        <div className="space-y-1.5 mt-2">
          <h3 className="text-lg font-serif font-bold text-[#111827] group-hover:text-[#C53030] transition-colors line-clamp-1">
            {pokemon.name}
          </h3>
          <div className="flex items-center justify-between text-[10px] font-mono font-semibold text-[#374151]">
            <span>{pokemon.types.join(' · ')}</span>
            <span className="font-bold text-[#C53030]">BST: {pokemon.stats.bst}</span>
          </div>
        </div>
      </div>
    );
  }

  // 5. PARADOX FUTURE: Sci-Fi Cybernetic Blueprint Module with Neon Cyan Glow
  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer p-3.5 sm:p-4 rounded-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between select-none relative overflow-hidden bg-[#0B1224] text-[#F0F9FF] border-2 border-[#0284C7] hover:border-[#38BDF8] shadow-[0_0_20px_rgba(6,182,212,0.25)]"
    >
      <div className="flex items-center justify-between gap-1 text-[10px] font-mono border-b border-cyan-500/30 pb-2 mb-2 text-[#94A3B8]">
        <span className="font-bold text-[#38BDF8]">SEC_#{String(pokemon.national_id).padStart(4, '0')}</span>
        <span className="truncate uppercase text-[9px] tracking-wider text-cyan-300">PARADOX_DATA</span>
      </div>

      <div className="relative aspect-square flex items-center justify-center p-2 rounded-lg bg-[#040814] border border-cyan-500/40 my-1 overflow-hidden">
        <img
          src={pokemon.sprites.artwork}
          alt={pokemon.name}
          loading="lazy"
          className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(56,189,248,0.5)] group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { (e.target as HTMLImageElement).src = pokemon.sprites.icon; }}
        />
      </div>

      <div className="space-y-1.5 mt-2 font-mono">
        <h3 className="text-lg font-bold text-white group-hover:text-[#38BDF8] transition-colors line-clamp-1">
          {pokemon.name}
        </h3>
        <div className="flex items-center justify-between text-[10px] text-cyan-300">
          <span>{pokemon.types.join(' // ')}</span>
          <span className="text-white font-bold">BST: {pokemon.stats.bst}</span>
        </div>
      </div>
    </div>
  );
};
