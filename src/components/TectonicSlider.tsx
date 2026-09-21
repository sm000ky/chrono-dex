import React from 'react';
import { EPOCHS, Translations } from '../lib/i18n';
import { chronoAudio } from '../lib/audioEngine';
import { Clock, Mountain, Palette } from 'lucide-react';

interface TectonicSliderProps {
  currentEpochIndex: number; // 0 to 4
  onSelectEpochIndex: (index: number) => void;
  t: Translations;
}

export const TectonicSlider: React.FC<TectonicSliderProps> = ({
  currentEpochIndex,
  onSelectEpochIndex,
  t,
}) => {
  const activeEpoch = EPOCHS[currentEpochIndex];
  const isLightEra = activeEpoch.id === 'drift' || activeEpoch.id === 'modern';

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newIdx = parseInt(e.target.value, 10);
    if (newIdx !== currentEpochIndex) {
      chronoAudio.playEpochTransition(EPOCHS[newIdx].number);
      onSelectEpochIndex(newIdx);
    }
  };

  const handleStepClick = (idx: number) => {
    if (idx !== currentEpochIndex) {
      chronoAudio.playEpochTransition(EPOCHS[idx].number);
      onSelectEpochIndex(idx);
    }
  };

  const textColor = isLightEra ? 'text-[#1C1309]' : 'text-[#FAF6EE]';
  const subtextColor = isLightEra ? 'text-[#4A3A26]' : 'text-[#D2BA9F]';
  const cardBg = isLightEra ? 'bg-[#FAF3E3]' : 'bg-black/25';

  return (
    <div className="w-full max-w-5xl mx-auto my-6 px-4 select-none font-mono">
      {/* Epoch Card HUD */}
      <div
        className={`p-4 sm:p-6 rounded-2xl border-2 transition-all duration-500 relative overflow-hidden ${cardBg} ${textColor}`}
        style={{
          borderColor: activeEpoch.accentHex,
        }}
      >
        {/* Top Indicators */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs border-b border-current/20 pb-3 mb-4 min-w-0">
          <div
            className="flex items-center gap-2 font-bold tracking-widest uppercase min-w-0"
            style={{ color: activeEpoch.accentHex }}
          >
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{t.epochLabel} 0{activeEpoch.number} // {activeEpoch.timeEra}</span>
          </div>

          {/* Mechanical Needle Sway Epoch Meter */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full border border-current/30 bg-black/15">
            <span className="text-[9px] uppercase tracking-wider opacity-70">GEOLOGICAL DIAL</span>
            <div className="relative w-8 h-4 overflow-hidden flex items-end justify-center">
              <div
                className="w-0.5 h-3.5 bg-current rounded-full origin-bottom transition-transform duration-500 ease-out"
                style={{
                  transform: `rotate(${-45 + currentEpochIndex * 22.5}deg)`,
                  backgroundColor: activeEpoch.accentHex,
                }}
              />
              <div className="w-1.5 h-1.5 rounded-full bg-current absolute bottom-0" />
            </div>
          </div>

          <div className={`flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-full border border-current/30 bg-black/10 flex-shrink-0 font-semibold ${textColor}`}>
            <Palette className="w-3.5 h-3.5 flex-shrink-0" style={{ color: activeEpoch.accentHex }} />
            <span className="truncate">{t.artStyle}: <strong style={{ color: activeEpoch.accentHex }}>{activeEpoch.styleName}</strong></span>
          </div>
        </div>

        {/* Title & Geological Event */}
        <div className="space-y-1.5 mb-6 min-w-0">
          <h2 className={`text-xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight break-words ${textColor}`}>
            {activeEpoch.nameKey}
          </h2>
          <div className={`flex items-center gap-2 text-xs pt-1 min-w-0 ${subtextColor}`}>
            <Mountain className="w-3.5 h-3.5 flex-shrink-0" style={{ color: activeEpoch.accentHex }} />
            <span className="break-words">
              {t.tectonicEvent}: <strong className={textColor}>
                {activeEpoch.id === 'primordial'
                  ? 'Supercontinent Poké-Pangea Rifting'
                  : activeEpoch.id === 'drift'
                  ? 'Continental Fracture & Tethys Sea Opening'
                  : activeEpoch.id === 'feudal'
                  ? 'Hisui Landbridge & Mount Coronet Orogeny'
                  : activeEpoch.id === 'modern'
                  ? '9 Global Archipelago Plates Established'
                  : 'Area Zero Temporal Rift Expansion'}
              </strong>
            </span>
          </div>
        </div>

        {/* Tactile Range Slider Track */}
        <div className="space-y-3">
          <div className="relative flex items-center">
            <input
              type="range"
              min="0"
              max="4"
              step="1"
              value={currentEpochIndex}
              onChange={handleSliderChange}
              className="w-full h-3 bg-black/30 rounded-lg appearance-none cursor-pointer focus:outline-none"
              style={{
                accentColor: activeEpoch.accentHex,
              }}
            />
          </div>

          {/* Stepped Marker Buttons */}
          <div className="grid grid-cols-5 gap-1.5 pt-1 text-[10px] text-center">
            {EPOCHS.map((ep, idx) => {
              const isSelected = currentEpochIndex === idx;
              return (
                <button
                  key={ep.id}
                  onClick={() => handleStepClick(idx)}
                  className={`py-2 px-1 rounded-lg border transition-all cursor-pointer flex flex-col items-center justify-center min-w-0 ${
                    isSelected
                      ? 'font-bold shadow-md scale-105 border-2'
                      : 'hover:bg-black/10 opacity-70 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: isSelected ? ep.accentHex : 'transparent',
                    borderColor: ep.accentHex,
                    color: isSelected ? '#000000' : isLightEra ? '#1C1309' : '#FFFFFF',
                  }}
                >
                  <div className="truncate font-bold text-xs">0{ep.number}</div>
                  <div className="text-[9px] truncate max-w-full font-serif hidden sm:block">
                    {ep.id === 'primordial' ? 'Pangaea' : ep.id === 'drift' ? 'Fracture' : ep.id === 'feudal' ? 'Hisui' : ep.id === 'modern' ? 'Modern' : 'Paradox'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
