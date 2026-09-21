import React, { useState } from 'react';
import { PokemonChronoEntry, EpochId } from '../types';
import { chronoAudio } from '../lib/audioEngine';
import {
  Layers,
  Sliders,
  Shield,
  Activity,
  Zap,
  Globe,
  Flame,
  Sparkles,
  ChevronRight,
  Crosshair,
  Radio,
  Brush,
  CheckCircle2
} from 'lucide-react';

interface FeaturedDissectionBenchProps {
  pokemonList: PokemonChronoEntry[];
  epochId: EpochId;
  onOpenFullModal: (pokemon: PokemonChronoEntry) => void;
}

const BENCH_SPECIMEN_IDS = [
  6,    // Charizard
  25,   // Pikachu
  130,  // Gyarados
  138,  // Omanyte (Primordial Fossil)
  448,  // Lucario
  591,  // Amoonguss
  905,  // Enamorus
  984,  // Great Tusk
  1008, // Miraidon
];

export const FeaturedDissectionBench: React.FC<FeaturedDissectionBenchProps> = ({
  pokemonList,
  epochId,
  onOpenFullModal,
}) => {
  const [selectedId, setSelectedId] = useState<number>(6);
  const [activeLayer, setActiveLayer] = useState<number>(1);
  const [peelPercent, setPeelPercent] = useState<number>(100);

  // Interactive Excitement Features:
  const [isStimulated, setIsStimulated] = useState<boolean>(false);
  const [fossilExcavatedPercent, setFossilExcavatedPercent] = useState<number>(0);
  const [isBrushMode, setIsBrushMode] = useState<boolean>(false);

  const specimen = pokemonList.find((p) => p.id === selectedId) || pokemonList[0];

  const handleSelectSpecimen = (id: number) => {
    chronoAudio.playLayerPeel(1);
    setSelectedId(id);
    setActiveLayer(1);
    setPeelPercent(100);
    setIsStimulated(false);
    setFossilExcavatedPercent(0);
  };

  const handleLayerChange = (layer: number) => {
    chronoAudio.playLayerPeel(layer);
    setActiveLayer(layer);
  };

  const handleStimulateOrgan = () => {
    chronoAudio.playLayerPeel(3);
    setIsStimulated(true);
    setTimeout(() => setIsStimulated(false), 2000);
  };

  const handleDustFossil = () => {
    chronoAudio.playLayerPeel(1);
    setFossilExcavatedPercent((prev) => Math.min(100, prev + 25));
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-8 px-4 font-mono select-none">
      {/* Workbench Outer Frame */}
      <div className="p-4 sm:p-7 rounded-2xl border-4 border-current/30 bg-black/15 backdrop-blur-md shadow-2xl space-y-6">
        {/* Workbench Title & Tooling Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-current/20 pb-4 min-w-0">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-[#E07A28] min-w-0">
              <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">NATURALIST WORKBENCH // INTERACTIVE BIO-DISSECTION</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-serif font-bold tracking-tight break-words">
              Anatomical Dissection Station
            </h2>
            <p className="text-xs opacity-75 font-serif italic break-words">
              Peel skin integument, examine osteological density, and trigger elemental bio-resonance.
            </p>
          </div>

          {/* Quick Specimen Picker */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {BENCH_SPECIMEN_IDS.map((id) => {
              const p = pokemonList.find((item) => item.id === id);
              if (!p) return null;
              return (
                <button
                  key={id}
                  onClick={() => handleSelectSpecimen(id)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 flex-shrink-0 ${
                    selectedId === id
                      ? 'bg-amber-500 text-black border-amber-400 shadow-md font-extrabold scale-105'
                      : 'bg-black/20 hover:bg-black/40 border-current/20 opacity-80'
                  }`}
                >
                  <span>#{p.national_id}</span>
                  <span className="hidden md:inline truncate">{p.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Laboratory Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column: Visual Dissection Chamber */}
          <div className="lg:col-span-6 relative p-5 sm:p-7 rounded-xl bg-black/30 border-2 border-current/25 flex flex-col items-center justify-center min-h-[360px] overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] [background-size:14px_14px] opacity-10 pointer-events-none" />

            {/* Specimen Visual Stage */}
            <div className="relative z-10 w-full max-w-xs aspect-square flex items-center justify-center my-2">
              {/* Underlying Skeleton/Elemental Core */}
              {(activeLayer === 2 || activeLayer === 3) && (
                <img
                  src={specimen.sprites.artwork}
                  alt={specimen.name}
                  className={`absolute inset-0 w-full h-full object-contain filter transition-all duration-300 ${
                    activeLayer === 2
                      ? 'invert brightness-125 contrast-200 hue-rotate-180 drop-shadow-[0_0_25px_rgba(56,189,248,0.9)]'
                      : isStimulated
                      ? 'drop-shadow-[0_0_40px_rgba(245,158,11,1)] contrast-175 saturate-200 scale-105'
                      : 'drop-shadow-[0_0_30px_rgba(245,158,11,0.85)] contrast-150 saturate-175'
                  }`}
                />
              )}

              {/* Surface Dermis with Interactive Scalpel Peel */}
              <img
                src={specimen.sprites.artwork}
                alt={specimen.name}
                style={{ opacity: activeLayer === 1 ? 1 : peelPercent / 100 }}
                className={`relative z-10 w-full h-full object-contain transition-all duration-300 ${
                  isStimulated ? 'scale-105' : ''
                }`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = specimen.sprites.icon;
                }}
              />

              {/* Fossil Dusting Overlay (Excavation Game) */}
              {isBrushMode && fossilExcavatedPercent < 100 && (
                <div
                  onClick={handleDustFossil}
                  className="absolute inset-0 rounded-xl bg-[#4A3525]/90 border-2 border-[#D97706] backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer p-4 text-center z-30 select-none shadow-[inset_0_2px_12px_rgba(0,0,0,0.8)]"
                >
                  <Brush className="w-8 h-8 text-[#D97706] drop-shadow-[0_0_8px_rgba(217,119,6,0.6)] mb-2" />
                  <span className="font-bold text-xs text-[#FEF3C7] uppercase tracking-wider">
                    TAP TO BRUSH FOSSIL STRATA
                  </span>
                  <span className="text-[10px] text-[#FDE68A] mt-1 font-mono">
                    Sediment Removed: {fossilExcavatedPercent}% / 100%
                  </span>
                </div>
              )}
            </div>

            {/* Scalpel Peeling Lever */}
            <div className="w-full max-w-xs mt-3 flex items-center gap-2.5 bg-black/60 px-3.5 py-2 rounded-xl border border-current/30 z-10 text-xs">
              <Sliders className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="font-bold text-[10px] uppercase whitespace-nowrap">Peel Skin:</span>
              <input
                type="range"
                min="0"
                max="100"
                value={peelPercent}
                onChange={(e) => setPeelPercent(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <span className="font-mono text-xs w-8 text-right font-bold text-amber-400">{peelPercent}%</span>
            </div>

            {/* Interactive Excitement Controls Bar */}
            <div className="w-full flex flex-wrap items-center justify-between gap-2 mt-3 pt-2 border-t border-current/20 text-[10px]">
              <button
                onClick={handleStimulateOrgan}
                className={`px-3 py-1.5 rounded-lg border font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                  isStimulated
                    ? 'bg-amber-500 text-black border-amber-300 scale-105 shadow-[0_0_15px_rgba(245,158,11,0.7)] font-extrabold'
                    : 'bg-black/30 hover:bg-black/50 border-current/30 text-amber-400'
                }`}
              >
                <Radio className={`w-3.5 h-3.5 ${isStimulated ? 'drop-shadow-[0_0_8px_currentColor]' : ''}`} />
                <span>{isStimulated ? 'DISCHARGING ENERGY!' : 'Stimulate Bio-Organ'}</span>
              </button>

              <button
                onClick={() => {
                  chronoAudio.playLayerPeel(2);
                  setIsBrushMode(!isBrushMode);
                  if (!isBrushMode) setFossilExcavatedPercent(0);
                }}
                className={`px-3 py-1.5 rounded-lg border font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                  isBrushMode ? 'bg-[#D97706] text-black border-[#FDE68A]' : 'bg-black/30 hover:bg-black/50 border-current/30'
                }`}
              >
                <Brush className="w-3.5 h-3.5" />
                <span>{isBrushMode ? 'Close Brush' : 'Excavate Fossil'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Diagnostic Dossier */}
          <div className="lg:col-span-6 space-y-4 min-w-0">
            <div className="p-4 rounded-xl border-2 border-current/20 bg-black/10 space-y-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-amber-500 truncate">
                  NATIONAL ARCHIVE #{String(specimen.national_id).padStart(4, '0')}
                </span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-black/30 border border-current/20 flex-shrink-0">
                  {specimen.epoch.time_label}
                </span>
              </div>
              <h3 className="text-2xl font-serif font-bold break-words">
                {specimen.name} <span className="text-sm font-mono opacity-60">({specimen.japanese_name})</span>
              </h3>
              <p className="text-xs font-serif italic text-amber-400 font-semibold truncate">
                Taksonomi: {specimen.binomial_name}
              </p>
            </div>

            {/* Layer Selection Ribbon */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { num: 1, label: 'Dermis', icon: Shield },
                { num: 2, label: 'Osteology', icon: Activity },
                { num: 3, label: 'Organ Core', icon: Zap },
                { num: 4, label: 'Tectonics', icon: Globe },
              ].map((l) => {
                const Icon = l.icon;
                return (
                  <button
                    key={l.num}
                    onClick={() => handleLayerChange(l.num)}
                    className={`p-2 sm:p-2.5 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center gap-1 min-w-0 ${
                      activeLayer === l.num
                        ? 'bg-amber-500 text-black border-amber-400 font-bold shadow-md scale-105'
                        : 'bg-black/15 hover:bg-black/30 border-current/20 text-xs'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-[10px] uppercase font-bold truncate max-w-full">{l.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Diagnostic Information */}
            <div className="p-4 sm:p-5 rounded-xl border-2 border-current/20 bg-black/10 min-h-[160px] flex flex-col justify-between space-y-3 min-w-0">
              {activeLayer === 1 && (
                <div className="space-y-2 animate-in fade-in min-w-0">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-400 gap-2">
                    <span className="truncate">{specimen.anatomy.layer_1_dermis.title}</span>
                    <span className="truncate flex-shrink-0">{specimen.anatomy.layer_1_dermis.integument_type}</span>
                  </div>
                  <p className="font-serif text-sm leading-relaxed italic break-words">
                    "{specimen.anatomy.layer_1_dermis.description}"
                  </p>
                </div>
              )}

              {activeLayer === 2 && (
                <div className="space-y-2 animate-in fade-in min-w-0">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-400 gap-2">
                    <span className="truncate">{specimen.anatomy.layer_2_osteology.title}</span>
                    <span className="truncate flex-shrink-0">SKELETON: {specimen.anatomy.layer_2_osteology.skeleton_type}</span>
                  </div>
                  <p className="font-serif text-sm leading-relaxed italic break-words">
                    "{specimen.anatomy.layer_2_osteology.description}"
                  </p>
                </div>
              )}

              {activeLayer === 3 && (
                <div className="space-y-2 animate-in fade-in min-w-0">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-400 gap-2">
                    <span className="flex items-center gap-1 truncate">
                      <Flame className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{specimen.anatomy.layer_3_elemental_core.primary_organ}</span>
                    </span>
                    <span className="flex-shrink-0">BIO-REACTOR</span>
                  </div>
                  <p className="font-serif text-sm leading-relaxed italic break-words">
                    {specimen.anatomy.layer_3_elemental_core.primary_organ_desc}
                  </p>
                </div>
              )}

              {activeLayer === 4 && (
                <div className="space-y-2 animate-in fade-in min-w-0">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-400 gap-2">
                    <span className="truncate">{specimen.anatomy.layer_4_geologic_speciation.title}</span>
                    <span className="truncate flex-shrink-0">{specimen.anatomy.layer_4_geologic_speciation.time_era}</span>
                  </div>
                  <p className="font-serif text-sm leading-relaxed italic break-words">
                    "{specimen.anatomy.layer_4_geologic_speciation.speciation_notes}"
                  </p>
                </div>
              )}

              {/* Action Button */}
              <button
                onClick={() => onOpenFullModal(specimen)}
                className="w-full py-2.5 rounded-lg border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Examine Full 4-Layer Specimen Codex</span>
                <ChevronRight className="w-4 h-4 flex-shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
