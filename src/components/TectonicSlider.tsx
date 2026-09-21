import React from 'react';
import { EPOCHS, Translations } from '../lib/i18n';
import { EpochId } from '../types';
import { chronoAudio } from '../lib/audioEngine';
import { Compass, Clock, Mountain, Palette, Shield } from 'lucide-react';

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

  return (
    <div className="w-full max-w-5xl mx-auto my-6 px-4 select-none font-mono">
      {/* Epoch Card HUD */}
      <div className="p-4 sm:p-6 rounded-2xl border-2 shadow-paper-md transition-all duration-500 paper-grain relative overflow-hidden"
        style={{
          borderColor: activeEpoch.accentHex,
          backgroundColor: activeEpoch.bgHex,
        }}
      >
        {/* Top Indicators */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-current/20 pb-3 mb-4">
          <div className="flex items-center gap-2 font-bold tracking-widest uppercase"
            style={{ color: activeEpoch.accentHex }}
          >
            <Clock className="w-4 h-4" />
            <span>{t.epochLabel} 0{activeEpoch.number} // {activeEpoch.timeEra}</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] px-3 py-1 rounded-full border border-current/30 bg-black/20">
            <Palette className="w-3.5 h-3.5" style={{ color: activeEpoch.accentHex }} />
            <span>{t.artStyle}: <strong>{activeEpoch.styleName}</strong></span>
          </div>
        </div>

        {/* Title & Geological Event */}
        <div className="space-y-1 mb-6">
          <h2 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight text-white">
            {activeEpoch.nameKey}
          </h2>
          <div className="flex items-center gap-2 text-xs opacity-80 pt-1">
            <Mountain className="w-3.5 h-3.5 flex-shrink-0" style={{ color: activeEpoch.accentHex }} />
            <span>{t.tectonicEvent}: <strong>{activeEpoch.id === 'primordial' ? 'Supercontinent Poké-Pangea' : activeEpoch.id === 'drift' ? 'Continental Rift' : activeEpoch.id === 'feudal' ? 'Hisui Sacred Landmass' : activeEpoch.id === 'modern' ? '9 Global Regions Established' : 'Area Zero Temporal Core'}</strong></span>
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
              className="w-full h-3 bg-black/40 rounded-lg appearance-none cursor-pointer accent-[#D97706] focus:outline-none"
              style={{
                accentColor: activeEpoch.accentHex,
              }}
            />
          </div>

          {/* Stepped Marker Buttons */}
          <div className="grid grid-cols-5 gap-1 pt-1 text-[10px] text-center">
            {EPOCHS.map((ep, idx) => (
              <button
                key={ep.id}
                onClick={() => handleStepClick(idx)}
                className={`py-1.5 px-1 rounded-lg border transition-all cursor-pointer ${
                  currentEpochIndex === idx
                    ? 'font-bold shadow-paper-sm text-black scale-105'
                    : 'opacity-60 hover:opacity-100 hover:bg-white/10'
                }`}
                style={{
                  backgroundColor: currentEpochIndex === idx ? ep.accentHex : 'transparent',
                  borderColor: ep.accentHex,
                  color: currentEpochIndex === idx ? '#000000' : '#FFFFFF',
                }}
              >
                <div className="truncate font-bold">0{ep.number}</div>
                <div className="text-[8px] sm:text-[9px] opacity-90 truncate hidden sm:block">
                  {ep.timeEra.split(' ')[0]} {ep.timeEra.split(' ')[1]}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
