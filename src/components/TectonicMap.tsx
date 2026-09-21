import React, { useState, useMemo } from 'react';
import { EpochId, TectonicPlate, Language } from '../types';
import { getLocalizedEpochs, getLocalizedPlateInfo, Translations } from '../lib/i18n';
import { chronoAudio } from '../lib/audioEngine';
import { Globe, Play, RotateCcw, Info, Sparkles, Activity } from 'lucide-react';

interface TectonicMapProps {
  currentEpochIndex: number;
  t: Translations;
  currentLang?: Language;
  onFilterType?: (type: string) => void;
}

export const TectonicMap: React.FC<TectonicMapProps> = ({
  currentEpochIndex,
  t,
  currentLang = 'id',
  onFilterType,
}) => {
  const epochs = useMemo(() => getLocalizedEpochs(currentLang), [currentLang]);
  const activeEpoch = epochs[currentEpochIndex];
  const plateDictionary = useMemo(() => getLocalizedPlateInfo(currentLang), [currentLang]);
  const isLightEra = activeEpoch.id === 'drift' || activeEpoch.id === 'modern';
  const [selectedPlate, setSelectedPlate] = useState<string | null>(null);
  const [isDrifting, setIsDrifting] = useState<boolean>(false);

  const handlePlateClick = (plateName: string) => {
    chronoAudio.playLayerPeel(1);
    setSelectedPlate(selectedPlate === plateName ? null : plateName);
  };

  const handleTriggerDrift = () => {
    chronoAudio.playEpochTransition(1); // Seismic stone grind
    setIsDrifting(true);
    setTimeout(() => setIsDrifting(false), 2400);
  };

  const textColor = isLightEra ? 'text-[#1C1309]' : 'text-[#FAF6EE]';
  const subtextColor = isLightEra ? 'text-[#4A3A26]' : 'text-[#D2BA9F]';
  const cardBg = isLightEra ? 'bg-[#FAF3E3]' : 'bg-black/25';

  return (
    <div className="w-full max-w-5xl mx-auto my-6 px-4 select-none font-mono">
      <div
        className={`p-5 sm:p-8 rounded-2xl border-2 shadow-xl transition-all duration-500 relative overflow-hidden ${cardBg} ${textColor}`}
        style={{
          borderColor: activeEpoch.accentHex,
        }}
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-current/20 pb-3 mb-6 min-w-0">
          <div
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest min-w-0"
            style={{ color: activeEpoch.accentHex }}
          >
            <Globe className="w-4 h-4 flex-shrink-0" />
            <span className="break-words">{t.plateTectonicsMap}</span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleTriggerDrift}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer shadow-sm ${
                isDrifting ? 'bg-amber-500 text-black border-amber-400 scale-95' : 'hover:bg-black/10'
              }`}
              style={{ borderColor: activeEpoch.accentHex, color: isDrifting ? '#000000' : activeEpoch.accentHex }}
              title="Trigger tectonic plate movement simulation"
            >
              <Activity className={`w-3.5 h-3.5 ${isDrifting ? 'animate-spin' : ''}`} />
              <span>{isDrifting ? t.simulatingTremor : t.triggerDriftBtn}</span>
            </button>
            <div className="text-[11px] opacity-75 hidden sm:inline">
              {t.eraLabel} {activeEpoch.timeEra}
            </div>
          </div>
        </div>

        {/* Dynamic Canvas / SVG Map Morphing Based on Epoch */}
        <div className="relative w-full aspect-[16/9] max-h-[380px] bg-black/40 rounded-xl border border-current/30 overflow-hidden flex items-center justify-center">
          {/* Background Coordinate Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          {/* EPOCH 1: PRIMORDIAL POKÉ-PANGAEA (300 Mya) */}
          {currentEpochIndex === 0 && (
            <svg viewBox="0 0 800 450" className="w-full h-full p-4 animate-in fade-in duration-500">
              <rect width="800" height="450" fill="#1C100B" />
              {/* Supercontinent Pangaea with seismic drift transform */}
              <path
                d="M200 180 C240 80, 520 60, 620 160 C680 240, 600 360, 420 380 C260 400, 150 280, 200 180 Z"
                fill="#8C3A27"
                stroke="#D97706"
                strokeWidth="3"
                className={`cursor-pointer hover:fill-[#A6452E] transition-all duration-700 ${
                  isDrifting ? 'translate-x-3 scale-105 filter drop-shadow-[0_0_15px_#F59E0B]' : ''
                }`}
                onClick={() => handlePlateClick('Poké-Pangea Supercontinent')}
              />
              <path d="M320 160 Q 420 260, 480 340" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="6 4" />
              <path d="M460 140 Q 400 240, 280 320" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4" />
              <polygon points="380,180 395,150 410,180" fill="#523927" stroke="#D97706" strokeWidth="1.5" />
              <polygon points="405,190 420,160 435,190" fill="#523927" stroke="#D97706" strokeWidth="1.5" />
              <polygon points="430,185 445,155 460,185" fill="#523927" stroke="#D97706" strokeWidth="1.5" />
              <text x="400" y="240" fill="#FEF3C7" fontSize="16" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                POKÉ-PANGAEA SUPERCONTINENT
              </text>
              <text x="400" y="265" fill="#F59E0B" fontSize="11" fontFamily="monospace" textAnchor="middle">
                DOMAIN OF PRIMAL TITANS (GROUDON & KYOGRE)
              </text>
            </svg>
          )}

          {/* EPOCH 2: MESOZOIC CONTINENTAL FRACTURE (100 Mya) */}
          {currentEpochIndex === 1 && (
            <svg viewBox="0 0 800 450" className="w-full h-full p-4 animate-in fade-in duration-500">
              <rect width="800" height="450" fill="#2E2419" />
              {/* Northern Plate: Laurasian Archetype */}
              <path
                d="M160 140 C220 80, 400 70, 480 110 C520 160, 440 220, 320 200 C200 210, 140 180, 160 140 Z"
                fill="#8C6E4E"
                stroke="#C5A059"
                strokeWidth="2.5"
                className={`cursor-pointer hover:fill-[#9E7D59] transition-all duration-700 ${
                  isDrifting ? '-translate-y-4 -translate-x-2' : ''
                }`}
                onClick={() => handlePlateClick('Kanto-Johto Northern Plate')}
              />
              {/* Southern Plate: Gondwanan Archetype */}
              <path
                d="M340 260 C420 230, 580 220, 640 280 C680 340, 560 390, 440 370 C360 360, 310 320, 340 260 Z"
                fill="#70563C"
                stroke="#C5A059"
                strokeWidth="2.5"
                className={`cursor-pointer hover:fill-[#826446] transition-all duration-700 ${
                  isDrifting ? 'translate-y-4 translate-x-3' : ''
                }`}
                onClick={() => handlePlateClick('Sinnoh-Hoenn Southern Arc')}
              />
              <path d="M120 220 Q 400 210, 680 230" stroke="#38BDF8" strokeWidth="3" strokeDasharray="8 4" />
              <text x="400" y="225" fill="#38BDF8" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                TETHYS SEAWAY (OCEANIC SPREADING RIFT)
              </text>
              <text x="320" y="150" fill="#FDF6E2" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                NORTHERN RIFT (KANTO-JOHTO)
              </text>
              <text x="490" y="310" fill="#FDF6E2" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                SOUTHERN ARC (HOENN-SINNOH)
              </text>
            </svg>
          )}

          {/* EPOCH 3: FEUDAL HISUI (3,000 BCE) */}
          {currentEpochIndex === 2 && (
            <svg viewBox="0 0 800 450" className="w-full h-full p-4 animate-in fade-in duration-500">
              <rect width="800" height="450" fill="#0C140E" />
              {/* Massive Hisui Landmass with Coronet Spine */}
              <path
                d="M240 100 C450 70, 620 90, 660 200 C680 290, 560 390, 380 380 C220 370, 160 260, 240 100 Z"
                fill="#203326"
                stroke="#D4AF37"
                strokeWidth="2.5"
                className="cursor-pointer hover:fill-[#2A4232] transition-colors"
                onClick={() => handlePlateClick('Hisui Continental Plate')}
              />
              {/* Mount Coronet Spine (Center) */}
              <polygon points="400,160 430,220 370,220" fill="#991B1B" stroke="#D4AF37" strokeWidth="2" />
              <polygon points="430,200 460,250 400,250" fill="#991B1B" stroke="#D4AF37" strokeWidth="2" />
              <polygon points="370,190 400,245 340,245" fill="#991B1B" stroke="#D4AF37" strokeWidth="2" />
              <text x="400" y="145" fill="#D4AF37" fontSize="14" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                MOUNT CORONET OROGENY
              </text>
              <text x="400" y="310" fill="#F9F7F1" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                FEUDAL HISUI PLATE (ANCESTRAL SINNOH)
              </text>
            </svg>
          )}

          {/* EPOCH 4: MODERN 9 REGIONS (Present) */}
          {currentEpochIndex === 3 && (
            <svg viewBox="0 0 800 450" className="w-full h-full p-4 animate-in fade-in duration-500">
              <rect width="800" height="450" fill="#1A242F" />
              {/* Kanto-Johto Mainland */}
              <path d="M420 180 Q 520 160, 580 220 Q 520 280, 420 260 Z" fill="#3D5A45" stroke="#8CE8AD" strokeWidth="2"
                className="cursor-pointer hover:fill-[#4A6E54] transition-colors"
                onClick={() => handlePlateClick('Kanto-Johto Unified Plate')}
              />
              <text x="500" y="225" fill="#FFFFFF" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">KANTO-JOHTO</text>

              {/* Hoenn Archipelago */}
              <path d="M260 260 Q 320 240, 360 300 Q 300 360, 240 320 Z" fill="#2E4F63" stroke="#70CFF8" strokeWidth="2"
                className="cursor-pointer hover:fill-[#39637D] transition-colors"
                onClick={() => handlePlateClick('Hoenn Volcanic Subplate')}
              />
              <text x="300" y="305" fill="#FFFFFF" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">HOENN</text>

              {/* Sinnoh North */}
              <path d="M440 60 Q 540 50, 560 120 Q 480 160, 420 120 Z" fill="#475569" stroke="#CBD5E1" strokeWidth="2"
                className="cursor-pointer hover:fill-[#55667E] transition-colors"
                onClick={() => handlePlateClick('Sinnoh Northern Shield')}
              />
              <text x="490" y="105" fill="#FFFFFF" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">SINNOH</text>

              {/* Kalos West */}
              <path d="M200 120 Q 280 110, 300 180 Q 220 220, 180 170 Z" fill="#5E4068" stroke="#D8B4FE" strokeWidth="2"
                className="cursor-pointer hover:fill-[#714D7D] transition-colors"
                onClick={() => handlePlateClick('Kalos Continental Shelf')}
              />
              <text x="240" y="165" fill="#FFFFFF" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">KALOS</text>

              {/* Paldea Iberian Plate */}
              <path d="M120 220 Q 200 210, 220 290 Q 140 330, 100 270 Z" fill="#784D2B" stroke="#FBBF24" strokeWidth="2"
                className="cursor-pointer hover:fill-[#915D35] transition-colors"
                onClick={() => handlePlateClick('Paldean Iberian Plate')}
              />
              <text x="160" y="270" fill="#FFFFFF" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">PALDEA</text>
            </svg>
          )}

          {/* EPOCH 5: PARADOX TEMPORAL HORIZON (Area Zero / Future) */}
          {currentEpochIndex === 4 && (
            <svg viewBox="0 0 800 450" className="w-full h-full p-4 animate-in fade-in duration-500">
              <rect width="800" height="450" fill="#030712" />
              <circle cx="400" cy="225" r="180" fill="none" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="8 6" />
              <circle cx="400" cy="225" r="130" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="400" cy="225" r="80" fill="#0A1835" stroke="#F43F5E" strokeWidth="3"
                className="cursor-pointer hover:fill-[#122857] transition-colors"
                onClick={() => handlePlateClick('Area Zero Temporal Vortex')}
              />
              <path d="M220 225 L580 225 M400 45 L400 405" stroke="#0284C7" strokeWidth="1" strokeDasharray="2 4" />
              <text x="400" y="220" fill="#F43F5E" fontSize="14" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                AREA ZERO TEMPORAL SINGULARITY
              </text>
              <text x="400" y="245" fill="#38BDF8" fontSize="10" fontFamily="monospace" textAnchor="middle">
                CONVERGENCE OF PAST PARADOX & FUTURE IRON UNITS
              </text>
            </svg>
          )}
        </div>

        {/* Selected Plate Telemetry Dossier */}
        {selectedPlate && (() => {
          const plateData = plateDictionary[selectedPlate] || {
            types: ['Normal'],
            desc: selectedPlate,
          };

          return (
            <div className="mt-4 p-4 rounded-xl border-2 border-current/25 bg-black/20 space-y-2.5 animate-in fade-in min-w-0">
              <div className="flex items-center justify-between text-xs font-bold gap-2 min-w-0" style={{ color: activeEpoch.accentHex }}>
                <span className="break-words min-w-0 flex-1">{t.cratonTelemetryLabel} {selectedPlate}</span>
                <button
                  onClick={() => setSelectedPlate(null)}
                  className="cursor-pointer text-xs opacity-70 hover:opacity-100 flex-shrink-0 px-2 py-0.5 rounded border border-current/30"
                >
                  {t.closeBtn}
                </button>
              </div>

              <p className="font-serif text-xs sm:text-sm italic leading-relaxed break-words">
                "{plateData.desc}"
              </p>

              {/* Endemic Elemental Conduit Filters */}
              <div className="pt-2 border-t border-current/15 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] uppercase font-bold opacity-75 font-mono">{t.endemicConduitsLabel}</span>
                  {plateData.types.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        chronoAudio.playLayerPeel(1);
                        if (onFilterType) onFilterType(type);
                      }}
                      className="px-2 py-0.5 rounded text-[10px] font-bold font-mono border border-current/30 hover:bg-current/20 cursor-pointer transition-all uppercase"
                      style={{ color: activeEpoch.accentHex }}
                      title={`Filter ${type} specimens from this plate in archive`}
                    >
                      {type} →
                    </button>
                  ))}
                </div>

                {onFilterType && (
                  <button
                    onClick={() => {
                      chronoAudio.playLayerPeel(2);
                      onFilterType(plateData.types[0]);
                    }}
                    className="px-2.5 py-1 rounded text-[10px] font-bold font-mono bg-amber-500 text-black border border-amber-400 hover:bg-amber-400 cursor-pointer transition-all"
                  >
                    {t.viewFaunaInArchiveBtn}
                  </button>
                )}
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
