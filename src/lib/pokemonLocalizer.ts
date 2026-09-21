import { PokemonChronoEntry, Language } from '../types';

// ===================================================================
// TYPE TRANSLATIONS
// ===================================================================
export const TYPE_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    Normal: 'Normal', Fire: 'Fire', Water: 'Water', Grass: 'Grass', Electric: 'Electric',
    Ice: 'Ice', Fighting: 'Fighting', Poison: 'Poison', Ground: 'Ground', Flying: 'Flying',
    Psychic: 'Psychic', Bug: 'Bug', Rock: 'Rock', Ghost: 'Ghost', Dragon: 'Dragon',
    Steel: 'Steel', Dark: 'Dark', Fairy: 'Fairy'
  },
  id: {
    Normal: 'Normal', Fire: 'Api', Water: 'Air', Grass: 'Rumput', Electric: 'Listrik',
    Ice: 'Es', Fighting: 'Petarung', Poison: 'Racun', Ground: 'Tanah', Flying: 'Terbang',
    Psychic: 'Psikis', Bug: 'Serangga', Rock: 'Batu', Ghost: 'Hantu', Dragon: 'Naga',
    Steel: 'Baja', Dark: 'Gelap', Fairy: 'Peri'
  },
  ja: {
    Normal: 'ノーマル', Fire: 'ほのお', Water: 'みず', Grass: 'くさ', Electric: 'でんき',
    Ice: 'こおり', Fighting: 'かくとう', Poison: 'どく', Ground: 'じめん', Flying: 'ひこう',
    Psychic: 'エスパー', Bug: 'むし', Rock: 'いわ', Ghost: 'ゴースト', Dragon: 'ドラゴン',
    Steel: 'はがね', Dark: 'あく', Fairy: 'フェアリー'
  }
};

// ===================================================================
// EPOCH & TIME ERA TRANSLATIONS
// ===================================================================
const EPOCH_NAMES: Record<Language, Record<string, string>> = {
  en: {
    'Primordial Poké-Pangea': 'Primordial Poké-Pangea',
    'Mesozoic Continental Fracture': 'Mesozoic Continental Fracture',
    'Feudal Antiquity / Era of Hisui': 'Feudal Antiquity / Era of Hisui',
    'Victorian & Modern Oceanic Era': 'Victorian & Modern Oceanic Era',
    'Paradox Temporal Horizon': 'Paradox Temporal Horizon',
  },
  id: {
    'Primordial Poké-Pangea': 'Poké-Pangea Primordial',
    'Mesozoic Continental Fracture': 'Fraktur Benua Mesozoikum',
    'Feudal Antiquity / Era of Hisui': 'Era Feodal Kuno / Zaman Hisui',
    'Victorian & Modern Oceanic Era': 'Era Oseanik Victoria & Modern',
    'Paradox Temporal Horizon': 'Horizon Temporal Paradoks',
  },
  ja: {
    'Primordial Poké-Pangea': '始原ポケパンゲア大陸',
    'Mesozoic Continental Fracture': '中生代大陸断裂期',
    'Feudal Antiquity / Era of Hisui': '封建古代・ヒスイの時代',
    'Victorian & Modern Oceanic Era': 'ヴィクトリア朝博物誌・海洋現代',
    'Paradox Temporal Horizon': 'パラドックス時間地平',
  }
};

const TIME_LABELS: Record<Language, Record<string, string>> = {
  en: {
    '300 Million Years Ago': '300 Million Years Ago',
    '100 Million Years Ago': '100 Million Years Ago',
    '3,000 Years Ago': '3,000 Years Ago',
    'Contemporary Era (Present Day)': 'Contemporary Era',
    'Contemporary Era': 'Contemporary Era',
    'Unknown Future Era': 'Unknown Future Era',
  },
  id: {
    '300 Million Years Ago': '300 Juta Tahun Lalu',
    '100 Million Years Ago': '100 Juta Tahun Lalu',
    '3,000 Years Ago': '3.000 Tahun Lalu',
    'Contemporary Era (Present Day)': 'Era Kontemporer',
    'Contemporary Era': 'Era Kontemporer',
    'Unknown Future Era': 'Masa Depan Tak Terbatas',
  },
  ja: {
    '300 Million Years Ago': '3億年前',
    '100 Million Years Ago': '1億年前',
    '3,000 Years Ago': '3,000年前',
    'Contemporary Era (Present Day)': '現代',
    'Contemporary Era': '現代',
    'Unknown Future Era': '未知の未来年代',
  }
};

const TECTONIC_EVENTS: Record<Language, Record<string, string>> = {
  en: {
    'Deep Area Zero Temporal Fracture': 'Deep Area Zero Temporal Fracture',
    'Establishment of the 9 Global Oceanic & Continental Regions': 'Establishment of the 9 Global Oceanic & Continental Regions',
    'Formation of Mount Coronet & Sacred Snowfields': 'Formation of Mount Coronet & Sacred Snowfields',
    'Rifting of Kanto-Johto landbridge from the Hoenn Volcanic Ridge': 'Rifting of Kanto-Johto landbridge from the Hoenn Volcanic Ridge',
    'Universal Pangaean Supercontinent ruled by Primal Titans': 'Universal Pangaean Supercontinent ruled by Primal Titans',
  },
  id: {
    'Deep Area Zero Temporal Fracture': 'Fraktur Temporal Ruang Dalam Area Zero',
    'Establishment of the 9 Global Oceanic & Continental Regions': 'Pembentukan 9 Wilayah Kepulauan & Benua Global',
    'Formation of Mount Coronet & Sacred Snowfields': 'Orogenesis Gunung Coronet & Padang Salju Sakral',
    'Rifting of Kanto-Johto landbridge from the Hoenn Volcanic Ridge': 'Pemekaran Jembatan Daratan Kanto-Johto dari Punggung Vulkanik Hoenn',
    'Universal Pangaean Supercontinent ruled by Primal Titans': 'Superbenua Pangea Purba yang Dikuasai Titan Primal',
  },
  ja: {
    'Deep Area Zero Temporal Fracture': 'エリアゼロ深部時空断裂',
    'Establishment of the 9 Global Oceanic & Continental Regions': '9大海洋・大陸諸島プレートの確立',
    'Formation of Mount Coronet & Sacred Snowfields': 'テンガン山形成と神聖雪原の隆起',
    'Rifting of Kanto-Johto landbridge from the Hoenn Volcanic Ridge': 'ホウエン火山海嶺からのカントー・ジョウト地峡分裂',
    'Universal Pangaean Supercontinent ruled by Primal Titans': '原始のタイタンが統治した始原超大陸パンゲア',
  }
};

// ===================================================================
// OSTEOLOGY SKELETON NAMES & DESCRIPTIONS
// ===================================================================
const SKELETON_NAMES: Record<Language, Record<string, string>> = {
  en: {},
  id: {
    'Quadrupedal Saurian Skeleton': 'Kerangka Sauria Berkaki Empat',
    'Bipedal Tail-Supported Frame': 'Kerangka Bipedal Bertopang Ekor',
    'Insectoid Thoracic Casing': 'Cangkang Toraks Insektoid',
    'Serpentine Vertebral Column': 'Kolom Vertebra Serpentin',
    'Multi-Winged Aerofoil System': 'Sistem Aerofoil Multi-Sayap',
    'Pneumatic Avian Skeleton': 'Kerangka Avian Berongga Udara',
    'Tentacular Hydrostatic Skeleton': 'Kerangka Hidrostatis Tentakel',
    'Bipedal Upright Endoskeleton': 'Endoskeleton Tegak Bipedal',
    'Quadrupedal Mammalian Skeleton': 'Kerangka Mamalia Berkaki Empat',
    'Multi-Body Symmetrical Node': 'Nodus Simetris Multi-Tubuh',
    'Ectoplasmic / Amorphous Fluid Matrix': 'Matriks Fluida Ektoplasmik / Amorf',
    'Articulated Chitinous Exoskeleton': 'Eksoskeleton Kitin Berartikulasi',
    'Vertebrate Piscine Fins': 'Rangka Sirip Ikan Vertebrata',
    'Spherical Cartilage': 'Tulang Rawan Sferis Elastis',
  },
  ja: {
    'Quadrupedal Saurian Skeleton': '四肢歩行型竜脚類骨格',
    'Bipedal Tail-Supported Frame': '尾部支持型直立二足骨格',
    'Insectoid Thoracic Casing': '昆虫型胸部甲殻骨格',
    'Serpentine Vertebral Column': '蛇状多節連続脊椎列',
    'Multi-Winged Aerofoil System': '多翼式翼梁エアフォイル構造',
    'Pneumatic Avian Skeleton': '超軽量含気性鳥類骨格',
    'Tentacular Hydrostatic Skeleton': '無骨性触手静水力学筋肉系',
    'Bipedal Upright Endoskeleton': '直立二足歩行型内骨格',
    'Quadrupedal Mammalian Skeleton': '四肢重加重型哺乳類骨格',
    'Multi-Body Symmetrical Node': '多体対称結合骨格ノード',
    'Ectoplasmic / Amorphous Fluid Matrix': '非石灰化エクトプラズム流体マトリックス',
    'Articulated Chitinous Exoskeleton': '多層鉱物化キチン質関節外骨格',
    'Vertebrate Piscine Fins': '流体推進型魚類軟骨骨格',
    'Spherical Cartilage': '高弾性球状軟骨クッション構造',
  }
};

const SKELETON_DESCRIPTIONS: Record<Language, Record<string, string>> = {
  en: {},
  id: {
    'Dense cortical bone matrix with reinforced osteoderms embedded in dermis.':
      'Matriks tulang kortikal padat dengan osteoderma penguat yang tertanam kokoh di dalam lapisan dermis.',
    'Elastic spherical core with dense shock-absorbent lipid cushions.':
      'Inti sferis elastis dengan bantalan lipid padat penyerap hentakan benturan fisik ekstrem.',
    'Elongated femur and spine with shock-absorbing intervertebral discs.':
      'Femur dan tulang belakang memanjang dilengkapi bantalan diskus intervertebralis peredam beban dinamis.',
    'Extended spine with up to 400 articulated flexible vertebrae for undulating locomotion.':
      'Tulang belakang memanjang hingga 400 vertebra fleksibel untuk lokomosi undulasi lincah di darat dan air.',
    'Heavy pelvic anchor with counterbalance caudal vertebrae for upright posture.':
      'Jangkar pelvis masif dengan vertebra kaudal penyeimbang untuk menopang postur tegak berkekuatan tinggi.',
    'Hollow, honeycombed air-filled bones offering ultra-lightweight structural rigidity.':
      'Tulang berongga menyerupai sarang lebah yang sangat ringan namun memiliki rigiditas struktural tinggi.',
    'Hydrodynamic cartilage ribs and lateral spines supporting fluid propulsion.':
      'Tulang rusuk kartilago hidrodinamis dan duri lateral penopang dorongan propulsi cairan berkecepatan tinggi.',
    'Lightweight strut-braced wing spars designed for high-frequency vibration.':
      'Gelagar sayap bertopang ringan yang dirancang khusus untuk osilasi getaran berkecepatan tinggi.',
    'Multi-layered mineralized chitin plates with hollow hydraulic limb cylinders.':
      'Lempeng kitin berlapis yang termineralisasi dengan silinder tungkai hidrolik internal bertenaga tinggi.',
    'Muscular hydrostat arms with autonomous peripheral reflex rings; zero internal bones.':
      'Lengan hidrostatis berotot dengan cincin refleks otonom perifer; bebas dari tulang internal terkalsifikasi.',
    'Poly-segmented skeletal cores linked by central neurological ganglia.':
      'Inti rangka terpolarisasi banyak segmen yang dihubungkan secara harmonis oleh simpul ganglia saraf pusat.',
    'Stout scapula and pelvic girdles designed for sustained terrestrial weight-bearing.':
      'Gelang skapula dan panggul kokoh yang dirancang untuk menahan beban terestrial berkepanjangan tanpa lelah.',
    'Three-part chitinous exoskeleton with internal apodeme tendon attachment points.':
      'Eksoskeleton kitin tiga bagian dengan titik perlekatan tendon apodeme internal berkekuatan tarik tinggi.',
    'Zero calcified bones; shape maintained by electromagnetic aura and colloid cohesion.':
      'Nol tulang terkalsifikasi; morfologi tubuh dipertahankan oleh medan aura elektromagnetik dan kohesi koloid.',
  },
  ja: {}
};

// ===================================================================
// PRIMARY & SECONDARY ORGANS
// ===================================================================
const ORGAN_NAMES: Record<Language, Record<string, string>> = {
  en: {},
  id: {
    'Adaptive Homeostatic Spleen': 'Limpa Homeostatis Adaptif',
    'Aetheric Resonance Core': 'Inti Resonansi Eterik',
    'Chlorophyllin Siphon Network': 'Jaringan Sifon Klorofilin',
    'Ectoplasmic Gravity Node': 'Nodus Gravitasi Ektoplasmik',
    'Electrocyte Bio-Battery': 'Bio-Baterai Elektrosit',
    'Endothermic Cryo-Gland': 'Kelenjar Krio Endotermik',
    'Ferritic Magnetite Dermis': 'Dermis Magnetit Feritik',
    'Hydro-Osmotic Reservoir': 'Reservoir Hidro-Osmotik',
    'Hypertrophic Pineal Lens': 'Lensa Pineal Hipertrofik',
    'Litho-Stratified Tergites': 'Tergit Terstratifikasi Lito',
    'Myoglobin Hyper-Vascular Mesh': 'Anyaman Hiper-Vaskular Mioglobin',
    'Photon-Absorptive Melanophore': 'Melanofor Penyerap Foton',
    'Pneumatic Clavicular Air-Sacs': 'Kantung Udara Klavikula Pneumatik',
    'Primordial Draco-Draconis Valve': 'Katup Purba Drako-Drakonis',
    'Pyro-Vesicle Chamber': 'Ruang Piro-Vesikel',
    'Sub-Dermal Quartz Lattice': 'Kisi Kuarsa Sub-Dermal',
    'Tracheal Spiracle Ventilation': 'Ventilasi Spirakel Trakea',
    'Venomous Peptide Synthesizer': 'Synthesizer Peptida Berbisa',
  },
  ja: {
    'Adaptive Homeostatic Spleen': '適応型恒常性維持脾臓',
    'Aetheric Resonance Core': 'エーテル共鳴生体結晶炉',
    'Chlorophyllin Siphon Network': '葉緑素サイフォン循環導管網',
    'Ectoplasmic Gravity Node': 'エクトプラズム重力特異点節',
    'Electrocyte Bio-Battery': '発電細胞生体蓄電ブロック',
    'Endothermic Cryo-Gland': '吸熱性極低温凝縮腺',
    'Ferritic Magnetite Dermis': '磁性フェライト合金真皮',
    'Hydro-Osmotic Reservoir': '高圧浸透圧調整肺嚢貯水器官',
    'Hypertrophic Pineal Lens': '肥大化松果体波導集束レンズ',
    'Litho-Stratified Tergites': '珪酸塩積層生体結晶甲殻',
    'Myoglobin Hyper-Vascular Mesh': '超高密度ミオグロビン筋血管網',
    'Photon-Absorptive Melanophore': '光子吸収型黒色真皮色素胞',
    'Pneumatic Clavicular Air-Sacs': '鎖骨間通気性気嚢呼吸器官',
    'Primordial Draco-Draconis Valve': '始原竜門生体反応弁',
    'Pyro-Vesicle Chamber': '胸部火炎小胞揮発油分泌室',
    'Sub-Dermal Quartz Lattice': '皮下水晶格子放電接地板',
    'Tracheal Spiracle Ventilation': '筋肉直結型微細気門呼吸弁',
    'Venomous Peptide Synthesizer': '強酸性神経毒ペプチド合成器官',
  }
};

const ORGAN_DESCRIPTIONS: Record<Language, Record<string, string>> = {
  en: {},
  id: {
    'Adaptive Homeostatic Spleen':
      'Sistem organ berkemampuan adaptasi tinggi yang mengalibrasi ulang keseimbangan metabolik di iklim dan pola makan ekstrem.',
    'Aetheric Resonance Core':
      'Bio-kristal emosional berdenyut yang selaras dengan frekuensi psikis sekitar, menetralkan agresi energi naga liar.',
    'Chlorophyllin Siphon Network':
      'Jaringan vaskular botani simbiotik yang mengedarkan getah fotosintetik, menyintesis energi surya via osmosis dermal.',
    'Ectoplasmic Gravity Node':
      'Pusat spektral titik-nol yang menangguhkan materi fisik melalui anomali gravitasi bergeser fase.',
    'Electrocyte Bio-Battery':
      'Kolom sel elektrosit terpolarisasi di kantung pipi atau jambul dorsal, melepaskan gradien ion hingga 10.000 volt.',
    'Endothermic Cryo-Gland':
      'Katup plasma khusus penyerap energi panas dari kelembapan sekitar, membekukan uap air menjadi perisai kristal es seketika.',
    'Ferritic Magnetite Dermis':
      'Lapisan paduan besi-karbon penyembuh mandiri dari asupan mineral, dengan kekuatan tarik melampaui titanium murni.',
    'Hydro-Osmotic Reservoir':
      'Kantong paru-paru kompresibel penyimpan air laut terfiltrasi tinggi, bertekanan kompresi otot toraks.',
    'Hypertrophic Pineal Lens':
      'Organ epitalamus membesar yang memfokuskan gelombang otak alfa dan teta menjadi medan gaya kinetik nyata.',
    'Litho-Stratified Tergites':
      'Matriks kristal hidup yang memadukan silika dan mineral granit sekitar menjadi perisai dermal beregenerasi konstan.',
    'Myoglobin Hyper-Vascular Mesh':
      'Serat otot merah padat dengan hemoglobin afinitas oksigen rangkap tiga, siap untuk keluaran eksplosif anaerobik berdaya tahan tinggi.',
    'Photon-Absorptive Melanophore':
      'Sel pigmen dermal penangkap 99% cahaya tampak, menyamarkan pergerakan serta memancarkan frekuensi ultrasonik intimidatif.',
    'Pneumatic Clavicular Air-Sacs':
      'Reservoir udara pernapasan interkoneksi yang mereduksi bobot tubuh seraya menjaga aliran udara paru-paru searah tanpa henti.',
    'Primordial Draco-Draconis Valve':
      'Reaktor biologis genetik kuno yang menyalurkan energi bebas sekitar menjadi semburan gelombang napas destruktif terkonsentrasi.',
    'Pyro-Vesicle Chamber':
      'Sepasang kelenjar toraks penghasil minyak volatil hiper-reaktif, terpicu percikan piezoelektrik saat ekshalasi hembusan.',
    'Sub-Dermal Quartz Lattice':
      'Lempeng mineral pembumi di sepanjang garis ventral, membuang pelepasan muatan listrik secara aman ke tanah.',
    'Tracheal Spiracle Ventilation':
      'Katup pernapasan lateral mikroskopis yang mengalirkan oksigen langsung ke apodeme otot tanpa bergantung pada pembuluh darah.',
    'Venomous Peptide Synthesizer':
      'Organ sekretori berlapis asam penghasil neurotoksin kompleks dan enzim dermatolitik tanpa mengikis jaringan internal tubuh.',
  },
  ja: {}
};

// ===================================================================
// DERMIS (LAYER 1) DESCRIPTIONS
// ===================================================================
const DERMIS_DESCRIPTIONS: Record<Language, Record<string, string>> = {
  en: {},
  id: {
    'Conductive dermal sheath embedded with microscopic metallic mineral deposits, grounding high-voltage internal surges.':
      'Selubung dermal konduktif dengan deposit mineral logam mikroskopis, membumikan lonjakan tegangan tinggi internal secara stabil.',
    'Hydrophobic dermal layer coated in slippery glycoprotein mucus that reduces turbulent boundary drag during high-speed swimming.':
      'Lapisan dermal hidrofobik berlapis lendir glikoprotein licin yang mengurangi hambatan turbulensi hidrodinamis saat melesat di air.',
    'Multi-tiered porous cuticle interlaced with photosynthetic chloroplast chambers, absorbing sunlight and atmospheric humidity.':
      'Kutikula berpori bertingkat yang terjalin dengan ruang kloroplas fotosintetik, menyerap cahaya matahari dan kelembapan atmosfer.',
    'Thermal-resistant keratinized scales capable of withstanding ambient temperatures exceeding 800°C without denaturing.':
      'Sisik terkeratinisasi tahan panas tinggi yang sanggup bertahan pada suhu lingkungan melebihi 800°C tanpa denaturasi protein.',
  },
  ja: {}
};

// ===================================================================
// CURATED NATURALIST FIELD LOGS (INDONESIAN)
// ===================================================================
const CURATED_FIELD_LOGS: Record<number, string> = {
  1: 'Saat masih muda, ia menggunakan nutrisi organik yang tersimpan di dalam benih punggungnya untuk memacu metamorfosis pertumbuhan.',
  2: 'Paparan sinar matahari langsung mempercepat sirkulasi getah fotosintetik dan merangsang kuncup bunga di punggungnya mekar membesar.',
  3: 'Aroma memikat yang menguar dari bunganya mampu memengaruhi sistem saraf makhluk sekitar, meredakan agresi dalam pertempuran.',
  4: 'Sejak menetas, nyala api menyala konstan di ujung ekornya sebagai bio-indikator vitalitas kehidupan; api padam menandakan kematian.',
  5: 'Bila terpicu kemarahan teritorial, ia menyemburkan lidah api bersuhu ribuan derajat celcius yang sanggup mengabukan vegetasi sekitar.',
  6: 'Rentang sayap membranousnya sanggup membawanya terbang melampaui ketinggian 1.400 meter seraya meluncurkan semburan api pelebur bebatuan.',
  7: 'Ketika mendeteksi ancaman predator, ia menarik seluruh tungkainya ke dalam tempurung kalsifikasi dan menyemburkan air bertekanan tinggi.',
  8: 'Mengendalikan sepasang telinga berbulu dan ekornya secara presisi sebagai hidrofoil penyeimbang navigasi di arus deras.',
  9: 'Sepasang tabung meriam roket di tempurungnya menembakkan jet air berkekuatan kompresi hidrolik yang sanggup menembus lempeng baja tebal.',
  25: 'Kantung elektrosit di kedua pipinya menyimpan muatan listrik biologis yang dapat dilepaskan dalam voltase kejut tinggi saat terdesak.',
  130: 'Memiliki struktur osteologi dan reaktor emosional hiper-reaktif; terkenal sanggup memporak-porandakan pesisir saat amarahnya bangkit.',
  138: 'Moluska purba bercangkang spiral dari era Mesozoikum yang berenang di laut purba dengan memutar tentakel hidrostatisnya secara ritmis.',
  143: 'Saluran pencernaannya yang luar biasa kuat sanggup menetralkan racun dan jamur berbahaya tanpa menimbulkan gangguan metabolik.',
  149: 'Mampu mengitari atmosfer bumi hanya dalam 16 jam, dengan konduktor kinetik penerbangan yang menjaga kecepatan jelajah supersonik.',
  150: 'Dihasilkan dari manipulasi genetik progenitor Mew, memiliki kapasitas psikis destruktif paling ekstrem dalam sejarah modern.',
  151: 'Memiliki plastisitas DNA universal yang memuat kode genetik seluruh spesies Pokémon, mampu berkamuflase sempurna tanpa terdeteksi.',
  448: 'Memanfaatkan sensor gelombang aurik untuk membaca pancaran emosi dan gerakan mangsa dari jarak lebih dari satu kilometer.',
  591: 'Menampilkan pola aposematik mirip Pokéball pada tudung jamurnya untuk memikat mangsa sebelum melepaskan spora neurotoksin pekat.',
  905: 'Entitas maternal yang melintasi awan pembawa musim semi; memancarkan energi eterik penenang yang menghentikan badai musim dingin.',
  984: 'Spesimen purba berwujud garang dengan gading masif dan pelat dermal tebal, terekam pertama kali dalam catatan Ekspedisi Kawah Area Zero.',
  1008: 'Unit futuristik siklis berkekuatan akselerasi medan partikel terpolarisasi, mampu meluncur cepat melintasi gravitasi bumi.',
};

// ===================================================================
// LOCALIZER ENGINE
// ===================================================================
export const localizePokemon = (pokemon: PokemonChronoEntry, lang: Language): PokemonChronoEntry => {
  if (lang === 'en') return pokemon;

  const typeDict = TYPE_TRANSLATIONS[lang] || TYPE_TRANSLATIONS.en;
  const localizedTypes = pokemon.types.map((t) => typeDict[t] || t);

  const rawEpochName = pokemon.epoch.epoch_name;
  const localizedEpochName = EPOCH_NAMES[lang]?.[rawEpochName] || rawEpochName;

  const rawTimeLabel = pokemon.epoch.time_label;
  const localizedTimeLabel = TIME_LABELS[lang]?.[rawTimeLabel] || rawTimeLabel;

  const rawTectonicEvent = pokemon.epoch.tectonic_event;
  const localizedTectonicEvent = TECTONIC_EVENTS[lang]?.[rawTectonicEvent] || rawTectonicEvent;

  // Dermis Layer (Layer 1)
  const primaryType = pokemon.types[0];
  const translatedPrimaryType = typeDict[primaryType] || primaryType;
  const rawDermisDesc = pokemon.anatomy.layer_1_dermis.description;
  let localizedDermisDesc = DERMIS_DESCRIPTIONS[lang]?.[rawDermisDesc];
  if (!localizedDermisDesc && lang === 'id') {
    if (rawDermisDesc.includes('outer epidermis consists of specialized')) {
      localizedDermisDesc = `Epidermis luar tersusun atas jaringan integumen seluler reaktif-${translatedPrimaryType.toLowerCase()} khusus. Dilengkapi mikro-papila pengatur pertukaran termal dan peredam abrasi lingkungan.`;
    } else {
      localizedDermisDesc = rawDermisDesc;
    }
  }

  const localizedIntegumentType =
    lang === 'id'
      ? `Membran Dermal ${translatedPrimaryType}`
      : lang === 'ja'
      ? `${translatedPrimaryType}性外皮組織`
      : pokemon.anatomy.layer_1_dermis.integument_type;

  // Osteology Layer (Layer 2)
  const rawSkeletonType = pokemon.anatomy.layer_2_osteology.skeleton_type;
  const localizedSkeletonType = SKELETON_NAMES[lang]?.[rawSkeletonType] || rawSkeletonType;
  const rawSkeletonDesc = pokemon.anatomy.layer_2_osteology.description;
  const localizedSkeletonDesc = SKELETON_DESCRIPTIONS[lang]?.[rawSkeletonDesc] || rawSkeletonDesc;

  // Elemental Core Layer (Layer 3)
  const rawPrimaryOrgan = pokemon.anatomy.layer_3_elemental_core.primary_organ;
  const localizedPrimaryOrgan = ORGAN_NAMES[lang]?.[rawPrimaryOrgan] || rawPrimaryOrgan;
  const localizedPrimaryOrganDesc =
    ORGAN_DESCRIPTIONS[lang]?.[rawPrimaryOrgan] ||
    pokemon.anatomy.layer_3_elemental_core.primary_organ_desc;

  const rawSecOrgan = pokemon.anatomy.layer_3_elemental_core.secondary_organ;
  const localizedSecOrgan = rawSecOrgan ? (ORGAN_NAMES[lang]?.[rawSecOrgan] || rawSecOrgan) : null;
  const localizedSecOrganDesc = rawSecOrgan
    ? (ORGAN_DESCRIPTIONS[lang]?.[rawSecOrgan] || pokemon.anatomy.layer_3_elemental_core.secondary_organ_desc)
    : null;

  // Tectonic Speciation Notes (Layer 4)
  let localizedSpeciationNotes = pokemon.anatomy.layer_4_geologic_speciation.speciation_notes;
  if (lang === 'id') {
    localizedSpeciationNotes = `Divergensi morfologis berlangsung selama ${localizedEpochName} ketika pergeseran tektonik mengisolasi populasi leluhur tipe ${translatedPrimaryType}, menyeleksi adaptasi spesifik pada ${localizedSkeletonType.toLowerCase()}.`;
  } else if (lang === 'ja') {
    localizedSpeciationNotes = `${localizedEpochName}におけるプレートテクトニクスの変動により、祖先的${translatedPrimaryType}タイプの個体群が隔離され、${localizedSkeletonType}への形態学的分化が生じました。`;
  }

  // Field Naturalist Log (Description)
  let localizedDescription = pokemon.description;
  if (lang === 'id') {
    if (CURATED_FIELD_LOGS[pokemon.national_id]) {
      localizedDescription = CURATED_FIELD_LOGS[pokemon.national_id];
    } else {
      localizedDescription = `Spesimen ${pokemon.genus ? pokemon.genus.replace(' Pokémon', '') : 'organik'} tipe ${localizedTypes.join('/')} dengan tinggi ${pokemon.height_m} m dan bobot ${pokemon.weight_kg} kg, teradaptasi optimal pada ceruk ekologis ${localizedEpochName}.`;
    }
  }

  return {
    ...pokemon,
    types: localizedTypes,
    description: localizedDescription,
    epoch: {
      ...pokemon.epoch,
      epoch_name: localizedEpochName,
      time_label: localizedTimeLabel,
      tectonic_event: localizedTectonicEvent,
    },
    anatomy: {
      layer_1_dermis: {
        title: lang === 'id' ? 'Lapisan I: Dermis & Integumen Kulit Luar' : lang === 'ja' ? '第I層：外皮・鱗・皮膚' : pokemon.anatomy.layer_1_dermis.title,
        integument_type: localizedIntegumentType,
        description: localizedDermisDesc || rawDermisDesc,
      },
      layer_2_osteology: {
        title: lang === 'id' ? 'Lapisan II: Osteologi & Rangka Tulang' : lang === 'ja' ? '第II層：骨格・骨密度' : pokemon.anatomy.layer_2_osteology.title,
        skeleton_type: localizedSkeletonType,
        bone_density_index: pokemon.anatomy.layer_2_osteology.bone_density_index,
        description: localizedSkeletonDesc,
      },
      layer_3_elemental_core: {
        title: lang === 'id' ? 'Lapisan III: Inti Biokimia Elemen' : lang === 'ja' ? '第III層：生化学的属性器官' : pokemon.anatomy.layer_3_elemental_core.title,
        primary_organ: localizedPrimaryOrgan,
        primary_organ_desc: localizedPrimaryOrganDesc,
        secondary_organ: localizedSecOrgan,
        secondary_organ_desc: localizedSecOrganDesc,
      },
      layer_4_geologic_speciation: {
        title: lang === 'id' ? 'Lapisan IV: Spesiasi Tektonik Benua' : lang === 'ja' ? '第IV層：地殻移動・種分化の記録' : pokemon.anatomy.layer_4_geologic_speciation.title,
        epoch_name: localizedEpochName,
        time_era: localizedTimeLabel,
        tectonic_event: localizedTectonicEvent,
        speciation_notes: localizedSpeciationNotes,
      },
    },
  };
};
