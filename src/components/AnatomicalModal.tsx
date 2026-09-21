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
  Info,
  Sliders,
  Crosshair,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface AnatomicalModalProps {
  pokemon: PokemonChronoEntry | null;
  onClose: () => void;
  t: Translations;
  activeEpochId: EpochId;
  onNavigatePokemon?: (pokemon: PokemonChronoEntry) => void;
  pokemonList?: PokemonChronoEntry[];
}

export const AnatomicalModal: React.FC<AnatomicalModalProps> = ({
  pokemon,
  onClose,
  t,
  activeEpochId,
  onNavigatePokemon,
  pokemonList,
}) => {
  const [activeLayer, setActiveLayer] = useState<number>(1);
  const [peelOpacity, setPeelOpacity] = useState<number>(100); // 0 = Skeleton/Core, 100 = Dermis
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const currentIndex = pokemon && pokemonList ? pokemonList.findIndex((p) => p.id === pokemon.id) : -1;
  const prevPokemon = currentIndex > 0 && pokemonList ? pokemonList[currentIndex - 1] : null;
  const nextPokemon = currentIndex >= 0 && pokemonList && currentIndex < pokemonList.length - 1 ? pokemonList[currentIndex + 1] : null;

  const handlePrev = () => {
    if (prevPokemon && onNavigatePokemon) {
      chronoAudio.playLayerPeel(1);
      onNavigatePokemon(prevPokemon);
    }
  };

  const handleNext = () => {
    if (nextPokemon && onNavigatePokemon) {
      chronoAudio.playLayerPeel(1);
      onNavigatePokemon(nextPokemon);
    }
  };

  useEffect(() => {
    if (pokemon) {
      setActiveLayer(1);
      setPeelOpacity(100);
      setActiveHotspot(null);
      chronoAudio.playLayerPeel(1);
    }
  }, [pokemon]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && prevPokemon) handlePrev();
      if (e.key === 'ArrowRight' && nextPokemon) handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, prevPokemon, nextPokemon]);

  if (!pokemon) return null;

  const handleLayerChange = (layerNum: number) => {
    chronoAudio.playLayerPeel(layerNum);
    setActiveLayer(layerNum);
    setActiveHotspot(null);
  };

  // 5 COMPLETELY DIFFERENT BOX ARCHITECTURES FOR EACH ERA
  const getEraStructure = () => {
    switch (activeEpochId) {
      case 'primordial':
        return {
          wrapper: 'bg-[#180E07] text-[#F5EBE1] border-4 border-[#8C3E1B] rounded-none shadow-[0_0_60px_rgba(0,0,0,0.95)]',
          frameStyle: 'outline outline-2 outline-[#E07A28] outline-offset-4',
          header: 'bg-[#0E0703] border-b-2 border-[#8C3E1B] p-4 sm:p-6',
          titleFont: 'font-serif uppercase tracking-widest text-[#E07A28]',
          tabActive: 'bg-[#E07A28] text-black font-bold border-2 border-[#E07A28]',
          tabInactive: 'bg-[#24150D] text-[#D2BA9F] border border-[#8C3E1B] hover:bg-[#341F14]',
          stageBg: 'bg-[#100904] border-2 border-[#8C3E1B]',
          card: 'bg-[#22130B] border border-[#8C3E1B] text-[#F5EBE1]',
          accentText: 'text-[#E07A28]',
          subtext: 'text-[#D2BA9F]',
          badge: 'bg-[#3A1F11] text-[#E07A28] border border-[#8C3E1B]',
          hotspotColor: 'bg-amber-500 text-black border-amber-300',
        };
      case 'drift':
        return {
          wrapper: 'bg-[#F9F3E3] text-[#1A1108] border-8 border-[#CBB282] rounded-xl shadow-2xl',
          frameStyle: 'ring-4 ring-[#8A6225]/40',
          header: 'bg-[#EDE2C8] border-b-2 border-[#B38F56] p-4 sm:p-6',
          titleFont: 'font-serif font-bold text-[#6D4C1B]',
          tabActive: 'bg-[#8A6225] text-white font-bold border-2 border-[#5E4216] shadow-sm',
          tabInactive: 'bg-[#F5EBD4] text-[#1A1108] border border-[#B38F56] hover:bg-[#EDE2C8]',
          stageBg: 'bg-[#FFFDF7] border-2 border-[#B38F56]/60 shadow-inner',
          card: 'bg-[#FFF9EE] border-2 border-[#B38F56]/50 text-[#1A1108] shadow-sm',
          accentText: 'text-[#8A6225]',
          subtext: 'text-[#4A3A26]',
          badge: 'bg-[#EAE0C8] text-[#1A1108] border border-[#B38F56] font-semibold',
          hotspotColor: 'bg-[#8A6225] text-white border-[#5E4216]',
        };
      case 'feudal':
        return {
          wrapper: 'bg-[#0E1612] text-[#F8F6EF] border-4 border-[#991B1B] rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.95)]',
          frameStyle: 'border-double border-8 border-[#D4AF37]/50',
          header: 'bg-[#060B08] border-b-2 border-[#991B1B] p-4 sm:p-6',
          titleFont: 'font-serif font-bold text-[#D4AF37]',
          tabActive: 'bg-[#991B1B] text-[#FFF] font-bold border-2 border-[#D4AF37] shadow-sm',
          tabInactive: 'bg-[#15201A] text-[#C3D1C8] border border-[#991B1B]/60 hover:bg-[#1E2E25]',
          stageBg: 'bg-[#080D0A] border-2 border-[#D4AF37]/40',
          card: 'bg-[#141E18] border border-[#D4AF37]/30 text-[#F8F6EF]',
          accentText: 'text-[#D4AF37]',
          subtext: 'text-[#C3D1C8]',
          badge: 'bg-[#223328] text-[#D4AF37] border border-[#D4AF37]/40',
          hotspotColor: 'bg-[#991B1B] text-white border-[#D4AF37]',
        };
      case 'modern':
        return {
          wrapper: 'bg-[#FFFFFF] text-[#111827] border-4 border-[#1E252B] rounded-none shadow-[12px_12px_0px_#1E252B]',
          frameStyle: '',
          header: 'bg-[#F3F0EA] border-b-4 border-[#1E252B] p-4 sm:p-6',
          titleFont: 'font-serif font-bold text-[#111827]',
          tabActive: 'bg-[#1E252B] text-white font-bold border-2 border-[#1E252B]',
          tabInactive: 'bg-white text-[#111827] border-2 border-[#1E252B] hover:bg-[#F3F0EA]',
          stageBg: 'bg-[#F9F8F6] border-2 border-[#1E252B]',
          card: 'bg-[#FFFFFF] border-2 border-[#1E252B] text-[#111827] shadow-[4px_4px_0px_#1E252B]',
          accentText: 'text-[#C53030]',
          subtext: 'text-[#374151]',
          badge: 'bg-[#E5E2D9] text-[#111827] border border-[#1E252B] font-bold',
          hotspotColor: 'bg-[#C53030] text-white border-[#1E252B]',
        };
      case 'future':
      default:
        return {
          wrapper: 'bg-[#030712] text-[#F0F9FF] border-2 border-[#0284C7] rounded-3xl shadow-[0_0_70px_rgba(6,182,212,0.35)]',
          frameStyle: 'outline outline-1 outline-[#38BDF8]/60 outline-offset-4',
          header: 'bg-[#02040A] border-b border-cyan-500/40 p-4 sm:p-6',
          titleFont: 'font-mono font-bold text-[#38BDF8] tracking-widest',
          tabActive: 'bg-[#0284C7] text-white font-bold border border-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.5)]',
          tabInactive: 'bg-[#0B1324] text-[#94A3B8] border border-cyan-500/30 hover:bg-[#121E38]',
          stageBg: 'bg-[#02050E] border border-cyan-500/40',
          card: 'bg-[#0A1224] border border-cyan-500/40 text-[#F0F9FF]',
          accentText: 'text-[#38BDF8]',
          subtext: 'text-[#94A3B8]',
          badge: 'bg-[#0F1D38] text-[#38BDF8] border border-cyan-500/40',
          hotspotColor: 'bg-[#38BDF8] text-black border-cyan-200 shadow-[0_0_10px_#38BDF8]',
        };
    }
  };

  const style = getEraStructure();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-black/85 backdrop-blur-md select-none font-mono"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-5xl max-h-[94vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 ${style.wrapper} ${style.frameStyle}`}
      >
        {/* Top Header */}
        <div className={`flex items-start sm:items-center justify-between gap-3 ${style.header}`}>
          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded text-[10px] tracking-wider uppercase font-bold flex-shrink-0 ${style.badge}`}>
                SPECIES #{String(pokemon.national_id).padStart(4, '0')}
              </span>
              <span className={`text-xs font-bold ${style.accentText} truncate`}>
                {pokemon.epoch.time_label}
              </span>
            </div>

            <h2 className={`text-xl sm:text-3xl font-bold tracking-tight break-words ${style.titleFont}`}>
              {pokemon.name} <span className="text-sm opacity-60">({pokemon.japanese_name})</span>
            </h2>

            <div className={`text-xs font-serif italic break-words ${style.subtext}`}>
              Taxonomia Binomial: <strong className={style.accentText}>{pokemon.binomial_name}</strong>
            </div>
          </div>

          {/* Quick Species Prev / Next & Close */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {onNavigatePokemon && pokemonList && (
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrev}
                  disabled={!prevPokemon}
                  className="p-2 rounded-lg border-2 border-current hover:bg-black/20 disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer"
                  title={prevPokemon ? `Previous: #${prevPokemon.national_id} ${prevPokemon.name}` : 'No previous specimen'}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={!nextPokemon}
                  className="p-2 rounded-lg border-2 border-current hover:bg-black/20 disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer"
                  title={nextPokemon ? `Next: #${nextPokemon.national_id} ${nextPokemon.name}` : 'No next specimen'}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-2.5 rounded-lg border-2 border-current hover:bg-black/20 transition-all cursor-pointer flex-shrink-0"
              title={t.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tactile Layer Selection Ribbon */}
        <div className="px-4 py-2.5 border-b border-current/20 bg-black/10 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider flex-shrink-0">
            <Layers className="w-4 h-4" />
            <span className="hidden sm:inline">ANATOMICAL SLICES:</span>
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
                className={`px-3 py-1.5 rounded-md text-[11px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeLayer === layer.num ? style.tabActive : style.tabInactive
                }`}
              >
                {layer.label}
              </button>
            ))}
          </div>
        </div>

        {/* Modal Body Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Visual Examination Chamber */}
          <div className={`relative p-6 sm:p-8 rounded-xl flex flex-col items-center justify-center min-h-[300px] overflow-hidden ${style.stageBg}`}>
            {/* Background grid */}
            <div className="absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

            {/* Visual Specimen with Interactive Layers */}
            <div className="relative z-10 w-full max-w-sm aspect-square flex items-center justify-center my-2">
              {/* Layer 2/3 Underlay (Skeleton/Internal Organ) */}
              {(activeLayer === 2 || activeLayer === 3) && (
                <img
                  src={pokemon.sprites.artwork}
                  alt={pokemon.name}
                  className={`absolute inset-0 w-full h-full object-contain filter transition-all duration-300 ${
                    activeLayer === 2
                      ? 'invert brightness-125 contrast-200 hue-rotate-180 drop-shadow-[0_0_25px_rgba(56,189,248,0.8)]'
                      : 'drop-shadow-[0_0_30px_rgba(245,158,11,0.9)] contrast-150 saturate-200'
                  }`}
                />
              )}

              {/* Layer 1 Dermis Overlay with Interactive Peel Slider */}
              <img
                src={pokemon.sprites.artwork}
                alt={pokemon.name}
                style={{ opacity: activeLayer === 1 ? 1 : peelOpacity / 100 }}
                className={`relative z-10 w-full h-full object-contain transition-opacity duration-200 ${
                  activeEpochId === 'primordial'
                    ? 'sepia-[0.4] contrast-125'
                    : activeEpochId === 'drift'
                    ? 'sepia-[0.35] contrast-110'
                    : activeEpochId === 'future'
                    ? 'drop-shadow-[0_0_15px_rgba(56,189,248,0.6)]'
                    : ''
                }`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = pokemon.sprites.icon;
                }}
              />

              {/* Interactive Organ Hotspot Pins */}
              {activeLayer === 3 && (
                <>
                  <button
                    onClick={() => setActiveHotspot('cranial')}
                    className={`absolute top-[28%] left-[48%] -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] border-2 cursor-pointer z-20 ${style.hotspotColor}`}
                    title="Cranial Energy Center"
                  >
                    1
                  </button>
                  <button
                    onClick={() => setActiveHotspot('elemental')}
                    className={`absolute top-[52%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] border-2 cursor-pointer z-20 ${style.hotspotColor}`}
                    title="Elemental Synthesis Reactor"
                  >
                    2
                  </button>
                  <button
                    onClick={() => setActiveHotspot('appendage')}
                    className={`absolute bottom-[24%] right-[32%] w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] border-2 cursor-pointer z-20 ${style.hotspotColor}`}
                    title="Locomotive Conductor"
                  >
                    3
                  </button>
                </>
              )}
            </div>

            {/* Peel Slider when in Layer 2 or 3 */}
            {(activeLayer === 2 || activeLayer === 3) && (
              <div className="w-full max-w-xs mt-3 flex items-center gap-3 bg-black/40 px-3 py-1.5 rounded-lg border border-current/20 z-10 text-[11px]">
                <Sliders className="w-3.5 h-3.5 opacity-80" />
                <span className="font-bold text-[10px] uppercase whitespace-nowrap">Peel Skin:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={peelOpacity}
                  onChange={(e) => setPeelOpacity(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <span className="font-mono text-[10px] w-8 text-right">{peelOpacity}%</span>
              </div>
            )}
          </div>

          {/* DEDICATED SEPARATE STATUS STRIP (NO OVERLAPPING!) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs min-w-0">
            <div className={`p-2.5 rounded-lg border flex flex-col items-center justify-center text-center min-w-0 overflow-hidden ${style.card}`}>
              <span className={`text-[10px] uppercase font-bold truncate max-w-full ${style.subtext}`}>VIEWING LAYER</span>
              <strong className={`text-xs sm:text-sm truncate max-w-full ${style.accentText}`}>LAYER {activeLayer} OF 4</strong>
            </div>
            <div className={`p-2.5 rounded-lg border flex flex-col items-center justify-center text-center min-w-0 overflow-hidden ${style.card}`}>
              <span className={`text-[10px] uppercase font-bold truncate max-w-full ${style.subtext}`}>TIME EPOCH</span>
              <strong className="text-xs sm:text-sm truncate max-w-full">{pokemon.epoch.time_label}</strong>
            </div>
            <div className={`p-2.5 rounded-lg border flex flex-col items-center justify-center text-center min-w-0 overflow-hidden ${style.card}`}>
              <span className={`text-[10px] uppercase font-bold truncate max-w-full ${style.subtext}`}>TECTONIC REGION</span>
              <strong className="text-[11px] sm:text-xs leading-tight break-words max-w-full line-clamp-2 text-center">{pokemon.epoch.epoch_name}</strong>
            </div>
            <div className={`p-2.5 rounded-lg border flex flex-col items-center justify-center text-center min-w-0 overflow-hidden ${style.card}`}>
              <span className={`text-[10px] uppercase font-bold truncate max-w-full ${style.subtext}`}>BONE DENSITY</span>
              <strong className={`text-xs sm:text-sm truncate max-w-full ${style.accentText}`}>{pokemon.anatomy.layer_2_osteology.bone_density_index}</strong>
            </div>
          </div>

          {/* Hotspot Info Banner if clicked */}
          {activeHotspot && activeLayer === 3 && (
            <div className={`p-3 rounded-lg border flex items-center justify-between gap-3 animate-in fade-in min-w-0 ${style.card}`}>
              <div className="flex items-center gap-2 text-xs min-w-0 flex-1">
                <Crosshair className={`w-4 h-4 flex-shrink-0 ${style.accentText}`} />
                <span className="break-words min-w-0">
                  {activeHotspot === 'cranial' && `[PIN 1: Cranial Bio-Capacitor] Neural node channeling ${pokemon.types[0]} frequency waves.`}
                  {activeHotspot === 'elemental' && `[PIN 2: ${pokemon.anatomy.layer_3_elemental_core.primary_organ}] ${pokemon.anatomy.layer_3_elemental_core.primary_organ_desc}`}
                  {activeHotspot === 'appendage' && `[PIN 3: Peripheral Conductor] Musculoskeletal kinetic conduits discharging kinetic torque.`}
                </span>
              </div>
              <button onClick={() => setActiveHotspot(null)} className="opacity-70 hover:opacity-100 flex-shrink-0 p-1 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* LAYER 1: DERMIS */}
          {activeLayer === 1 && (
            <div className={`p-5 rounded-xl space-y-3 min-w-0 ${style.card}`}>
              <div className="flex flex-wrap items-center justify-between text-xs gap-2 min-w-0">
                <span className={`font-bold uppercase tracking-wider ${style.accentText} flex items-center gap-1.5 min-w-0`}>
                  <Shield className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{pokemon.anatomy.layer_1_dermis.title}</span>
                </span>
                <span className={`text-xs font-bold flex-shrink-0 ${style.subtext}`}>{pokemon.anatomy.layer_1_dermis.integument_type}</span>
              </div>
              <p className="font-serif text-sm sm:text-base leading-relaxed italic break-words">
                "{pokemon.anatomy.layer_1_dermis.description}"
              </p>
              <div className={`pt-3 border-t border-current/15 flex flex-wrap gap-4 text-xs font-semibold ${style.subtext}`}>
                <span>{t.height}: <strong className="text-current">{pokemon.height_m} m</strong></span>
                <span>{t.weight}: <strong className="text-current">{pokemon.weight_kg} kg</strong></span>
                <span>TYPES: <strong className="text-current">{pokemon.types.join(' / ')}</strong></span>
              </div>
            </div>
          )}

          {/* LAYER 2: OSTEOLOGY */}
          {activeLayer === 2 && (
            <div className={`p-5 rounded-xl space-y-3 min-w-0 ${style.card}`}>
              <div className="flex flex-wrap items-center justify-between text-xs gap-2 min-w-0">
                <span className={`font-bold uppercase tracking-wider ${style.accentText} flex items-center gap-1.5 min-w-0`}>
                  <Activity className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{pokemon.anatomy.layer_2_osteology.title}</span>
                </span>
                <span className={`text-xs font-bold flex-shrink-0 ${style.accentText}`}>
                  DENSITY: {pokemon.anatomy.layer_2_osteology.bone_density_index}
                </span>
              </div>

              <div className="text-sm font-bold break-words">
                Framework: <span className={style.accentText}>{pokemon.anatomy.layer_2_osteology.skeleton_type}</span>
              </div>

              <p className="font-serif text-sm sm:text-base leading-relaxed italic break-words">
                "{pokemon.anatomy.layer_2_osteology.description}"
              </p>

              <div className="pt-3 border-t border-current/15 space-y-1.5 text-xs">
                <div className={`text-[10px] uppercase font-bold ${style.subtext}`}>{t.baseStats} (BST: {pokemon.stats.bst})</div>
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
          )}

          {/* LAYER 3: ELEMENTAL CORE */}
          {activeLayer === 3 && (
            <div className={`p-5 rounded-xl space-y-4 min-w-0 ${style.card}`}>
              <div className="flex flex-wrap items-center justify-between text-xs gap-2 min-w-0">
                <span className={`font-bold uppercase tracking-wider ${style.accentText} flex items-center gap-1.5 min-w-0`}>
                  <Zap className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{pokemon.anatomy.layer_3_elemental_core.title}</span>
                </span>
                <span className="text-xs font-bold flex-shrink-0">{t.elementalReactor}</span>
              </div>

              <div className="p-3.5 rounded-lg bg-black/15 border border-current/20 space-y-1.5 min-w-0">
                <div className={`text-xs font-bold ${style.accentText} flex items-center gap-1.5 min-w-0`}>
                  <Flame className="w-4 h-4 flex-shrink-0" />
                  <span className="break-words">PRIMARY: {pokemon.anatomy.layer_3_elemental_core.primary_organ}</span>
                </div>
                <p className="font-serif text-xs sm:text-sm leading-relaxed italic break-words">
                  {pokemon.anatomy.layer_3_elemental_core.primary_organ_desc}
                </p>
              </div>

              {pokemon.anatomy.layer_3_elemental_core.secondary_organ && (
                <div className="p-3.5 rounded-lg bg-black/15 border border-current/20 space-y-1.5 min-w-0">
                  <div className="text-xs font-bold text-cyan-400 flex items-center gap-1.5 min-w-0">
                    <Zap className="w-4 h-4 flex-shrink-0" />
                    <span className="break-words">SECONDARY: {pokemon.anatomy.layer_3_elemental_core.secondary_organ}</span>
                  </div>
                  <p className="font-serif text-xs sm:text-sm leading-relaxed italic break-words">
                    {pokemon.anatomy.layer_3_elemental_core.secondary_organ_desc}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* LAYER 4: TECTONIC SPECIATION */}
          {activeLayer === 4 && (
            <div className={`p-5 rounded-xl space-y-4 min-w-0 ${style.card}`}>
              <div className="flex flex-wrap items-center justify-between text-xs gap-2 min-w-0">
                <span className={`font-bold uppercase tracking-wider ${style.accentText} flex items-center gap-1.5 min-w-0`}>
                  <Globe className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{pokemon.anatomy.layer_4_geologic_speciation.title}</span>
                </span>
                <span className="text-xs font-bold flex-shrink-0">{pokemon.anatomy.layer_4_geologic_speciation.time_era}</span>
              </div>

              <div className="p-3.5 rounded-lg bg-black/15 border border-current/20 space-y-1.5 min-w-0">
                <div className={`text-xs font-bold ${style.accentText} break-words`}>
                  TECTONIC TRIGGER: {pokemon.anatomy.layer_4_geologic_speciation.tectonic_event}
                </div>
                <p className="font-serif text-xs sm:text-sm leading-relaxed italic break-words">
                  "{pokemon.anatomy.layer_4_geologic_speciation.speciation_notes}"
                </p>
              </div>

              <div className="space-y-1.5 pt-1 min-w-0">
                <div className={`text-[10px] uppercase font-bold ${style.subtext}`}>FIELD NATURALIST LOG:</div>
                <p className="font-serif text-xs sm:text-sm leading-relaxed italic border-l-2 pl-3 break-words" style={{ borderColor: 'currentColor' }}>
                  "{pokemon.description}"
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
