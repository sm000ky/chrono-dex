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
  Zap,
  Flame,
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

  // 5 Distinct High-Contrast Modal Themes per Era
  const getModalTheme = () => {
    switch (activeEpochId) {
      case 'primordial':
        return {
          bg: 'bg-[#1C100B] text-[#F7EFE8] border-4 border-[#8C3E1B] shadow-[0_0_50px_rgba(0,0,0,0.8)]',
          card: 'bg-[#29170E] border border-[#8C3E1B]',
          subtext: 'text-[#D2BA9F]',
          accent: 'text-[#E07A28]',
          headerBg: 'bg-[#120A06] border-b-2 border-[#8C3E1B]',
          tabActive: 'bg-[#E07A28] text-black font-bold border-[#E07A28] shadow-paper-sm',
          tabInactive: 'bg-[#1C100B] text-[#D2BA9F] border-[#8C3E1B]/60 hover:bg-[#29170E]',
          innerMat: 'bg-[#2E1B11] border border-[#8C3E1B]/50',
        };
      case 'drift':
        return {
          bg: 'bg-[#FAF3E3] text-[#1C1309] border-4 border-[#B38F56] shadow-paper-lg',
          card: 'bg-[#F2E7D0] border-2 border-[#B38F56]/60',
          subtext: 'text-[#4A3A26]',
          accent: 'text-[#8A6225]',
          headerBg: 'bg-[#EFE3C8] border-b-2 border-[#B38F56]',
          tabActive: 'bg-[#8A6225] text-white font-bold border-[#8A6225] shadow-paper-sm',
          tabInactive: 'bg-[#FAF3E3] text-[#1C1309] border-[#B38F56] hover:bg-[#EFE3C8]',
          innerMat: 'bg-[#FFF9EE] border-2 border-[#B38F56]/50 shadow-inner',
        };
      case 'feudal':
        return {
          bg: 'bg-[#101712] text-[#F8F6EF] border-4 border-[#991B1B] shadow-[0_0_50px_rgba(0,0,0,0.9)]',
          card: 'bg-[#19241D] border border-[#991B1B]/60',
          subtext: 'text-[#C3D1C8]',
          accent: 'text-[#D4AF37]',
          headerBg: 'bg-[#0A100C] border-b-2 border-[#991B1B]',
          tabActive: 'bg-[#991B1B] text-white font-bold border-[#D4AF37] shadow-paper-sm',
          tabInactive: 'bg-[#101712] text-[#C3D1C8] border-[#991B1B]/50 hover:bg-[#19241D]',
          innerMat: 'bg-[#1D2B22] border border-[#D4AF37]/40',
        };
      case 'modern':
        return {
          bg: 'bg-[#FAF7F2] text-[#111827] border-4 border-[#1E252B] shadow-[8px_8px_0px_#1E252B]',
          card: 'bg-white border-2 border-[#1E252B]',
          subtext: 'text-[#374151]',
          accent: 'text-[#C53030]',
          headerBg: 'bg-[#EAE6DE] border-b-2 border-[#1E252B]',
          tabActive: 'bg-[#1E252B] text-white font-bold border-[#1E252B]',
          tabInactive: 'bg-white text-[#111827] border-[#1E252B] hover:bg-[#EAE6DE]',
          innerMat: 'bg-[#F9F8F6] border-2 border-[#1E252B]/20 shadow-inner',
        };
      case 'future':
      default:
        return {
          bg: 'bg-[#040814] text-[#F0F9FF] border-4 border-[#0284C7] shadow-[0_0_50px_rgba(6,182,212,0.3)]',
          card: 'bg-[#0C1322] border border-cyan-500/40',
          subtext: 'text-[#94A3B8]',
          accent: 'text-[#38BDF8]',
          headerBg: 'bg-[#02040A] border-b-2 border-cyan-500/50',
          tabActive: 'bg-[#38BDF8] text-black font-bold border-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.5)]',
          tabInactive: 'bg-[#040814] text-[#94A3B8] border-cyan-500/30 hover:bg-[#0C1322]',
          innerMat: 'bg-[#02050E] border border-cyan-500/30',
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
        className={`relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl overflow-hidden paper-grain animate-in zoom-in-95 duration-200 ${theme.bg}`}
      >
        {/* Top Header Rail */}
        <div className={`p-4 sm:p-6 flex items-center justify-between gap-3 ${theme.headerBg}`}>
          <div className="space-y-0.5">
            <div className={`text-[10px] uppercase font-bold tracking-widest ${theme.accent} flex items-center gap-1.5`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>NATURALIST DOSSIER // #{String(pokemon.national_id).padStart(4, '0')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
              {pokemon.name} <span className="text-xs font-mono opacity-70">({pokemon.japanese_name})</span>
            </h2>
            <div className="italic font-serif text-sm font-semibold">
              {t.binomialTaxonomy}: <span className={theme.accent}>{pokemon.binomial_name}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl border-2 border-current hover:bg-black/20 transition-colors cursor-pointer"
            title={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tactile Layer Slicer Controller */}
        <div className="p-3 border-b border-current/20 bg-black/10 flex items-center justify-between gap-2 overflow-x-auto">
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
                className={`px-3 py-1.5 rounded-lg border text-[10px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeLayer === layer.num ? theme.tabActive : theme.tabInactive
                }`}
              >
                {layer.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Inspection Chamber Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* Main Visual Chamber with High-Contrast Inner Mat */}
          <div className={`relative p-6 rounded-2xl flex flex-col items-center justify-center min-h-[280px] overflow-hidden ${theme.innerMat}`}>
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
                  ? 'filter sepia(70%) drop-shadow-[2px_4px_8px_rgba(0,0,0,0.4)]'
                  : 'drop-shadow-[3px_5px_8px_rgba(0,0,0,0.25)]'
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
            <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-black/40 border border-current/30 text-[10px] text-white">
              VIEWING: <span className="font-bold text-[#F59E0B]">LAYER {activeLayer}</span>
            </div>

            <div className="absolute bottom-3 right-3 px-3 py-1 rounded-md bg-black/40 border border-current/30 text-[10px] text-white">
              ERA: <span className="font-bold">{pokemon.epoch.time_label}</span>
            </div>
          </div>

          {/* ===============================================================
           * LAYER 1: DERMIS & EPIDERMAL INTEGUMENT
           * =============================================================== */}
          {activeLayer === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className={`p-4 sm:p-5 rounded-xl space-y-2 ${theme.card}`}>
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-bold uppercase tracking-wider ${theme.accent} flex items-center gap-1.5`}>
                    <Shield className="w-4 h-4" />
                    <span>{pokemon.anatomy.layer_1_dermis.title}</span>
                  </span>
                  <span className={`text-[10px] font-bold ${theme.subtext}`}>{pokemon.anatomy.layer_1_dermis.integument_type}</span>
                </div>
                <p className="font-serif text-sm sm:text-base leading-relaxed italic">
                  "{pokemon.anatomy.layer_1_dermis.description}"
                </p>
                <div className={`pt-2 text-xs border-t border-current/15 flex flex-wrap gap-4 font-semibold ${theme.subtext}`}>
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
              <div className={`p-4 sm:p-5 rounded-xl space-y-3 ${theme.card}`}>
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-bold uppercase tracking-wider ${theme.accent} flex items-center gap-1.5`}>
                    <Activity className="w-4 h-4" />
                    <span>{pokemon.anatomy.layer_2_osteology.title}</span>
                  </span>
                  <span className={`text-[10px] font-bold ${theme.accent}`}>
                    {t.boneDensity}: {pokemon.anatomy.layer_2_osteology.bone_density_index}
                  </span>
                </div>

                <div className="text-sm font-bold">
                  Skeletal Architecture: <span className={theme.accent}>{pokemon.anatomy.layer_2_osteology.skeleton_type}</span>
                </div>

                <p className="font-serif text-sm sm:text-base leading-relaxed italic">
                  "{pokemon.anatomy.layer_2_osteology.description}"
                </p>

                {/* Base Stat Metric Bars */}
                <div className="pt-2 border-t border-current/15 space-y-1.5 text-[11px]">
                  <div className={`text-[10px] uppercase font-bold ${theme.subtext}`}>{t.baseStats} (BST: {pokemon.stats.bst})</div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-semibold">
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
              <div className={`p-4 sm:p-5 rounded-xl space-y-3 ${theme.card}`}>
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-bold uppercase tracking-wider ${theme.accent} flex items-center gap-1.5`}>
                    <Zap className="w-4 h-4" />
                    <span>{pokemon.anatomy.layer_3_elemental_core.title}</span>
                  </span>
                  <span className="text-[10px] font-bold">{t.elementalReactor}</span>
                </div>

                {/* Primary Organ */}
                <div className="p-3 rounded-lg bg-black/15 border border-current/20 space-y-1">
                  <div className={`text-xs font-bold ${theme.accent} flex items-center gap-1.5`}>
                    <Flame className="w-3.5 h-3.5" />
                    <span>PRIMARY ORGAN: {pokemon.anatomy.layer_3_elemental_core.primary_organ}</span>
                  </div>
                  <p className="font-serif text-xs sm:text-sm leading-relaxed italic">
                    {pokemon.anatomy.layer_3_elemental_core.primary_organ_desc}
                  </p>
                </div>

                {/* Secondary Organ if dual type */}
                {pokemon.anatomy.layer_3_elemental_core.secondary_organ && (
                  <div className="p-3 rounded-lg bg-black/15 border border-current/20 space-y-1">
                    <div className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      <span>SECONDARY ORGAN: {pokemon.anatomy.layer_3_elemental_core.secondary_organ}</span>
                    </div>
                    <p className="font-serif text-xs sm:text-sm leading-relaxed italic">
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
              <div className={`p-4 sm:p-5 rounded-xl space-y-3 ${theme.card}`}>
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-bold uppercase tracking-wider ${theme.accent} flex items-center gap-1.5`}>
                    <Globe className="w-4 h-4" />
                    <span>{pokemon.anatomy.layer_4_geologic_speciation.title}</span>
                  </span>
                  <span className="text-[10px] font-bold">{pokemon.anatomy.layer_4_geologic_speciation.time_era}</span>
                </div>

                <div className="p-3 rounded-lg bg-black/15 border border-current/20 space-y-1">
                  <div className={`text-xs font-bold ${theme.accent}`}>
                    TECTONIC PHENOMENON: {pokemon.anatomy.layer_4_geologic_speciation.tectonic_event}
                  </div>
                  <p className="font-serif text-xs sm:text-sm leading-relaxed italic">
                    "{pokemon.anatomy.layer_4_geologic_speciation.speciation_notes}"
                  </p>
                </div>

                {/* Pokedex Archival Note */}
                <div className="space-y-1 pt-1">
                  <div className={`text-[10px] uppercase font-bold ${theme.subtext}`}>CANONICAL FIELD OBSERVATION:</div>
                  <p className={`font-serif text-xs sm:text-sm leading-relaxed italic border-l-2 pl-3`} style={{ borderColor: 'currentColor' }}>
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
