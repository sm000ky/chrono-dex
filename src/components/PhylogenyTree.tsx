import React, { useState } from 'react';
import { PokemonChronoEntry, EpochId } from '../types';
import { chronoAudio } from '../lib/audioEngine';
import { GitBranch, Sparkles, ChevronRight, Dna } from 'lucide-react';

interface PhylogenyTreeProps {
  pokemonList: PokemonChronoEntry[];
  epochId: EpochId;
  onSelectPokemon: (pokemon: PokemonChronoEntry) => void;
}

interface CladeBranch {
  id: string;
  name: string;
  latinClass: string;
  ancestorEpoch: string;
  evolutionaryAdaptation: string;
  representativeIds: number[];
}

const CLADES: CladeBranch[] = [
  {
    id: 'primordial_root',
    name: 'Universal Root & Primitive Paradox',
    latinClass: 'Cladus Primordialis',
    ancestorEpoch: '300 Mya (Poké-Pangea)',
    evolutionaryAdaptation: 'Progenitor cellular matrix possessing plastic stem DNA capable of speciating into all 18 elemental conduits.',
    representativeIds: [151, 138, 140, 142, 984], // Mew, Omanyte, Kabuto, Aerodactyl, Great Tusk
  },
  {
    id: 'draco_sauria',
    name: 'Draconic & Sauropsid Lineage',
    latinClass: 'Ordo Dracosauria',
    ancestorEpoch: '180 Mya (Mesozoic Rifting)',
    evolutionaryAdaptation: 'Pyrophoric thoracic glands, lightweight hollow osteological frameworks, and dense thermal scales.',
    representativeIds: [6, 130, 149, 445, 1007], // Charizard, Gyarados, Dragonite, Garchomp, Koraidon
  },
  {
    id: 'mammalia_terrestria',
    name: 'Terrestrial Mammalian Adaptations',
    latinClass: 'Classis Mammaliaformes',
    ancestorEpoch: '120 Mya (Tethys Basin)',
    evolutionaryAdaptation: 'Endothermic homeothermy, subcutaneous fur insulation, and cerebral pineal bio-auric sensors.',
    representativeIds: [25, 133, 448, 901], // Pikachu, Eevee, Lucario, Ursaluna
  },
  {
    id: 'pneumatic_avians',
    name: 'Pneumatic Avian Aerofoils',
    latinClass: 'Superordo Ornithurae',
    ancestorEpoch: '90 Mya (Mountain Orogeny)',
    evolutionaryAdaptation: 'Trabecular pneumatic bone architecture, plumage keratin barbs, and atmospheric pressure sensing.',
    representativeIds: [18, 277, 663, 823], // Pidgeot, Swellow, Talonflame, Corviknight
  },
  {
    id: 'arthropoda_chitin',
    name: 'Chitinous & Armored Exoskeletons',
    latinClass: 'Phylum Arthropoda Bio-Metallica',
    ancestorEpoch: '240 Mya (Ancient Seabed)',
    evolutionaryAdaptation: 'High-density mineralized chitin plates, metallic iron incorporation, and hemolymph acid storage.',
    representativeIds: [127, 212, 768, 900], // Pinsir, Scizor, Golisopod, Kleavor
  },
  {
    id: 'temporal_cosmic',
    name: 'Cosmic Anomalies & Temporal Paradox',
    latinClass: 'Classis Singularis Trans-Dimensionis',
    ancestorEpoch: 'Area Zero & Deep Space',
    evolutionaryAdaptation: 'Quantum crystalline lattice structures, anti-gravity levitation fields, and radioactive temporal emission.',
    representativeIds: [386, 890, 1008, 1025], // Deoxys, Eternatus, Miraidon, Pecharunt
  },
];

export const PhylogenyTree: React.FC<PhylogenyTreeProps> = ({
  pokemonList,
  onSelectPokemon,
}) => {
  const [selectedCladeId, setSelectedCladeId] = useState<string>('primordial_root');
  const activeClade = CLADES.find((c) => c.id === selectedCladeId) || CLADES[0];

  const handleSelectClade = (id: string) => {
    chronoAudio.playLayerPeel(1);
    setSelectedCladeId(id);
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-8 px-4 font-mono select-none">
      <div className="p-5 sm:p-8 rounded-2xl border-4 border-current/30 bg-black/15 backdrop-blur-md shadow-2xl space-y-6">
        {/* Header */}
        <div className="border-b-2 border-current/20 pb-4 space-y-1">
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-[#E07A28]">
            <Dna className="w-3.5 h-3.5" />
            <span>MACRO-EVOLUTIONARY PHYLOGENY // 300 MILLION YEARS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
            The Grand Tree of Speciation
          </h2>
          <p className="text-xs opacity-75 font-serif italic">
            Trace how single primordial ancestral lineages diverged into specialized taxonomic clades across planetary geological epochs.
          </p>
        </div>

        {/* Horizontal Clade Navigator */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {CLADES.map((clade) => (
            <button
              key={clade.id}
              onClick={() => handleSelectClade(clade.id)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                selectedCladeId === clade.id
                  ? 'bg-amber-500 text-black border-amber-400 font-bold shadow-md scale-105'
                  : 'bg-black/20 hover:bg-black/40 border-current/20 opacity-80 text-xs'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono">
                <GitBranch className="w-3 h-3" />
                <span className="font-bold">{clade.ancestorEpoch.split(' ')[0]}</span>
              </div>
              <div className="font-serif font-bold text-xs line-clamp-1">{clade.name}</div>
              <div className="text-[9px] italic opacity-80 truncate">{clade.latinClass}</div>
            </button>
          ))}
        </div>

        {/* Selected Clade Showcase Stage */}
        <div className="p-6 rounded-xl border-2 border-current/20 bg-black/10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-current/15 pb-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-500">
                PHYLOGENETIC BRANCH: {activeClade.latinClass}
              </span>
              <h3 className="text-xl font-serif font-bold">{activeClade.name}</h3>
            </div>
            <div className="px-3 py-1 rounded bg-black/30 border border-current/20 text-xs font-bold font-mono">
              ERA OF ORIGIN: {activeClade.ancestorEpoch}
            </div>
          </div>

          <p className="font-serif text-sm italic leading-relaxed">
            "{activeClade.evolutionaryAdaptation}"
          </p>

          {/* Representative Species Cards */}
          <div className="space-y-2 pt-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
              KEY REPRESENTATIVE TAXA IN THIS CLADE (CLICK TO DISSECT):
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {activeClade.representativeIds.map((id) => {
                const p = pokemonList.find((item) => item.id === id);
                if (!p) return null;
                return (
                  <div
                    key={id}
                    onClick={() => onSelectPokemon(p)}
                    className="p-3 rounded-lg border border-current/25 bg-black/20 hover:bg-black/40 transition-all cursor-pointer group flex flex-col items-center text-center space-y-1.5"
                  >
                    <div className="w-16 h-16 aspect-square flex items-center justify-center p-1">
                      <img
                        src={p.sprites.artwork}
                        alt={p.name}
                        className="max-h-full object-contain group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div className="text-[10px] font-mono opacity-70">#{p.national_id}</div>
                    <div className="font-serif font-bold text-xs line-clamp-1 group-hover:text-amber-400">
                      {p.name}
                    </div>
                    <div className="text-[9px] opacity-75 italic truncate w-full">
                      {p.binomial_name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
