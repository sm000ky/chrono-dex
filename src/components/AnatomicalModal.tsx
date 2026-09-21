import React, { useState, useEffect } from 'react';
import { PokemonChronoEntry, EpochId } from '../types';
import { Translations } from '../lib/i18n';
import { chronoAudio } from '../lib/audioEngine';
import {
  X,
  Layers,
  Sparkles,
  Shield,
  Activity,
  Globe,
  Dna,
  Zap,
  Flame,
  Award
} from 'lucide-react';

interface AnatomicalModalProps {
  pokemon: PokemonChronoEntry | null;
  onClose: () => void;
  t: Translations;
  activeEpochId: EpochId;
}

export const AnatomicalModal: React.FC<AnatomicalModalProps> = ({
  pokemon,
  onClose,
  t,
  activeEpochId,
}) => {
  const [activeLayer, setActiveLayer] = useState<number>(1); // 1 to 4

  useEffect(() => {
    if (pokemon) {
      setActiveLayer(1);
      chronoAudio.playLayerPeel(1);
    }
  }, [pokemon]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!pokemon) return null;

  const handleLayerChange = (layerNum: number) => {
    chronoAudio.playLayerPeel(layerNum);
    setActiveLayer(layerNum);
  };

  // 5 Epoch Styling for Modal Chamber
  const getModalTheme = () => {
    switch (activeEpochId) {
      case 'primordial':
        return {
          bg: 'bg-[#2A1A12]',
          text: 'text-[#F5EBE1]',
          border: 'border-[#9C4221]',
          card: 'bg-[#3A2419]',
          accent: 'text-[#D97706]',
          badge: 'bg-[#523927] text-amber-200 border-amber-600',
        };
      case 'drift':
        return {
          bg: 'bg-[#FAF6EE]',
          text: 'text-[#2D2318]',
          border: 'border-[#C5A059]',
          card: 'bg-[#F4ECE1]',
          accent: 'text-[#B8781B]',
          badge: 'bg-[#F4ECE1] text-[#8A6D4B] border-[#C5A059]',
        };
      case 'feudal':
        return {
          bg: 'bg-[#1C241E]',
          text: 'text-[#F3EFE6]',
          border: 'border-[#8C3A2E]',
          card: 'bg-[#253328]',
          accent: 'text-[#D4AF37]',
          badge: 'bg-[#2E4032] text-[#D4AF37] border-[#8C3A2E]',
        };
      case 'modern':
        return {
          bg: 'bg-[#FAF6EE]',
          text: 'text-[#1E252B]',
          border: 'border-[#DEC6AE]',
          card: 'bg-[#FDFBF7]',
          accent: 'text-[#D95A47]',
          badge: 'bg-[#F4ECE1] text-[#2F6D68] border-[#DEC6AE]',
        };
      case 'future':
      default:
        return {
          bg: 'bg-[#0B1120]',
          text: 'text-[#E2E8F0]',
          border: 'border-[#0284C7]',
          card: 'bg-[#0F172A]',
          accent: 'text-[#38BDF8]',
          badge: 'bg-[#1E293B] text-cyan-300 border-cyan-500',
        };
    }
  };

  const theme = getModalTheme();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md select-none font-mono transition-all duration-300"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-4xl max-h-[92vh] flex flex-col ${theme.bg} ${theme.text} border-2 ${theme.border} rounded-2xl shadow-paper-lg overflow-hidden paper-grain animate-in zoom-in-95 duration-200`}
      >
        {/* Top Header Rail */}
        <div className={`p-4 sm:p-6 border-b-2 ${theme.border} flex items-center justify-between gap-3 bg-black/10`}>
          <div className="space-y-0.5">
            <div className={`text-[10px] uppercase font-bold tracking-widest ${theme.accent} flex items-center gap-1.5`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>NATURALIST DOSSIER // #{String(pokemon.national_id).padStart(4, '0')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
              {pokemon.name} <span className="text-xs font-mono opacity-60">({pokemon.japanese_name})</span>
            </h2>
            <div className="italic font-serif text-sm opacity-80">
              {t.binomialTaxonomy}: <strong className={theme.accent}>{pokemon.binomial_name}</strong>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl border-2 ${theme.border} hover:bg-white/10 transition-colors cursor-pointer`}
            title={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tactile Layer Slicer Controller */}
        <div className={`p-3 border-b ${theme.border} bg-black/20 flex items-center justify-between gap-2 overflow-x-auto`}>
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider flex-shrink-0">
            <Layers className="w-4 h-4" />
            <span className="hidden sm:inline">{t.layerSlicer}:</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {[
              { num: 1, label: t.layer1Name },
              { num: 2, label: t.layer2Name },
              { num: 3, label: t.layer3Name },
              { num: 4, label: t.layer4Name },
            ].map((layer) => (
              <button
                key={layer.num}
                onClick={() => handleLayerChange(layer.num)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg border text-[10px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeLayer === layer.num
                    ? 'bg-[#D97706] text-black border-amber-400 shadow-paper-sm scale-105'
                    : 'border-current/30 hover:bg-white/10 opacity-75'
                }`}
              >
                {layer.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Inspection Chamber Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* Main Visual Chamber with Dynamic Layer Transformation Filter */}
          <div className={`relative p-6 rounded-2xl border-2 ${theme.border} ${theme.card} flex flex-col items-center justify-center min-h-[260px] overflow-hidden shadow-inner`}>
            {/* Background grid */}
            <div className="absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

            {/* Specimen Visual Filtered by Layer */}
            <div
              className={`relative z-10 transform scale-110 sm:scale-125 transition-all duration-500 my-4 ${
                activeLayer === 2
                  ? 'filter invert brightness-125 contrast-150 hue-rotate-180 drop-shadow-[0_0_20px_rgba(56,189,248,0.7)]'
                  : activeLayer === 3
                  ? 'filter drop-shadow-[0_0_25px_rgba(245,158,11,0.8)] contrast-125 saturate-150'
                  : activeLayer === 4
                  ? 'filter sepia(80%) drop-shadow-[2px_4px_8px_rgba(0,0,0,0.4)]'
                  : 'drop-shadow-[3px_5px_8px_rgba(0,0,0,0.3)]'
              }`}
            >
              <img
                src={pokemon.sprites.artwork}
                alt={pokemon.name}
                className="max-h-56 sm:max-h-64 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = pokemon.sprites.icon;
                }}
              />
            </div>

            {/* Active Layer Tag Badge */}
            <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-black/40 border border-current/30 text-[10px]">
              VIEWING: <span className="font-bold text-amber-400">LAYER {activeLayer}</span>
            </div>

            <div className="absolute bottom-3 right-3 px-3 py-1 rounded-md bg-black/40 border border-current/30 text-[10px]">
              ERA: <span className="font-bold">{pokemon.epoch.time_label}</span>
            </div>
          </div>

          {/* ===============================================================
           * LAYER 1: DERMIS & EPIDERMAL INTEGUMENT
           * =============================================================== */}
          {activeLayer === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className={`p-4 sm:p-5 rounded-xl border ${theme.border} ${theme.card} space-y-2`}>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Shield className="w-4 h-4" />
                    <span>{pokemon.anatomy.layer_1_dermis.title}</span>
                  </span>
                  <span className="text-[10px] opacity-75">{pokemon.anatomy.layer_1_dermis.integument_type}</span>
                </div>
                <p className="font-serif text-sm sm:text-base leading-relaxed italic opacity-95">
                  "{pokemon.anatomy.layer_1_dermis.description}"
                </p>
                <div className="pt-2 text-xs border-t border-current/15 flex flex-wrap gap-4 opacity-80">
                  <span>{t.height}: <strong>{pokemon.height_m} m</strong></span>
                  <span>{t.weight}: <strong>{pokemon.weight_kg} kg</strong></span>
                  <span>TYPES: <strong>{pokemon.types.join(' / ')}</strong></span>
                </div>
              </div>
            </div>
          )}

          {/* ===============================================================
           * LAYER 2: OSTEOLOGY & SKELETAL FRAMEWORK
           * =============================================================== */}
          {activeLayer === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className={`p-4 sm:p-5 rounded-xl border ${theme.border} ${theme.card} space-y-3`}>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                    <Activity className="w-4 h-4" />
                    <span>{pokemon.anatomy.layer_2_osteology.title}</span>
                  </span>
                  <span className="text-[10px] font-bold text-cyan-300">
                    {t.boneDensity}: {pokemon.anatomy.layer_2_osteology.bone_density_index}
                  </span>
                </div>

                <div className="text-sm font-bold opacity-90">
                  Skeletal Architecture: <span className="text-cyan-300">{pokemon.anatomy.layer_2_osteology.skeleton_type}</span>
                </div>

                <p className="font-serif text-sm sm:text-base leading-relaxed italic opacity-95">
                  "{pokemon.anatomy.layer_2_osteology.description}"
                </p>

                {/* Base Stat Metric Bars */}
                <div className="pt-2 border-t border-current/15 space-y-1.5 text-[11px]">
                  <div className="text-[10px] uppercase font-bold opacity-75">{t.baseStats} (BST: {pokemon.stats.bst})</div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <div>HP: <strong>{pokemon.stats.hp}</strong></div>
                    <div>ATK: <strong>{pokemon.stats.attack}</strong></div>
                    <div>DEF: <strong>{pokemon.stats.defense}</strong></div>
                    <div>SP.ATK: <strong>{pokemon.stats.special_attack}</strong></div>
                    <div>SP.DEF: <strong>{pokemon.stats.special_defense}</strong></div>
                    <div>SPEED: <strong>{pokemon.stats.speed}</strong></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===============================================================
           * LAYER 3: BIOCHEMICAL ELEMENTAL CORE
           * =============================================================== */}
          {activeLayer === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className={`p-4 sm:p-5 rounded-xl border ${theme.border} ${theme.card} space-y-3`}>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Zap className="w-4 h-4" />
                    <span>{pokemon.anatomy.layer_3_elemental_core.title}</span>
                  </span>
                  <span className="text-[10px] font-bold">{t.elementalReactor}</span>
                </div>

                {/* Primary Organ */}
                <div className="p-3 rounded-lg bg-black/20 border border-current/20 space-y-1">
                  <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5" />
                    <span>PRIMARY ORGAN: {pokemon.anatomy.layer_3_elemental_core.primary_organ}</span>
                  </div>
                  <p className="font-serif text-xs sm:text-sm leading-relaxed italic opacity-90">
                    {pokemon.anatomy.layer_3_elemental_core.primary_organ_desc}
                  </p>
                </div>

                {/* Secondary Organ if dual type */}
                {pokemon.anatomy.layer_3_elemental_core.secondary_organ && (
                  <div className="p-3 rounded-lg bg-black/20 border border-current/20 space-y-1">
                    <div className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      <span>SECONDARY ORGAN: {pokemon.anatomy.layer_3_elemental_core.secondary_organ}</span>
                    </div>
                    <p className="font-serif text-xs sm:text-sm leading-relaxed italic opacity-90">
                      {pokemon.anatomy.layer_3_elemental_core.secondary_organ_desc}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ===============================================================
           * LAYER 4: TECTONIC SPECIATION & GEOLOGICAL ORIGIN
           * =============================================================== */}
          {activeLayer === 4 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className={`p-4 sm:p-5 rounded-xl border ${theme.border} ${theme.card} space-y-3`}>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Globe className="w-4 h-4" />
                    <span>{pokemon.anatomy.layer_4_geologic_speciation.title}</span>
                  </span>
                  <span className="text-[10px] font-bold">{pokemon.anatomy.layer_4_geologic_speciation.time_era}</span>
                </div>

                <div className="p-3 rounded-lg bg-black/20 border border-current/20 space-y-1">
                  <div className="text-xs font-bold text-amber-300">
                    TECTONIC PHENOMENON: {pokemon.anatomy.layer_4_geologic_speciation.tectonic_event}
                  </div>
                  <p className="font-serif text-xs sm:text-sm leading-relaxed italic opacity-90">
                    "{pokemon.anatomy.layer_4_geologic_speciation.speciation_notes}"
                  </p>
                </div>

                {/* Pokedex Archival Note */}
                <div className="space-y-1 pt-1">
                  <div className="text-[10px] uppercase font-bold opacity-75">CANONICAL FIELD OBSERVATION:</div>
                  <p className="font-serif text-xs sm:text-sm leading-relaxed italic border-l-2 border-amber-500 pl-3 opacity-90">
                    "{pokemon.description}"
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
