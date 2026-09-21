import React, { useState, useMemo, useEffect } from 'react';
import pokemonData from './data/chrono_pokemon.json';
import { PokemonChronoEntry, Language } from './types';
import { DICTIONARY, EPOCHS } from './lib/i18n';
import { chronoAudio } from './lib/audioEngine';
import { TectonicSlider } from './components/TectonicSlider';
import { TectonicMap } from './components/TectonicMap';
import { FeaturedDissectionBench } from './components/FeaturedDissectionBench';
import { ComparativeAnatomyBench } from './components/ComparativeAnatomyBench';
import { PhylogenyTree } from './components/PhylogenyTree';
import { PokemonCard } from './components/PokemonCard';
import { AnatomicalModal } from './components/AnatomicalModal';
import {
  Search,
  Volume2,
  VolumeX,
  Filter,
  ArrowUp,
  X,
  Compass,
  Layers,
  Dna,
  Archive,
  Scale,
  Radar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';

const ALL_TYPES = [
  'All', 'Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice',
  'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug',
  'Rock', 'Ghost', 'Dragon', 'Steel', 'Dark', 'Fairy'
];

type MuseumViewMode = 'dissection' | 'comparative' | 'atlas' | 'phylogeny' | 'specimens';
type PaleoCategory = 'all' | 'fossils' | 'ancient_paradox' | 'future_paradox' | 'titans';

const FOSSIL_IDS = new Set([
  138, 139, 140, 141, 142, 345, 346, 347, 348, 369, 408, 409, 410, 411, 473,
  564, 565, 566, 567, 649, 696, 697, 698, 699, 880, 881, 882, 883
]);

const ANCIENT_PARADOX_IDS = new Set([
  984, 985, 986, 987, 988, 989, 1005, 1007, 1009, 1020, 1021
]);

const FUTURE_PARADOX_IDS = new Set([
  990, 991, 992, 993, 994, 995, 1006, 1008, 1010, 1022, 1023
]);

const TITAN_IDS = new Set([
  149, 248, 373, 376, 382, 383, 384, 445, 483, 484, 487, 635, 706, 784, 887, 998
]);

const PAGE_SIZE = 24;

export function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const t = DICTIONARY[currentLang];

  const [currentEpochIndex, setCurrentEpochIndex] = useState<number>(1); // Default to Mesozoic Drift
  const activeEpoch = EPOCHS[currentEpochIndex];

  // Museum Navigation Tabs (Default to Dissection Bench)
  const [viewMode, setViewMode] = useState<MuseumViewMode>('dissection');

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [filterByEpochOnly, setFilterByEpochOnly] = useState<boolean>(false);
  const [selectedPaleoCategory, setSelectedPaleoCategory] = useState<PaleoCategory>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
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

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedType, filterByEpochOnly, selectedPaleoCategory]);

  // Filter Pokemon based on Search, Type, Paleo Radar Category, and Epoch
  const filteredPokemon = useMemo(() => {
    return pokemonList.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.binomial_name.toLowerCase().includes(q) ||
        p.japanese_name.toLowerCase().includes(q) ||
        String(p.national_id).includes(q) ||
        p.types.some((tp) => tp.toLowerCase().includes(q));

      const matchesType =
        selectedType === 'All' || p.types.includes(selectedType);

      const matchesEpoch =
        !filterByEpochOnly || p.epoch.epoch_id === activeEpoch.id;

      let matchesPaleo = true;
      if (selectedPaleoCategory === 'fossils') {
        matchesPaleo = FOSSIL_IDS.has(p.national_id);
      } else if (selectedPaleoCategory === 'ancient_paradox') {
        matchesPaleo = ANCIENT_PARADOX_IDS.has(p.national_id);
      } else if (selectedPaleoCategory === 'future_paradox') {
        matchesPaleo = FUTURE_PARADOX_IDS.has(p.national_id);
      } else if (selectedPaleoCategory === 'titans') {
        matchesPaleo = TITAN_IDS.has(p.national_id);
      }

      return matchesSearch && matchesType && matchesEpoch && matchesPaleo;
    });
  }, [pokemonList, searchQuery, selectedType, filterByEpochOnly, selectedPaleoCategory, activeEpoch.id]);

  // Paginated records for smooth mobile performance
  const totalPages = Math.max(1, Math.ceil(filteredPokemon.length / PAGE_SIZE));
  const paginatedPokemon = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredPokemon.slice(start, start + PAGE_SIZE);
  }, [filteredPokemon, currentPage]);

  const handleToggleMute = () => {
    const muted = chronoAudio.toggleMute();
    setIsMuted(muted);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (newPage: number) => {
    chronoAudio.playLayerPeel(0);
    setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
    const gridEl = document.getElementById('specimen-grid-anchor');
    if (gridEl) {
      gridEl.scrollIntoView({ behavior: 'smooth' });
    }
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
            className="w-3 h-3 rounded-full inline-block shadow-[0_0_12px_currentColor]"
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

        {/* Global Controls: Audio & Trilingual Selector */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Web Audio Ambient Toggle */}
          <button
            onClick={handleToggleMute}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-current/30 hover:bg-black/10 transition-colors cursor-pointer text-[11px] font-bold"
            title={isMuted ? 'Turn on Epoch Acoustics' : 'Mute Acoustics'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-red-400" />
                <span className="hidden sm:inline opacity-80">{t.soundOff}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400 drop-shadow-[0_0_8px_currentColor]" />
                <span className="hidden sm:inline opacity-90">{t.soundOn}</span>
              </>
            )}
          </button>

          {/* Language Switcher */}
          <div className="flex items-center border border-current/30 rounded-lg overflow-hidden text-[11px] font-bold">
            {(['en', 'id', 'ja'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  chronoAudio.playLayerPeel(0);
                  setCurrentLang(lang);
                }}
                className={`px-2.5 py-1.5 uppercase transition-colors cursor-pointer ${
                  currentLang === lang
                    ? 'bg-current text-black font-extrabold'
                    : 'hover:bg-black/10'
                }`}
                style={{
                  backgroundColor: currentLang === lang ? activeEpoch.accentHex : 'transparent',
                  color: currentLang === lang ? '#000000' : 'inherit',
                }}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ===================================================================
       * CONTINENTAL DRIFT EPOCH SLIDER HERO (HUD GAUGE)
       * =================================================================== */}
      <TectonicSlider
        currentEpochIndex={currentEpochIndex}
        onSelectEpochIndex={handleSelectEpoch}
        t={t}
      />

      {/* ===================================================================
       * MASTER MUSEUM WORKBENCH NAVIGATION DOCK (5 MODES)
       * =================================================================== */}
      <nav className="max-w-5xl mx-auto px-4 my-6">
        <div className="p-1.5 rounded-2xl border-2 border-current/25 bg-black/15 backdrop-blur-md grid grid-cols-2 sm:grid-cols-5 gap-1.5 text-xs font-bold">
          <button
            onClick={() => handleSelectTab('dissection')}
            className={`py-3 px-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              viewMode === 'dissection'
                ? 'bg-amber-500 text-black border-2 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)] font-extrabold scale-[1.02]'
                : 'hover:bg-black/20 opacity-80'
            }`}
          >
            <Layers className="w-4 h-4 flex-shrink-0" />
            <span className="whitespace-nowrap">Dissection Lab</span>
          </button>

          <button
            onClick={() => handleSelectTab('comparative')}
            className={`py-3 px-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              viewMode === 'comparative'
                ? 'bg-amber-500 text-black border-2 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)] font-extrabold scale-[1.02]'
                : 'hover:bg-black/20 opacity-80'
            }`}
          >
            <Scale className="w-4 h-4 flex-shrink-0" />
            <span className="whitespace-nowrap">Comparative Bench</span>
          </button>

          <button
            onClick={() => handleSelectTab('atlas')}
            className={`py-3 px-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              viewMode === 'atlas'
                ? 'bg-amber-500 text-black border-2 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)] font-extrabold scale-[1.02]'
                : 'hover:bg-black/20 opacity-80'
            }`}
          >
            <Compass className="w-4 h-4 flex-shrink-0" />
            <span className="whitespace-nowrap">Continental Drift</span>
          </button>

          <button
            onClick={() => handleSelectTab('phylogeny')}
            className={`py-3 px-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              viewMode === 'phylogeny'
                ? 'bg-amber-500 text-black border-2 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)] font-extrabold scale-[1.02]'
                : 'hover:bg-black/20 opacity-80'
            }`}
          >
            <Dna className="w-4 h-4 flex-shrink-0" />
            <span className="whitespace-nowrap">Tree of Life</span>
          </button>

          <button
            onClick={() => handleSelectTab('specimens')}
            className={`py-3 px-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer col-span-2 sm:col-span-1 ${
              viewMode === 'specimens'
                ? 'bg-amber-500 text-black border-2 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)] font-extrabold scale-[1.02]'
                : 'hover:bg-black/20 opacity-80'
            }`}
          >
            <Archive className="w-4 h-4 flex-shrink-0" />
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
       * TAB 2: COMPARATIVE ANATOMY DUEL BENCH (NEW)
       * =================================================================== */}
      {viewMode === 'comparative' && (
        <ComparativeAnatomyBench
          pokemonList={pokemonList}
          epochId={activeEpoch.id}
          onOpenModal={setSelectedPokemon}
        />
      )}

      {/* ===================================================================
       * TAB 3: CONTINENTAL DRIFT TECTONIC ATLAS
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
       * TAB 4: 300-MILLION-YEAR TREE OF LIFE (PHYLOGENY)
       * =================================================================== */}
      {viewMode === 'phylogeny' && (
        <PhylogenyTree
          pokemonList={pokemonList}
          epochId={activeEpoch.id}
          onSelectPokemon={setSelectedPokemon}
        />
      )}

      {/* ===================================================================
       * TAB 5: 1,025 SPECIMEN VAULT (ERA-STYLED CABINETRY WITH PALEO RADAR)
       * =================================================================== */}
      {viewMode === 'specimens' && (
        <div className="space-y-6">
          {/* Search & Filter Bar */}
          <section id="specimen-grid-anchor" className="max-w-5xl mx-auto px-4 space-y-3">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div
                className="relative w-full flex-1 flex items-center p-3 rounded-xl border-2 bg-black/10 text-xs shadow-[inset_0_1px_4px_rgba(0,0,0,0.3)]"
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

              {/* Epoch Lock Button */}
              <button
                onClick={() => {
                  chronoAudio.playLayerPeel(0);
                  setFilterByEpochOnly(!filterByEpochOnly);
                }}
                className={`w-full sm:w-auto px-4 py-3 rounded-xl border-2 text-xs font-bold uppercase transition-all cursor-pointer truncate max-w-full ${
                  filterByEpochOnly
                    ? 'text-black shadow-[0_0_15px_currentColor]'
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

            {/* Paleo-Radar Categories Filter */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs pt-1">
              <div className="flex items-center gap-1 opacity-75 mr-1 text-[11px] font-bold">
                <Radar className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.paleoRadar}:</span>
              </div>
              {[
                { id: 'all', label: t.allCategories },
                { id: 'fossils', label: t.fossils },
                { id: 'ancient_paradox', label: t.paradoxAncient },
                { id: 'future_paradox', label: t.paradoxFuture },
                { id: 'titans', label: t.titans },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    chronoAudio.playLayerPeel(0);
                    setSelectedPaleoCategory(cat.id as PaleoCategory);
                  }}
                  className={`px-3 py-1 rounded-lg border text-[10px] uppercase font-bold tracking-wider transition-all ${
                    selectedPaleoCategory === cat.id
                      ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.6)] scale-105'
                      : 'border-current/25 hover:bg-black/10 opacity-75 hover:opacity-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Elemental Type Filter Buttons */}
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
                      ? 'text-black shadow-[0_0_10px_currentColor] scale-105'
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

            <div className="flex flex-wrap items-center justify-between text-[11px] opacity-80 pt-1 font-semibold gap-2">
              <span>
                Showing <strong>{paginatedPokemon.length}</strong> of <strong>{filteredPokemon.length}</strong> matches (Total 1,025 catalogued)
              </span>
              <span>Visual Specimen Codex: <strong>{activeEpoch.nameKey}</strong></span>
            </div>
          </section>

          {/* Cards Grid */}
          <main className="max-w-6xl mx-auto px-4 py-4">
            {paginatedPokemon.length === 0 ? (
              <div className="text-center py-16 border-2 border-dashed border-current/25 rounded-2xl p-8 opacity-75">
                <p className="text-sm font-bold uppercase tracking-wider">No Geological Specimens Found</p>
                <p className="text-xs mt-1">Try relaxing the search query, elemental type, or paleo-radar filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                {paginatedPokemon.map((pokemon) => (
                  <PokemonCard
                    key={pokemon.id}
                    pokemon={pokemon}
                    epochId={activeEpoch.id}
                    onSelect={setSelectedPokemon}
                  />
                ))}
              </div>
            )}

            {/* Pagination Navigation Bar */}
            {totalPages > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-2 mt-8 pt-6 border-t border-current/20 text-xs font-mono">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-current/30 disabled:opacity-30 hover:bg-black/10 transition-colors"
                  title="First Page"
                >
                  <ChevronsLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg border border-current/30 disabled:opacity-30 hover:bg-black/10 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">{t.pagePrev}</span>
                </button>

                <span className="px-4 py-2 rounded-lg bg-black/15 border border-current/20 font-bold">
                  {t.pageOf} {currentPage} / {totalPages}
                </span>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg border border-current/30 disabled:opacity-30 hover:bg-black/10 transition-colors"
                >
                  <span className="hidden sm:inline">{t.pageNext}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-current/30 disabled:opacity-30 hover:bg-black/10 transition-colors"
                  title="Last Page"
                >
                  <ChevronsRight className="w-4 h-4" />
                </button>
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
