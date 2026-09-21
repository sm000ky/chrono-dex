import React, { useState } from 'react';
import { PokemonChronoEntry, EpochId, Language } from '../types';
import { Translations } from '../lib/i18n';
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
  CheckCircle2,
  RotateCcw,
  HeartPulse,
  Scan
} from 'lucide-react';

interface FeaturedDissectionBenchProps {
  pokemonList: PokemonChronoEntry[];
  epochId: EpochId;
  onOpenFullModal: (pokemon: PokemonChronoEntry) => void;
  t: Translations;
  currentLang?: Language;
}

type DiagnosticMode = 'standard' | 'xray' | 'thermal' | 'amber';

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
  onOpenFullModal,
  t,
}) => {
  const [selectedId, setSelectedId] = useState<number>(6);
  const [activeLayer, setActiveLayer] = useState<number>(1);
  const [peelPercent, setPeelPercent] = useState<number>(100);
  const [diagnosticMode, setDiagnosticMode] = useState<DiagnosticMode>('standard');

  // Interactive Excitement Features:
  const [isStimulated, setIsStimulated] = useState<boolean>(false);
  const [fossilExcavatedPercent, setFossilExcavatedPercent] = useState<number>(0);
  const [isBrushMode, setIsBrushMode] = useState<boolean>(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const specimen = pokemonList.find((p) => p.id === selectedId) || pokemonList[0];

  const handleSelectSpecimen = (id: number) => {
    chronoAudio.playLayerPeel(1);
    setSelectedId(id);
    setActiveLayer(1);
    setPeelPercent(100);
    setIsStimulated(false);
    setFossilExcavatedPercent(0);
    setActiveHotspot(null);
    setDiagnosticMode('standard');
  };

  const handleLayerChange = (layer: number) => {
    chronoAudio.playLayerPeel(layer);
    setActiveLayer(layer);
    if (layer === 2) setDiagnosticMode('xray');
    else if (layer === 3) setDiagnosticMode('thermal');
    else setDiagnosticMode('standard');
  };

  // Stimulate Bio-Organ with immediate layer transition, Web Audio surge & Telemetry
  const handleStimulateOrgan = () => {
    chronoAudio.playBioResonance(specimen.types[0]);
    setIsStimulated(true);
    setActiveLayer(3);
    setPeelPercent(15);
    setDiagnosticMode('thermal');

    setTimeout(() => {
      setIsStimulated(false);
    }, 4500);
  };

  // Fossil Dusting / Stratum Excavation Mini-Lab
  const handleDustFossil = () => {
    if (fossilExcavatedPercent >= 100) return;
    chronoAudio.playFossilChisel();
    const nextVal = Math.min(100, fossilExcavatedPercent + 20);
    setFossilExcavatedPercent(nextVal);
    if (nextVal === 100) {
      setTimeout(() => {
        chronoAudio.playExcavationComplete();
      }, 150);
    }
  };

  const handleResetExcavation = () => {
    chronoAudio.playLayerPeel(1);
    setFossilExcavatedPercent(0);
  };

  // Strata description based on percentage using localized dictionary
  const getStrataInfo = () => {
    if (fossilExcavatedPercent === 0) return t.strata1;
    if (fossilExcavatedPercent <= 40) return t.strata2;
    if (fossilExcavatedPercent <= 80) return t.strata3;
    return t.strata4;
  };

  // Diagnostic filter styling
  const getImageFilterStyle = () => {
    if (diagnosticMode === 'xray') {
      return 'invert brightness-125 contrast-200 hue-rotate-180 drop-shadow-[0_0_25px_rgba(56,189,248,0.85)]';
    }
    if (diagnosticMode === 'thermal' || isStimulated) {
      return 'drop-shadow-[0_0_35px_rgba(245,158,11,0.95)] contrast-150 saturate-200';
    }
    if (diagnosticMode === 'amber') {
      return 'sepia-[0.75] contrast-125 brightness-95 drop-shadow-[0_0_20px_rgba(217,119,6,0.6)]';
    }
    return '';
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-8 px-4 font-mono select-none">
      {/* Workbench Outer Frame */}
      <div className="p-4 sm:p-7 rounded-2xl border-4 border-current/30 bg-black/15 backdrop-blur-md shadow-2xl space-y-6">
        {/* Workbench Title & Tooling Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b-2 border-current/20 pb-4 min-w-0">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-[#E07A28] min-w-0">
              <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{t.workbenchSubtitle}</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-serif font-bold tracking-tight break-words">
              {t.workbenchHeading}
            </h2>
            <p className="text-xs opacity-75 font-serif italic break-words">
              {t.workbenchDesc}
            </p>
          </div>

          {/* Quick Specimen Picker */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full min-w-0 flex-shrink-0">
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
                  <span className="font-bold">#{p.national_id}</span>
                  <span className="hidden md:inline truncate">{p.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Laboratory Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Visual Dissection Chamber & Interactive Tools */}
          <div className="lg:col-span-6 relative p-5 sm:p-7 rounded-xl bg-black/30 border-2 border-current/25 flex flex-col items-center justify-between min-h-[440px] overflow-hidden min-w-0">
            <div className="absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] [background-size:14px_14px] opacity-10 pointer-events-none" />

            {/* Chamber Status Bar */}
            <div className="w-full flex items-center justify-between gap-2 border-b border-current/20 pb-2 text-[10px] z-10 min-w-0">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold truncate">
                <Scan className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{t.chamberLabel} #{String(specimen.national_id).padStart(4, '0')} · {specimen.name}</span>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-black/40 border border-current/20">
                  {diagnosticMode.toUpperCase()} {t.viewSuffix}
                </span>
              </div>
            </div>

            {/* Specimen Visual Stage */}
            <div className="relative z-10 w-full max-w-xs aspect-square flex items-center justify-center my-3">
              {/* Underlying Skeleton/Elemental Core */}
              {(activeLayer === 2 || activeLayer === 3 || diagnosticMode !== 'standard') && (
                <img
                  src={specimen.sprites.artwork}
                  alt={specimen.name}
                  className={`absolute inset-0 w-full h-full object-contain filter transition-all duration-300 ${getImageFilterStyle()}`}
                />
              )}

              {/* Surface Dermis with Interactive Scalpel Peel */}
              <img
                src={specimen.sprites.artwork}
                alt={specimen.name}
                style={{
                  opacity: diagnosticMode === 'standard' && activeLayer === 1 ? 1 : peelPercent / 100,
                }}
                className={`relative z-10 w-full h-full object-contain transition-all duration-300 ${
                  isStimulated ? 'scale-105' : ''
                }`}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.dataset.fallback) {
                    target.dataset.fallback = 'true';
                    target.src = specimen.sprites.icon;
                  }
                }}
              />

              {/* Hotspot Pins (Organ Core Layer) */}
              {activeLayer === 3 && (
                <>
                  <button
                    onClick={() => setActiveHotspot('cranial')}
                    className="absolute top-[26%] left-[48%] -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-amber-500 text-black border-2 border-amber-300 font-bold text-[10px] flex items-center justify-center cursor-pointer shadow-lg z-20 hover:scale-110"
                    title="Pin 1: Cranial Bio-Node"
                  >
                    1
                  </button>
                  <button
                    onClick={() => setActiveHotspot('elemental')}
                    className="absolute top-[52%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-amber-500 text-black border-2 border-amber-300 font-bold text-[10px] flex items-center justify-center cursor-pointer shadow-lg z-20 hover:scale-110"
                    title="Pin 2: Primary Elemental Reactor"
                  >
                    2
                  </button>
                  <button
                    onClick={() => setActiveHotspot('appendage')}
                    className="absolute bottom-[24%] right-[32%] w-6 h-6 rounded-full bg-amber-500 text-black border-2 border-amber-300 font-bold text-[10px] flex items-center justify-center cursor-pointer shadow-lg z-20 hover:scale-110"
                    title="Pin 3: Peripheral Locomotive Conductor"
                  >
                    3
                  </button>
                </>
              )}

              {/* Fossil Excavation Mini-Lab Overlay */}
              {isBrushMode && (
                <div
                  onClick={handleDustFossil}
                  className={`absolute inset-0 rounded-xl flex flex-col items-center justify-center cursor-pointer p-4 text-center z-30 select-none transition-all duration-300 shadow-[inset_0_2px_16px_rgba(0,0,0,0.9)] ${
                    fossilExcavatedPercent >= 100
                      ? 'bg-amber-950/80 border-2 border-amber-400 backdrop-blur-[1px]'
                      : 'bg-[#3b291d]/95 border-2 border-[#D97706] backdrop-blur-[2px]'
                  }`}
                >
                  {fossilExcavatedPercent < 100 ? (
                    <div className="space-y-2 max-w-full">
                      <div className="w-10 h-10 mx-auto rounded-full bg-[#D97706]/30 border border-[#FDE68A] flex items-center justify-center">
                        <Brush className="w-5 h-5 text-[#FDE68A]" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="font-bold text-xs text-[#FEF3C7] uppercase tracking-wider">
                          {t.brushExcavationPrompt}
                        </div>
                        <div className="text-[10px] text-[#FDE68A] font-mono">
                          {getStrataInfo()}
                        </div>
                      </div>

                      {/* Excavation Progress Bar */}
                      <div className="w-48 max-w-full mx-auto bg-black/60 h-2.5 rounded-full overflow-hidden border border-[#D97706]/60 mt-2">
                        <div
                          className="bg-gradient-to-r from-amber-600 to-amber-400 h-full transition-all duration-200"
                          style={{ width: `${fossilExcavatedPercent}%` }}
                        />
                      </div>
                      <div className="text-[9px] text-[#FDE68A] font-mono font-bold">
                        {t.brushSedimentRemoved} {fossilExcavatedPercent}% / 100%
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 text-center p-2 animate-in fade-in zoom-in-95">
                      <CheckCircle2 className="w-10 h-10 text-amber-400 mx-auto drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
                      <div className="font-bold text-xs text-amber-200 uppercase tracking-wider">
                        {t.fossilExcavatedSuccessTitle}
                      </div>
                      <p className="text-[10px] text-amber-100 max-w-xs font-serif italic">
                        {t.fossilExcavatedSuccessDesc}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleResetExcavation();
                        }}
                        className="mt-2 px-3 py-1 text-[10px] rounded bg-black/50 border border-amber-400/80 text-amber-300 hover:bg-black/70 flex items-center gap-1 mx-auto"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>{t.btnReburyFossil}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Diagnostic Spectrum Modes Selector */}
            <div className="w-full flex items-center justify-center gap-1.5 my-2 z-10 text-[10px] flex-wrap">
              {[
                { mode: 'standard' as DiagnosticMode, label: t.diagnosticDermis },
                { mode: 'xray' as DiagnosticMode, label: t.diagnosticXray },
                { mode: 'thermal' as DiagnosticMode, label: t.diagnosticThermal },
                { mode: 'amber' as DiagnosticMode, label: t.diagnosticAmber },
              ].map((m) => (
                <button
                  key={m.mode}
                  onClick={() => setDiagnosticMode(m.mode)}
                  className={`px-2.5 py-1 rounded border text-[9px] font-bold uppercase transition-all ${
                    diagnosticMode === m.mode
                      ? 'bg-amber-500 text-black border-amber-300 shadow-sm'
                      : 'bg-black/30 hover:bg-black/50 border-current/20 opacity-75'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Scalpel Peeling Lever */}
            <div className="w-full max-w-xs flex items-center gap-2.5 bg-black/60 px-3.5 py-2 rounded-xl border border-current/30 z-10 text-xs">
              <Sliders className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="font-bold text-[10px] uppercase whitespace-nowrap">{t.scalpelPeelSkin}</span>
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

            {/* Interactive Tooling Action Buttons */}
            <div className="w-full flex flex-wrap items-center justify-between gap-2 mt-3 pt-2 border-t border-current/20 text-[10px] z-10">
              {/* Stimulate Bio-Organ Button */}
              <button
                onClick={handleStimulateOrgan}
                className={`px-3 py-1.5 rounded-lg border font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                  isStimulated
                    ? 'bg-amber-500 text-black border-amber-300 scale-105 shadow-[0_0_15px_rgba(245,158,11,0.7)] font-extrabold'
                    : 'bg-black/30 hover:bg-black/50 border-current/30 text-amber-400'
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                <span>{isStimulated ? t.btnStimulateDischarging : t.btnStimulateNormal}</span>
              </button>

              {/* Fossil Excavation Tool Button */}
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
                <span>{isBrushMode ? t.btnBrushExit : t.btnBrushStart}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Diagnostic Telemetry Dossier */}
          <div className="lg:col-span-6 space-y-4 min-w-0">
            {/* Specimen Header Card */}
            <div className="p-4 rounded-xl border-2 border-current/20 bg-black/10 space-y-1 min-w-0">
              <div className="flex items-center justify-between gap-2 min-w-0">
                <span className="text-xs font-mono font-bold text-amber-500 truncate">
                  {t.nationalArchiveLabel}{String(specimen.national_id).padStart(4, '0')}
                </span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-black/30 border border-current/20 flex-shrink-0">
                  {specimen.epoch.time_label}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold break-words">
                {specimen.name} <span className="text-sm font-mono opacity-60">({specimen.japanese_name})</span>
              </h3>
              <p className="text-xs font-serif italic text-amber-400 font-semibold break-words">
                {t.taxonomyLabel} {specimen.binomial_name}
              </p>
            </div>

            {/* LIVE BIO-RESONANCE TELEMETRY HUD (Active when stimulated) */}
            {isStimulated && (
              <div className="p-4 rounded-xl border-2 border-amber-500 bg-amber-950/40 text-amber-200 space-y-2 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between text-xs font-bold border-b border-amber-500/40 pb-1.5">
                  <div className="flex items-center gap-1.5">
                    <HeartPulse className="w-4 h-4 text-amber-400" />
                    <span>{t.bioTelemetryTitle}</span>
                  </div>
                  <span className="text-[10px] bg-amber-500 text-black px-1.5 py-0.5 rounded font-extrabold">
                    {t.bioTelemetryActive}
                  </span>
                </div>

                {/* Oscilloscope procedural frequency wave */}
                <div className="w-full h-8 bg-black/60 rounded flex items-center justify-center px-2 overflow-hidden border border-amber-500/30">
                  <svg viewBox="0 0 300 30" className="w-full h-full stroke-amber-400 fill-none stroke-[2]">
                    <path d="M0,15 Q25,0 50,15 T100,15 T150,15 T200,15 T250,15 T300,15" />
                    <path d="M0,15 Q37,28 75,15 T150,15 T225,15 T300,15" opacity="0.4" />
                  </svg>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-[10px] pt-1">
                  <div className="p-1.5 rounded bg-black/30 border border-amber-500/30">
                    <span className="block opacity-75">{t.voltageLabel}</span>
                    <strong className="text-amber-300 font-mono text-xs">{(specimen.stats.special_attack * 14.2).toFixed(0)} mV</strong>
                  </div>
                  <div className="p-1.5 rounded bg-black/30 border border-amber-500/30">
                    <span className="block opacity-75">{t.resonanceLabel}</span>
                    <strong className="text-amber-300 font-mono text-xs">{(specimen.stats.speed * 4.3).toFixed(1)} kHz</strong>
                  </div>
                  <div className="p-1.5 rounded bg-black/30 border border-amber-500/30">
                    <span className="block opacity-75">{t.tempLabel}</span>
                    <strong className="text-amber-300 font-mono text-xs">{(28 + specimen.stats.attack * 0.8).toFixed(1)} °C</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Hotspot Pin Quick Inspection Banner */}
            {activeHotspot && activeLayer === 3 && (
              <div className="p-3 rounded-lg border border-amber-400 bg-amber-950/30 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <Crosshair className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span className="break-words">
                    {activeHotspot === 'cranial' && `[PIN 1: Cranial Bio-Capacitor] ${t.pin1Desc}`}
                    {activeHotspot === 'elemental' && `[PIN 2: ${specimen.anatomy.layer_3_elemental_core.primary_organ}] ${t.pin2Desc}`}
                    {activeHotspot === 'appendage' && `[PIN 3: Peripheral Conductor] ${t.pin3Desc}`}
                  </span>
                </div>
                <button onClick={() => setActiveHotspot(null)} className="opacity-70 hover:opacity-100 flex-shrink-0">
                  ×
                </button>
              </div>
            )}

            {/* Layer Selection Ribbon */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { num: 1, label: t.layer1Name.split('&')[0]?.replace(/^[IVX]+\.\s*/, '').trim() || 'Dermis', icon: Shield },
                { num: 2, label: t.layer2Name.split('&')[0]?.replace(/^[IVX]+\.\s*/, '').trim() || 'Osteology', icon: Activity },
                { num: 3, label: t.layer3Name.split('&')[0]?.replace(/^[IVX]+\.\s*/, '').trim() || 'Organ Core', icon: Zap },
                { num: 4, label: t.layer4Name.split('&')[0]?.replace(/^[IVX]+\.\s*/, '').trim() || 'Tectonics', icon: Globe },
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
                  <div className="flex items-center justify-between text-xs font-bold text-amber-400 gap-2 min-w-0">
                    <span className="truncate">{specimen.anatomy.layer_1_dermis.title}</span>
                    <span className="truncate flex-shrink-0">{specimen.anatomy.layer_1_dermis.integument_type}</span>
                  </div>
                  <p className="font-serif text-sm leading-relaxed italic break-words">
                    "{specimen.anatomy.layer_1_dermis.description}"
                  </p>
                  <div className="flex flex-wrap gap-3 text-[11px] opacity-80 pt-1">
                    <span>{t.height}: <strong>{specimen.height_m} m</strong></span>
                    <span>{t.weight}: <strong>{specimen.weight_kg} kg</strong></span>
                    <span>{t.typesLabel} <strong>{specimen.types.join(' / ')}</strong></span>
                  </div>
                </div>
              )}

              {activeLayer === 2 && (
                <div className="space-y-2 animate-in fade-in min-w-0">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-400 gap-2 min-w-0">
                    <span className="truncate">{specimen.anatomy.layer_2_osteology.title}</span>
                    <span className="truncate flex-shrink-0">{t.boneDensityLabel}: {specimen.anatomy.layer_2_osteology.bone_density_index}</span>
                  </div>
                  <div className="text-xs font-mono font-semibold">
                    {t.frameworkLabel} <span className="text-amber-300">{specimen.anatomy.layer_2_osteology.skeleton_type}</span>
                  </div>
                  <p className="font-serif text-sm leading-relaxed italic break-words">
                    "{specimen.anatomy.layer_2_osteology.description}"
                  </p>
                </div>
              )}

              {activeLayer === 3 && (
                <div className="space-y-2 animate-in fade-in min-w-0">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-400 gap-2 min-w-0">
                    <span className="flex items-center gap-1 truncate">
                      <Flame className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{specimen.anatomy.layer_3_elemental_core.primary_organ}</span>
                    </span>
                    <span className="flex-shrink-0">{t.bioReactorBadge}</span>
                  </div>
                  <p className="font-serif text-sm leading-relaxed italic break-words">
                    {specimen.anatomy.layer_3_elemental_core.primary_organ_desc}
                  </p>
                  {specimen.anatomy.layer_3_elemental_core.secondary_organ && (
                    <div className="pt-2 border-t border-current/15 text-xs">
                      <span className="font-bold text-cyan-400 block truncate">
                        {t.secondaryLabel} {specimen.anatomy.layer_3_elemental_core.secondary_organ}
                      </span>
                      <p className="font-serif italic opacity-80 break-words mt-0.5">
                        {specimen.anatomy.layer_3_elemental_core.secondary_organ_desc}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeLayer === 4 && (
                <div className="space-y-2 animate-in fade-in min-w-0">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-400 gap-2 min-w-0">
                    <span className="truncate">{specimen.anatomy.layer_4_geologic_speciation.title}</span>
                    <span className="truncate flex-shrink-0">{specimen.anatomy.layer_4_geologic_speciation.time_era}</span>
                  </div>
                  <p className="font-serif text-sm leading-relaxed italic break-words">
                    "{specimen.anatomy.layer_4_geologic_speciation.speciation_notes}"
                  </p>
                  <div className="text-[11px] opacity-75 font-mono pt-1">
                    {t.tectonicTriggerLabel} <strong className="text-amber-400">{specimen.anatomy.layer_4_geologic_speciation.tectonic_event}</strong>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <button
                onClick={() => onOpenFullModal(specimen)}
                className="w-full py-2.5 rounded-lg border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>{t.examineFullCodex}</span>
                <ChevronRight className="w-4 h-4 flex-shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
