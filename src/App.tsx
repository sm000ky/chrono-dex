import React, { useState, useMemo } from 'react';
import pokemonData from './data/chrono_pokemon.json';
import { PokemonChronoEntry, Language, EpochId } from './types';
import { DICTIONARY, EPOCHS } from './lib/i18n';
import { chronoAudio } from './lib/audioEngine';
import { TectonicSlider } from './components/TectonicSlider';
import { TectonicMap } from './components/TectonicMap';
import { PokemonCard } from './components/PokemonCard';
import { AnatomicalModal } from './components/AnatomicalModal';
import {
  Compass,
  Search,
  Volume2,
  VolumeX,
  Globe,
  Filter,
  Sparkles,
  BookOpen,
  ArrowUp,
  Layers,
  X
} from 'lucide-react';

const ALL_TYPES = [
  'All', 'Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice',
  'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug',
  'Rock', 'Ghost', 'Dragon', 'Steel', 'Dark', 'Fairy'
];

export function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const t = DICTIONARY[currentLang];

  const [currentEpochIndex, setCurrentEpochIndex] = useState<number>(1); // Default to Mesozoic Drift
  const activeEpoch = EPOCHS[currentEpochIndex];

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [filterByEpochOnly, setFilterByEpochOnly] = useState<boolean>(false);
  const [showTectonicMap, setShowTectonicMap] = useState<boolean>(false);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonChronoEntry | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const pokemonList = pokemonData as unknown as PokemonChronoEntry[];

  // Filter Pokemon based on Search, Type, and optional Epoch locking
  const filteredPokemon = useMemo(() => {
    return pokemonList.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.binomial_name.toLowerCase().includes(q) ||
        p.japanese_name.toLowerCase().includes(q) ||
        String(p.national_id).includes(q) ||
        p.types.some((t) => t.toLowerCase().includes(q));

      const matchesType =
        selectedType === 'All' || p.types.includes(selectedType);

      const matchesEpoch =
        !filterByEpochOnly || p.epoch.epoch_id === activeEpoch.id;

      return matchesSearch && matchesType && matchesEpoch;
    });
  }, [pokemonList, searchQuery, selectedType, filterByEpochOnly, activeEpoch.id]);

  const handleToggleMute = () => {
    const muted = chronoAudio.toggleMute();
    setIsMuted(muted);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get active class name for the whole page theme
  const getEpochClass = () => {
    switch (activeEpoch.id) {
      case 'primordial': return 'epoch-primordial petroglyph-stone';
      case 'drift': return 'epoch-drift paper-grain';
      case 'feudal': return 'epoch-feudal washi-grain';
      case 'modern': return 'epoch-modern paper-grain';
      case 'future': default: return 'epoch-future blueprint-grid';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-700 select-none font-mono ${getEpochClass()}`}>
      {/* ===================================================================
       * TOP STICKY HEADER
       * =================================================================== */}
      <header className="sticky top-0 z-40 px-4 sm:px-8 py-3 border-b border-current/20 backdrop-blur-md bg-black/10 flex items-center justify-between gap-3 text-xs">
        {/* Brand */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <span className="w-2.5 h-2.5 rounded-full inline-block shadow-[0_0_8px_currentColor]"
            style={{ backgroundColor: activeEpoch.accentHex }}
          />
          <span className="font-bold tracking-widest uppercase text-sm sm:text-base">
            {t.appTitle}
          </span>
          <span className="hidden lg:inline opacity-30">·</span>
          <span className="hidden lg:inline opacity-75 text-[11px]">
            {t.appSubtitle}
          </span>
        </div>

        {/* Right Tools: Language, Sound, Tectonic Map Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Tectonic Map Toggle Button */}
          <button
            onClick={() => {
              chronoAudio.playLayerPeel(1);
              setShowTectonicMap(!showTectonicMap);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-bold tracking-wider uppercase transition-all shadow-paper-sm cursor-pointer hover:bg-white/10"
            style={{ borderColor: activeEpoch.accentHex, color: activeEpoch.accentHex }}
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {showTectonicMap ? t.hideTectonicMap : t.showTectonicMap}
            </span>
          </button>

          {/* Language Selector Pill */}
          <div className="inline-flex rounded border border-current/30 overflow-hidden text-[10px]">
            {(['en', 'id', 'ja'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => {
                  chronoAudio.playLayerPeel(0);
                  setCurrentLang(l);
                }}
                className={`px-2.5 py-1 font-bold transition-colors cursor-pointer uppercase ${
                  currentLang === l
                    ? 'text-black font-bold'
                    : 'opacity-70 hover:opacity-100 hover:bg-white/10'
                }`}
                style={{
                  backgroundColor: currentLang === l ? activeEpoch.accentHex : 'transparent',
                }}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleMute}
            className="flex items-center gap-1 px-2.5 py-1 rounded border text-[10px] font-bold tracking-wider transition-all shadow-paper-sm cursor-pointer"
            style={{ borderColor: activeEpoch.accentHex }}
            title="Toggle Epoch Acoustic Synthesizer"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden sm:inline">{t.soundOff}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">{t.soundOn}</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* ===================================================================
       * HERO SECTION
       * =================================================================== */}
      <section className="pt-10 pb-6 px-4 text-center max-w-4xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] tracking-widest uppercase font-bold bg-black/20"
          style={{ borderColor: activeEpoch.accentHex, color: activeEpoch.accentHex }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>NATURALIST SPECIMEN ATLAS // 1,025 TAXA</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight">
          {t.appTitle}
        </h1>

        <p className="font-serif text-base sm:text-lg opacity-80 max-w-2xl mx-auto italic leading-relaxed">
          "{t.tagline}"
        </p>
      </section>

      {/* ===================================================================
       * TECTONIC EPOCH TIME-SLIDER (300 Mya to Future)
       * =================================================================== */}
      <TectonicSlider
        currentEpochIndex={currentEpochIndex}
        onSelectEpochIndex={setCurrentEpochIndex}
        t={t}
      />

      {/* ===================================================================
       * OPTIONAL TECTONIC MAP VIEW (Continental Drift)
       * =================================================================== */}
      {showTectonicMap && (
        <TectonicMap
          currentEpochIndex={currentEpochIndex}
          t={t}
          onFilterType={(type) => setSelectedType(type)}
        />
      )}

      {/* ===================================================================
       * SEARCH & TYPE FILTER BAR
       * =================================================================== */}
      <section className="max-w-5xl mx-auto px-4 my-6 space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Live Search Input */}
          <div className="relative w-full flex-1 flex items-center p-3 rounded-xl border-2 bg-black/20 text-xs shadow-paper-sm"
            style={{ borderColor: activeEpoch.accentHex }}
          >
            <Search className="w-4 h-4 opacity-60 mr-2 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full bg-transparent border-none outline-none font-mono text-xs placeholder:opacity-50"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="p-1 opacity-60 hover:opacity-100 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Epoch Lock Toggle */}
          <button
            onClick={() => {
              chronoAudio.playLayerPeel(0);
              setFilterByEpochOnly(!filterByEpochOnly);
            }}
            className={`px-4 py-3 rounded-xl border-2 text-xs font-bold uppercase transition-all shadow-paper-sm cursor-pointer whitespace-nowrap ${
              filterByEpochOnly
                ? 'text-black shadow-[0_0_12px_currentColor]'
                : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              backgroundColor: filterByEpochOnly ? activeEpoch.accentHex : 'transparent',
              borderColor: activeEpoch.accentHex,
            }}
          >
            {filterByEpochOnly ? `✓ LOCKED: ${activeEpoch.timeEra}` : `FILTER: ${activeEpoch.timeEra}`}
          </button>
        </div>

        {/* Horizontal Type Scrollbar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 text-[10px]">
          <Filter className="w-3.5 h-3.5 opacity-60 mr-1 flex-shrink-0" />
          {ALL_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => {
                chronoAudio.playLayerPeel(0);
                setSelectedType(type);
              }}
              className={`px-2.5 py-1 rounded-full border transition-all cursor-pointer uppercase font-bold whitespace-nowrap ${
                selectedType === type
                  ? 'text-black shadow-paper-sm scale-105'
                  : 'opacity-60 hover:opacity-100 hover:bg-white/10'
              }`}
              style={{
                backgroundColor: selectedType === type ? activeEpoch.accentHex : 'transparent',
                borderColor: selectedType === type ? activeEpoch.accentHex : 'currentColor',
              }}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-[11px] opacity-70 pt-1">
          <span>Showing <strong>{filteredPokemon.length}</strong> of 1,025 registered species</span>
          <span>Active Era: <strong>{activeEpoch.nameKey}</strong></span>
        </div>
      </section>

      {/* ===================================================================
       * GALLERY OF SPECIMENS (1,025 POKÉMON STYLED BY EPOCH)
       * =================================================================== */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredPokemon.slice(0, 100).map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              epochId={activeEpoch.id}
              onSelect={setSelectedPokemon}
            />
          ))}
        </div>

        {/* Load More indicator if over 100 */}
        {filteredPokemon.length > 100 && (
          <div className="text-center py-10 opacity-70 text-xs">
            Showing first 100 matches. Use search or type filters to pinpoint specific specimens.
          </div>
        )}
      </main>

      {/* ===================================================================
       * ANATOMICAL CODEX MODAL (4-Layer Slicer)
       * =================================================================== */}
      <AnatomicalModal
        pokemon={selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
        t={t}
        activeEpochId={activeEpoch.id}
      />

      {/* ===================================================================
       * FOOTER
       * =================================================================== */}
      <footer className="mt-20 py-10 border-t border-current/20 text-center text-xs opacity-70 space-y-2">
        <div>
          CHRONO-DEX // THE 300-MILLION-YEAR CONTINENTAL & ANATOMICAL ATLAS
        </div>
        <div>
          Authored by <strong>sm000ky × Zero Two</strong> · 100% Procedural Naturalist Science
        </div>
        <div className="pt-2">
          <button
            onClick={handleScrollToTop}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg border border-current/30 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Back to Top</span>
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
