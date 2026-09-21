import { Language, EpochId } from '../types';

export interface Translations {
  appTitle: string;
  appSubtitle: string;
  tagline: string;
  epochLabel: string;
  geologicTime: string;
  tectonicEvent: string;
  artStyle: string;
  searchPlaceholder: string;
  filterAll: string;
  allTypes: string;
  soundOn: string;
  soundOff: string;
  layer1Name: string;
  layer2Name: string;
  layer3Name: string;
  layer4Name: string;
  layerSlicer: string;
  binomialTaxonomy: string;
  boneDensity: string;
  elementalReactor: string;
  tectonicOrigin: string;
  height: string;
  weight: string;
  baseStats: string;
  abilities: string;
  close: string;
  inspectSpecimen: string;
  plateTectonicsMap: string;
  showTectonicMap: string;
  hideTectonicMap: string;
  comparativeBench: string;
  comparativeSubtitle: string;
  specimensArchive: string;
  paleoRadar: string;
  allCategories: string;
  fossils: string;
  paradoxAncient: string;
  paradoxFuture: string;
  titans: string;
  pagePrev: string;
  pageNext: string;
  pageOf: string;
}

export const DICTIONARY: Record<Language, Translations> = {
  en: {
    appTitle: 'CHRONO-DEX',
    appSubtitle: 'THE 300-MILLION-YEAR CONTINENTAL & ANATOMICAL ATLAS',
    tagline: 'Witness the speciation of 1,025 Pokémon across 5 geological epochs and 4 anatomical layers.',
    epochLabel: 'GEOLOGICAL EPOCH',
    geologicTime: 'GEOLOGIC TIME',
    tectonicEvent: 'TECTONIC PHENOMENON',
    artStyle: 'ARCHIVAL ART STYLE',
    searchPlaceholder: 'Search 1,025 Pokémon by name, binomial, or type...',
    filterAll: 'All Eras',
    allTypes: 'All Types',
    soundOn: 'ACOUSTICS: ON',
    soundOff: 'ACOUSTICS: OFF',
    layer1Name: 'I. Dermis & Integument',
    layer2Name: 'II. Osteology & Skeleton',
    layer3Name: 'III. Elemental Core',
    layer4Name: 'IV. Tectonic Speciation',
    layerSlicer: 'TACTILE ANATOMICAL SLICER',
    binomialTaxonomy: 'BINOMIAL TAXONOMY',
    boneDensity: 'BONE DENSITY INDEX',
    elementalReactor: 'BIOCHEMICAL ELEMENTAL CORE',
    tectonicOrigin: 'TECTONIC ORIGIN & SPECIATION',
    height: 'HEIGHT',
    weight: 'WEIGHT',
    baseStats: 'BASE ATTRIBUTES',
    abilities: 'ADAPTIVE TRAITS',
    close: 'Close Dossier',
    inspectSpecimen: 'Inspect Anatomy & Epoch',
    plateTectonicsMap: 'CONTINENTAL DRIFT TIMELINE (300 MYA — PRESENT)',
    showTectonicMap: 'VIEW TECTONIC ATLAS',
    hideTectonicMap: 'RETURN TO CODEX',
    comparativeBench: 'COMPARATIVE ANATOMY',
    comparativeSubtitle: 'Side-by-side morphological divergence and elemental delta between species',
    specimensArchive: 'SPECIMEN CATALOG',
    paleoRadar: 'PALEO-RADAR',
    allCategories: 'All Specimens',
    fossils: 'Primordial Fossils',
    paradoxAncient: 'Ancient Paradox',
    paradoxFuture: 'Future Paradox',
    titans: 'Apex Titans',
    pagePrev: 'Prev',
    pageNext: 'Next',
    pageOf: 'Page',
  },

  id: {
    appTitle: 'CHRONO-DEX',
    appSubtitle: 'ATLAS ANATOMI & PERGESERAN BENUA 300 JUTA TAHUN',
    tagline: 'Saksikan evolusi dan bedah anatomi 1.025 Pokémon melintasi 5 zaman geologis dan 4 lapisan biologis.',
    epochLabel: 'ZAMAN GEOLOGIS',
    geologicTime: 'WAKTU GEOLOGIS',
    tectonicEvent: 'FENOMENA TEKTONIK',
    artStyle: 'GAYA SENI ARSIP',
    searchPlaceholder: 'Cari 1.025 Pokémon berdasarkan nama, taksonomi, atau tipe...',
    filterAll: 'Semua Zaman',
    allTypes: 'Semua Tipe',
    soundOn: 'AKUSTIK: AKTIF',
    soundOff: 'AKUSTIK: MATI',
    layer1Name: 'I. Dermis & Kulit Luar',
    layer2Name: 'II. Osteologi & Rangka Tulang',
    layer3Name: 'III. Inti Biokimia Elemen',
    layer4Name: 'IV. Spesiasi Tektonik Benua',
    layerSlicer: 'PISAU BEDAH ANATOMI TAKTIL',
    binomialTaxonomy: 'TAKSONOMI BINOMIAL RESMI',
    boneDensity: 'INDEKS DENSITAS TULANG',
    elementalReactor: 'REAKTOR BIOKIMIA ELEMEN',
    tectonicOrigin: 'ASAL USUL LEMPENG & SPESIASI',
    height: 'TINGGI',
    weight: 'BOBOT',
    baseStats: 'STATISTIK DASAR',
    abilities: 'KEMAMPUAN ADAPTASI',
    close: 'Tutup Berkas',
    inspectSpecimen: 'Bedah Anatomi & Zaman',
    plateTectonicsMap: 'GARIS WAKTU PERGESERAN LEMPENG (300 JUTA TAHUN LALU — KINI)',
    showTectonicMap: 'BUKA ATLAS TEKTONIK',
    hideTectonicMap: 'KEMBALI KE KODEKS',
    comparativeBench: 'ANATOMI KOMPARATIF',
    comparativeSubtitle: 'Komparasi divergensi morfologi dan delta inti elemen antar dua spesies',
    specimensArchive: 'KATALOG SPESIMEN',
    paleoRadar: 'RADAR PALEO',
    allCategories: 'Semua Spesimen',
    fossils: 'Fosil Purba',
    paradoxAncient: 'Paradoks Purba',
    paradoxFuture: 'Paradoks Masa Depan',
    titans: 'Titan Purba',
    pagePrev: 'Sebelumnya',
    pageNext: 'Berikutnya',
    pageOf: 'Halaman',
  },

  ja: {
    appTitle: 'クロノ・デックス (CHRONO-DEX)',
    appSubtitle: '3億年の大陸移動とポケモン解剖学大図鑑',
    tagline: '5つの地質時代と4層の生体解剖を通じて、1,025匹のポケモンの進化と分化を解き明かす。',
    epochLabel: '地質時代',
    geologicTime: '地質年代',
    tectonicEvent: 'プレートテクトニクス地殻現象',
    artStyle: '古文書芸術様式',
    searchPlaceholder: '1,025匹のポケモンを名前、学名、タイプで検索...',
    filterAll: '全時代',
    allTypes: '全タイプ',
    soundOn: '音響: ON',
    soundOff: '音響: OFF',
    layer1Name: '第I層：外皮・鱗・皮膚',
    layer2Name: '第II層：骨格・骨密度',
    layer3Name: '第III層：生化学的属性器官',
    layer4Name: '第IV層：地殻移動・種分化の記録',
    layerSlicer: '解剖レイヤースライサー',
    binomialTaxonomy: '二名法・学名',
    boneDensity: '骨密度指数',
    elementalReactor: '生体属性エネルギー器官',
    tectonicOrigin: '大陸プレート起源・種分化',
    height: '体長',
    weight: '体重',
    baseStats: '基本種族値',
    abilities: '生物的特性',
    close: '調書を閉じる',
    inspectSpecimen: '解剖と時代を観察',
    plateTectonicsMap: '大陸移動タイムライン（3億年前〜現代）',
    showTectonicMap: '大陸テクトニクス地図を開く',
    hideTectonicMap: '図鑑に戻る',
    comparativeBench: '比較解剖学',
    comparativeSubtitle: '2種のポケモンの形態学的分岐と属性炉エネルギーの比較観察',
    specimensArchive: '標本カタログ',
    paleoRadar: '古生物レーダー',
    allCategories: '全標本',
    fossils: '古代の化石',
    paradoxAncient: '古代パラドックス',
    paradoxFuture: '未来パラドックス',
    titans: '頂点タイタン',
    pagePrev: '前へ',
    pageNext: '次へ',
    pageOf: 'ページ',
  },
};

export const EPOCHS: {
  id: EpochId;
  number: number;
  nameKey: string;
  timeEra: string;
  styleName: string;
  badgeColor: string;
  accentHex: string;
  bgHex: string;
}[] = [
  {
    id: 'primordial',
    number: 1,
    nameKey: 'Primordial Poké-Pangea (300 Mya)',
    timeEra: '300 Million Years Ago',
    styleName: 'Archaic Cave Petroglyph',
    badgeColor: 'bg-amber-950 text-amber-200 border-amber-600',
    accentHex: '#D97706',
    bgHex: '#261811'
  },
  {
    id: 'drift',
    number: 2,
    nameKey: 'Mesozoic Continental Fracture (100 Mya)',
    timeEra: '100 Million Years Ago',
    styleName: 'Ernst Haeckel Sepia Codex',
    badgeColor: 'bg-[#FAF6EE] text-[#8A6D4B] border-[#C5A059]',
    accentHex: '#B8781B',
    bgHex: '#F4ECE1'
  },
  {
    id: 'feudal',
    number: 3,
    nameKey: 'Feudal Antiquity / Era of Hisui (3,000 BCE)',
    timeEra: '3,000 Years Ago',
    styleName: 'Ukiyo-e Woodblock & Sumi-e Washi',
    badgeColor: 'bg-[#1C241E] text-[#D4AF37] border-[#8C3A2E]',
    accentHex: '#D4AF37',
    bgHex: '#1C241E'
  },
  {
    id: 'modern',
    number: 4,
    nameKey: 'Victorian & Modern Oceanic Era (Present)',
    timeEra: 'Contemporary Era',
    styleName: 'Victorian Copperplate & Naturalist Guide',
    badgeColor: 'bg-[#FAF6EE] text-[#2F6D68] border-[#DEC6AE]',
    accentHex: '#D95A47',
    bgHex: '#FAF6EE'
  },
  {
    id: 'future',
    number: 5,
    nameKey: 'Paradox Temporal Horizon (Future)',
    timeEra: 'Unknown Future Era',
    styleName: 'Holographic Cyber Blueprint',
    badgeColor: 'bg-[#0B1120] text-cyan-300 border-cyan-500',
    accentHex: '#38BDF8',
    bgHex: '#0B1120'
  },
];
