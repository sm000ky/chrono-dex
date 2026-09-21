export type Language = 'en' | 'id' | 'ja';

export type EpochId = 'primordial' | 'drift' | 'feudal' | 'modern' | 'future';

export interface EpochData {
  epoch_id: EpochId;
  epoch_number: number;
  epoch_name: string;
  time_label: string;
  visual_style: string;
  tectonic_event: string;
  color_palette: string;
}

export interface AnatomyLayers {
  layer_1_dermis: {
    title: string;
    integument_type: string;
    description: string;
  };
  layer_2_osteology: {
    title: string;
    skeleton_type: string;
    bone_density_index: number;
    description: string;
  };
  layer_3_elemental_core: {
    title: string;
    primary_organ: string;
    primary_organ_desc: string;
    secondary_organ: string | null;
    secondary_organ_desc: string | null;
  };
  layer_4_geologic_speciation: {
    title: string;
    epoch_name: string;
    time_era: string;
    tectonic_event: string;
    speciation_notes: string;
  };
}

export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
  bst: number;
}

export interface AbilityEntry {
  name: string;
  effect: string;
}

export interface PokemonChronoEntry {
  id: number;
  national_id: number;
  identifier: string;
  name: string;
  japanese_name: string;
  japanese_kanji: string;
  binomial_name: string;
  genus: string;
  types: string[];
  height_m: number;
  weight_kg: number;
  stats: PokemonStats;
  abilities: AbilityEntry[];
  description: string;
  epoch: EpochData;
  anatomy: AnatomyLayers;
  sprites: {
    artwork: string;
    animated: string;
    icon: string;
  };
}

export interface TectonicPlate {
  id: string;
  name: string;
  regions: string[];
  formation_mya: number;
  geologic_description: string;
  dominant_types: string[];
}
