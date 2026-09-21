import React, { useState, useMemo } from 'react';
import pokemonData from './data/chrono_pokemon.json';
import { PokemonChronoEntry, Language, EpochId } from './types';
import { DICTIONARY, EPOCHS } from './lib/i18n';
import { chronoAudio } from './lib/audioEngine';
import { TectonicSlider } from './components/TectonicSlider';
import { TectonicMap } from './components/TectonicMap';
import { FeaturedDissectionBench } from './components/FeaturedDissectionBench';
import { PhylogenyTree } from './components/PhylogenyTree';
import { PokemonCard } from './components/PokemonCard';
import { AnatomicalModal } from './components/AnatomicalModal';
import {
  Search,
  Volume2,
  VolumeX,
  Globe,
  Filter,
  Sparkles,
  ArrowUp,
  X,
  Compass,
  Layers,
  Dna,
  Archive
} from 'lucide-react';

const ALL_TYPES = [
  'All', 'Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice',
  'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug',
  'Rock', 'Ghost', 'Dragon', 'Steel', 'Dark', 'Fairy'
];

type MuseumViewMode = 'atlas' | 'dissection' | 'phylogeny' | 'specimens';

export function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const t = DICTIONARY[currentLang];

  const [currentEpochIndex, setCurrentEpochIndex] = useState<number>(1); // Default to Mesozoic Drift
  const activeEpoch = EPOCHS[currentEpochIndex];

  // Museum Navigation Tabs
  const [viewMode, setViewMode] = useState<MuseumViewMode>('dissection');

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [filterByEpochOnly, setFilterByEpochOnly] = useState<boolean>(false);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonChronoEntry | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const pokemonList = pokemonData as unknown as PokemonChronoEntry[];

  // Change active epoch and switch ambient soundscape simultaneously
  const handleSelectEpoch = (newIdx: number) => {
    setCurrentEpochIndex(newIdx);
    chronoAudio.switchEpochAmbient(EPOCHS[newIdx].number);
  };

  const handleSelectTab = (mode: MuseumViewMode) => {
    chronoAudio.playLayerPeel(1);
    setViewMode(mode);
  };

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

  const getEpochClass = () => {
    switch (activeEpoch.id) {
      case 'primordial': return 'epoch-primordial';
      case 'drift': return 'epoch-drift';
      case 'feudal': return 'epoch-feudal';
      case 'modern': return 'epoch-modern';
      case 'future': default: return 'epoch-future';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 select-none font-mono ${getEpochClass()}`}>
      {/* ===================================================================
       * TOP STICKY COMMAND HEADER
       * =================================================================== */}
      <header className="sticky top-0 z-40 px-3 sm:px-8 py-2.5 sm:py-3 border-b border-current/25 backdrop-blur-md bg-black/15 flex items-center justify-between gap-2 text-xs">
        {/* Brand & Epoch Badge */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <span
            className="w-3 h-3 rounded-full inline-block shadow-[0_0_10px_currentColor]"
            style={{ backgroundColor: activeEpoch.accentHex }}
          />
          <span className="font-bold tracking-widest uppercase text-sm sm:text-base">
            {t.appTitle}
          </span>
          <span className="hidden lg:inline opacity-30">|</span>
          <span className="hidden lg:inline font-serif italic text-xs font-semibold">
            {t.appSubtitle}
          </span>
        </div>

        {/* Right Tools: Language & Ambient Sound */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Language Selector */}
          <div className="inline-flex rounded border border-current/30 overflow-hidden text-[10px] shadow-paper-sm">
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
                    : 'hover:bg-white/10 opacity-75'
                }`}
                style={{
                  backgroundColor: currentLang === l ? activeEpoch.accentHex : 'transparent',
                }}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Continuous Ambient Sound Engine Toggle */}
          <button
            onClick={handleToggleMute}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 text-[10px] sm:text-xs font-bold tracking-wider transition-all shadow-paper-sm cursor-pointer"
            style={{ borderColor: activeEpoch.accentHex }}
            title="Toggle Continuous Procedural Ambient Audio"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                <span>{t.soundOff}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.soundOn}</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* ===================================================================
       * HERO BANNER
       * =================================================================== */}
      <section className="pt-8 sm:pt-12 pb-3 px-4 text-center max-w-4xl mx-auto space-y-2">
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[10px] sm:text-xs tracking-widest uppercase font-bold bg-black/10"
          style={{ borderColor: activeEpoch.accentHex, color: activeEpoch.accentHex }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>NATURAL HISTORY & PALEONTOLOGICAL CODEX</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight">
          {t.appTitle}
        </h1>

        <p className="font-serif text-base sm:text-lg opacity-90 max-w-2xl mx-auto italic leading-relaxed">
          "{t.tagline}"
        </p>
      </section>

      {/* ===================================================================
       * TECTONIC EPOCH TIME-SLIDER (300 Mya to Future)
       * =================================================================== */}
      <TectonicSlider
        currentEpochIndex={currentEpochIndex}
        onSelectEpochIndex={handleSelectEpoch}
        t={t}
      />

      {/* ===================================================================
       * MASTER MUSEUM WORKBENCH NAVIGATION DOCK
       * =================================================================== */}
      <nav className="max-w-4xl mx-auto px-4 my-6">
        <div className="p-1.5 rounded-2xl border-2 border-current/25 bg-black/15 backdrop-blur-md grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs font-bold">
          <button
            onClick={() => handleSelectTab('dissection')}
            className={`py-3 px-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
              viewMode === 'dissection'
                ? 'bg-amber-500 text-black border-2 border-amber-400 shadow-md scale-[1.02]'
                : 'hover:bg-black/20 opacity-80'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span className="whitespace-nowrap">Dissection Lab</span>
          </button>

          <button
            onClick={() => handleSelectTab('atlas')}
            className={`py-3 px-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
              viewMode === 'atlas'
                ? 'bg-amber-500 text-black border-2 border-amber-400 shadow-md scale-[1.02]'
                : 'hover:bg-black/20 opacity-80'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span className="whitespace-nowrap">Continental Drift</span>
          </button>

          <button
            onClick={() => handleSelectTab('phylogeny')}
            className={`py-3 px-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
              viewMode === 'phylogeny'
                ? 'bg-amber-500 text-black border-2 border-amber-400 shadow-md scale-[1.02]'
                : 'hover:bg-black/20 opacity-80'
            }`}
          >
            <Dna className="w-4 h-4" />
            <span className="whitespace-nowrap">Tree of Life</span>
          </button>

          <button
            onClick={() => handleSelectTab('specimens')}
            className={`py-3 px-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
              viewMode === 'specimens'
                ? 'bg-amber-500 text-black border-2 border-amber-400 shadow-md scale-[1.02]'
                : 'hover:bg-black/20 opacity-80'
            }`}
          >
            <Archive className="w-4 h-4" />
            <span className="whitespace-nowrap">1,025 Archives</span>
          </button>
        </div>
      </nav>

      {/* ===================================================================
       * TAB 1: INTERACTIVE BIO-DISSECTION BENCH
       * =================================================================== */}
      {viewMode === 'dissection' && (
        <FeaturedDissectionBench
          pokemonList={pokemonList}
          epochId={activeEpoch.id}
          onOpenFullModal={setSelectedPokemon}
        />
      )}

      {/* ===================================================================
       * TAB 2: CONTINENTAL DRIFT TECTONIC ATLAS
       * =================================================================== */}
      {viewMode === 'atlas' && (
        <TectonicMap
          currentEpochIndex={currentEpochIndex}
          t={t}
          onFilterType={(type) => {
            setSelectedType(type);
            setViewMode('specimens');
          }}
        />
      )}

      {/* ===================================================================
       * TAB 3: 300-MILLION-YEAR TREE OF LIFE (PHYLOGENY)
       * =================================================================== */}
      {viewMode === 'phylogeny' && (
        <PhylogenyTree
          pokemonList={pokemonList}
          epochId={activeEpoch.id}
          onSelectPokemon={setSelectedPokemon}
        />
      )}

      {/* ===================================================================
       * TAB 4: 1,025 SPECIMEN VAULT (ERA-STYLED CABINETRY)
       * =================================================================== */}
      {viewMode === 'specimens' && (
        <div className="space-y-6">
          {/* Search & Filter Bar */}
          <section className="max-w-5xl mx-auto px-4 space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div
                className="relative w-full flex-1 flex items-center p-3 rounded-xl border-2 bg-black/10 text-xs shadow-paper-sm"
                style={{ borderColor: activeEpoch.accentHex }}
              >
                <Search className="w-4 h-4 opacity-70 mr-2 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full bg-transparent border-none outline-none font-mono text-xs placeholder:opacity-60"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="p-1 opacity-70 hover:opacity-100 cursor-pointer">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <button
                onClick={() => {
                  chronoAudio.playLayerPeel(0);
                  setFilterByEpochOnly(!filterByEpochOnly);
                }}
                className={`px-4 py-3 rounded-xl border-2 text-xs font-bold uppercase transition-all shadow-paper-sm cursor-pointer whitespace-nowrap ${
                  filterByEpochOnly
                    ? 'text-black shadow-[0_0_12px_currentColor]'
                    : 'hover:bg-black/10'
                }`}
                style={{
                  backgroundColor: filterByEpochOnly ? activeEpoch.accentHex : 'transparent',
                  borderColor: activeEpoch.accentHex,
                  color: filterByEpochOnly ? '#000000' : 'inherit',
                }}
              >
                {filterByEpochOnly ? `✓ LOCKED: ${activeEpoch.timeEra}` : `FILTER: ${activeEpoch.timeEra}`}
              </button>
            </div>

            {/* Type Filter Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 text-[10px]">
              <Filter className="w-3.5 h-3.5 opacity-70 mr-1 flex-shrink-0" />
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
                      : 'hover:bg-black/10'
                  }`}
                  style={{
                    backgroundColor: selectedType === type ? activeEpoch.accentHex : 'transparent',
                    borderColor: selectedType === type ? activeEpoch.accentHex : 'currentColor',
                    color: selectedType === type ? '#000000' : 'inherit',
                  }}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between text-[11px] opacity-80 pt-1 font-semibold">
              <span>Showing <strong>{filteredPokemon.length}</strong> of 1,025 registered species</span>
              <span>Visual Style: <strong>{activeEpoch.nameKey}</strong></span>
            </div>
          </section>

          {/* Cards Grid */}
          <main className="max-w-6xl mx-auto px-4 py-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
              {filteredPokemon.slice(0, 100).map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  epochId={activeEpoch.id}
                  onSelect={setSelectedPokemon}
                />
              ))}
            </div>

            {filteredPokemon.length > 100 && (
              <div className="text-center py-10 opacity-80 text-xs font-semibold">
                Showing first 100 matches of {filteredPokemon.length}. Use the search bar or type filters to inspect any of the 1,025 Pokémon.
              </div>
            )}
          </main>
        </div>
      )}

      {/* ===================================================================
       * ANATOMICAL CODEX MODAL (4-Layer Slicer with Organ Hotspots)
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
      <footer className="mt-20 py-10 border-t border-current/20 text-center text-xs opacity-80 space-y-2">
        <div className="font-bold tracking-widest uppercase">
          CHRONO-DEX // THE 300-MILLION-YEAR CONTINENTAL & ANATOMICAL ATLAS
        </div>
        <div>
          Conceived & Built by <strong>sm000ky × Zero Two</strong> · 100% Procedural Naturalist Science
        </div>
        <div className="pt-2">
          <button
            onClick={handleScrollToTop}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg border border-current hover:bg-black/10 transition-colors cursor-pointer"
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
