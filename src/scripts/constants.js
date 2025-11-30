export const settings = {
  Revolusi: 1,
  Rotasi: 1,
  CahayaMatahari: 1.9
};

export const planetData = {
  'Mercury': {
    radius: '2.439,7 km',
    tilt: '0,034°',
    rotation: '58,6 hari Bumi',
    orbit: '88 hari Bumi',
    distance: '57,9 juta km',
    moons: '0',
    info: 'Planet terkecil di tata surya kita dan terdekat dengan Matahari.'
  },
  'Venus': {
    radius: '6.051,8 km',
    tilt: '177,4°',
    rotation: '243 hari Bumi',
    orbit: '225 hari Bumi',
    distance: '108,2 juta km',
    moons: '0',
    info: 'Planet kedua dari Matahari, dikenal dengan suhu ekstrem dan atmosfer tebalnya.'
  },
  'Earth': {
    radius: '6.371 km',
    tilt: '23,5°',
    rotation: '24 jam',
    orbit: '365 hari',
    distance: '150 juta km',
    moons: '1 (Bulan)',
    info: 'Planet ketiga dari Matahari dan satu-satunya planet yang diketahui memiliki kehidupan.'
  },
  'Mars': {
    radius: '3.389,5 km',
    tilt: '25,19°',
    rotation: '1,03 hari Bumi',
    orbit: '687 hari Bumi',
    distance: '227,9 juta km',
    moons: '2 (Phobos dan Deimos)',
    info: 'Dikenal sebagai Planet Merah, terkenal dengan penampilannya yang kemerahan dan potensi untuk kolonisasi manusia.'
  },
  'Jupiter': {
    radius: '69.911 km',
    tilt: '3,13°',
    rotation: '9,9 jam',
    orbit: '12 tahun Bumi',
    distance: '778,5 juta km',
    moons: '95 bulan yang diketahui (Ganymede, Callisto, Europa, Io adalah 4 yang terbesar)',
    info: 'Planet terbesar di tata surya kita, dikenal dengan Bintik Merah Besarnya.'
  },
  'Saturn': {
    radius: '58.232 km',
    tilt: '26,73°',
    rotation: '10,7 jam',
    orbit: '29,5 tahun Bumi',
    distance: '1,4 miliar km',
    moons: '146 bulan yang diketahui',
    info: 'Dibedakan oleh sistem cincinnya yang luas, planet terbesar kedua di tata surya kita.'
  },
  'Uranus': {
    radius: '25.362 km',
    tilt: '97,77°',
    rotation: '17,2 jam',
    orbit: '84 tahun Bumi',
    distance: '2,9 miliar km',
    moons: '27 bulan yang diketahui',
    info: 'Dikenal dengan rotasi menyamping yang unik dan warna biru pucatnya.'
  },
  'Neptune': {
    radius: '24.622 km',
    tilt: '28,32°',
    rotation: '16,1 jam',
    orbit: '165 tahun Bumi',
    distance: '4,5 miliar km',
    moons: '14 bulan yang diketahui',
    info: 'Planet terjauh dari Matahari di tata surya kita, dikenal dengan warna biru tuanya.'
  },
};

export const satelliteData = {
  'Mercury': [],
  'Venus': [],
  'Earth': [
    {
      name: 'Bulan',
      radius: '1.737,4 km',
      distance: '384.400 km dari Bumi',
      orbit: '27,3 hari',
      info: 'Satu-satunya satelit alami Bumi. Bulan adalah satelit terbesar kelima di tata surya.'
    }
  ],
  'Mars': [
    {
      name: 'Phobos',
      radius: '11,3 km',
      distance: '9.376 km dari Mars',
      orbit: '7,7 jam',
      info: 'Satelit terbesar Mars, bergerak sangat cepat mengelilingi planet induknya.'
    },
    {
      name: 'Deimos',
      radius: '6,2 km',
      distance: '23.463 km dari Mars',
      orbit: '30,3 jam',
      info: 'Satelit terkecil Mars, memiliki permukaan yang lebih halus dibanding Phobos.'
    }
  ],
  'Jupiter': [
    {
      name: 'Io',
      radius: '1.821,6 km',
      distance: '421.700 km dari Jupiter',
      orbit: '1,77 hari',
      info: 'Satelit dengan aktivitas vulkanik paling aktif di tata surya.'
    },
    {
      name: 'Europa',
      radius: '1.560,8 km',
      distance: '671.034 km dari Jupiter',
      orbit: '3,55 hari',
      info: 'Memiliki samudra di bawah permukaan es, kandidat potensial untuk kehidupan.'
    },
    {
      name: 'Ganymede',
      radius: '2.634,1 km',
      distance: '1.070.412 km dari Jupiter',
      orbit: '7,15 hari',
      info: 'Satelit terbesar di tata surya, bahkan lebih besar dari planet Merkurius.'
    },
    {
      name: 'Callisto',
      radius: '2.410,3 km',
      distance: '1.882.709 km dari Jupiter',
      orbit: '16,69 hari',
      info: 'Satelit dengan kawah paling banyak di tata surya, permukaannya sangat tua.'
    }
  ],
  'Saturn': [
    {
      name: 'Titan',
      radius: '2.574,7 km',
      distance: '1.221.870 km dari Saturn',
      orbit: '15,95 hari',
      info: 'Satelit terbesar kedua di tata surya, memiliki atmosfer tebal seperti Bumi.'
    },
    {
      name: 'Rhea',
      radius: '763,8 km',
      distance: '527.108 km dari Saturn',
      orbit: '4,52 hari',
      info: 'Satelit terbesar kedua Saturn, terdiri sebagian besar dari es air.'
    },
    {
      name: 'Iapetus',
      radius: '734,5 km',
      distance: '3.560.820 km dari Saturn',
      orbit: '79,33 hari',
      info: 'Memiliki satu sisi terang dan satu sisi gelap, fenomena yang masih misterius.'
    }
  ],
  'Uranus': [
    {
      name: 'Titania',
      radius: '788,4 km',
      distance: '435.910 km dari Uranus',
      orbit: '8,71 hari',
      info: 'Satelit terbesar Uranus dengan ngarai dan kawah yang dalam.'
    },
    {
      name: 'Oberon',
      radius: '761,4 km',
      distance: '583.520 km dari Uranus',
      orbit: '13,46 hari',
      info: 'Satelit terjauh dari planet induknya di antara satelit besar Uranus.'
    },
    {
      name: 'Umbriel',
      radius: '584,7 km',
      distance: '266.000 km dari Uranus',
      orbit: '4,14 hari',
      info: 'Satelit tergelap Uranus dengan permukaan yang hampir seragam.'
    }
  ],
  'Neptune': [
    {
      name: 'Triton',
      radius: '1.353,4 km',
      distance: '354.759 km dari Neptunus',
      orbit: '5,88 hari',
      info: 'Satelit terbesar Neptunus, berotasi berlawanan arah dengan planet induknya.'
    },
    {
      name: 'Proteus',
      radius: '210 km',
      distance: '117.647 km dari Neptunus',
      orbit: '1,12 hari',
      info: 'Satelit terbesar kedua Neptunus, bentuknya tidak bulat sempurna.'
    }
  ]
};
