/* Power Quest — documentation (DA grimoire / book menu du jeu). */

(function () {

  "use strict";



  const NAV = [

    {

      group: "Démarrer",

      accent: "gold",

      items: [

        { id: "index", label: "Accueil", href: "index.html", icon: "home" },

      ],

    },

    {

      group: "Le jeu",

      accent: "crimson",

      items: [

        { id: "commands", label: "Commandes", href: "commands.html", icon: "keyboard" },

        { id: "units", label: "Unités", href: "units.html", icon: "swords" },

        { id: "camps", label: "Camps & Ports", href: "camps.html", icon: "castle" },

        { id: "levels", label: "Système de niveaux", href: "levels.html", icon: "layers" },

        { id: "regions", label: "Système de régions", href: "regions.html", icon: "map" },

        { id: "maps", label: "Cartes", href: "maps.html", icon: "globe" },

      ],

    },

    {

      group: "Multijoueur",

      accent: "azure",

      items: [

        { id: "online", label: "Jeu en ligne", href: "online.html", icon: "wifi" },

      ],

    },

  ];



  const ACCENTS = {

    emerald: { text: "text-emerald-800", ring: "ring-emerald-700/25", chip: "bg-emerald-700/12 text-emerald-900 ring-1 ring-emerald-800/20", glow: "rgba(52,120,80,.2)" },

    cyan: { text: "text-cyan-900", ring: "ring-cyan-800/25", chip: "bg-cyan-800/10 text-cyan-950 ring-1 ring-cyan-900/20", glow: "rgba(30,100,120,.18)" },

    sky: { text: "text-sky-900", ring: "ring-sky-800/25", chip: "bg-sky-800/10 text-sky-950 ring-1 ring-sky-900/20", glow: "rgba(40,90,130,.18)" },

    blue: { text: "text-blue-900", ring: "ring-blue-800/25", chip: "bg-blue-800/10 text-blue-950 ring-1 ring-blue-900/20", glow: "rgba(40,70,140,.18)" },

    amber: { text: "text-amber-900", ring: "ring-amber-800/25", chip: "bg-amber-700/12 text-amber-950 ring-1 ring-amber-900/20", glow: "rgba(160,110,30,.2)" },

    orange: { text: "text-orange-900", ring: "ring-orange-800/25", chip: "bg-orange-700/12 text-orange-950 ring-1 ring-orange-900/20", glow: "rgba(160,80,30,.2)" },

    teal: { text: "text-teal-900", ring: "ring-teal-800/25", chip: "bg-teal-700/12 text-teal-950 ring-1 ring-teal-900/20", glow: "rgba(30,110,100,.18)" },

    violet: { text: "text-violet-900", ring: "ring-violet-800/25", chip: "bg-violet-700/12 text-violet-950 ring-1 ring-violet-900/20", glow: "rgba(90,60,130,.18)" },

    rose: { text: "text-rose-900", ring: "ring-rose-800/25", chip: "bg-rose-700/12 text-rose-950 ring-1 ring-rose-900/20", glow: "rgba(140,50,70,.18)" },

    slate: { text: "text-stone-800", ring: "ring-stone-700/25", chip: "bg-stone-700/10 text-stone-900 ring-1 ring-stone-800/20", glow: "rgba(80,70,60,.15)" },

  };

  window.PQ_ACCENTS = ACCENTS;



  function icon(name, cls) {

    return `<i data-lucide="${name}" class="${cls || "h-4 w-4"}"></i>`;

  }



  function loadLucide(done) {

    if (window.lucide) { done(); return; }

    const s = document.createElement("script");

    s.src = "https://unpkg.com/lucide@latest/dist/umd/lucide.min.js";

    s.onload = done;

    document.head.appendChild(s);

  }



  function renderLucide(root) {

    if (!window.lucide) return;

    window.lucide.createIcons({

      attrs: { "stroke-width": "1.75" },

      root: root || document,

    });

  }



  function injectStyles() {

    const link = document.createElement("link");

    link.rel = "stylesheet";

    link.href = "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap";

    document.head.appendChild(link);

    const theme = document.createElement("link");
    theme.rel = "stylesheet";
    theme.href = "assets/theme.css";
    document.head.appendChild(theme);

    const css = `

    @font-face{

      font-family:'PQ Pixel';

      src:url('assets/fonts/m5x7.ttf') format('truetype');

      font-display:swap;

    }

    @font-face{

      font-family:'PQ Display';

      src:url('assets/fonts/Jersey10-Regular.ttf') format('truetype');

      font-display:swap;

    }

    :root{

      --ink:#623d20;

      --ink-muted:#7a5638;

      --ink-light:#a5825d;

      --parchment:#ebe2cc;

      --parchment-mid:#e3d6b8;

      --parchment-dark:#d4c49a;

      --parchment-edge:#b9a67a;

      --leather:#2a1810;

      --leather-mid:#3d2914;

      --bookmark:#7a2424;

      --bookmark-hi:#9e3232;

      --shadow-book:0 18px 50px -12px rgba(20,12,6,.55);

      --bg:var(--parchment-dark);

      --bg2:var(--parchment-mid);

      --surface:#faf6ea;

      --surface2:var(--parchment-mid);

      --border:var(--parchment-edge);

      --border2:var(--ink-light);

      --text:var(--ink);

      --muted:var(--ink-muted);

    }

    *{ scrollbar-color:#a5825d transparent; }

    ::-webkit-scrollbar{ width:10px; height:10px; }

    ::-webkit-scrollbar-thumb{ background:#a5825d; border-radius:8px; border:2px solid transparent; background-clip:content-box; }

    html{ scroll-behavior:smooth; }

    body.pq-body{

      margin:0;

      min-height:100vh;

      color:var(--ink);

      font-family:Georgia,'Times New Roman',serif;

      -webkit-font-smoothing:antialiased;

      background:#1a120c url('assets/bg/menu.png') center center / cover fixed no-repeat;

    }

    body.pq-body::before{

      content:'';

      position:fixed; inset:0;

      background:linear-gradient(180deg, rgba(20,12,6,.72), rgba(26,18,12,.88) 40%, rgba(20,12,6,.94));

      pointer-events:none;

      z-index:0;

    }

    #pq-root{ position:relative; z-index:1; min-height:100vh; display:flex; flex-direction:column; }



    .font-display{ font-family:'Cinzel',serif; }

    .font-pixel{ font-family:'PQ Pixel',monospace; letter-spacing:.04em; }

    .font-game{ font-family:'PQ Display',sans-serif; }

    .pixel{ image-rendering:pixelated; image-rendering:crisp-edges; }



    /* —— En-tête grimoire —— */

    .pq-book-header{

      flex-shrink:0;

      border-bottom:4px solid var(--leather);

      background:linear-gradient(180deg, rgba(42,24,16,.97), rgba(30,18,10,.99));

      box-shadow:0 8px 24px rgba(0,0,0,.45);

    }

    .pq-book-header-inner{

      max-width:1180px;

      margin:0 auto;

      padding:.65rem 1rem .75rem;

      display:flex;

      align-items:center;

      gap:1rem;

      flex-wrap:wrap;

    }

    .pq-brand{

      display:flex; align-items:center; gap:.75rem;

      text-decoration:none; color:#f4e8d8;

    }

    .pq-brand-mark{

      width:52px; height:52px;

      background:url('assets/book/open-book.png') center/contain no-repeat;

      filter:drop-shadow(0 4px 8px rgba(0,0,0,.5));

    }

    .pq-brand-title{

      font-family:'PQ Display',sans-serif;

      font-size:1.65rem;

      line-height:1;

      color:#f0dcc0;

      text-shadow:2px 2px 0 var(--leather), 0 0 20px rgba(200,150,80,.25);

    }

    .pq-brand-sub{

      font-family:'PQ Pixel',monospace;

      font-size:.72rem;

      color:var(--ink-light);

      margin-top:.15rem;

    }

    .pq-banner-strip{

      flex:1;

      min-width:140px;

      max-width:420px;

      height:48px;

      margin:0 auto;

      background:url('assets/book/title.png') center / contain no-repeat;

      opacity:.92;

    }

    .pq-header-actions{ display:flex; align-items:center; gap:.5rem; margin-left:auto; }



    /* —— Boutons style menu —— */

    .pq-btn{

      display:inline-flex; align-items:center; justify-content:center; gap:.4rem;

      font-family:'PQ Pixel',monospace;

      font-size:.78rem;

      font-weight:400;

      padding:.55rem 1rem;

      border:2px solid var(--leather-mid);

      border-radius:4px;

      color:var(--ink);

      background:linear-gradient(180deg, #f2e6c8, var(--parchment-mid) 45%, var(--parchment-dark));

      box-shadow:inset 0 1px 0 rgba(255,255,255,.35), 0 3px 0 var(--leather-mid);

      transition:transform .12s, filter .12s;

      text-decoration:none;

    }

    .pq-btn:hover{ filter:brightness(1.04); transform:translateY(-1px); }

    .pq-btn:active{ transform:translateY(2px); box-shadow:inset 0 1px 0 rgba(255,255,255,.2), 0 1px 0 var(--leather-mid); }

    .pq-btn-primary{

      color:#f8edd8;

      border-color:#4a1818;

      background:linear-gradient(180deg, #b84a4a, var(--bookmark-hi) 50%, var(--bookmark));

      box-shadow:inset 0 1px 0 rgba(255,200,180,.25), 0 3px 0 #4a1818;

    }

    .pq-btn-ghost{

      background:transparent;

      border-color:var(--ink-light);

      color:#e8dcc4;

      box-shadow:none;

    }

    .pq-btn-ghost:hover{ background:rgba(255,255,255,.06); }



    /* —— Layout livre —— */

    .pq-book-stage{

      flex:1;

      max-width:1180px;

      width:100%;

      margin:1.25rem auto 2rem;

      padding:0 1rem;

      display:flex;

      align-items:flex-start;

      gap:0;

    }



    /* Signets (sidebar) */

    .pq-bookmarks{

      width:3.25rem;

      flex-shrink:0;

      display:none;

      flex-direction:column;

      gap:.35rem;

      padding-top:.5rem;

    }

    @media (min-width:1024px){ .pq-bookmarks{ display:flex; } }



    .pq-bookmark-group{

      margin-top:.75rem;

    }

    .pq-bookmark-group:first-child{ margin-top:0; }

    .pq-bookmark-group-label{

      writing-mode:vertical-rl;

      transform:rotate(180deg);

      font-family:'PQ Pixel',monospace;

      font-size:.55rem;

      color:rgba(232,220,196,.45);

      text-align:center;

      margin:.5rem auto .35rem;

      letter-spacing:.08em;

    }



    .pq-bookmark{

      display:flex;

      align-items:center;

      gap:0;

      text-decoration:none;

      position:relative;

      padding-left:.15rem;

      transition:transform .2s ease;

    }

    .pq-bookmark:hover{ transform:translateX(4px); }

    .pq-bookmark.is-active{ transform:translateX(10px); z-index:2; }



    .pq-bookmark-tab{

      width:2.75rem;

      min-height:3.1rem;

      display:flex;

      align-items:center;

      justify-content:center;

      background:linear-gradient(90deg, #5c1c1c, var(--bookmark) 35%, var(--bookmark-hi));

      border:2px solid #4a1818;

      border-right:none;

      border-radius:6px 0 0 6px;

      box-shadow:-3px 3px 8px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,180,150,.15);

      color:#f5e0d0;

    }

    .pq-bookmark.is-active .pq-bookmark-tab{

      background:linear-gradient(90deg, #8b3030, #b84848 40%, #c85858);

      box-shadow:-4px 4px 12px rgba(0,0,0,.4), inset 0 0 12px rgba(255,200,160,.12);

    }

    .pq-bookmark-tab svg.lucide{ stroke:#f8e8d8; color:#f8e8d8; width:1rem; height:1rem; }



    .pq-bookmark-label{

      position:absolute;

      left:100%;

      top:50%;

      transform:translateY(-50%);

      margin-left:.5rem;

      padding:.25rem .5rem;

      font-family:'PQ Pixel',monospace;

      font-size:.65rem;

      white-space:nowrap;

      background:rgba(42,24,16,.92);

      color:#f0e0c8;

      border:1px solid var(--ink-light);

      border-radius:4px;

      opacity:0;

      pointer-events:none;

      transition:opacity .15s;

      z-index:10;

    }

    .pq-bookmark:hover .pq-bookmark-label,

    .pq-bookmark.is-active .pq-bookmark-label{ opacity:1; }



    /* Page parchemin */

    .pq-page{

      flex:1;

      min-width:0;

      background:

        linear-gradient(90deg, rgba(160,130,80,.12), transparent 3%, transparent 97%, rgba(120,90,50,.1)),

        linear-gradient(180deg, #f5edd8, var(--parchment) 8%, var(--parchment-mid));

      border:4px solid var(--leather-mid);

      border-radius:2px 10px 10px 2px;

      box-shadow:var(--shadow-book), inset 0 0 80px rgba(180,150,90,.12);

      position:relative;

    }

    .pq-page::before{

      content:'';

      position:absolute;

      left:0; top:0; bottom:0;

      width:14px;

      background:linear-gradient(90deg, rgba(60,40,20,.18), transparent);

      pointer-events:none;

      border-radius:2px 0 0 2px;

    }

    .pq-page::after{

      content:'';

      position:absolute;

      right:12px; bottom:12px;

      width:min(140px, 28vw);

      height:min(140px, 28vw);

      background:url('assets/book/open-book.png') right bottom/contain no-repeat;

      opacity:.07;

      pointer-events:none;

    }

    .pq-page-inner{

      padding:1.5rem 1.25rem 2rem;

    }

    @media (min-width:640px){ .pq-page-inner{ padding:2rem 2.25rem 2.5rem; } }



    /* Mobile menu */

    #pq-menu-btn{

      display:inline-flex;

      align-items:center;

      justify-content:center;

      width:2.25rem; height:2.25rem;

      border:2px solid var(--ink-light);

      border-radius:4px;

      color:#e8dcc4;

      background:rgba(0,0,0,.2);

    }

    @media (min-width:1024px){ #pq-menu-btn{ display:none; } }



    #pq-drawer .pq-drawer-panel{

      background:linear-gradient(180deg, #f5edd8, var(--parchment));

      border-right:4px solid var(--leather-mid);

    }

    #pq-drawer .nav-link{

      font-family:'PQ Pixel',monospace;

      font-size:.75rem;

      color:var(--ink);

      border-radius:4px;

    }

    #pq-drawer .nav-link.active{

      background:var(--parchment-dark);

      color:var(--leather);

      box-shadow:inset 3px 0 0 var(--bookmark);

    }



    /* Nav mobile / fallback dans drawer */

    .nav-link{

      display:flex; align-items:center; gap:.5rem;

      padding:.5rem .65rem;

      border-radius:4px;

      font-family:'PQ Pixel',monospace;

      font-size:.72rem;

      color:var(--ink-muted);

      text-decoration:none;

      transition:background .15s, color .15s;

    }

    .nav-link:hover{ background:rgba(98,61,32,.08); color:var(--ink); }

    .nav-link.active{

      background:var(--parchment-dark);

      color:var(--ink);

      box-shadow:inset 3px 0 0 var(--bookmark);

    }

    .nav-link svg.lucide{ stroke:var(--ink-muted); width:1rem; height:1rem; }

    .nav-link.active svg.lucide{ stroke:var(--bookmark); }



    /* —— Typographie contenu —— */

    #doc-content{ max-width:none; margin:0; width:100%; }

    #doc-content h1{

      font-family:'Cinzel',serif;

      font-weight:700;

      font-size:2rem;

      line-height:1.15;

      color:var(--leather);

      margin:0 0 .35rem;

      text-shadow:1px 1px 0 rgba(255,255,255,.4);

    }

    #doc-content h2{

      font-family:'Cinzel',serif;

      font-weight:600;

      font-size:1.45rem;

      color:var(--leather-mid);

      margin:2.2rem 0 .85rem;

      padding-bottom:.45rem;

      border-bottom:2px solid var(--parchment-edge);

      scroll-margin-top:100px;

    }

    #doc-content h3{

      font-family:'Cinzel',serif;

      font-weight:600;

      font-size:1.1rem;

      color:var(--ink);

      margin:1.5rem 0 .55rem;

      scroll-margin-top:100px;

    }

    #doc-content h3.pq-h3-icon{ display:flex; align-items:center; gap:.45rem; }

    #doc-content h3.pq-h3-icon svg.lucide{ width:1.1rem; height:1.1rem; flex-shrink:0; color:var(--bookmark); stroke:var(--bookmark); }

    #doc-content p{ color:var(--ink-muted); line-height:1.8; margin:.65rem 0; }
    #doc-content .pq-hero-lead{ text-align:center; margin-left:auto; margin-right:auto; max-width:36rem; }

    #doc-content a:not(.pq-btn):not(.pq-card){

      color:var(--leather-mid);

      font-weight:600;

      text-decoration:underline;

      text-decoration-color:var(--ink-light);

      text-underline-offset:3px;

    }

    #doc-content a:not(.pq-btn):not(.pq-card):hover{ color:var(--bookmark); }

    #doc-content ul,#doc-content ol{ color:var(--ink-muted); line-height:1.75; margin:.65rem 0; padding-left:1.3rem; }

    #doc-content ul li{ margin:.25rem 0; list-style:disc; }

    #doc-content ol li{ margin:.4rem 0; }

    #doc-content strong{ color:var(--ink); font-weight:700; }

    #doc-content code{

      font-family:'PQ Pixel',monospace;

      font-size:.78em;

      background:var(--parchment-dark);

      color:var(--leather);

      padding:.1em .4em;

      border-radius:3px;

      border:1px solid var(--parchment-edge);

    }

    #doc-content kbd{

      font-family:'PQ Pixel',monospace;

      font-size:.75em;

      background:linear-gradient(180deg,#faf5e8,var(--parchment-mid));

      color:var(--ink);

      padding:.18em .5em;

      border-radius:3px;

      border:2px solid var(--leather-mid);

      box-shadow:0 2px 0 var(--parchment-edge);

      display:inline-block;

      min-width:1.5em;

      text-align:center;

    }

    #doc-content hr{ border:0; border-top:2px solid var(--parchment-edge); margin:1.75rem 0; }

    #doc-content table{

      width:100%;

      border-collapse:separate;

      border-spacing:0;

      font-size:.88rem;

      margin:1rem 0;

      border:2px solid var(--parchment-edge);

      border-radius:6px;

      overflow:hidden;

      background:#faf6ea;

    }

    #doc-content thead th{

      background:var(--parchment-dark);

      color:var(--leather);

      font-family:'PQ Pixel',monospace;

      font-weight:400;

      font-size:.72rem;

      text-align:left;

      padding:.65rem .85rem;

      text-transform:uppercase;

      letter-spacing:.05em;

    }

    #doc-content tbody td{

      padding:.6rem .85rem;

      border-top:1px solid var(--parchment-edge);

      color:var(--ink-muted);

    }

    #doc-content tbody tr:hover td{ background:rgba(212,196,154,.25); }



    .pq-card{

      background:linear-gradient(180deg, #faf6ea, var(--parchment-mid));

      border:2px solid var(--parchment-edge);

      border-radius:6px;

      box-shadow:inset 0 1px 0 rgba(255,255,255,.5), 0 4px 14px rgba(60,40,20,.08);

      color:var(--ink-muted);

    }

    .pq-card h3,.pq-card .text-white{ color:var(--ink) !important; }

    .pq-card .text-slate-400,.pq-card .text-slate-500,.pq-card p{ color:var(--ink-muted) !important; }

    .pq-card-h{ transition:border-color .2s, transform .2s, box-shadow .2s; }

    .pq-card-h:hover{

      border-color:var(--ink-light);

      transform:translateY(-2px);

      box-shadow:inset 0 1px 0 rgba(255,255,255,.5), 0 8px 22px rgba(60,40,20,.12);

    }



    .pq-hero{

      position:relative;

      margin:-1.5rem -1.25rem 1.75rem;

      padding:1.5rem 1.25rem 1.75rem;

      border-bottom:2px solid var(--parchment-edge);

      overflow:hidden;

    }

    @media (min-width:640px){ .pq-hero{ margin:-2rem -2.25rem 2rem; padding:2rem 2.25rem 2rem; } }

    .pq-hero-bg{

      position:absolute; inset:0;

      opacity:.35;

    }

    .pq-hero-bg img{

      width:100%; height:100%;

      object-fit:cover;

      object-position:center;

    }

    .pq-hero-overlay{

      position:absolute; inset:0;

      background:linear-gradient(105deg, rgba(245,237,216,.92) 0%, rgba(235,226,204,.78) 45%, rgba(227,214,184,.55) 100%);

    }

    .pq-hero-body{ position:relative; }

    .pq-hero .pq-chip{

      display:inline-flex; align-items:center; gap:.4rem;

      font-family:'PQ Pixel',monospace;

      font-size:.68rem;

      padding:.3rem .65rem;

      border:2px solid var(--parchment-edge);

      background:var(--parchment-dark);

      color:var(--ink);

      border-radius:0;

    }

    .pq-hero h1{ font-size:2.2rem; }

    @media (min-width:640px){ .pq-hero h1{ font-size:2.6rem; } }



    .text-cyan-300,.text-cyan-200{ color:var(--bookmark) !important; }
    #doc-content .font-semibold.text-white,#doc-content .text-white{ color:var(--ink) !important; }
    #doc-content .text-slate-300,#doc-content .text-slate-400,#doc-content .text-slate-500{ color:var(--ink-muted) !important; }
    #doc-content .text-emerald-300{ color:#2d6a4f !important; }
    #doc-content .text-amber-200\\/90,#doc-content [class*="text-amber"]{ color:#7c4a12 !important; }
    .pq-roster a{
      border:3px solid var(--parchment-edge) !important;
      background:var(--parchment-mid) !important;
      border-radius:0;
    }
    .pq-roster a:hover{ border-color:var(--ink-light) !important; }

    .pq-page footer{

      margin-top:2.5rem;

      padding-top:1rem;

      border-top:2px solid var(--parchment-edge);

      font-family:'PQ Pixel',monospace;

      font-size:.65rem;

      color:var(--ink-light);

    }



    .grid-overlay{

      background-image:linear-gradient(rgba(98,61,32,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(98,61,32,.04) 1px,transparent 1px);

      background-size:28px 28px;

    }

    [data-reveal]{ opacity:0; transform:translateY(8px); transition:opacity .45s ease, transform .45s ease; }

    [data-reveal].in{ opacity:1; transform:none; }

    `;

    const style = document.createElement("style");

    style.textContent = css;

    document.head.appendChild(style);

  }



  function iconRailHTML(active) {
    return NAV.flatMap(g => g.items).map(it => {
      const on = it.id === active;
      return `<a href="${it.href}" class="pq-rail-link ${on ? "is-active" : ""}" title="${it.label}" aria-label="${it.label}">
        ${icon(it.icon, "h-5 w-5")}
      </a>`;
    }).join("");
  }



  const PLAY_URL = "https://powerquest.robinmatelot.codes/";

  function drawerNavHTML(active) {

    const mobileActions = `
      <div class="pq-drawer-actions">
        <a href="${PLAY_URL}" class="pq-btn pq-btn-primary pq-drawer-action" target="_blank" rel="noopener noreferrer">${icon("wifi")}<span>Jouer en ligne</span></a>
        <a href="units.html" class="pq-btn pq-drawer-action">Bestiaire</a>
      </div>`;

    return mobileActions + NAV.map(g => {

      const items = g.items.map(it => {

        const on = it.id === active;

        return `<a href="${it.href}" class="nav-link ${on ? "active" : ""}">${icon(it.icon)}<span>${it.label}</span></a>`;

      }).join("");

      return `<div class="mb-4">

        <div class="pq-nav-group-title">${g.group}</div>

        <nav class="flex flex-col gap-0.5">${items}</nav>

      </div>`;

    }).join("");

  }



  function brandHTML(compact) {

    const sub = compact ? "" : `<span class="pq-brand-sub">Guide joueur</span>`;

    return `<a href="index.html" class="pq-brand">

      <span class="pq-brand-book" aria-hidden="true"></span>

      <span>

        <span class="pq-brand-title">POWER QUEST</span>

        ${sub}

      </span>

    </a>`;

  }



  function buildShell() {

    const active = document.body.getAttribute("data-page") || "";

    const tpl = document.getElementById("doc");

    const content = tpl ? tpl.innerHTML : "";



    const shell = `

    <header class="pq-header">

      <div class="pq-header-inner">

        <button id="pq-menu-btn" class="pq-menu-toggle" aria-label="Menu">

          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>

        </button>

        ${brandHTML(false)}

        <div class="pq-header-actions">

          <a href="${PLAY_URL}" class="pq-btn pq-btn-header pq-btn-ghost pq-header-play" target="_blank" rel="noopener noreferrer">Jouer en ligne</a>

          <a href="units.html" class="pq-btn pq-btn-header pq-btn-primary pq-header-bestiary">Bestiaire</a>

        </div>

      </div>

    </header>



    <div class="pq-stage">

      <div class="pq-book">

        <nav class="pq-icon-rail" aria-label="Navigation">${iconRailHTML(active)}</nav>

        <div class="pq-parchment">

          <div id="doc-content">${content}</div>

          <footer class="pq-footer">

            <span>Power Quest — Documentation joueur</span>

          </footer>

        </div>

      </div>

    </div>



    <div id="pq-drawer" class="pq-drawer" aria-hidden="true">

      <div id="pq-overlay" class="pq-drawer-overlay"></div>

      <div class="pq-drawer-panel">

        <div class="mb-4 flex items-center justify-between gap-2">

          ${brandHTML(true)}

          <button id="pq-close-btn" class="pq-btn !p-2" aria-label="Fermer"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>

        </div>

        ${drawerNavHTML(active)}

      </div>

    </div>`;



    document.body.classList.add("pq-body");

    const root = document.createElement("div");

    root.id = "pq-root";

    root.innerHTML = shell;

    document.body.appendChild(root);

    if (tpl) tpl.remove();

  }



  function wireMenu() {

    const drawer = document.getElementById("pq-drawer");

    const open = () => {

      if (!drawer) return;

      drawer.classList.add("is-open");

      drawer.setAttribute("aria-hidden", "false");

      document.body.classList.add("pq-menu-open");

    };

    const close = () => {

      if (!drawer) return;

      drawer.classList.remove("is-open");

      drawer.setAttribute("aria-hidden", "true");

      document.body.classList.remove("pq-menu-open");

    };

    document.getElementById("pq-menu-btn")?.addEventListener("click", open);

    document.getElementById("pq-close-btn")?.addEventListener("click", close);

    document.getElementById("pq-overlay")?.addEventListener("click", close);

    drawer?.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));

    document.addEventListener("keydown", (e) => {

      if (e.key === "Escape") close();

    });

  }



  function wireReveal() {

    const els = document.querySelectorAll("[data-reveal]");

    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }

    const io = new IntersectionObserver((entries) => {

      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });

    }, { threshold: 0.08 });

    els.forEach(e => io.observe(e));

  }



  function runPageRenderer() {

    const page = document.body.getAttribute("data-page");

    if (window.PQ_PAGES && typeof window.PQ_PAGES[page] === "function") {

      try { window.PQ_PAGES[page](); } catch (e) { console.error(e); }

    }

    renderLucide(document.getElementById("doc-content"));

    renderLucide(document.querySelector(".pq-icon-rail"));

    renderLucide(document.getElementById("pq-drawer"));

  }



  document.addEventListener("DOMContentLoaded", function () {

    injectStyles();

    buildShell();

    loadLucide(function () {

      renderLucide();

      runPageRenderer();

      wireMenu();

      wireReveal();

    });

  });

})();


