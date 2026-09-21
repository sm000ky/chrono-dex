import React, { useState } from 'react';
import { PokemonChronoEntry, EpochId, Language } from '../types';
import { Translations } from '../lib/i18n';
import { chronoAudio } from '../lib/audioEngine';
import {
  Layers,
  Scale,
  Activity,
  Flame,
  Globe,
  ArrowRightLeft
} from 'lucide-react';

interface ComparativeAnatomyBenchProps {
  pokemonList: PokemonChronoEntry[];
  epochId: EpochId;
  onOpenModal: (pokemon: PokemonChronoEntry) => void;
  t: Translations;
  currentLang?: Language;
}

const FEATURED_DUOS: [number, number][] = [
  [6, 130],    // Charizard vs Gyarados (Apex Fire vs Marine Dragon)
  [138, 984],  // Omanyte vs Great Tusk (Mesozoic Fossil vs Ancient Paradox)
  [984, 1008], // Great Tusk vs Miraidon (Primal Ancient vs Cyber Future)
  [25, 448],   // Pikachu vs Lucario (Electrocyte rodent vs Aura canine)
  [143, 149],  // Snorlax vs Dragonite (Colossal adipose vs Aerial leviathan)
];

export const ComparativeAnatomyBench: React.FC<ComparativeAnatomyBenchProps> = ({
  pokemonList,
  epochId,
  onOpenModal,
  t,
}) => {
  const [activeLayer, setActiveLayer] = useState<number>(1);
  const [specimenAId, setSpecimenAId] = useState<number>(6); // Charizard
  const [specimenBId, setSpecimenBId] = useState<number>(130); // Gyarados

  const specimenA = pokemonList.find((p) => p.national_id === specimenAId) || pokemonList[0];
  const specimenB = pokemonList.find((p) => p.national_id === specimenBId) || pokemonList[1];

  const handleSelectLayer = (layer: number) => {
    chronoAudio.playLayerPeel(layer);
    setActiveLayer(layer);
  };

  const handleSwapSpecimens = () => {
    chronoAudio.playLayerPeel(2);
    setSpecimenAId(specimenBId);
    setSpecimenBId(specimenAId);
  };

  const handleSelectDuo = (idA: number, idB: number) => {
    chronoAudio.playLayerPeel(1);
    setSpecimenAId(idA);
    setSpecimenBId(idB);
  };

  // Compute Comparative Metrics using valid AnatomyLayers fields
  const boneDensityA = specimenA.anatomy.layer_2_osteology.bone_density_index;
  const boneDensityB = specimenB.anatomy.layer_2_osteology.bone_density_index;
  const boneDensityDiff = (boneDensityA - boneDensityB).toFixed(2);

  const heightDiff = ((specimenA.height_m || 1) - (specimenB.height_m || 1)).toFixed(2);
  const weightDiff = ((specimenA.weight_kg || 1) - (specimenB.weight_kg || 1)).toFixed(1);

  // Styling based on epoch
  const getBenchStyle = () => {
    switch (epochId) {
      case 'primordial':
        return {
          container: 'bg-[#1E110A] border-4 border-[#8C3E1B] text-[#F5EBE1] shadow-[inset_0_2px_12px_rgba(0,0,0,0.8),0_0_20px_rgba(224,122,40,0.25)]',
          card: 'bg-[#140C07] border border-[#8C3E1B]',
          accent: 'text-[#E07A28] border-[#E07A28]',
          glow: 'shadow-[0_0_15px_rgba(224,122,40,0.4)]',
          tabActive: 'bg-[#8C3E1B] text-[#F5EBE1] font-bold',
          tabInactive: 'bg-[#2A170D] text-[#D2BA9F] hover:bg-[#3D2214]',
        };
      case 'drift':
        return {
          container: 'bg-[#F4ECE1] border-2 border-[#B8781B] text-[#1C1309] shadow-[inset_0_2px_10px_rgba(70,40,10,0.15),0_4px_20px_rgba(184,120,27,0.2)]',
          card: 'bg-[#FAF3E3] border border-[#C5A059]',
          accent: 'text-[#9A6218] border-[#9A6218]',
          glow: 'shadow-[0_0_12px_rgba(184,120,27,0.35)]',
          tabActive: 'bg-[#9A6218] text-[#FAF6EE] font-bold',
          tabInactive: 'bg-[#E4D5BC] text-[#4A3A26] hover:bg-[#D9C4A6]',
        };
      case 'feudal':
        return {
          container: 'bg-[#141C18] border-2 border-[#D4AF37] text-[#F8F6EF] shadow-[inset_0_2px_15px_rgba(0,0,0,0.8),0_0_25px_rgba(212,175,55,0.3)]',
          card: 'bg-[#0E1511] border border-[#3E5246]',
          accent: 'text-[#D4AF37] border-[#D4AF37]',
          glow: 'shadow-[0_0_15px_rgba(212,175,55,0.45)]',
          tabActive: 'bg-[#D4AF37] text-[#141C18] font-bold',
          tabInactive: 'bg-[#1C2721] text-[#A6BAAD] hover:bg-[#2A3B32]',
        };
      case 'modern':
        return {
          container: 'bg-[#FAF6EE] border-2 border-[#DEC6AE] text-[#1E3A34] shadow-[inset_0_2px_8px_rgba(0,0,0,0.06),0_4px_25px_rgba(0,0,0,0.08)]',
          card: 'bg-[#FFFFFF] border border-[#DEC6AE]',
          accent: 'text-[#D95A47] border-[#D95A47]',
          glow: 'shadow-[0_0_15px_rgba(217,90,71,0.3)]',
          tabActive: 'bg-[#2F6D68] text-[#FAF6EE] font-bold',
          tabInactive: 'bg-[#EFE8DC] text-[#557B77] hover:bg-[#E3DACB]',
        };
      case 'future':
      default:
        return {
          container: 'bg-[#0B1120] border-2 border-cyan-500 text-cyan-50 shadow-[inset_0_2px_15px_rgba(0,0,0,0.9),0_0_25px_rgba(56,189,248,0.35)]',
          card: 'bg-[#070D18] border border-cyan-900',
          accent: 'text-cyan-400 border-cyan-400',
          glow: 'shadow-[0_0_15px_rgba(56,189,248,0.5)]',
          tabActive: 'bg-cyan-500 text-black font-bold',
          tabInactive: 'bg-[#111C33] text-cyan-300 hover:bg-[#1A2A4D]',
        };
    }
  };

  const style = getBenchStyle();

  return (
    <section className={`p-4 sm:p-8 rounded-2xl ${style.container} my-6 transition-all duration-300 relative overflow-hidden`}>
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-current/20 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 opacity-90" />
            <span className="text-[11px] font-mono tracking-widest uppercase opacity-75">
              {t.benchSubtitle}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-wide mt-1">
            {t.benchHeading}
          </h2>
          <p className="text-xs opacity-75 max-w-2xl mt-1">
            {t.benchDesc}
          </p>
        </div>

        {/* Preset Duo Selector */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-[10px] uppercase font-mono opacity-60 mr-1 hidden sm:inline">{t.preservedDuosLabel}</span>
          {FEATURED_DUOS.map(([idA, idB], idx) => (
            <button
              key={idx}
              onClick={() => handleSelectDuo(idA, idB)}
              className={`px-2.5 py-1 text-[10px] font-mono rounded border border-current/30 transition-all ${
                specimenAId === idA && specimenBId === idB
                  ? `${style.tabActive} ${style.glow}`
                  : `${style.tabInactive}`
              }`}
            >
              #{idA} vs #{idB}
            </button>
          ))}
        </div>
      </div>

      {/* Layer Slicer Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: 1, label: t.compLayer1, icon: Layers },
          { id: 2, label: t.compLayer2, icon: Activity },
          { id: 3, label: t.compLayer3, icon: Flame },
          { id: 4, label: t.compLayer4, icon: Globe },
        ].map((layer) => {
          const Icon = layer.icon;
          const isActive = activeLayer === layer.id;
          return (
            <button
              key={layer.id}
              onClick={() => handleSelectLayer(layer.id)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-mono uppercase tracking-wider rounded-lg border transition-all duration-200 ${
                isActive
                  ? `${style.tabActive} ${style.glow} border-transparent`
                  : `${style.tabInactive} border-current/20`
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{layer.label}</span>
            </button>
          );
        })}
      </div>

      {/* Duel Bench Main Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
        {/* Specimen A Card */}
        <div className={`p-4 sm:p-6 rounded-xl ${style.card} relative flex flex-col justify-between min-w-0`}>
          <div className="flex items-start justify-between border-b border-current/15 pb-3 mb-4 gap-2 min-w-0">
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono opacity-60">{t.specimenAlphaLabel}</span>
                <select
                  value={specimenAId}
                  onChange={(e) => {
                    chronoAudio.playLayerPeel(1);
                    setSpecimenAId(Number(e.target.value));
                  }}
                  className="text-[10px] font-mono bg-black/40 border border-current/30 rounded px-2 py-0.5 outline-none text-current cursor-pointer max-w-[200px] truncate"
                  title={t.switchSpecimenAlpha}
                >
                  {pokemonList.map((p) => (
                    <option key={p.national_id} value={p.national_id} className="bg-[#1a1a1a] text-white">
                      #{String(p.national_id).padStart(4, '0')} · {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <h3 className="text-lg sm:text-xl font-bold truncate">{specimenA.name}</h3>
              <p className="text-xs italic opacity-80 break-words">{specimenA.binomial_name}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-xs font-mono font-bold">#{String(specimenA.national_id).padStart(4, '0')}</span>
              <div className="flex flex-wrap justify-end gap-1 mt-1">
                {specimenA.types.map((type) => (
                  <span key={type} className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-current/10 border border-current/20 uppercase">
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Visual Display */}
          <div className="relative aspect-video flex items-center justify-center p-4 bg-black/20 rounded-lg border border-current/10 overflow-hidden mb-4">
            <img
              src={specimenA.sprites.artwork}
              alt={specimenA.name}
              className={`max-h-full object-contain transition-all duration-300 ${
                activeLayer === 2 ? 'filter invert hue-rotate-180 brightness-125 contrast-150' : ''
              }`}
            />
            {activeLayer === 2 && (
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/75 border border-cyan-400 text-cyan-300 font-mono text-[9px] rounded">
                {t.xrayRadiogramBadge}
              </div>
            )}
            {activeLayer === 3 && (
              <div className="absolute bottom-2 left-2 right-2 px-2 py-1 bg-black/80 border border-amber-500 text-amber-200 font-mono text-[9px] rounded flex items-center justify-between min-w-0">
                <span className="break-words max-w-full">{t.primaryOrganLabel}: {specimenA.anatomy.layer_3_elemental_core.primary_organ}</span>
              </div>
            )}
          </div>

          {/* Layer-Specific Details */}
          <div className="text-xs font-mono space-y-2 border-t border-current/15 pt-3 min-w-0">
            {activeLayer === 1 && (
              <div className="grid grid-cols-2 gap-2 min-w-0">
                <div className="p-2 rounded bg-black/10 border border-current/10 min-w-0">
                  <span className="text-[10px] opacity-60 block">{t.statureLabel}</span>
                  <span className="font-bold truncate block">{specimenA.height_m} m</span>
                </div>
                <div className="p-2 rounded bg-black/10 border border-current/10 min-w-0">
                  <span className="text-[10px] opacity-60 block">{t.massLabel}</span>
                  <span className="font-bold truncate block">{specimenA.weight_kg} kg</span>
                </div>
                <div className="col-span-2 p-2 rounded bg-black/10 border border-current/10 min-w-0">
                  <span className="text-[10px] opacity-60 block">{t.dermalIntegumentLabel}</span>
                  <p className="text-[11px] opacity-80 mt-0.5 break-words">{specimenA.anatomy.layer_1_dermis.description}</p>
                </div>
              </div>
            )}

            {activeLayer === 2 && (
              <div className="space-y-2 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="opacity-75">{t.boneDensityIndexLabel}</span>
                  <span className="font-bold text-sm">{boneDensityA}</span>
                </div>
                <div className="w-full bg-current/15 h-2 rounded-full overflow-hidden">
                  <div className="bg-current h-full" style={{ width: `${Math.min(boneDensityA * 20, 100)}%` }} />
                </div>
                <p className="text-[11px] opacity-80 pt-1 break-words">{t.skeletonTypeLabel} {specimenA.anatomy.layer_2_osteology.skeleton_type}</p>
              </div>
            )}

            {activeLayer === 3 && (
              <div className="space-y-1.5 min-w-0">
                <div className="p-2 rounded bg-black/10 border border-current/10 min-w-0">
                  <span className="text-[10px] opacity-60 block">{t.primaryOrganLabel}</span>
                  <span className="font-bold text-amber-300 break-words block">{specimenA.anatomy.layer_3_elemental_core.primary_organ}</span>
                </div>
                <div className="p-2 rounded bg-black/10 border border-current/10 min-w-0">
                  <span className="text-[10px] opacity-60 block">{t.descLabel}</span>
                  <p className="text-[11px] opacity-80 break-words">{specimenA.anatomy.layer_3_elemental_core.primary_organ_desc}</p>
                </div>
              </div>
            )}

            {activeLayer === 4 && (
              <div className="p-2 rounded bg-black/10 border border-current/10 space-y-1 min-w-0">
                <div className="flex justify-between items-center text-[10px] opacity-75 gap-2">
                  <span className="flex-shrink-0">{t.tectonicEraLabel}</span>
                  <span className="font-bold break-words">{specimenA.anatomy.layer_4_geologic_speciation.time_era}</span>
                </div>
                <p className="text-[11px] opacity-80 break-words">{specimenA.anatomy.layer_4_geologic_speciation.speciation_notes}</p>
              </div>
            )}
          </div>

          <button
            onClick={() => onOpenModal(specimenA)}
            className="mt-4 w-full py-1.5 text-xs font-mono uppercase tracking-wider rounded border border-current/30 hover:bg-current/10 transition-colors cursor-pointer"
          >
            {t.openDossierBtn}
          </button>
        </div>

        {/* Swap Control Button (Center on Desktop) */}
        <div className="flex items-center justify-center my-[-10px] lg:my-0 lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-10">
          <button
            onClick={handleSwapSpecimens}
            title={t.swapDuosTitle}
            className={`p-3 rounded-full border border-current/40 ${style.tabActive} ${style.glow} hover:scale-110 active:scale-95 transition-all cursor-pointer`}
          >
            <ArrowRightLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Specimen B Card */}
        <div className={`p-4 sm:p-6 rounded-xl ${style.card} relative flex flex-col justify-between min-w-0`}>
          <div className="flex items-start justify-between border-b border-current/15 pb-3 mb-4 gap-2 min-w-0">
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono opacity-60">{t.specimenBetaLabel}</span>
                <select
                  value={specimenBId}
                  onChange={(e) => {
                    chronoAudio.playLayerPeel(1);
                    setSpecimenBId(Number(e.target.value));
                  }}
                  className="text-[10px] font-mono bg-black/40 border border-current/30 rounded px-2 py-0.5 outline-none text-current cursor-pointer max-w-[200px] truncate"
                  title={t.switchSpecimenBeta}
                >
                  {pokemonList.map((p) => (
                    <option key={p.national_id} value={p.national_id} className="bg-[#1a1a1a] text-white">
                      #{String(p.national_id).padStart(4, '0')} · {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <h3 className="text-lg sm:text-xl font-bold truncate">{specimenB.name}</h3>
              <p className="text-xs italic opacity-80 break-words">{specimenB.binomial_name}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-xs font-mono font-bold">#{String(specimenB.national_id).padStart(4, '0')}</span>
              <div className="flex flex-wrap justify-end gap-1 mt-1">
                {specimenB.types.map((type) => (
                  <span key={type} className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-current/10 border border-current/20 uppercase">
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Visual Display */}
          <div className="relative aspect-video flex items-center justify-center p-4 bg-black/20 rounded-lg border border-current/10 overflow-hidden mb-4">
            <img
              src={specimenB.sprites.artwork}
              alt={specimenB.name}
              className={`max-h-full object-contain transition-all duration-300 ${
                activeLayer === 2 ? 'filter invert hue-rotate-180 brightness-125 contrast-150' : ''
              }`}
            />
            {activeLayer === 2 && (
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/75 border border-cyan-400 text-cyan-300 font-mono text-[9px] rounded">
                {t.xrayRadiogramBadge}
              </div>
            )}
            {activeLayer === 3 && (
              <div className="absolute bottom-2 left-2 right-2 px-2 py-1 bg-black/80 border border-amber-500 text-amber-200 font-mono text-[9px] rounded flex items-center justify-between min-w-0">
                <span className="break-words max-w-full">{t.primaryOrganLabel}: {specimenB.anatomy.layer_3_elemental_core.primary_organ}</span>
              </div>
            )}
          </div>

          {/* Layer-Specific Details */}
          <div className="text-xs font-mono space-y-2 border-t border-current/15 pt-3 min-w-0">
            {activeLayer === 1 && (
              <div className="grid grid-cols-2 gap-2 min-w-0">
                <div className="p-2 rounded bg-black/10 border border-current/10 min-w-0">
                  <span className="text-[10px] opacity-60 block">{t.statureLabel}</span>
                  <span className="font-bold truncate block">{specimenB.height_m} m</span>
                </div>
                <div className="p-2 rounded bg-black/10 border border-current/10 min-w-0">
                  <span className="text-[10px] opacity-60 block">{t.massLabel}</span>
                  <span className="font-bold truncate block">{specimenB.weight_kg} kg</span>
                </div>
                <div className="col-span-2 p-2 rounded bg-black/10 border border-current/10 min-w-0">
                  <span className="text-[10px] opacity-60 block">{t.dermalIntegumentLabel}</span>
                  <p className="text-[11px] opacity-80 mt-0.5 break-words">{specimenB.anatomy.layer_1_dermis.description}</p>
                </div>
              </div>
            )}

            {activeLayer === 2 && (
              <div className="space-y-2 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="opacity-75">{t.boneDensityIndexLabel}</span>
                  <span className="font-bold text-sm">{boneDensityB}</span>
                </div>
                <div className="w-full bg-current/15 h-2 rounded-full overflow-hidden">
                  <div className="bg-current h-full" style={{ width: `${Math.min(boneDensityB * 20, 100)}%` }} />
                </div>
                <p className="text-[11px] opacity-80 pt-1 break-words">{t.skeletonTypeLabel} {specimenB.anatomy.layer_2_osteology.skeleton_type}</p>
              </div>
            )}

            {activeLayer === 3 && (
              <div className="space-y-1.5 min-w-0">
                <div className="p-2 rounded bg-black/10 border border-current/10 min-w-0">
                  <span className="text-[10px] opacity-60 block">{t.primaryOrganLabel}</span>
                  <span className="font-bold text-amber-300 break-words block">{specimenB.anatomy.layer_3_elemental_core.primary_organ}</span>
                </div>
                <div className="p-2 rounded bg-black/10 border border-current/10 min-w-0">
                  <span className="text-[10px] opacity-60 block">{t.descLabel}</span>
                  <p className="text-[11px] opacity-80 break-words">{specimenB.anatomy.layer_3_elemental_core.primary_organ_desc}</p>
                </div>
              </div>
            )}

            {activeLayer === 4 && (
              <div className="p-2 rounded bg-black/10 border border-current/10 space-y-1 min-w-0">
                <div className="flex justify-between items-center text-[10px] opacity-75 gap-2">
                  <span className="flex-shrink-0">{t.tectonicEraLabel}</span>
                  <span className="font-bold break-words">{specimenB.anatomy.layer_4_geologic_speciation.time_era}</span>
                </div>
                <p className="text-[11px] opacity-80 break-words">{specimenB.anatomy.layer_4_geologic_speciation.speciation_notes}</p>
              </div>
            )}
          </div>

          <button
            onClick={() => onOpenModal(specimenB)}
            className="mt-4 w-full py-1.5 text-xs font-mono uppercase tracking-wider rounded border border-current/30 hover:bg-current/10 transition-colors cursor-pointer"
          >
            {t.openDossierBtn}
          </button>
        </div>
      </div>

      {/* Comparative Delta Balance Gauge */}
      <div className={`mt-6 p-4 rounded-xl ${style.card} border border-current/20 font-mono text-xs min-w-0`}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold uppercase tracking-wider opacity-80">
            {t.morphologicalDeltaTitle}
          </span>
          <span className="text-[10px] opacity-60">{t.deltaSummarySubtitle}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center min-w-0">
          <div className="p-2.5 rounded bg-black/10 border border-current/10 min-w-0">
            <span className="text-[10px] opacity-60 block">{t.boneDensityDelta}</span>
            <span className="font-bold text-base truncate block">
              {Number(boneDensityDiff) > 0 ? `+${boneDensityDiff}` : boneDensityDiff} pts
            </span>
            <span className="text-[9px] opacity-60 block mt-0.5 break-words">
              {Number(boneDensityDiff) > 0
                ? `${specimenA.name} ${t.isDenser}`
                : Number(boneDensityDiff) < 0
                ? `${specimenB.name} ${t.isDenser}`
                : t.equalDensity}
            </span>
          </div>
          <div className="p-2.5 rounded bg-black/10 border border-current/10 min-w-0">
            <span className="text-[10px] opacity-60 block">{t.statureVariance}</span>
            <span className="font-bold text-base truncate block">
              {Number(heightDiff) > 0 ? `+${heightDiff}` : heightDiff} m
            </span>
            <span className="text-[9px] opacity-60 block mt-0.5 break-words">
              {Number(heightDiff) > 0
                ? `${specimenA.name} ${t.isTaller}`
                : Number(heightDiff) < 0
                ? `${specimenB.name} ${t.isTaller}`
                : t.equalStature}
            </span>
          </div>
          <div className="p-2.5 rounded bg-black/10 border border-current/10 min-w-0">
            <span className="text-[10px] opacity-60 block">{t.massDisparity}</span>
            <span className="font-bold text-base truncate block">
              {Number(weightDiff) > 0 ? `+${weightDiff}` : weightDiff} kg
            </span>
            <span className="text-[9px] opacity-60 block mt-0.5 break-words">
              {Number(weightDiff) > 0
                ? `${specimenA.name} ${t.isHeavier}`
                : Number(weightDiff) < 0
                ? `${specimenB.name} ${t.isHeavier}`
                : t.equalMass}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
