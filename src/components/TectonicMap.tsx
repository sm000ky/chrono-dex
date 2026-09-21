import React, { useState } from 'react';
import { EpochId, TectonicPlate } from '../types';
import { EPOCHS, Translations } from '../lib/i18n';
import { chronoAudio } from '../lib/audioEngine';
import { Mountain, Compass, Globe, Info, Sparkles } from 'lucide-react';

interface TectonicMapProps {
  currentEpochIndex: number;
  t: Translations;
  onFilterType?: (type: string) => void;
}

export const TectonicMap: React.FC<TectonicMapProps> = ({
  currentEpochIndex,
  t,
  onFilterType,
}) => {
  const activeEpoch = EPOCHS[currentEpochIndex];
  const [selectedPlate, setSelectedPlate] = useState<string | null>(null);

  const handlePlateClick = (plateName: string) => {
    chronoAudio.playLayerPeel(1);
    setSelectedPlate(selectedPlate === plateName ? null : plateName);
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-6 px-4 select-none font-mono">
      <div
        className="p-5 sm:p-8 rounded-2xl border-2 shadow-paper-lg transition-all duration-500 paper-grain relative overflow-hidden"
        style={{
          borderColor: activeEpoch.accentHex,
          backgroundColor: activeEpoch.bgHex,
          color: activeEpoch.id === 'modern' ? '#1E252B' : '#FAF6EE',
        }}
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-current/20 pb-3 mb-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
            style={{ color: activeEpoch.accentHex }}
          >
            <Globe className="w-4 h-4" />
            <span>{t.plateTectonicsMap}</span>
          </div>
          <div className="text-[11px] opacity-75">
            ERA: {activeEpoch.timeEra}
          </div>
        </div>

        {/* Dynamic Canvas / SVG Map Morphing Based on Epoch */}
        <div className="relative w-full aspect-[16/9] max-h-[380px] bg-black/30 rounded-xl border border-current/30 overflow-hidden flex items-center justify-center">
          {/* Background Coordinate Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

          {/* EPOCH 1: PRIMORDIAL POKÉ-PANGAEA (300 Mya) */}
          {currentEpochIndex === 0 && (
            <svg viewBox="0 0 800 450" className="w-full h-full p-4 animate-in fade-in duration-500">
              {/* Ocean */}
              <rect width="800" height="450" fill="#1C100B" />
              {/* Supercontinent Pangaea */}
              <path
                d="M200 180 C240 80, 520 60, 620 160 C680 240, 600 360, 420 380 C260 400, 150 280, 200 180 Z"
                fill="#8C3A27"
                stroke="#D97706"
                strokeWidth="3"
                className="cursor-pointer hover:fill-[#A6452E] transition-colors"
                onClick={() => handlePlateClick('Poké-Pangea Supercontinent')}
              />
              {/* Magma Fissure Lines */}
              <path d="M320 160 Q 420 260, 480 340" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="6 4" />
              <path d="M460 140 Q 400 240, 280 320" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4" />
              {/* Mountain Spines */}
              <polygon points="380,180 395,150 410,180" fill="#523927" stroke="#D97706" strokeWidth="1.5" />
              <polygon points="405,190 420,160 435,190" fill="#523927" stroke="#D97706" strokeWidth="1.5" />
              <polygon points="430,185 445,155 460,185" fill="#523927" stroke="#D97706" strokeWidth="1.5" />
              {/* Labels */}
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
              <rect width="800" height="450" fill="#E8DEC8" />
              {/* Northern Plate (Proto-Kanto/Johto/Sinnoh) */}
              <path
                d="M180 140 C220 80, 420 70, 500 130 C480 200, 360 220, 220 210 Z"
                fill="#D4C3A3"
                stroke="#8A6D4B"
                strokeWidth="2.5"
                className="cursor-pointer hover:fill-[#C5B18D] transition-colors"
                onClick={() => handlePlateClick('Northern Continental Plate')}
              />
              {/* Southern Plate (Proto-Hoenn/Alola Volcanic Arc) */}
              <path
                d="M260 280 C360 240, 580 250, 640 320 C580 390, 380 400, 280 360 Z"
                fill="#BFA985"
                stroke="#8A6D4B"
                strokeWidth="2.5"
                className="cursor-pointer hover:fill-[#B09974] transition-colors"
                onClick={() => handlePlateClick('Southern Volcanic Ridge')}
              />
              {/* Rifting Fault Lines */}
              <path d="M120 230 L680 230" stroke="#B8781B" strokeWidth="3" strokeDasharray="8 6" />
              <text x="400" y="150" fill="#3D2E1E" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                PROTO-KANTO/JOHTO SHIELD
              </text>
              <text x="440" y="330" fill="#3D2E1E" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                HOENN-ALOLA OCEANIC CRUST
              </text>
              <text x="400" y="248" fill="#B8781B" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                ◄── SPREADING OCEANIC RIFT ZONE ──►
              </text>
            </svg>
          )}

          {/* EPOCH 3: FEUDAL HISUI (3,000 BCE) */}
          {currentEpochIndex === 2 && (
            <svg viewBox="0 0 800 450" className="w-full h-full p-4 animate-in fade-in duration-500">
              <rect width="800" height="450" fill="#131A15" />
              {/* Hisui Main Landmass */}
              <path
                d="M220 180 C260 100, 540 90, 600 170 C640 260, 550 360, 380 370 C240 360, 180 260, 220 180 Z"
                fill="#243328"
                stroke="#8C3A2E"
                strokeWidth="3"
                className="cursor-pointer hover:fill-[#2E4233] transition-colors"
                onClick={() => handlePlateClick('Ancient Hisui (Mount Coronet)')}
              />
              {/* Mount Coronet Spine (Center Pillar) */}
              <polygon points="380,220 400,130 420,220" fill="#FAF6EE" stroke="#D4AF37" strokeWidth="2" />
              <polygon points="410,240 430,160 450,240" fill="#DDE7E8" stroke="#D4AF37" strokeWidth="2" />
              <text x="400" y="270" fill="#F3EFE6" fontSize="15" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                ANCIENT REGION OF HISUI
              </text>
              <text x="400" y="295" fill="#D4AF37" fontSize="11" fontFamily="monospace" textAnchor="middle">
                SACRED MOUNT CORONET // CRADLE OF SINNOH
              </text>
            </svg>
          )}

          {/* EPOCH 4: VICTORIAN & MODERN ERA (Present Day) */}
          {currentEpochIndex === 3 && (
            <svg viewBox="0 0 800 450" className="w-full h-full p-4 animate-in fade-in duration-500">
              <rect width="800" height="450" fill="#F4ECE1" />
              {/* Kanto & Johto */}
              <rect x="360" y="160" width="140" height="110" rx="8" fill="#EBDDCB" stroke="#DEC6AE" strokeWidth="2" className="cursor-pointer hover:fill-[#DEC6AE]" onClick={() => handlePlateClick('Kanto-Johto')} />
              <text x="430" y="220" fill="#1E252B" fontSize="11" fontWeight="bold" textAnchor="middle">KANTO & JOHTO</text>
              
              {/* Hoenn */}
              <rect x="180" y="260" width="120" height="90" rx="8" fill="#DDECE5" stroke="#50857D" strokeWidth="2" className="cursor-pointer hover:fill-[#C8E0D5]" onClick={() => handlePlateClick('Hoenn Archipelago')} />
              <text x="240" y="310" fill="#1B322D" fontSize="11" fontWeight="bold" textAnchor="middle">HOENN</text>

              {/* Sinnoh */}
              <rect x="380" y="40" width="120" height="90" rx="8" fill="#E0EAF0" stroke="#38BDF8" strokeWidth="2" className="cursor-pointer hover:fill-[#C8DAE5]" onClick={() => handlePlateClick('Sinnoh')} />
              <text x="440" y="90" fill="#1D4A62" fontSize="11" fontWeight="bold" textAnchor="middle">SINNOH</text>

              {/* Unova */}
              <rect x="80" y="100" width="110" height="90" rx="8" fill="#E8D5BC" stroke="#8A6D4B" strokeWidth="2" className="cursor-pointer hover:fill-[#D8C0A0]" onClick={() => handlePlateClick('Unova')} />
              <text x="135" y="150" fill="#2D2318" fontSize="11" fontWeight="bold" textAnchor="middle">UNOVA</text>

              {/* Kalos */}
              <rect x="560" y="90" width="110" height="90" rx="8" fill="#F2E6EE" stroke="#A855F7" strokeWidth="2" className="cursor-pointer hover:fill-[#E0C8DA]" onClick={() => handlePlateClick('Kalos')} />
              <text x="615" y="140" fill="#4A1D4A" fontSize="11" fontWeight="bold" textAnchor="middle">KALOS</text>

              {/* Alola */}
              <rect x="580" y="270" width="120" height="80" rx="8" fill="#FFF5EB" stroke="#EAA838" strokeWidth="2" className="cursor-pointer hover:fill-[#FFE4CC]" onClick={() => handlePlateClick('Alola Islands')} />
              <text x="640" y="315" fill="#8C5810" fontSize="11" fontWeight="bold" textAnchor="middle">ALOLA</text>

              {/* Galar */}
              <rect x="230" y="60" width="100" height="80" rx="8" fill="#FBEBEB" stroke="#D95A47" strokeWidth="2" className="cursor-pointer hover:fill-[#F4CCCC]" onClick={() => handlePlateClick('Galar')} />
              <text x="280" y="105" fill="#881337" fontSize="11" fontWeight="bold" textAnchor="middle">GALAR</text>

              {/* Paldea */}
              <rect x="490" y="210" width="120" height="90" rx="8" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="2" className="cursor-pointer hover:fill-[#FEF3C7]" onClick={() => handlePlateClick('Paldea & Area Zero')} />
              <text x="550" y="260" fill="#B45309" fontSize="11" fontWeight="bold" textAnchor="middle">PALDEA</text>
            </svg>
          )}

          {/* EPOCH 5: PARADOX FUTURE (Area Zero Horizon) */}
          {currentEpochIndex === 4 && (
            <svg viewBox="0 0 800 450" className="w-full h-full p-4 animate-in fade-in duration-500">
              <rect width="800" height="450" fill="#060913" />
              {/* Radar Grid Circles */}
              <circle cx="400" cy="225" r="180" fill="none" stroke="#0284C7" strokeWidth="1" strokeDasharray="6 6" />
              <circle cx="400" cy="225" r="120" fill="none" stroke="#38BDF8" strokeWidth="1.5" />
              <circle cx="400" cy="225" r="50" fill="#0C4A6E" stroke="#38BDF8" strokeWidth="2" />
              {/* Energy Beams */}
              <line x1="400" y1="45" x2="400" y2="405" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 4" />
              <line x1="220" y1="225" x2="580" y2="225" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 4" />
              {/* Quantum Core */}
              <polygon points="400,200 420,225 400,250 380,225" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="2" />
              <text x="400" y="290" fill="#38BDF8" fontSize="15" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                AREA ZERO // TEMPORAL ANOMALY CORE
              </text>
              <text x="400" y="315" fill="#E2E8F0" fontSize="11" fontFamily="monospace" textAnchor="middle">
                CONVERGENCE OF FUTURE & PAST PARADOX FORMS
              </text>
            </svg>
          )}
        </div>

        {/* Selected Plate Details Drawer */}
        {selectedPlate && (
          <div className="mt-4 p-4 rounded-xl border border-current/30 bg-black/40 text-xs space-y-1 animate-in fade-in duration-200">
            <div className="flex items-center justify-between font-bold" style={{ color: activeEpoch.accentHex }}>
              <span className="flex items-center gap-1.5 uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>GEOLOGICAL REGION: {selectedPlate}</span>
              </span>
              <button
                onClick={() => setSelectedPlate(null)}
                className="hover:underline cursor-pointer opacity-80"
              >
                [Dismiss]
              </button>
            </div>
            <p className="opacity-90 leading-relaxed pt-1">
              Tectonic survey indicates significant geological speciation pressure in this sector during the {activeEpoch.nameKey}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
