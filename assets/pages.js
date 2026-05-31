/* Power Quest — rendus de pages pilotés par les données. */
(function () {
  "use strict";
  const D = window.PQ_DATA;
  const A = window.PQ_ACCENTS;
  const roman = ["I", "II", "III"];

  function unitStatsTable(u) {
    const rows = u.levels.map((l, i) => `
      <tr>
        <td class="font-semibold text-white">Niv. ${roman[i]}</td>
        <td>${l.hp}</td>
        <td>${l.dmg}</td>
        <td>${l.range}</td>
        <td>${l.speed}</td>
        <td>${l.build}s</td>
        <td>${u.notBuildable ? "—" : l.price + " or"}</td>
      </tr>`).join("");
    return `<div class="mt-4 overflow-x-auto">
      <table class="w-full text-sm">
        <thead><tr>
          <th>Niveau</th><th>PV</th><th>Dégâts</th><th>Portée</th><th>Vitesse</th><th>Prod.</th><th>Prix</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table></div>`;
  }

  function unitCard(u) {
    const ac = A[u.accent] || A.slate;
    const spell = u.spell ? `
      <div class="mt-4 rounded-none border-2 border-[var(--parchment-edge)] bg-[var(--parchment-dark)]/50 p-3.5">
        <div class="flex items-center gap-2">
          <i data-lucide="sparkles" class="h-4 w-4 ${ac.text}"></i>
          <span class="font-semibold text-white">${u.spell.name}</span>
        </div>
        <p class="mt-1.5 leading-relaxed text-slate-400">${u.spell.info}</p>
      </div>` : "";
    const badges = `
      <span class="${ac.chip} pq-pixel-chip px-2.5 py-0.5 text-[11px] font-medium">${u.domain}</span>
      ${u.ranged ? '<span class="pq-pixel-chip border border-[var(--parchment-edge)] bg-[var(--parchment-mid)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--ink-muted)]">Distance</span>' : ''}
      ${u.notBuildable ? '<span class="pq-pixel-chip border border-[var(--parchment-edge)] bg-[var(--parchment-mid)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--ink-muted)]">Non productible</span>' : ''}`;
    return `<div class="pq-card pq-card-h p-5" data-reveal id="unit-${u.key}">
      <div class="flex items-start gap-4">
        <div class="grid h-24 w-24 shrink-0 place-items-center border border-[var(--border)] bg-[var(--bg)]/60" style="box-shadow:inset 0 0 30px ${ac.glow}">
          <img src="${u.icon}" alt="${u.fr}" class="pixel h-20 w-20 object-contain" style="filter:drop-shadow(0 6px 10px rgba(0,0,0,.55))">
        </div>
        <div class="min-w-0 flex-1">
          <div class="flex flex-wrap items-center gap-2">
            <h3 class="font-display text-2xl font-semibold text-white">${u.fr}</h3>
            <span class="ml-auto inline-flex items-center gap-1 text-sm text-slate-500">touche
              <kbd>${u.hotkey}</kbd>
            </span>
          </div>
          <div class="mt-1.5 flex flex-wrap items-center gap-1.5">${badges}</div>
          <p class="mt-2 text-base font-medium ${ac.text}">${u.role}</p>
          <p class="mt-1 leading-relaxed text-slate-400">${u.desc}</p>
        </div>
      </div>
      ${unitStatsTable(u)}
      ${spell}
    </div>`;
  }

  function renderUnitsInto(containerId, list) {
    const c = document.getElementById(containerId);
    if (!c) return;
    c.innerHTML = list.map(unitCard).join("");
  }

  window.PQ_PAGES = {
    units: function () {
      const land = D.units.filter(u => u.domain === "Terre");
      const sea = D.units.filter(u => u.domain === "Mer");
      const def = D.units.filter(u => u.domain === "Défense");
      renderUnitsInto("units-land", land);
      renderUnitsInto("units-sea", sea);
      renderUnitsInto("units-def", def);
    },

    maps: function () {
      const c = document.getElementById("maps-grid");
      if (!c) return;
      c.innerHTML = D.maps.map(m => {
        const ac = A[m.accent] || A.cyan;
        const totalSites = m.regions.reduce((s, r) => s + r.sites.length, 0);
        const camps = m.regions.reduce((s, r) => s + r.sites.filter(x => x.startsWith("camp")).length, 0);
        const ports = totalSites - camps;
        const regs = m.regions.map(r => `<li><span class="${ac.text} font-medium">${r.name}</span> — ${r.sites.length} sites</li>`).join("");
        return `<div class="pq-card pq-card-h overflow-hidden" data-reveal>
          <div class="relative grid h-36 place-items-center border-b border-[var(--parchment-edge)] bg-[var(--bg)]/50" style="box-shadow:inset 0 -40px 60px -30px ${ac.glow}">
            <img src="${m.emblem}" alt="${m.name}" class="pixel h-24 w-auto max-w-[85%] object-contain" style="filter:drop-shadow(0 8px 14px rgba(0,0,0,.45))">
            <span class="absolute left-3 top-3 ${ac.chip} pq-pixel-chip px-2.5 py-0.5 text-[11px] font-semibold">Carte ${m.id}</span>
          </div>
          <div class="p-5">
            <h3 class="font-display text-lg font-semibold text-white">${m.fr}</h3>
            <p class="text-xs text-slate-500">${m.name}</p>
            <p class="mt-2 text-[13px] leading-relaxed text-slate-400">${m.theme}</p>
            <div class="mt-3 flex gap-2 text-center text-xs">
              <div class="flex-1 border border-[var(--border)] bg-[var(--surface2)]/50 py-2"><div class="text-base font-bold text-white">${camps}</div><div class="text-slate-500">camps</div></div>
              <div class="flex-1 border border-[var(--border)] bg-[var(--surface2)]/50 py-2"><div class="text-base font-bold text-white">${ports}</div><div class="text-slate-500">ports</div></div>
              <div class="flex-1 border border-[var(--border)] bg-[var(--surface2)]/50 py-2"><div class="text-base font-bold text-white">3</div><div class="text-slate-500">régions</div></div>
            </div>
            <ul class="mt-3 space-y-1 text-[13px] text-slate-400">${regs}</ul>
            ${m.note ? `<p class="mt-3 border-2 border-amber-800/25 bg-amber-100/80 p-2.5 text-[12px] leading-relaxed text-amber-950">${m.note}</p>` : ""}
          </div>
        </div>`;
      }).join("");
    },

    index: function () {
      const roster = document.getElementById("home-roster");
      if (roster) {
        roster.innerHTML = D.units.map(u => {
          const ac = A[u.accent] || A.slate;
          return `<a href="units.html#unit-${u.key}" title="${u.fr}" class="pq-roster-item" style="--roster-glow:${ac.glow}">
            <img src="${u.icon}" alt="${u.fr}" class="pixel pq-roster-img">
            <span class="pq-roster-name">${u.fr}</span>
          </a>`;
        }).join("");
      }
    },
  };
})();
