import React from 'react';
import { PokemonChronoEntry, EpochId } from '../types';
import { chronoAudio } from '../lib/audioEngine';

interface PokemonCardProps {
  pokemon: PokemonChronoEntry;
  epochId: EpochId;
  onSelect: (pokemon: PokemonChronoEntry) => void;
}

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, iconSrc: string) => {
  const target = e.currentTarget;
  if (!target.dataset.fallback) {
    target.dataset.fallback = 'true';
    target.src = iconSrc;
  }
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

  // 1. PRIMORDIAL POKÉ-PANGAEA: Chiseled Stone Monolith Slab
  if (epochId === 'primordial') {
    return (
      <div
        onClick={handleClick}
        className="group cursor-pointer p-3 sm:p-4 rounded-none transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between select-none relative bg-[#22130B] text-[#F5EBE1] border-4 border-[#8C3E1B] hover:border-[#E07A28] shadow-[0_8px_25px_rgba(0,0,0,0.8)] overflow-hidden min-w-0"
        style={{ clipPath: 'polygon(0 8px, 8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)' }}
      >
        <div className="flex items-center justify-between gap-1.5 text-[10px] font-mono border-b-2 border-[#8C3E1B] pb-2 mb-2 text-[#D2BA9F] min-w-0">
          <span className="font-bold text-[#E07A28] flex-shrink-0">#{String(pokemon.national_id).padStart(4, '0')}</span>
          <span className="truncate italic font-serif tracking-wider text-right min-w-0">{pokemon.binomial_name}</span>
        </div>

        <div className="relative aspect-square flex items-center justify-center p-2.5 bg-[#120804] border border-[#8C3E1B] my-1 overflow-hidden">
          <img
            src={pokemon.sprites.artwork}
            alt={pokemon.name}
            loading="lazy"
            className="w-full h-full object-contain filter sepia-[0.4] contrast-125 group-hover:scale-110 transition-transform duration-300"
            onError={(e) => handleImageError(e, pokemon.sprites.icon)}
          />
        </div>

        <div className="space-y-1 mt-2 min-w-0">
          <h3 className="text-sm sm:text-base font-serif font-bold uppercase tracking-wider text-[#F5EBE1] group-hover:text-[#E07A28] transition-colors truncate">
            {pokemon.name}
          </h3>
          <div className="flex items-center justify-between text-[10px] font-mono text-[#D2BA9F] gap-1 min-w-0">
            <span className="truncate min-w-0">{pokemon.types.join('/')}</span>
            <span className="text-[#E07A28] font-bold flex-shrink-0">BST {pokemon.stats.bst}</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. MESOZOIC DRIFT: Double-Framed Antique Herbarium Plate
  if (epochId === 'drift') {
    return (
      <div
        onClick={handleClick}
        className="group cursor-pointer p-3 sm:p-4 rounded-md transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between select-none relative bg-[#FAF4E6] text-[#1A1108] border-2 border-[#8A6225] hover:border-[#5E4216] shadow-xl overflow-hidden min-w-0"
      >
        <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#8A6225]" />
        <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#8A6225]" />
        <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#8A6225]" />
        <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#8A6225]" />

        <div className="flex items-center justify-between gap-1.5 text-[10px] font-mono border-b border-[#8A6225]/40 pb-2 mb-2 text-[#4A3A26] min-w-0">
          <span className="font-bold text-[#8A6225] flex-shrink-0">№ {String(pokemon.national_id).padStart(4, '0')}</span>
          <span className="truncate italic font-serif font-bold text-right min-w-0">{pokemon.binomial_name}</span>
        </div>

        <div className="relative aspect-square flex items-center justify-center p-2.5 bg-[#F2E8D2] border border-[#8A6225]/30 my-1 shadow-inner rounded-sm overflow-hidden">
          <img
            src={pokemon.sprites.artwork}
            alt={pokemon.name}
            loading="lazy"
            className="w-full h-full object-contain filter sepia-[0.35] contrast-115 group-hover:scale-110 transition-transform duration-300"
            onError={(e) => handleImageError(e, pokemon.sprites.icon)}
          />
        </div>

        <div className="space-y-1 mt-2 min-w-0">
          <h3 className="text-sm sm:text-base font-serif font-bold text-[#1A1108] group-hover:text-[#8A6225] transition-colors truncate">
            {pokemon.name}
          </h3>
          <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#4A3A26] gap-1 min-w-0">
            <span className="truncate min-w-0">{pokemon.types.join(' · ')}</span>
            <span className="text-[#8A6225] flex-shrink-0">BST: {pokemon.stats.bst}</span>
          </div>
        </div>
      </div>
    );
  }

  // 3. FEUDAL HISUI: Traditional Japanese Hanging Emakimono Scroll Card
  if (epochId === 'feudal') {
    return (
      <div
        onClick={handleClick}
        className="group cursor-pointer p-3 sm:p-4 rounded-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between select-none relative bg-[#131D17] text-[#F8F6EF] border-2 border-[#991B1B] hover:border-[#D4AF37] shadow-[0_6px_20px_rgba(0,0,0,0.85)] overflow-hidden min-w-0"
      >
        <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-sm bg-[#991B1B] text-white font-mono text-[8px] font-bold border border-[#D4AF37]/50 shadow-sm z-10">
          図鑑
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-mono border-b border-[#991B1B]/40 pb-2 mb-2 text-[#C3D1C8] pr-8 min-w-0">
          <span className="font-bold text-[#D4AF37] flex-shrink-0">#{pokemon.national_id}</span>
          <span className="truncate font-serif min-w-0">{pokemon.japanese_name}</span>
        </div>

        <div className="relative aspect-square flex items-center justify-center p-2.5 bg-black/40 border border-[#D4AF37]/30 my-1 rounded-lg overflow-hidden">
          <img
            src={pokemon.sprites.artwork}
            alt={pokemon.name}
            loading="lazy"
            className="w-full h-full object-contain filter contrast-125 saturate-90 group-hover:scale-110 transition-transform duration-300"
            onError={(e) => handleImageError(e, pokemon.sprites.icon)}
          />
        </div>

        <div className="space-y-1 mt-2 min-w-0">
          <h3 className="text-sm sm:text-base font-serif font-bold text-[#F8F6EF] group-hover:text-[#D4AF37] transition-colors truncate">
            {pokemon.name}
          </h3>
          <div className="flex items-center justify-between text-[10px] font-mono text-[#C3D1C8] gap-1 min-w-0">
            <span className="truncate min-w-0">{pokemon.types.join(' / ')}</span>
            <span className="text-[#D4AF37] font-bold flex-shrink-0">BST {pokemon.stats.bst}</span>
          </div>
        </div>
      </div>
    );
  }

  // 4. MODERN VICTORIAN: Museum Cabinet Vitrine Specimen Display
  if (epochId === 'modern') {
    return (
      <div
        onClick={handleClick}
        className="group cursor-pointer p-3 sm:p-4 rounded-none transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between select-none relative bg-white text-[#111827] border-4 border-[#1E252B] shadow-[5px_5px_0px_#1E252B] hover:shadow-[7px_7px_0px_#C53030] hover:border-[#C53030] overflow-hidden min-w-0"
      >
        <div className="flex items-center justify-between gap-1.5 text-[10px] font-mono border-b-2 border-[#1E252B] pb-2 mb-2 text-[#374151] min-w-0">
          <span className="font-bold text-[#C53030] flex-shrink-0">#{String(pokemon.national_id).padStart(4, '0')}</span>
          <span className="truncate italic font-serif font-bold text-right min-w-0">{pokemon.binomial_name}</span>
        </div>

        <div className="relative aspect-square flex items-center justify-center p-2.5 bg-[#F8F7F4] border-2 border-[#1E252B]/30 my-1 overflow-hidden">
          <img
            src={pokemon.sprites.artwork}
            alt={pokemon.name}
            loading="lazy"
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
            onError={(e) => handleImageError(e, pokemon.sprites.icon)}
          />
        </div>

        <div className="space-y-1 mt-2 min-w-0">
          <h3 className="text-sm sm:text-base font-serif font-bold text-[#111827] group-hover:text-[#C53030] transition-colors truncate">
            {pokemon.name}
          </h3>
          <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#374151] gap-1 min-w-0">
            <span className="truncate min-w-0">{pokemon.types.join(' · ')}</span>
            <span className="font-bold text-[#C53030] flex-shrink-0">BST {pokemon.stats.bst}</span>
          </div>
        </div>
      </div>
    );
  }

  // 5. PARADOX FUTURE: Sci-Fi Holographic Quantum Data Pod
  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer p-3 sm:p-4 rounded-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between select-none relative bg-[#091122] text-[#F0F9FF] border-2 border-[#0284C7] hover:border-[#38BDF8] shadow-[0_0_25px_rgba(6,182,212,0.3)] overflow-hidden min-w-0"
    >
      <div className="flex items-center justify-between gap-1.5 text-[10px] font-mono border-b border-cyan-500/40 pb-2 mb-2 text-[#94A3B8] min-w-0">
        <span className="font-bold text-[#38BDF8] flex-shrink-0">#{String(pokemon.national_id).padStart(4, '0')}</span>
        <span className="text-[9px] uppercase tracking-widest text-cyan-400 truncate text-right min-w-0">PARADOX</span>
      </div>

      <div className="relative aspect-square flex items-center justify-center p-2.5 bg-[#02050E] border border-cyan-500/40 my-1 rounded-lg overflow-hidden">
        <img
          src={pokemon.sprites.artwork}
          alt={pokemon.name}
          loading="lazy"
          className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(56,189,248,0.7)] group-hover:scale-110 transition-transform duration-300"
          onError={(e) => handleImageError(e, pokemon.sprites.icon)}
        />
      </div>

      <div className="space-y-1 mt-2 font-mono min-w-0">
        <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#38BDF8] transition-colors truncate">
          {pokemon.name}
        </h3>
        <div className="flex items-center justify-between text-[10px] text-cyan-300 gap-1 min-w-0">
          <span className="truncate min-w-0">{pokemon.types.join(' // ')}</span>
          <span className="text-white font-bold flex-shrink-0">BST {pokemon.stats.bst}</span>
        </div>
      </div>
    </div>
  );
};
