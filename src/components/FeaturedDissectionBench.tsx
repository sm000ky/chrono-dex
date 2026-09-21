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
  Crosshair
} from 'lucide-react';

interface FeaturedDissectionBenchProps {
  pokemonList: PokemonChronoEntry[];
  epochId: EpochId;
  onOpenFullModal: (pokemon: PokemonChronoEntry) => void;
}

// Landmark specimens that best exhibit drastic adaptations across eras
const BENCH_SPECIMEN_IDS = [
  6,    // Charizard (Draco pyrotechnicus)
  25,   // Pikachu (Rodentia fulgur)
  130,  // Gyarados (Atrocioradon hydrus)
  138,  // Omanyte (Nautilus fossilis - Primordial)
  448,  // Lucario (Canis chiro-auram)
  591,  // Amoonguss (Fungus mimicry)
  905,  // Enamorus (Feudal Hisuian Kami)
  984,  // Great Tusk (Paradox Ancient)
  1008, // Miraidon (Paradox Future)
];

export const FeaturedDissectionBench: React.FC<FeaturedDissectionBenchProps> = ({
  pokemonList,
  epochId,
  onOpenFullModal,
}) => {
  const [selectedId, setSelectedId] = useState<number>(6); // Default Charizard
  const [activeLayer, setActiveLayer] = useState<number>(1);
  const [peelPercent, setPeelPercent] = useState<number>(100);

  const specimen = pokemonList.find((p) => p.id === selectedId) || pokemonList[0];

  const handleSelectSpecimen = (id: number) => {
    chronoAudio.playLayerPeel(1);
    setSelectedId(id);
    setActiveLayer(1);
    setPeelPercent(100);
  };

  const handleLayerChange = (layer: number) => {
    chronoAudio.playLayerPeel(layer);
    setActiveLayer(layer);
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-8 px-4 font-mono select-none">
      {/* Workbench Outer Frame */}
      <div className="p-5 sm:p-8 rounded-2xl border-4 border-current/30 bg-black/15 backdrop-blur-md shadow-2xl space-y-6">
        {/* Workbench Title & Tooling Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-current/20 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-[#E07A28]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NATURALIST WORKBENCH // INTERACTIVE BIO-DISSECTION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
              Anatomical Dissection Station
            </h2>
            <p className="text-xs opacity-75 font-serif italic">
              Slide the scalpel lever to peel integument, examine osteological density, and trace elemental synthesis organs.
            </p>
          </div>

          {/* Quick Specimen Picker Carousel */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {BENCH_SPECIMEN_IDS.map((id) => {
              const p = pokemonList.find((item) => item.id === id);
              if (!p) return null;
              return (
                <button
                  key={id}
                  onClick={() => handleSelectSpecimen(id)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    selectedId === id
                      ? 'bg-amber-500 text-black border-amber-400 shadow-md font-extrabold scale-105'
                      : 'bg-black/20 hover:bg-black/40 border-current/20 opacity-80'
                  }`}
                >
                  <span>#{p.national_id}</span>
                  <span className="hidden md:inline">{p.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Laboratory Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Column: Visual Dissection Specimen Chamber */}
          <div className="lg:col-span-6 relative p-6 sm:p-8 rounded-xl bg-black/25 border-2 border-current/20 flex flex-col items-center justify-center min-h-[340px] overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] [background-size:14px_14px] opacity-10 pointer-events-none" />

            {/* Specimen Visual with Layer Filtering */}
            <div className="relative z-10 w-full max-w-xs aspect-square flex items-center justify-center my-2">
              {/* Underlying Skeleton/Elemental Layer */}
              {(activeLayer === 2 || activeLayer === 3) && (
                <img
                  src={specimen.sprites.artwork}
                  alt={specimen.name}
                  className={`absolute inset-0 w-full h-full object-contain filter transition-all duration-300 ${
                    activeLayer === 2
                      ? 'invert brightness-125 contrast-200 hue-rotate-180 drop-shadow-[0_0_25px_rgba(56,189,248,0.9)]'
                      : 'drop-shadow-[0_0_35px_rgba(245,158,11,0.9)] contrast-150 saturate-200'
                  }`}
                />
              )}

              {/* Surface Integument Overlay with Scalpel Peel */}
              <img
                src={specimen.sprites.artwork}
                alt={specimen.name}
                style={{ opacity: activeLayer === 1 ? 1 : peelPercent / 100 }}
                className="relative z-10 w-full h-full object-contain transition-opacity duration-200"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = specimen.sprites.icon;
                }}
              />
            </div>

            {/* Scalpel Peeling Lever */}
            <div className="w-full max-w-xs mt-4 flex items-center gap-3 bg-black/50 px-4 py-2 rounded-xl border border-current/30 z-10 text-xs">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-[10px] uppercase whitespace-nowrap">Peel Scalpel:</span>
              <input
                type="range"
                min="0"
                max="100"
                value={peelPercent}
                onChange={(e) => setPeelPercent(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <span className="font-mono text-xs w-10 text-right font-bold text-amber-400">{peelPercent}%</span>
            </div>

            {/* Bottom Status Ribbons */}
            <div className="w-full flex items-center justify-between mt-3 text-[10px] opacity-75 font-semibold">
              <span>CANONICAL RATIO: {specimen.height_m}m / {specimen.weight_kg}kg</span>
              <span>DENSITY INDEX: {specimen.anatomy.layer_2_osteology.bone_density_index}</span>
            </div>
          </div>

          {/* Right Column: Interactive Diagnostic Dossier */}
          <div className="lg:col-span-6 space-y-4">
            {/* Specimen Header Card */}
            <div className="p-4 rounded-xl border-2 border-current/20 bg-black/10 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-500">
                  NATIONAL ARCHIVE #{String(specimen.national_id).padStart(4, '0')}
                </span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-black/30 border border-current/20">
                  {specimen.epoch.time_label}
                </span>
              </div>
              <h3 className="text-2xl font-serif font-bold">
                {specimen.name} <span className="text-sm font-mono opacity-60">({specimen.japanese_name})</span>
              </h3>
              <p className="text-xs font-serif italic text-amber-400 font-semibold">
                Taksonomi: {specimen.binomial_name}
              </p>
            </div>

            {/* Layer Selection Buttons */}
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
                    className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      activeLayer === l.num
                        ? 'bg-amber-500 text-black border-amber-400 font-bold shadow-md scale-105'
                        : 'bg-black/15 hover:bg-black/30 border-current/20 text-xs'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[10px] uppercase font-bold">{l.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Diagnostic Information Box */}
            <div className="p-4 sm:p-5 rounded-xl border-2 border-current/20 bg-black/10 min-h-[160px] flex flex-col justify-between space-y-3">
              {activeLayer === 1 && (
                <div className="space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                    <span>{specimen.anatomy.layer_1_dermis.title}</span>
                    <span>{specimen.anatomy.layer_1_dermis.integument_type}</span>
                  </div>
                  <p className="font-serif text-sm leading-relaxed italic">
                    "{specimen.anatomy.layer_1_dermis.description}"
                  </p>
                </div>
              )}

              {activeLayer === 2 && (
                <div className="space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                    <span>{specimen.anatomy.layer_2_osteology.title}</span>
                    <span>SKELETON: {specimen.anatomy.layer_2_osteology.skeleton_type}</span>
                  </div>
                  <p className="font-serif text-sm leading-relaxed italic">
                    "{specimen.anatomy.layer_2_osteology.description}"
                  </p>
                </div>
              )}

              {activeLayer === 3 && (
                <div className="space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                    <span className="flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" />
                      {specimen.anatomy.layer_3_elemental_core.primary_organ}
                    </span>
                    <span>BIO-REACTOR</span>
                  </div>
                  <p className="font-serif text-sm leading-relaxed italic">
                    {specimen.anatomy.layer_3_elemental_core.primary_organ_desc}
                  </p>
                </div>
              )}

              {activeLayer === 4 && (
                <div className="space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                    <span>{specimen.anatomy.layer_4_geologic_speciation.title}</span>
                    <span>{specimen.anatomy.layer_4_geologic_speciation.time_era}</span>
                  </div>
                  <p className="font-serif text-sm leading-relaxed italic">
                    "{specimen.anatomy.layer_4_geologic_speciation.speciation_notes}"
                  </p>
                </div>
              )}

              {/* Action Button: Open Full Deep Dossier */}
              <button
                onClick={() => onOpenFullModal(specimen)}
                className="w-full py-2.5 rounded-lg border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Examine Full 4-Layer Specimen Codex</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
