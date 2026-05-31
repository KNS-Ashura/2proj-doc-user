/* Power Quest — données de jeu extraites du projet Godot (source de vérité). */
window.PQ_DATA = {
  economy: {
    startGold: 100,
    bonusPerSite: 2,
    regionCaptureGold: 60,
  },

  siteLevels: [
    { lvl: 1, income: 2, hp: 500, prod: "×1.00", cost: "—" },
    { lvl: 2, income: 3, hp: 700, prod: "×0.85 (15% plus rapide)", cost: "200 or" },
    { lvl: 3, income: 5, hp: 1000, prod: "×0.70 (30% plus rapide)", cost: "350 or" },
  ],

  ai: [
    { id: "SIMPLE", label: "Débutant", think: "0.5 s", squads: 1, build: "×0.75", desc: "Compositions simples, tirage aléatoire, peu d'améliorations." },
    { id: "NORMAL", label: "Intermédiaire", think: "0.4 s", squads: 2, build: "×1.0", desc: "Compositions équilibrées, soigneurs de camp, améliorations régulières." },
    { id: "HARD", label: "Expert", think: "0.3 s", squads: 3, build: "×1.5", desc: "5 compositions variées, jusqu'à 3 escouades simultanées, améliore les gardiens à bas PV." },
  ],

  maps: [
    {
      id: 1, name: "Undead Land", fr: "Terres Mortes", emblem: "assets/maps/map1.png",
      accent: "emerald",
      theme: "Marécages hantés et ruines envahies par une énergie verte spectrale.",
      regions: [
        { id: 1, name: "Region 1", sites: ["camp12", "port3", "port4", "camp8"] },
        { id: 2, name: "Region 2", sites: ["camp7", "camp6", "camp5", "camp4", "camp9", "camp", "port7", "port2"] },
        { id: 3, name: "Region 3", sites: ["camp13", "camp11", "camp3", "camp2", "camp10", "port", "port6", "port5"] },
      ],
    },
    {
      id: 2, name: "Desert Land", fr: "Terres Désertiques", emblem: "assets/maps/map2.png",
      accent: "amber",
      theme: "Dunes brûlantes, oasis et ruines antiques. Certaines zones du Sud sont des îles séparées.",
      regions: [
        { id: 1, name: "Northwest Region", sites: ["camp10", "camp3", "camp4", "camp6", "camp5", "port4", "port1"] },
        { id: 2, name: "East Region", sites: ["camp11", "camp8", "camp2", "port5", "port2"] },
        { id: 3, name: "South Region", sites: ["camp13", "camp12", "camp1", "camp7", "camp9", "port6", "port7", "port3"] },
      ],
      note: "Îlots séparés dans la région Sud : camp12, camp13 et port6 ne sont pas reliés à pied au continent — il faut un transport maritime.",
    },
    {
      id: 3, name: "Glowing Cave", fr: "Caverne Cristalline", emblem: "assets/maps/map3.png",
      accent: "cyan",
      theme: "Grottes souterraines illuminées par des cristaux bleus luminescents.",
      regions: [
        { id: 1, name: "Upper Cavern", sites: ["camp10", "camp9", "camp7", "port1", "port5", "port2"] },
        { id: 2, name: "Crystal Depths", sites: ["camp6", "camp5", "camp2", "camp1", "camp12", "camp13", "camp3", "port6", "port7"] },
        { id: 3, name: "Lower Grotto", sites: ["camp11", "camp8", "camp4", "port4", "port3"] },
      ],
    },
  ],

  units: [
    {
      key: "infantry", fr: "Infanterie", domain: "Terre", hotkey: "1", icon: "assets/units/infantry.png",
      accent: "emerald",
      role: "Mêlée polyvalente",
      desc: "Combattant de première ligne polyvalent, économique et fiable.",
      levels: [
        { price: 50, hp: 100, dmg: 10, range: 40, speed: 150, build: 5.0 },
        { price: 65, hp: 130, dmg: 13, range: 45, speed: 160, build: 4.5 },
        { price: 80, hp: 165, dmg: 16, range: 50, speed: 170, build: 4.0 },
      ],
    },
    {
      key: "archer", fr: "Archer", domain: "Terre", hotkey: "2", icon: "assets/units/archer.png",
      accent: "sky", ranged: true,
      role: "Distance",
      desc: "Attaquant à distance avec une bonne portée.",
      levels: [
        { price: 80, hp: 80, dmg: 8, range: 180, speed: 130, build: 6.0 },
        { price: 95, hp: 105, dmg: 11, range: 205, speed: 138, build: 5.4 },
        { price: 115, hp: 130, dmg: 14, range: 230, speed: 146, build: 4.8 },
      ],
    },
    {
      key: "heavy", fr: "Lourd", domain: "Terre", hotkey: "3", icon: "assets/units/heavy.png",
      accent: "rose",
      role: "Tank / Front",
      desc: "Unité lente mais très blindée. Encaisse les coups en première ligne.",
      levels: [
        { price: 150, hp: 300, dmg: 15, range: 30, speed: 90, build: 10.0 },
        { price: 180, hp: 380, dmg: 19, range: 35, speed: 95, build: 9.0 },
        { price: 220, hp: 470, dmg: 23, range: 40, speed: 100, build: 8.0 },
      ],
    },
    {
      key: "support", fr: "Soutien", domain: "Terre", hotkey: "4", icon: "assets/units/support.png",
      accent: "amber",
      role: "Buff",
      desc: "Renforce les alliés proches au combat.",
      spell: { name: "Boost", info: "Alliés dans 150 px : +25% vitesse, +25% dégâts, +25% cadence. Durée 20 / 30 / 40 s selon le niveau. Recharge 60 s." },
      levels: [
        { price: 100, hp: 120, dmg: 5, range: 40, speed: 140, build: 8.0 },
        { price: 120, hp: 145, dmg: 6, range: 45, speed: 146, build: 7.2 },
        { price: 140, hp: 175, dmg: 8, range: 50, speed: 152, build: 6.5 },
      ],
    },
    {
      key: "healer", fr: "Soigneur", domain: "Terre", hotkey: "5", icon: "assets/units/healer.png",
      accent: "teal",
      role: "Soin",
      desc: "Soigne les alliés blessés sur la durée.",
      spell: { name: "Soin", info: "Rend invulnérables les alliés proches (150 px) pendant 10 / 15 / 20 s. Recharge 60 s. Soin passif : ~10 / 13 / 16 PV par tir sur l'allié le plus faible." },
      levels: [
        { price: 100, hp: 80, dmg: 0, range: 120, speed: 140, build: 8.0 },
        { price: 120, hp: 105, dmg: 0, range: 140, speed: 145, build: 7.2 },
        { price: 140, hp: 130, dmg: 0, range: 160, speed: 150, build: 6.5 },
      ],
    },
    {
      key: "anti_armor", fr: "Anti-armure", domain: "Terre", hotkey: "6", icon: "assets/units/anti_armor.png",
      accent: "orange",
      role: "Anti-tank",
      desc: "Spécialiste contre les cibles blindées.",
      spell: { name: "Brise-armure", info: "Marque l'ennemi le plus résistant dans 150 / 180 / 210 px : il subit ×2 dégâts pendant 10 / 12 / 14 s. Recharge 60 s." },
      levels: [
        { price: 90, hp: 90, dmg: 8, range: 45, speed: 160, build: 7.0 },
        { price: 110, hp: 120, dmg: 11, range: 48, speed: 165, build: 6.5 },
        { price: 130, hp: 150, dmg: 14, range: 52, speed: 170, build: 6.0 },
      ],
    },
    {
      key: "mortar", fr: "Mortier", domain: "Terre", hotkey: "7", icon: "assets/units/mortar.png",
      accent: "violet", ranged: true,
      role: "Artillerie de zone",
      desc: "Artillerie longue portée infligeant des dégâts de zone.",
      spell: { name: "Mortier Ult", info: "Frappe 1 / 2 / 3 ennemis proches pour ×1.75 dégâts (rayon 130 px). Recharge 60 s. Attaque normale : explosions de zone, poison au niv. II, feu au niv. III." },
      levels: [
        { price: 200, hp: 60, dmg: 58, range: 250, speed: 80, build: 15.0 },
        { price: 240, hp: 80, dmg: 75, range: 275, speed: 88, build: 13.0 },
        { price: 290, hp: 105, dmg: 95, range: 300, speed: 96, build: 11.0 },
      ],
    },
    {
      key: "water_transport", fr: "Transport maritime", domain: "Mer", hotkey: "8", icon: "assets/units/water_transport.png",
      accent: "sky",
      role: "Transport",
      desc: "Transporte les unités terrestres sur l'eau.",
      spell: { name: "Embarquer / Débarquer", info: "Embarque les unités terrestres proches (150 px). Capacité : 5 / 8 / 11 unités. Recharge 30 s. Indispensable pour atteindre les îles." },
      levels: [
        { price: 180, hp: 400, dmg: 5, range: 30, speed: 80, build: 12.0 },
        { price: 220, hp: 520, dmg: 7, range: 32, speed: 85, build: 11.0 },
        { price: 260, hp: 650, dmg: 9, range: 35, speed: 90, build: 10.0 },
      ],
    },
    {
      key: "water_tank", fr: "Char maritime", domain: "Mer", hotkey: "9", icon: "assets/units/water_tank.png",
      accent: "blue",
      role: "Assaut naval",
      desc: "Unité d'assaut blindée navale.",
      levels: [
        { price: 160, hp: 320, dmg: 16, range: 32, speed: 85, build: 10.0 },
        { price: 195, hp: 400, dmg: 20, range: 36, speed: 90, build: 9.0 },
        { price: 235, hp: 490, dmg: 24, range: 40, speed: 95, build: 8.0 },
      ],
    },
    {
      key: "water_range", fr: "Archer maritime", domain: "Mer", hotkey: "0", icon: "assets/units/water_range.png",
      accent: "cyan", ranged: true,
      role: "Distance navale",
      desc: "Unité navale à distance pour le littoral.",
      levels: [
        { price: 90, hp: 85, dmg: 9, range: 190, speed: 125, build: 6.0 },
        { price: 105, hp: 110, dmg: 12, range: 215, speed: 132, build: 5.4 },
        { price: 125, hp: 135, dmg: 15, range: 240, speed: 140, build: 4.8 },
      ],
    },
    {
      key: "guardian", fr: "Gardien", domain: "Défense", hotkey: "—", icon: "assets/units/guardian.png",
      accent: "slate", notBuildable: true,
      role: "Défenseur de site",
      desc: "Défenseur apparaissant automatiquement sur chaque camp / port. Non productible. Le vaincre capture le site. Défend dans un rayon de 260 px (poursuite 320 px).",
      levels: [
        { price: 0, hp: 500, dmg: 22, range: 50, speed: 95, build: 1.0 },
        { price: 0, hp: 680, dmg: 28, range: 55, speed: 105, build: 1.0 },
        { price: 0, hp: 900, dmg: 36, range: 60, speed: 115, build: 1.0 },
      ],
    },
  ],
};
