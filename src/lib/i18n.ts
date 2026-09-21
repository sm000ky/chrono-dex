import { Language, EpochId } from '../types';

export interface Translations {
  // Brand & Global
  appTitle: string;
  appSubtitle: string;
  tagline: string;
  soundOn: string;
  soundOff: string;
  footerTagline: string;
  backToTopBtn: string;

  // Navigation Dock
  tabDissection: string;
  tabComparative: string;
  tabAtlas: string;
  tabPhylogeny: string;
  tabArchives: string;

  // Epoch HUD & Sliders
  epochLabel: string;
  geologicTime: string;
  tectonicEvent: string;
  artStyle: string;
  geologicalDial: string;

  // Search, Paleo Radar & Filters
  searchPlaceholder: string;
  filterAll: string;
  allTypes: string;
  paleoRadar: string;
  allCategories: string;
  fossils: string;
  paradoxAncient: string;
  paradoxFuture: string;
  titans: string;
  lockedEpochPrefix: string;
  filterEpochPrefix: string;
  showingCountPrefix: string;
  showingCountOf: string;
  showingCountMatches: string;
  showingCountTotal: string;
  visualCodexLabel: string;
  noSpecimensFound: string;
  relaxFilterPrompt: string;
  pagePrev: string;
  pageNext: string;
  pageOf: string;

  // Dissection Station (Workbench)
  workbenchSubtitle: string;
  workbenchHeading: string;
  workbenchDesc: string;
  chamberLabel: string;
  viewSuffix: string;
  scalpelPeelSkin: string;
  diagnosticDermis: string;
  diagnosticXray: string;
  diagnosticThermal: string;
  diagnosticAmber: string;
  btnStimulateDischarging: string;
  btnStimulateNormal: string;
  btnBrushExit: string;
  btnBrushStart: string;
  brushExcavationPrompt: string;
  brushSedimentRemoved: string;
  fossilExcavatedSuccessTitle: string;
  fossilExcavatedSuccessDesc: string;
  btnReburyFossil: string;
  bioTelemetryTitle: string;
  bioTelemetryActive: string;
  voltageLabel: string;
  resonanceLabel: string;
  tempLabel: string;
  examineFullCodex: string;
  nationalArchiveLabel: string;
  taxonomyLabel: string;
  bioReactorBadge: string;
  strata1: string;
  strata2: string;
  strata3: string;
  strata4: string;
  pin1Desc: string;
  pin2Desc: string;
  pin3Desc: string;

  // Comparative Anatomy Bench
  benchSubtitle: string;
  benchHeading: string;
  benchDesc: string;
  preservedDuosLabel: string;
  specimenAlphaLabel: string;
  specimenBetaLabel: string;
  switchSpecimenAlpha: string;
  switchSpecimenBeta: string;
  compLayer1: string;
  compLayer2: string;
  compLayer3: string;
  compLayer4: string;
  xrayRadiogramBadge: string;
  statureLabel: string;
  massLabel: string;
  dermalIntegumentLabel: string;
  boneDensityIndexLabel: string;
  skeletonTypeLabel: string;
  primaryOrganLabel: string;
  descLabel: string;
  tectonicEraLabel: string;
  openDossierBtn: string;
  swapDuosTitle: string;
  morphologicalDeltaTitle: string;
  deltaSummarySubtitle: string;
  boneDensityDelta: string;
  statureVariance: string;
  massDisparity: string;
  isDenser: string;
  isTaller: string;
  isHeavier: string;
  equalDensity: string;
  equalStature: string;
  equalMass: string;

  // Tectonic Atlas & Map
  plateTectonicsMap: string;
  simulatingTremor: string;
  triggerDriftBtn: string;
  eraLabel: string;
  cratonTelemetryLabel: string;
  endemicConduitsLabel: string;
  viewFaunaInArchiveBtn: string;
  closeBtn: string;

  // Phylogeny Tree
  phyloSubtitle: string;
  phyloHeading: string;
  phyloDesc: string;
  phyloBranchLabel: string;
  phyloEraLabel: string;
  keyTaxaLabel: string;

  // 4-Layer Modal & Cards
  layer1Name: string;
  layer2Name: string;
  layer3Name: string;
  layer4Name: string;
  layer1Short: string;
  layer2Short: string;
  layer3Short: string;
  layer4Short: string;
  elementalReactor: string;
  viewingLayerLabel: string;
  layerXof4: string;
  timeEpochLabel: string;
  tectonicRegionLabel: string;
  boneDensityLabel: string;
  frameworkLabel: string;
  primaryLabel: string;
  secondaryLabel: string;
  tectonicTriggerLabel: string;
  naturalistFieldLog: string;
  height: string;
  weight: string;
  baseStats: string;
  abilities: string;
  close: string;
  prevSpecimenTooltip: string;
  nextSpecimenTooltip: string;
  noPrevSpecimen: string;
  noNextSpecimen: string;
  typesLabel: string;
}

export const DICTIONARY: Record<Language, Translations> = {
  en: {
    appTitle: 'CHRONO-DEX',
    appSubtitle: 'THE 300-MILLION-YEAR CONTINENTAL & ANATOMICAL ATLAS',
    tagline: 'Witness the speciation of 1,025 Pokémon across 5 geological epochs and 4 anatomical layers.',
    soundOn: 'ACOUSTICS: ON',
    soundOff: 'ACOUSTICS: OFF',
    footerTagline: 'Conceived & Built by sm000ky × Zero Two · 100% Procedural Naturalist Science',
    backToTopBtn: 'Back to Top',

    tabDissection: 'Dissection Lab',
    tabComparative: 'Comparative Bench',
    tabAtlas: 'Continental Drift',
    tabPhylogeny: 'Tree of Life',
    tabArchives: '1,025 Archives',

    epochLabel: 'GEOLOGICAL EPOCH',
    geologicTime: 'GEOLOGIC TIME',
    tectonicEvent: 'TECTONIC PHENOMENON',
    artStyle: 'ARCHIVAL ART STYLE',
    geologicalDial: 'GEOLOGICAL DIAL',

    searchPlaceholder: 'Search 1,025 Pokémon by name, binomial, or type...',
    filterAll: 'All Eras',
    allTypes: 'All Types',
    paleoRadar: 'PALEO-RADAR',
    allCategories: 'All Specimens',
    fossils: 'Primordial Fossils',
    paradoxAncient: 'Ancient Paradox',
    paradoxFuture: 'Future Paradox',
    titans: 'Apex Titans',
    lockedEpochPrefix: '✓ LOCKED:',
    filterEpochPrefix: 'FILTER:',
    showingCountPrefix: 'Showing',
    showingCountOf: 'of',
    showingCountMatches: 'matches',
    showingCountTotal: '(Total 1,025 catalogued)',
    visualCodexLabel: 'Visual Specimen Codex:',
    noSpecimensFound: 'No Geological Specimens Found',
    relaxFilterPrompt: 'Try relaxing the search query, elemental type, or paleo-radar filter.',
    pagePrev: 'Prev',
    pageNext: 'Next',
    pageOf: 'Page',

    workbenchSubtitle: 'NATURALIST WORKBENCH // INTERACTIVE BIO-DISSECTION',
    workbenchHeading: 'Anatomical Dissection Station',
    workbenchDesc: 'Peel epidermal integument, engage bio-resonance organ discharge, and excavate prehistoric strata.',
    chamberLabel: 'CHAMBER:',
    viewSuffix: 'VIEW',
    scalpelPeelSkin: 'Peel Skin:',
    diagnosticDermis: 'Dermis',
    diagnosticXray: 'X-Ray',
    diagnosticThermal: 'Thermal',
    diagnosticAmber: 'Amber',
    btnStimulateDischarging: 'DISCHARGING ENERGY!',
    btnStimulateNormal: 'Stimulate Bio-Organ',
    btnBrushExit: 'Put Down Brush [Exit]',
    btnBrushStart: 'Excavate Strata',
    brushExcavationPrompt: 'CLICK TO BRUSH SEDIMENTS',
    brushSedimentRemoved: 'Strata Excavated:',
    fossilExcavatedSuccessTitle: 'FOSSIL STRATA EXCAVATED!',
    fossilExcavatedSuccessDesc: 'Ancient matrix successfully exposed. Specimen preserved with intact bonebed calcification.',
    btnReburyFossil: 'Re-Bury Sediments (Reset)',
    bioTelemetryTitle: 'BIO-TELEMETRY HARMONIC DISCHARGE',
    bioTelemetryActive: 'ACTIVE',
    voltageLabel: 'ORGAN VOLTAGE',
    resonanceLabel: 'RESONANCE',
    tempLabel: 'CORE TEMP',
    examineFullCodex: 'Examine Full 4-Layer Specimen Codex',
    nationalArchiveLabel: 'NATIONAL ARCHIVE #',
    taxonomyLabel: 'Taxonomy:',
    bioReactorBadge: 'BIO-REACTOR',
    strata1: 'Topsoil & Alluvial Silt (0.2m depth)',
    strata2: 'Quaternary Volcanic Ash Stratum (1.8m depth)',
    strata3: 'Mesozoic Calcified Mudstone (4.5m depth)',
    strata4: 'Primordial Fossil Matrix & Bonebed (9.8m bedrock)',
    pin1Desc: 'Neural node regulating primary bio-synthesis.',
    pin2Desc: 'Elemental catalytic synthesis core.',
    pin3Desc: 'Musculoskeletal kinetic conduits discharging elemental torque.',

    benchSubtitle: 'LABORATORY BENCH',
    benchHeading: 'Comparative Anatomy & Divergent Speciation',
    benchDesc: 'Analyze morphological divergence, skeletal density variance, and elemental core architecture between two distinct Pokémon specimens.',
    preservedDuosLabel: 'Preserved Duos:',
    specimenAlphaLabel: 'SPECIMEN ALPHA [A]',
    specimenBetaLabel: 'SPECIMEN BETA [B]',
    switchSpecimenAlpha: 'Switch Specimen Alpha from Archive',
    switchSpecimenBeta: 'Switch Specimen Beta from Archive',
    compLayer1: 'I. Dermis & Morphology',
    compLayer2: 'II. Osteology & Skeletal Delta',
    compLayer3: 'III. Bio-Elemental Reactor',
    compLayer4: 'IV. Tectonic Evolutionary Horizon',
    xrayRadiogramBadge: 'X-RAY SKELETAL RADIOGRAM',
    statureLabel: 'STATURE',
    massLabel: 'MASS',
    dermalIntegumentLabel: 'DERMAL INTEGUMENT',
    boneDensityIndexLabel: 'BONE DENSITY INDEX:',
    skeletonTypeLabel: 'SKELETON:',
    primaryOrganLabel: 'PRIMARY ORGAN',
    descLabel: 'DESCRIPTION',
    tectonicEraLabel: 'TECTONIC ERA:',
    openDossierBtn: 'Open Full Specimen Dossier',
    swapDuosTitle: 'Swap Alpha & Beta Specimen',
    morphologicalDeltaTitle: 'Divergent Morphological Delta',
    deltaSummarySubtitle: 'DIAGNOSTIC DELTA SUMMARY',
    boneDensityDelta: 'BONE DENSITY DELTA',
    statureVariance: 'STATURE VARIANCE',
    massDisparity: 'MASS DISPARITY',
    isDenser: 'is denser',
    isTaller: 'is taller',
    isHeavier: 'is heavier',
    equalDensity: 'Identical bone density',
    equalStature: 'Equivalent stature',
    equalMass: 'Equal body mass',

    plateTectonicsMap: 'CONTINENTAL DRIFT TIMELINE (300 MYA — PRESENT)',
    simulatingTremor: 'Simulating Tremor...',
    triggerDriftBtn: 'Trigger Drift',
    eraLabel: 'ERA:',
    cratonTelemetryLabel: 'CRATON TELEMETRY:',
    endemicConduitsLabel: 'Endemic Fauna Conduits:',
    viewFaunaInArchiveBtn: 'View Fauna in Archive →',
    closeBtn: 'Close [×]',

    phyloSubtitle: 'MACRO-EVOLUTIONARY PHYLOGENY // 300 MILLION YEARS',
    phyloHeading: 'The Grand Tree of Speciation',
    phyloDesc: 'Trace how single primordial ancestral lineages diverged into specialized taxonomic clades across planetary geological epochs.',
    phyloBranchLabel: 'PHYLOGENETIC BRANCH:',
    phyloEraLabel: 'ERA OF ORIGIN:',
    keyTaxaLabel: 'KEY REPRESENTATIVE TAXA IN THIS CLADE (CLICK TO DISSECT):',

    layer1Name: 'I. Dermis & Integument',
    layer2Name: 'II. Osteology & Skeleton',
    layer3Name: 'III. Elemental Core',
    layer4Name: 'IV. Tectonic Speciation',
    layer1Short: 'I. Dermis',
    layer2Short: 'II. Osteology',
    layer3Short: 'III. Organ Core',
    layer4Short: 'IV. Tectonics',
    elementalReactor: 'BIO-REACTOR',
    viewingLayerLabel: 'VIEWING LAYER',
    layerXof4: 'LAYER {layer} OF 4',
    timeEpochLabel: 'TIME EPOCH',
    tectonicRegionLabel: 'TECTONIC REGION',
    boneDensityLabel: 'BONE DENSITY',
    frameworkLabel: 'Framework:',
    primaryLabel: 'PRIMARY:',
    secondaryLabel: 'SECONDARY:',
    tectonicTriggerLabel: 'TECTONIC TRIGGER:',
    naturalistFieldLog: 'FIELD NATURALIST LOG:',
    height: 'HEIGHT',
    weight: 'WEIGHT',
    baseStats: 'BASE ATTRIBUTES',
    abilities: 'ADAPTIVE TRAITS',
    close: 'Close Dossier',
    prevSpecimenTooltip: 'Previous:',
    nextSpecimenTooltip: 'Next:',
    noPrevSpecimen: 'No previous specimen',
    noNextSpecimen: 'No next specimen',
    typesLabel: 'TYPES:',
  },

  id: {
    appTitle: 'CHRONO-DEX',
    appSubtitle: 'ATLAS ANATOMI & PERGESERAN BENUA 300 JUTA TAHUN',
    tagline: 'Saksikan evolusi dan bedah anatomi 1.025 Pokémon melintasi 5 zaman geologis dan 4 lapisan biologis.',
    soundOn: 'AKUSTIK: AKTIF',
    soundOff: 'AKUSTIK: MATI',
    footerTagline: 'Dirancang & Dibangun oleh sm000ky × Zero Two · 100% Sains Paleontologi & Naturalis Prosedural',
    backToTopBtn: 'Kembali ke Atas',

    tabDissection: 'Laboratorium Bedah',
    tabComparative: 'Meja Komparasi',
    tabAtlas: 'Atlas Pergeseran Benua',
    tabPhylogeny: 'Pohon Kehidupan',
    tabArchives: 'Arsip 1.025 Spesimen',

    epochLabel: 'ZAMAN GEOLOGIS',
    geologicTime: 'WAKTU GEOLOGIS',
    tectonicEvent: 'FENOMENA TEKTONIK',
    artStyle: 'GAYA SENI ARSIP',
    geologicalDial: 'INDIKATOR GEOLOGIS',

    searchPlaceholder: 'Cari 1.025 Pokémon berdasarkan nama, taksonomi, atau tipe...',
    filterAll: 'Semua Zaman',
    allTypes: 'Semua Tipe',
    paleoRadar: 'RADAR PALEO',
    allCategories: 'Semua Spesimen',
    fossils: 'Fosil Purba',
    paradoxAncient: 'Paradoks Purba',
    paradoxFuture: 'Paradoks Masa Depan',
    titans: 'Titan Purba',
    lockedEpochPrefix: '✓ TERKUNCI:',
    filterEpochPrefix: 'FILTER:',
    showingCountPrefix: 'Menampilkan',
    showingCountOf: 'dari',
    showingCountMatches: 'spesimen',
    showingCountTotal: '(Total 1.025 terdaftar)',
    visualCodexLabel: 'Kodeks Visual Spesimen:',
    noSpecimensFound: 'Spesimen Geologis Tidak Ditemukan',
    relaxFilterPrompt: 'Coba sesuaikan kata kunci pencarian, filter tipe elemen, atau radar paleo.',
    pagePrev: 'Sebelumnya',
    pageNext: 'Berikutnya',
    pageOf: 'Halaman',

    workbenchSubtitle: 'MEJA KERJA NATURALIS // BEDAH BIOLOGIS INTERAKTIF',
    workbenchHeading: 'Stasiun Bedah Anatomi Komprehensif',
    workbenchDesc: 'Kupas integumen dermal luar, lepaskan resonansi organ elemen, dan ekskavasi lapisan strata prasejarah.',
    chamberLabel: 'RUANG UJI:',
    viewSuffix: 'TAMPILAN',
    scalpelPeelSkin: 'Kupas Dermis:',
    diagnosticDermis: 'Dermis',
    diagnosticXray: 'Sinar-X',
    diagnosticThermal: 'Termal',
    diagnosticAmber: 'Ambar',
    btnStimulateDischarging: 'MELEPASKAN ENERGI!',
    btnStimulateNormal: 'Stimulasi Organ Elemen',
    btnBrushExit: 'Simpan Kuas [Selesai]',
    btnBrushStart: 'Ekskavasi Strata Fosil',
    brushExcavationPrompt: 'KETUK UNTUK MENYAPU LAPISAN SEDIMEN',
    brushSedimentRemoved: 'Strata Terangkat:',
    fossilExcavatedSuccessTitle: 'STRATA FOSIL BERHASIL TERUNGKAP!',
    fossilExcavatedSuccessDesc: 'Matriks purba berhasil diekskavasi. Fosil spesimen terlindungi utuh dalam kalsifikasi batuan purba.',
    btnReburyFossil: 'Kubur Kembali Sedimen (Ulangi)',
    bioTelemetryTitle: 'TELEMETRI BIO-RESONANSI ELEMEN',
    bioTelemetryActive: 'AKTIF',
    voltageLabel: 'TEGANGAN ORGAN',
    resonanceLabel: 'RESONANSI',
    tempLabel: 'SUHU INTI',
    examineFullCodex: 'Buka Berkas Lengkap 4-Lapisan Spesimen',
    nationalArchiveLabel: 'ARSIP NASIONAL #',
    taxonomyLabel: 'Taksonomi:',
    bioReactorBadge: 'REAKTOR ELEMEN',
    strata1: 'Tanah Lapisan Atas & Lanau Aluvial (Kedalaman 0,2 m)',
    strata2: 'Lapisan Abu Vulkanik Kuarter (Kedalaman 1,8 m)',
    strata3: 'Batu Lumpur Terkalsifikasi Mesozoikum (Kedalaman 4,5 m)',
    strata4: 'Matriks Fosil & Hamparan Tulang Purba (Dasar Batuan 9,8 m)',
    pin1Desc: 'Pusat simpul saraf pengatur biosintesis elemen utama.',
    pin2Desc: 'Reaktor sintesis katalitik elemen biologis.',
    pin3Desc: 'Konduktor lokomotif muskuloskeletal pelepasan torsi kinetik.',

    benchSubtitle: 'MEJA LABORATORIUM',
    benchHeading: 'Anatomi Komparatif & Spesiasi Divergen',
    benchDesc: 'Analisis divergensi morfologis, perbedaan densitas rangka tulang, dan arsitektur reaktor elemen antar dua spesimen Pokémon.',
    preservedDuosLabel: 'Duet Terkurasi:',
    specimenAlphaLabel: 'SPESIMEN ALPHA [A]',
    specimenBetaLabel: 'SPESIMEN BETA [B]',
    switchSpecimenAlpha: 'Ganti Spesimen Alpha dari Arsip',
    switchSpecimenBeta: 'Ganti Spesimen Beta dari Arsip',
    compLayer1: 'I. Dermis & Morfologi',
    compLayer2: 'II. Osteologi & Delta Rangka',
    compLayer3: 'III. Reaktor Bio-Elemen',
    compLayer4: 'IV. Horizon Evolusi Tektonik',
    xrayRadiogramBadge: 'RADIOGRAM RANGKA SINAR-X',
    statureLabel: 'TINGGI',
    massLabel: 'BOBOT',
    dermalIntegumentLabel: 'INTEGUMEN KULIT LUAR',
    boneDensityIndexLabel: 'INDEKS DENSITAS TULANG:',
    skeletonTypeLabel: 'RANGKA:',
    primaryOrganLabel: 'ORGAN UTAMA',
    descLabel: 'DESKRIPSI',
    tectonicEraLabel: 'ZAMAN TEKTONIK:',
    openDossierBtn: 'Buka Berkas Lengkap Spesimen',
    swapDuosTitle: 'Tukar Spesimen Alpha & Beta',
    morphologicalDeltaTitle: 'Delta Morfologis Divergen',
    deltaSummarySubtitle: 'RINGKASAN DIAGNOSTIK DELTA',
    boneDensityDelta: 'DELTA DENSITAS TULANG',
    statureVariance: 'VARIASI TINGGI',
    massDisparity: 'DISPARITAS MASSA',
    isDenser: 'lebih padat',
    isTaller: 'lebih tinggi',
    isHeavier: 'lebih berbobot',
    equalDensity: 'Densitas tulang identik',
    equalStature: 'Tinggi spesimen setara',
    equalMass: 'Bobot tubuh seimbang',

    plateTectonicsMap: 'GARIS WAKTU PERGESERAN LEMPENG (300 JUTA TAHUN LALU — KINI)',
    simulatingTremor: 'Mensimulasikan Gempa Tektonik...',
    triggerDriftBtn: 'Picu Pergeseran Benua',
    eraLabel: 'ZAMAN:',
    cratonTelemetryLabel: 'TELEMETRI LEMPENG TEKTONIK:',
    endemicConduitsLabel: 'Jalur Elemen Endemik:',
    viewFaunaInArchiveBtn: 'Lihat Fauna di Arsip →',
    closeBtn: 'Tutup [×]',

    phyloSubtitle: 'FILOGENI MAKRO-EVOLUSI // 300 JUTA TAHUN',
    phyloHeading: 'Pohon Besar Percabangan Spesies',
    phyloDesc: 'Telusuri bagaimana satu garis keturunan primordial berevolusi menjadi taksa khusus melintasi zaman geologis planet.',
    phyloBranchLabel: 'CABANG FILOGENETIK:',
    phyloEraLabel: 'ZAMAN ASAL USUL:',
    keyTaxaLabel: 'TAKSA REPRESENTATIF DALAM KLADE INI (KLIK UNTUK BEDAH):',

    layer1Name: 'I. Dermis & Kulit Luar',
    layer2Name: 'II. Osteologi & Rangka Tulang',
    layer3Name: 'III. Inti Biokimia Elemen',
    layer4Name: 'IV. Spesiasi Tektonik Benua',
    layer1Short: 'I. Dermis',
    layer2Short: 'II. Osteologi',
    layer3Short: 'III. Inti Elemen',
    layer4Short: 'IV. Tektonik',
    elementalReactor: 'REAKTOR ELEMEN',
    viewingLayerLabel: 'LAPISAN AKTIF',
    layerXof4: 'LAPISAN {layer} DARI 4',
    timeEpochLabel: 'ZAMAN GEOLOGIS',
    tectonicRegionLabel: 'WILAYAH LEMPENG',
    boneDensityLabel: 'DENSITAS TULANG',
    frameworkLabel: 'Struktur Rangka:',
    primaryLabel: 'PRIMER:',
    secondaryLabel: 'SEKUNDER:',
    tectonicTriggerLabel: 'PEMICU TEKTONIK:',
    naturalistFieldLog: 'CATATAN LAPANGAN NATURALIS:',
    height: 'TINGGI',
    weight: 'BOBOT',
    baseStats: 'STATISTIK DASAR',
    abilities: 'KEMAMPUAN ADAPTASI',
    close: 'Tutup Berkas',
    prevSpecimenTooltip: 'Sebelumnya:',
    nextSpecimenTooltip: 'Berikutnya:',
    noPrevSpecimen: 'Tidak ada spesimen sebelumnya',
    noNextSpecimen: 'Tidak ada spesimen berikutnya',
    typesLabel: 'TIPE ELEMEN:',
  },

  ja: {
    appTitle: 'クロノ・デックス (CHRONO-DEX)',
    appSubtitle: '3億年の大陸移動とポケモン解剖学大図鑑',
    tagline: '5つの地質時代と4層の生体解剖を通じて、1,025匹のポケモンの進化と分化を解き明かす。',
    soundOn: '音響: ON',
    soundOff: '音響: OFF',
    footerTagline: '設計・構築: sm000ky × Zero Two · 100% 自然科学プロシージャル解剖学',
    backToTopBtn: 'トップへ戻る',

    tabDissection: '解剖実験室',
    tabComparative: '比較解剖台',
    tabAtlas: '大陸移動地図',
    tabPhylogeny: '系統樹・生命の樹',
    tabArchives: '1,025標本目録',

    epochLabel: '地質時代',
    geologicTime: '地質年代',
    tectonicEvent: 'プレートテクトニクス現象',
    artStyle: '古文書様式',
    geologicalDial: '地質計',

    searchPlaceholder: '1,025匹のポケモンを名前、学名、タイプで検索...',
    filterAll: '全時代',
    allTypes: '全タイプ',
    paleoRadar: '古生物レーダー',
    allCategories: '全標本',
    fossils: '古代の化石',
    paradoxAncient: '古代パラドックス',
    paradoxFuture: '未来パラドックス',
    titans: '頂点タイタン',
    lockedEpochPrefix: '✓ 固定:',
    filterEpochPrefix: '絞り込み:',
    showingCountPrefix: '表示中:',
    showingCountOf: '/',
    showingCountMatches: '種',
    showingCountTotal: '(全1,025標本)',
    visualCodexLabel: '視覚的標本調書:',
    noSpecimensFound: '該当する地質標本が見つかりません',
    relaxFilterPrompt: '検索条件や属性フィルターを緩めて再検索してください。',
    pagePrev: '前へ',
    pageNext: '次へ',
    pageOf: 'ページ',

    workbenchSubtitle: '博物学者の実験台 // インタラクティブ生体解剖',
    workbenchHeading: '生体構造解剖ステーション',
    workbenchDesc: '外皮を剥離し、生体属性共鳴を励起させ、古代地層の発掘調査を行います。',
    chamberLabel: '実験室:',
    viewSuffix: '表示',
    scalpelPeelSkin: '表皮剥離:',
    diagnosticDermis: '外皮',
    diagnosticXray: 'X線透視',
    diagnosticThermal: '熱赤外線',
    diagnosticAmber: '琥珀化石',
    btnStimulateDischarging: '生体エネルギー放電中！',
    btnStimulateNormal: '属性器官を刺激する',
    btnBrushExit: 'ブラシを置く [終了]',
    btnBrushStart: '地層を発掘する',
    brushExcavationPrompt: 'クリックして堆積物をブラッシング',
    brushSedimentRemoved: '発掘進行度:',
    fossilExcavatedSuccessTitle: '化石地層の発掘に成功！',
    fossilExcavatedSuccessDesc: '古代の母岩が露出しました。骨層の石灰化状態は完全に保存されています。',
    btnReburyFossil: '地層を埋め戻す (リセット)',
    bioTelemetryTitle: '生体共鳴エネルギー・テレメトリー',
    bioTelemetryActive: '作動中',
    voltageLabel: '器官電圧',
    resonanceLabel: '共鳴周波数',
    tempLabel: '炉心温度',
    examineFullCodex: '4層完全標本調書を閲覧',
    nationalArchiveLabel: '国家公文書図鑑番号 #',
    taxonomyLabel: '学名・分類:',
    bioReactorBadge: '生体反応炉',
    strata1: '表土および沖積シルト層 (深度 0.2m)',
    strata2: '第四紀火山灰地層 (深度 1.8m)',
    strata3: '中生代石灰質泥岩層 (深度 4.5m)',
    strata4: '始原化石母岩および骨層 (基盤岩 9.8m)',
    pin1Desc: '主属性の生合成を司る頭蓋神経節ノード。',
    pin2Desc: '生体属性エネルギーの触媒合成反応炉。',
    pin3Desc: '運動トルクを放出する筋骨格系導電体。',

    benchSubtitle: '実験研究台',
    benchHeading: '比較解剖学と分岐進化',
    benchDesc: '2種のポケモンの形態学的分岐、骨密度格差、および生体属性反応炉の構造を比較します。',
    preservedDuosLabel: '保存標本デュオ:',
    specimenAlphaLabel: '標本アルファ [A]',
    specimenBetaLabel: '標本ベータ [B]',
    switchSpecimenAlpha: '標本アルファを図鑑から選択',
    switchSpecimenBeta: '標本ベータを図鑑から選択',
    compLayer1: 'I. 外皮および形態',
    compLayer2: 'II. 骨格および骨密度差',
    compLayer3: 'III. 生体属性反応炉',
    compLayer4: 'IV. 地殻変動と進化の地平',
    xrayRadiogramBadge: 'X線骨格ラジオグラム',
    statureLabel: '体長',
    massLabel: '体重',
    dermalIntegumentLabel: '外皮組織',
    boneDensityIndexLabel: '骨密度指数:',
    skeletonTypeLabel: '骨格様式:',
    primaryOrganLabel: '主要器官',
    descLabel: '概要',
    tectonicEraLabel: '地質時代:',
    openDossierBtn: '標本調書を全画面で開く',
    swapDuosTitle: '標本AとBを入れ替える',
    morphologicalDeltaTitle: '形態学的分岐デルタ',
    deltaSummarySubtitle: '診断デルタ要約',
    boneDensityDelta: '骨密度デルタ',
    statureVariance: '体長差異',
    massDisparity: '体重格差',
    isDenser: 'の方が高密度',
    isTaller: 'の方が大型',
    isHeavier: 'の方が重い',
    equalDensity: '骨密度は同一',
    equalStature: '体長は同等',
    equalMass: '体重は同一',

    plateTectonicsMap: '大陸移動タイムライン（3億年前〜現代）',
    simulatingTremor: 'プレート地震動をシミュレーション中...',
    triggerDriftBtn: '大陸移動を起こす',
    eraLabel: '時代:',
    cratonTelemetryLabel: 'クラトン・プレートテレメトリー:',
    endemicConduitsLabel: '固有属性系統:',
    viewFaunaInArchiveBtn: '図鑑で固有種を観察 →',
    closeBtn: '閉じる [×]',

    phyloSubtitle: 'マクロ進化系統樹 // 3億年の軌跡',
    phyloHeading: '大分岐進化の樹',
    phyloDesc: '単一の始原共通祖先から、惑星の地殻変動とともに多様な属性クレードへと分岐した系譜を辿ります。',
    phyloBranchLabel: '系統分類クレード:',
    phyloEraLabel: '起源の時代:',
    keyTaxaLabel: 'クレードの主要代表分類群 (クリックして解剖):',

    layer1Name: '第I層：外皮・鱗・皮膚',
    layer2Name: '第II層：骨格・骨密度',
    layer3Name: '第III層：生化学的属性器官',
    layer4Name: '第IV層：地殻移動・種分化の記録',
    layer1Short: '第I層：外皮',
    layer2Short: '第II層：骨格',
    layer3Short: '第III層：属性炉',
    layer4Short: '第IV層：地殻',
    elementalReactor: '生体属性エネルギー器官',
    viewingLayerLabel: '観察中の層',
    layerXof4: '第{layer}層 / 全4層',
    timeEpochLabel: '地質時代',
    tectonicRegionLabel: 'プレート地域',
    boneDensityLabel: '骨密度',
    frameworkLabel: '骨格様式:',
    primaryLabel: '主器官:',
    secondaryLabel: '副器官:',
    tectonicTriggerLabel: '地殻変動要因:',
    naturalistFieldLog: '博物学者フィールド日誌:',
    height: '体長',
    weight: '体重',
    baseStats: '基本種族値',
    abilities: '生物的特性',
    close: '調書を閉じる',
    prevSpecimenTooltip: '前へ:',
    nextSpecimenTooltip: '次へ:',
    noPrevSpecimen: '前の標本はありません',
    noNextSpecimen: '次の標本はありません',
    typesLabel: '属性タイプ:',
  },
};

export interface LocalizedEpoch {
  id: EpochId;
  number: number;
  nameKey: string;
  timeEra: string;
  styleName: string;
  tectonicEvent: string;
  shortName: string;
  badgeColor: string;
  accentHex: string;
  bgHex: string;
}

export const getLocalizedEpochs = (lang: Language): LocalizedEpoch[] => {
  if (lang === 'id') {
    return [
      {
        id: 'primordial',
        number: 1,
        nameKey: 'Poké-Pangea Primordial (300 Juta Tahun Lalu)',
        timeEra: '300 Juta Tahun Lalu',
        styleName: 'Petroglif Gua Purba & Basalt',
        tectonicEvent: 'Pecahnya Superbenua Purba Poké-Pangea',
        shortName: 'Pangaea',
        badgeColor: 'bg-amber-950 text-amber-200 border-amber-600',
        accentHex: '#D97706',
        bgHex: '#261811',
      },
      {
        id: 'drift',
        number: 2,
        nameKey: 'Fraktur Benua Mesozoikum (100 Juta Tahun Lalu)',
        timeEra: '100 Juta Tahun Lalu',
        styleName: 'Litografi Sepia Ernst Haeckel',
        tectonicEvent: 'Perpecahan Benua & Terbukanya Samudra Tethys',
        shortName: 'Fraktur',
        badgeColor: 'bg-[#FAF6EE] text-[#8A6D4B] border-[#C5A059]',
        accentHex: '#B8781B',
        bgHex: '#F4ECE1',
      },
      {
        id: 'feudal',
        number: 3,
        nameKey: 'Era Feodal Kuno / Zaman Hisui (3.000 SM)',
        timeEra: '3.000 Tahun Lalu',
        styleName: 'Cetak Blok Kayu Ukiyo-e & Kertas Washi',
        tectonicEvent: 'Jembatan Daratan Hisui & Orogenesis Gunung Coronet',
        shortName: 'Hisui',
        badgeColor: 'bg-[#1C241E] text-[#D4AF37] border-[#8C3A2E]',
        accentHex: '#D4AF37',
        bgHex: '#1C241E',
      },
      {
        id: 'modern',
        number: 4,
        nameKey: 'Era Oseanik Victoria & Modern (Masa Kini)',
        timeEra: 'Era Kontemporer',
        styleName: 'Pelat Tembaga Victoria & Panduan Naturalis',
        tectonicEvent: '9 Lempeng Kepulauan Regional Modern Terbentuk',
        shortName: 'Modern',
        badgeColor: 'bg-[#FAF6EE] text-[#2F6D68] border-[#DEC6AE]',
        accentHex: '#D95A47',
        bgHex: '#FAF6EE',
      },
      {
        id: 'future',
        number: 5,
        nameKey: 'Horizon Temporal Paradoks (Area Zero / Masa Depan)',
        timeEra: 'Era Masa Depan Tak Terbatas',
        styleName: 'Cetak Biru Siber Holografis',
        tectonicEvent: 'Ekspansi Singularitas Rift Temporal Area Zero',
        shortName: 'Paradoks',
        badgeColor: 'bg-[#0B1120] text-cyan-300 border-cyan-500',
        accentHex: '#38BDF8',
        bgHex: '#0B1120',
      },
    ];
  }

  if (lang === 'ja') {
    return [
      {
        id: 'primordial',
        number: 1,
        nameKey: '始原ポケパンゲア大陸（3億年前）',
        timeEra: '3億年前',
        styleName: '玄武岩の古代洞窟壁画様式',
        tectonicEvent: '超大陸ポケパンゲアの地殻分裂',
        shortName: 'パンゲア',
        badgeColor: 'bg-amber-950 text-amber-200 border-amber-600',
        accentHex: '#D97706',
        bgHex: '#261811',
      },
      {
        id: 'drift',
        number: 2,
        nameKey: '中生代大陸断裂期（1億年前）',
        timeEra: '1億年前',
        styleName: 'ヘッケル風セピア石版画・古文書',
        tectonicEvent: '大陸分裂とテチス海の拡大',
        shortName: '分裂期',
        badgeColor: 'bg-[#FAF6EE] text-[#8A6D4B] border-[#C5A059]',
        accentHex: '#B8781B',
        bgHex: '#F4ECE1',
      },
      {
        id: 'feudal',
        number: 3,
        nameKey: '封建古代・ヒスイの時代（紀元前3,000年）',
        timeEra: '3,000年前',
        styleName: '浮世絵木版画・和紙・墨絵様式',
        tectonicEvent: 'ヒスイ陸橋とテンガン山造山運動',
        shortName: 'ヒスイ',
        badgeColor: 'bg-[#1C241E] text-[#D4AF37] border-[#8C3A2E]',
        accentHex: '#D4AF37',
        bgHex: '#1C241E',
      },
      {
        id: 'modern',
        number: 4,
        nameKey: 'ヴィクトリア朝博物誌・海洋現代（現在）',
        timeEra: '現代',
        styleName: '銅版画・近代博物学図譜様式',
        tectonicEvent: '9大諸島プレートの確立と安定化',
        shortName: '現代',
        badgeColor: 'bg-[#FAF6EE] text-[#2F6D68] border-[#DEC6AE]',
        accentHex: '#D95A47',
        bgHex: '#FAF6EE',
      },
      {
        id: 'future',
        number: 5,
        nameKey: 'パラドックス時間地平（エリアゼロ／未来）',
        timeEra: '未知の未来年代',
        styleName: '量子ホログラフィック・サイバー青図',
        tectonicEvent: 'エリアゼロ時空特異点の拡大',
        shortName: 'パラドックス',
        badgeColor: 'bg-[#0B1120] text-cyan-300 border-cyan-500',
        accentHex: '#38BDF8',
        bgHex: '#0B1120',
      },
    ];
  }

  // Default English
  return [
    {
      id: 'primordial',
      number: 1,
      nameKey: 'Primordial Poké-Pangea (300 Mya)',
      timeEra: '300 Million Years Ago',
      styleName: 'Archaic Cave Petroglyph',
      tectonicEvent: 'Supercontinent Poké-Pangea Rifting',
      shortName: 'Pangaea',
      badgeColor: 'bg-amber-950 text-amber-200 border-amber-600',
      accentHex: '#D97706',
      bgHex: '#261811',
    },
    {
      id: 'drift',
      number: 2,
      nameKey: 'Mesozoic Continental Fracture (100 Mya)',
      timeEra: '100 Million Years Ago',
      styleName: 'Ernst Haeckel Sepia Codex',
      tectonicEvent: 'Continental Fracture & Tethys Sea Opening',
      shortName: 'Fracture',
      badgeColor: 'bg-[#FAF6EE] text-[#8A6D4B] border-[#C5A059]',
      accentHex: '#B8781B',
      bgHex: '#F4ECE1',
    },
    {
      id: 'feudal',
      number: 3,
      nameKey: 'Feudal Antiquity / Era of Hisui (3,000 BCE)',
      timeEra: '3,000 Years Ago',
      styleName: 'Ukiyo-e Woodblock & Sumi-e Washi',
      tectonicEvent: 'Hisui Landbridge & Mount Coronet Orogeny',
      shortName: 'Hisui',
      badgeColor: 'bg-[#1C241E] text-[#D4AF37] border-[#8C3A2E]',
      accentHex: '#D4AF37',
      bgHex: '#1C241E',
    },
    {
      id: 'modern',
      number: 4,
      nameKey: 'Victorian & Modern Oceanic Era (Present)',
      timeEra: 'Contemporary Era',
      styleName: 'Victorian Copperplate & Naturalist Guide',
      tectonicEvent: '9 Global Archipelago Plates Established',
      shortName: 'Modern',
      badgeColor: 'bg-[#FAF6EE] text-[#2F6D68] border-[#DEC6AE]',
      accentHex: '#D95A47',
      bgHex: '#FAF6EE',
    },
    {
      id: 'future',
      number: 5,
      nameKey: 'Paradox Temporal Horizon (Future)',
      timeEra: 'Unknown Future Era',
      styleName: 'Holographic Cyber Blueprint',
      tectonicEvent: 'Area Zero Temporal Rift Expansion',
      shortName: 'Paradox',
      badgeColor: 'bg-[#0B1120] text-cyan-300 border-cyan-500',
      accentHex: '#38BDF8',
      bgHex: '#0B1120',
    },
  ];
};

export const EPOCHS = getLocalizedEpochs('en');

export interface LocalizedClade {
  id: string;
  name: string;
  latinClass: string;
  ancestorEpoch: string;
  evolutionaryAdaptation: string;
  representativeIds: number[];
}

export const getLocalizedClades = (lang: Language): LocalizedClade[] => {
  if (lang === 'id') {
    return [
      {
        id: 'primordial_root',
        name: 'Akar Primordial & Paradoks Kuno',
        latinClass: 'Cladus Primordialis',
        ancestorEpoch: '300 Juta Tahun Lalu (Poké-Pangea)',
        evolutionaryAdaptation: 'Matriks seluler progenitor dengan plastisitas DNA tinggi, mampu berspesiasi menjadi seluruh 18 saluran energi biologis.',
        representativeIds: [151, 138, 140, 142, 984],
      },
      {
        id: 'draco_sauria',
        name: 'Garis Keturunan Drakonik & Sauropsida',
        latinClass: 'Ordo Dracosauria',
        ancestorEpoch: '180 Juta Tahun Lalu (Rifting Mesozoikum)',
        evolutionaryAdaptation: 'Kelenjar piroforik toraks, arsitektur rangka pneumatik berongga ringan, dan sisik berdensitas termal tinggi.',
        representativeIds: [6, 130, 149, 445, 1007],
      },
      {
        id: 'mammalia_terrestria',
        name: 'Adaptasi Mamalia Terestrial',
        latinClass: 'Classis Mammaliaformes',
        ancestorEpoch: '120 Juta Tahun Lalu (Cekungan Tethys)',
        evolutionaryAdaptation: 'Sistem homeotermi endotermik, insulasi bulu subkutan tebal, dan sensor pineal pemancar gelombang aurik serebral.',
        representativeIds: [25, 133, 448, 901],
      },
      {
        id: 'pneumatic_avians',
        name: 'Aerofoil Avian Rangka Pneumatik',
        latinClass: 'Superordo Ornithurae',
        ancestorEpoch: '90 Juta Tahun Lalu (Orogenesis Pegunungan)',
        evolutionaryAdaptation: 'Arsitektur trabekula tulang berongga udara, barula bulu keratin aerodinamis, dan sensor tekanan barometrik.',
        representativeIds: [18, 277, 663, 823],
      },
      {
        id: 'arthropoda_chitin',
        name: 'Eksoskeleton Kitin & Perisai Mineral',
        latinClass: 'Phylum Arthropoda Bio-Metallica',
        ancestorEpoch: '240 Juta Tahun Lalu (Dasar Laut Kuno)',
        evolutionaryAdaptation: 'Lempeng kitin termineralisasi tinggi, pengikatan molekul besi organik, dan penyimpanan cairan hemolimfa asam pekat.',
        representativeIds: [127, 212, 768, 900],
      },
      {
        id: 'temporal_cosmic',
        name: 'Anomali Kosmik & Paradoks Temporal',
        latinClass: 'Classis Singularis Trans-Dimensionis',
        ancestorEpoch: 'Area Zero & Ruang Angkasa Dalam',
        evolutionaryAdaptation: 'Kisi kristal fotonik kuantum, medan levitasi anti-gravitasi, dan radiasi emisi temporal radioaktif.',
        representativeIds: [386, 890, 1008, 1025],
      },
    ];
  }

  if (lang === 'ja') {
    return [
      {
        id: 'primordial_root',
        name: '始原共通祖先・原始パラドックス',
        latinClass: 'Cladus Primordialis',
        ancestorEpoch: '3億年前（ポケパンゲア超大陸）',
        evolutionaryAdaptation: '全18種の属性経路へと分化可能な高い可塑性幹細胞DNAを有する始原細胞マトリックス。',
        representativeIds: [151, 138, 140, 142, 984],
      },
      {
        id: 'draco_sauria',
        name: '竜脚類・ドラコサウルス系譜',
        latinClass: 'Ordo Dracosauria',
        ancestorEpoch: '1億8000万年前（中生代地溝帯）',
        evolutionaryAdaptation: '胸部発火腺、軽量な中空骨格構造、および極限の高密度耐熱鱗。',
        representativeIds: [6, 130, 149, 445, 1007],
      },
      {
        id: 'mammalia_terrestria',
        name: '陸棲哺乳類形質適応群',
        latinClass: 'Classis Mammaliaformes',
        ancestorEpoch: '1億2000万年前（テチス海盆）',
        evolutionaryAdaptation: '恒温恒常性維持、皮下断熱毛皮層、および大脳松果体から生じる波導共鳴器官。',
        representativeIds: [25, 133, 448, 901],
      },
      {
        id: 'pneumatic_avians',
        name: '含気骨性翼手鳥類群',
        latinClass: 'Superordo Ornithurae',
        ancestorEpoch: '9000万年前（山脈造山運動）',
        evolutionaryAdaptation: '骨梁中空空気室構造、ケラチン質風切羽、および大気圧微細感知能力。',
        representativeIds: [18, 277, 663, 823],
      },
      {
        id: 'arthropoda_chitin',
        name: '甲殻キチン質・金属外骨格群',
        latinClass: 'Phylum Arthropoda Bio-Metallica',
        ancestorEpoch: '2億4000万年前（古代海底）',
        evolutionaryAdaptation: '超高密度鉱物化キチン外骨格、生体鉄分の含有固定、および強酸性血リンパ嚢。',
        representativeIds: [127, 212, 768, 900],
      },
      {
        id: 'temporal_cosmic',
        name: '宇宙的特異点・時空パラドックス',
        latinClass: 'Classis Singularis Trans-Dimensionis',
        ancestorEpoch: 'エリアゼロおよび深宇宙',
        evolutionaryAdaptation: '量子結晶格子構造、反重力浮遊フィールド、および放射性時間エネルギー放出機構。',
        representativeIds: [386, 890, 1008, 1025],
      },
    ];
  }

  // Default English
  return [
    {
      id: 'primordial_root',
      name: 'Universal Root & Primitive Paradox',
      latinClass: 'Cladus Primordialis',
      ancestorEpoch: '300 Mya (Poké-Pangea)',
      evolutionaryAdaptation: 'Progenitor cellular matrix possessing plastic stem DNA capable of speciating into all 18 elemental conduits.',
      representativeIds: [151, 138, 140, 142, 984],
    },
    {
      id: 'draco_sauria',
      name: 'Draconic & Sauropsid Lineage',
      latinClass: 'Ordo Dracosauria',
      ancestorEpoch: '180 Mya (Mesozoic Rifting)',
      evolutionaryAdaptation: 'Pyrophoric thoracic glands, lightweight hollow osteological frameworks, and dense thermal scales.',
      representativeIds: [6, 130, 149, 445, 1007],
    },
    {
      id: 'mammalia_terrestria',
      name: 'Terrestrial Mammalian Adaptations',
      latinClass: 'Classis Mammaliaformes',
      ancestorEpoch: '120 Mya (Tethys Basin)',
      evolutionaryAdaptation: 'Endothermic homeothermy, subcutaneous fur insulation, and cerebral pineal bio-auric sensors.',
      representativeIds: [25, 133, 448, 901],
    },
    {
      id: 'pneumatic_avians',
      name: 'Pneumatic Avian Aerofoils',
      latinClass: 'Superordo Ornithurae',
      ancestorEpoch: '90 Mya (Mountain Orogeny)',
      evolutionaryAdaptation: 'Trabecular pneumatic bone architecture, plumage keratin barbs, and atmospheric pressure sensing.',
      representativeIds: [18, 277, 663, 823],
    },
    {
      id: 'arthropoda_chitin',
      name: 'Chitinous & Armored Exoskeletons',
      latinClass: 'Phylum Arthropoda Bio-Metallica',
      ancestorEpoch: '240 Mya (Ancient Seabed)',
      evolutionaryAdaptation: 'High-density mineralized chitin plates, metallic iron incorporation, and hemolymph acid storage.',
      representativeIds: [127, 212, 768, 900],
    },
    {
      id: 'temporal_cosmic',
      name: 'Cosmic Anomalies & Temporal Paradox',
      latinClass: 'Classis Singularis Trans-Dimensionis',
      ancestorEpoch: 'Area Zero & Deep Space',
      evolutionaryAdaptation: 'Quantum crystalline lattice structures, anti-gravity levitation fields, and radioactive temporal emission.',
      representativeIds: [386, 890, 1008, 1025],
    },
  ];
};

export const getLocalizedPlateInfo = (lang: Language): Record<string, { types: string[]; desc: string }> => {
  if (lang === 'id') {
    return {
      'Poké-Pangea Supercontinent': {
        types: ['Ground', 'Fire', 'Rock'],
        desc: 'Superbenua primordial tunggal yang tertekan oleh konveksi magma ekstrem dan vulkanisme kerak bumi. Asal mula garis keturunan reptil kolosal purba dan spesies penggali batuan.',
      },
      'Kanto-Johto Northern Plate': {
        types: ['Grass', 'Poison', 'Normal'],
        desc: 'Cekungan aluvial beriklim sedang yang kaya akan hutan purba lebat dan rawa tepian sungai. Membentuk jaringan vaskular botani dan sintesis enzim racun pelindung.',
      },
      'Sinnoh-Hoenn Southern Arc': {
        types: ['Water', 'Dragon', 'Steel'],
        desc: 'Palung pemekaran samudra dan busur kepulauan vulkanik. Tekanan hidrostatik laut dalam memicu evolusi rongga organ hidro-osmotik dan densitas tulang padat.',
      },
      'Hisui Continental Plate': {
        types: ['Ghost', 'Fighting', 'Ice'],
        desc: 'Orogenesis glasial akibat pengangkatan tektonik Gunung Coronet. Vulkanisme geotermal di bawah padang salju melahirkan bulu insulasi tebal dan simpul gelombang aurik.',
      },
      'Kanto-Johto Unified Plate': {
        types: ['Electric', 'Psychic', 'Flying'],
        desc: 'Kerak benua modern yang stabil dengan urat bijih piezoelektrik melimpah serta koridor aliran arus troposferik tinggi.',
      },
      'Hoenn Volcanic Subplate': {
        types: ['Fire', 'Water', 'Ground'],
        desc: 'Zona subduksi panas tinggi yang ditandai oleh aktivitas kaldera Gunung Chimney dan laguna terumbu karang dangkal di sekelilingnya.',
      },
      'Sinnoh Northern Shield': {
        types: ['Ice', 'Steel', 'Rock'],
        desc: 'Perisai granit Prakambrium purba yang diselimuti permafrost abadi dan lorong tambang logam bawah tanah.',
      },
      'Kalos Continental Shelf': {
        types: ['Fairy', 'Dragon', 'Psychic'],
        desc: 'Dataran tinggi karst batu kapur dengan mata air mineral bawah tanah yang memancarkan frekuensi bio-luminesensi kehidupan.',
      },
      'Paldean Iberian Plate': {
        types: ['Fighting', 'Bug', 'Electric'],
        desc: 'Dataran meseta yang mengelilingi Kawah Raksasa, memiliki tebing berbatu bersalinitas tinggi dan sedimen kristal konduktif.',
      },
      'Area Zero Temporal Vortex': {
        types: ['Dragon', 'Electric', 'Fighting'],
        desc: 'Singularitas gravitasi dan temporal non-Euclidean tempat bertemunya binatang buas purba dan unit logam masa depan melalui celah waktu.',
      },
    };
  }

  if (lang === 'ja') {
    return {
      'Poké-Pangea Supercontinent': {
        types: ['Ground', 'Fire', 'Rock'],
        desc: '極限のマントル対流と地殻火山活動に晒された始原の超大陸。巨大爬虫類および岩盤掘削系統の揺籃の地。',
      },
      'Kanto-Johto Northern Plate': {
        types: ['Grass', 'Poison', 'Normal'],
        desc: '原生林と河川湿地に富む温帯沖積盆地。植物の導管網共生および毒素分解酵素の進化を促した。',
      },
      'Sinnoh-Hoenn Southern Arc': {
        types: ['Water', 'Dragon', 'Steel'],
        desc: '海洋拡大海溝と火山弧。深海の静水圧が浸透圧調節器官と高密度骨格の進化を促した。',
      },
      'Hisui Continental Plate': {
        types: ['Ghost', 'Fighting', 'Ice'],
        desc: 'テンガン山隆起による氷河造山帯。極寒の雪原と地熱活動が高密度の防寒毛皮と波導節を進化させた。',
      },
      'Kanto-Johto Unified Plate': {
        types: ['Electric', 'Psychic', 'Flying'],
        desc: '豊富な圧電鉱脈と強い対流圏気流に恵まれた安定した近代大陸地殻。',
      },
      'Hoenn Volcanic Subplate': {
        types: ['Fire', 'Water', 'Ground'],
        desc: 'えんとつ山のカルデラ活動と周囲の浅海環礁によって特徴づけられる高熱沈み込み帯。',
      },
      'Sinnoh Northern Shield': {
        types: ['Ice', 'Steel', 'Rock'],
        desc: '永久凍土と地下金属回廊に覆われた先カンブリア時代の太古の花崗岩楯状地。',
      },
      'Kalos Continental Shelf': {
        types: ['Fairy', 'Dragon', 'Psychic'],
        desc: '生命の生体蛍光周波数を放つ鉱泉が湧出する石灰岩カルスト台地。',
      },
      'Paldean Iberian Plate': {
        types: ['Fighting', 'Bug', 'Electric'],
        desc: 'パルデアの大穴を囲む高塩分岩壁と導電性結晶堆積物に富むメセタ台地。',
      },
      'Area Zero Temporal Vortex': {
        types: ['Dragon', 'Electric', 'Fighting'],
        desc: '古代のパラドックス生物と未来の鉄機体が時空の裂け目を通じて交差する非ユークリッド特異点。',
      },
    };
  }

  // Default English
  return {
    'Poké-Pangea Supercontinent': {
      types: ['Ground', 'Fire', 'Rock'],
      desc: 'Unified primordial supercontinent subjected to extreme magma convection and crustal volcanism. Endemic cradle of colossal reptilian and rock-burrowing lineages.',
    },
    'Kanto-Johto Northern Plate': {
      types: ['Grass', 'Poison', 'Normal'],
      desc: 'Temperate alluvial basin rich in primeval ancient forests and riparian marshes. Catalyzed specialized botanical vascular networks and acidic venom enzymes.',
    },
    'Sinnoh-Hoenn Southern Arc': {
      types: ['Water', 'Dragon', 'Steel'],
      desc: 'Oceanic spreading trench and island arc where deep-sea hydrostatic pressure stimulated hydro-osmotic organ chambers and heavy mineralized bone density.',
    },
    'Hisui Continental Plate': {
      types: ['Ghost', 'Fighting', 'Ice'],
      desc: 'Glacial orogeny driven by Mount Coronet tectonic uplift. Geothermal rifting through sub-zero snowfields yielded dense insulating fur and spiritual auric nodes.',
    },
    'Kanto-Johto Unified Plate': {
      types: ['Electric', 'Psychic', 'Flying'],
      desc: 'Stabilized modern continental crust with rich piezoelectric ore veins and high tropospheric jet streams.',
    },
    'Hoenn Volcanic Subplate': {
      types: ['Fire', 'Water', 'Ground'],
      desc: 'Subduction volcanic zone marked by Mount Chimney caldera activity and surrounding coral atolls.',
    },
    'Sinnoh Northern Shield': {
      types: ['Ice', 'Steel', 'Rock'],
      desc: 'Precambrian granite shield capped by perpetual permafrost and subterranean metallic ore corridors.',
    },
    'Kalos Continental Shelf': {
      types: ['Fairy', 'Dragon', 'Psychic'],
      desc: 'Limestone karst plateau with subterranean mineral springs emitting radiant bio-luminescent frequencies.',
    },
    'Paldean Iberian Plate': {
      types: ['Fighting', 'Bug', 'Electric'],
      desc: 'Meseta plateau encircling the Great Crater, characterized by high-salinity rock cliffs and conductive crystalline sediment.',
    },
    'Area Zero Temporal Vortex': {
      types: ['Dragon', 'Electric', 'Fighting'],
      desc: 'Non-Euclidean gravitational and temporal singularity where primordial paradox beasts and future metallic units converge.',
    },
  };
};
