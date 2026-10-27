/* Renders the page from window.SITE (assets/data.js). No build step needed. */
(function () {
  const S = window.SITE;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Shared "more" block: details, image, links */
  function more(item) {
    const parts = [];
    if (item.details && item.details.length)
      parts.push(`<ul class="more-list">${item.details.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>`);
    if (item.image) parts.push(`<img class="more-img" src="${esc(item.image)}" alt="${esc(item.title)}" loading="lazy">`);
    if (item.links && item.links.length)
      parts.push(`<p class="more-links">${item.links.map((l) =>
        `<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("")}</p>`);
    return parts.join("");
  }

  /* ---------- Hero ---------- */
  const p = S.person;
  $("brand").textContent = p.name;
  $("hero-name").textContent = p.name.split(" ")[0];
  $("hero-intro").textContent = p.intro;
  $("hero-facts").innerHTML = [p.role, p.location, p.relocation].map((f) => `<li>${esc(f)}</li>`).join("");
  $("flow-caption").textContent = S.heroFlow.caption;

  /* ---------- Hero workflow (SVG) ---------- */
  (function drawFlow() {
    const svg = $("flow-svg");
    const NS = "http://www.w3.org/2000/svg";
    const W = 340, cx = 170, bw = 268, bh = 58, gap = 34;
    const f = S.heroFlow;
    const nodes = [];
    let y = 8;
    f.steps.forEach((s) => { nodes.push({ x: cx - bw / 2, y, w: bw, h: bh, tool: s[0], text: s[1] }); y += bh + gap; });
    const splitY = y - gap + 18;      // horizontal split line
    const brY = y + 20;               // branch boxes
    const bw2 = 150, lx = 12, rx = W - 12 - bw2;
    nodes.push({ x: lx, y: brY, w: bw2, h: bh, tool: f.branch[0][0], text: f.branch[0][1], branch: "L" });
    nodes.push({ x: rx, y: brY, w: bw2, h: bh, tool: f.branch[1][0], text: f.branch[1][1], branch: "R" });
    const mergeY = brY + bh + 18;
    const endY = mergeY + 26;
    nodes.push({ x: cx - bw / 2, y: endY, w: bw, h: bh, tool: f.end[0], text: f.end[1] });
    svg.setAttribute("viewBox", `0 0 ${W} ${endY + bh + 8}`);

    const lcx = lx + bw2 / 2, rcx = rx + bw2 / 2;
    const top = nodes[0].y + bh / 2;
    const pathFor = (bx) =>
      `M${cx} ${top} V${splitY} H${bx} V${mergeY} H${cx} V${endY + bh / 2}`;
    const pathL = pathFor(lcx), pathR = pathFor(rcx);

    const mk = (tag, attrs, parent = svg) => {
      const el = document.createElementNS(NS, tag);
      for (const k in attrs) el.setAttribute(k, attrs[k]);
      parent.appendChild(el);
      return el;
    };
    mk("path", { d: pathL, class: "wire" });
    mk("path", { d: pathR, class: "wire" });
    // decision diamond at split
    mk("rect", { x: cx - 8, y: splitY - 8, width: 16, height: 16, transform: `rotate(45 ${cx} ${splitY})`, class: "diamond" });
    const lbl = mk("text", { x: cx + 16, y: splitY - 6, class: "if-label" }); lbl.textContent = "hot lead?";
    const yes = mk("text", { x: lcx, y: splitY + 16, class: "branch-label", "text-anchor": "middle" }); yes.textContent = "yes";
    const no = mk("text", { x: rcx, y: splitY + 16, class: "branch-label", "text-anchor": "middle" }); no.textContent = "no";

    const runner = mk("circle", { r: 5.5, class: "runner", cx, cy: top });
    const guideL = mk("path", { d: pathL, fill: "none", stroke: "none" });
    const guideR = mk("path", { d: pathR, fill: "none", stroke: "none" });

    const groups = nodes.map((n) => {
      const g = mk("g", { class: "node" });
      mk("rect", { x: n.x, y: n.y, width: n.w, height: n.h, rx: 12, class: "node-box" }, g);
      mk("circle", { cx: n.x + 18, cy: n.y + n.h / 2, r: 4, class: "node-port" }, g);
      const t1 = mk("text", { x: n.x + 32, y: n.y + 24, class: "node-tool" }, g); t1.textContent = n.tool;
      const t2 = mk("text", { x: n.x + 32, y: n.y + 43, class: "node-text" }, g); t2.textContent = n.text;
      return { g, n };
    });

    if (reduced) { runner.style.display = "none"; groups.forEach((x) => x.g.classList.add("done")); $("flow-status").textContent = "Workflow"; return; }

    let branch = "L", start = null;
    const DUR = 5200;
    const status = $("flow-status");
    function frame(t) {
      if (start === null) start = t;
      const k = Math.min((t - start) / DUR, 1);
      const guide = branch === "L" ? guideL : guideR;
      const pt = guide.getPointAtLength(k * guide.getTotalLength());
      runner.setAttribute("cx", pt.x); runner.setAttribute("cy", pt.y);
      groups.forEach(({ g, n }) => {
        if (n.branch && n.branch !== branch) { g.classList.remove("active", "done"); return; }
        const inside = pt.x >= n.x && pt.x <= n.x + n.w && pt.y >= n.y && pt.y <= n.y + n.h;
        g.classList.toggle("active", inside);
        if (pt.y > n.y + n.h / 2 && !inside && pt.y >= n.y) g.classList.add("done");
      });
      if (k < 1) requestAnimationFrame(frame);
      else {
        status.textContent = branch === "L" ? "Run complete, hot lead called" : "Run complete, lead nurtured";
        setTimeout(() => {
          groups.forEach(({ g }) => g.classList.remove("done", "active"));
          branch = branch === "L" ? "R" : "L"; start = null; status.textContent = "Running";
          requestAnimationFrame(frame);
        }, 1600);
      }
    }
    // start when visible
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) { requestAnimationFrame(frame); io.disconnect(); }
    });
    io.observe(svg);
  })();

  /* ---------- Impact bars ---------- */
  $("impact").innerHTML = S.impact.map((m) => `
    <article class="imp">
      <h3>${esc(m.label)}</h3>
      <div class="imp-row"><span class="imp-tag">Before</span>
        <span class="bar bar-before" style="--w:${m.b}%"></span><span class="imp-val">${esc(m.before)}</span></div>
      <div class="imp-row"><span class="imp-tag">After</span>
        <span class="bar bar-after" style="--w:${Math.max(m.a, 1.5)}%"></span><span class="imp-val strong">${esc(m.after)}</span></div>
      <p class="imp-where">${esc(m.where)}</p>
    </article>`).join("");

  $("ledger").innerHTML = S.ledger.map((l) => `
    <div class="led">
      <p class="led-num">${esc(l.value)} <span>${esc(l.unit)}</span></p>
      <p class="led-text">${esc(l.text)}</p>
    </div>`).join("");

  /* ---------- AI builds ---------- */
  $("builds").innerHTML = S.aiBuilds.map((b) => {
    const extra = more(b);
    const body = `
      <div class="build-main">
        <h3>${esc(b.title)}</h3>
        <p class="build-ctx">${esc(b.context)}</p>
      </div>
      <div class="build-mid">
        <p>${esc(b.summary)}</p>
        <ul class="chips">${(b.stack || []).map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
      </div>
      <p class="build-metric">${esc(b.metric || "")}</p>`;
    return extra
      ? `<details class="build"><summary>${body}<span class="caret" aria-hidden="true"></span></summary><div class="more">${extra}</div></details>`
      : `<div class="build"><div class="build-static">${body}<span class="caret-space"></span></div></div>`;
  }).join("");

  /* ---------- Automations ---------- */
  const platKey = (pl) => pl.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const filters = ["All", ...S.platforms];
  $("filters").innerHTML = filters.map((f, i) => {
    const n = f === "All" ? S.automations.length : S.automations.filter((a) => a.platform === f).length;
    return `<button class="filter${i === 0 ? " on" : ""}" aria-pressed="${i === 0}" data-f="${esc(f)}">${esc(f)} <span>${n}</span></button>`;
  }).join("");

  function renderAutos(filter) {
    const list = S.automations.filter((a) => filter === "All" || a.platform === filter);
    $("autos").innerHTML = list.map((a) => {
      const extra = more(a);
      return `
      <article class="auto plat-${platKey(a.platform)}">
        <header class="auto-head">
          <span class="plat">${esc(a.platform)}</span>
          <span class="auto-where">${esc(a.where)}</span>
        </header>
        <h3>${esc(a.title)}</h3>
        <ol class="chain">${a.flow.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>
        <p class="auto-result">${esc(a.result)}</p>
        ${extra ? `<details class="auto-more"><summary>More</summary><div class="more">${extra}</div></details>` : ""}
      </article>`;
    }).join("");
  }
  renderAutos("All");
  $("filters").addEventListener("click", (e) => {
    const btn = e.target.closest("button"); if (!btn) return;
    document.querySelectorAll(".filter").forEach((b) => { b.classList.toggle("on", b === btn); b.setAttribute("aria-pressed", b === btn); });
    renderAutos(btn.dataset.f);
  });

  /* ---------- Track loop ---------- */
  $("loop").innerHTML = S.trackLoop.map((s) => `
    <li><h3>${esc(s.stage)}</h3><p>${esc(s.example)}</p></li>`).join("") +
    `<li class="loop-back" aria-hidden="true"><span>and back to Ship</span></li>`;

  /* ---------- Translate ---------- */
  $("pairs").innerHTML = S.translations.map((t) => `
    <li class="pair">
      <p class="say say-tech">${esc(t.tech)}</p>
      <p class="say say-plain">${esc(t.plain)}</p>
    </li>`).join("");
  const tr = document.querySelector(".translate");
  tr.dataset.view = "tech";
  tr.querySelectorAll(".toggle button").forEach((b) => b.addEventListener("click", () => {
    tr.dataset.view = b.dataset.view;
    tr.querySelectorAll(".toggle button").forEach((x) => x.setAttribute("aria-selected", x === b));
  }));

  $("audiences").innerHTML = S.audiences.map((a) => `<div><dt>${esc(a.who)}</dt><dd>${esc(a.how)}</dd></div>`).join("");
  $("langs").innerHTML = S.languages.map((l) => `
    <li><span class="lang-name">${esc(l.name)}</span><span class="lang-bar" style="--w:${l.pct}%"></span><span class="lang-lvl">${esc(l.level)}</span></li>`).join("");
  if (S.community) $("community").innerHTML = `<h3>${esc(S.community.title)}</h3><p>${esc(S.community.text)}</p>`;

  /* ---------- Experience ---------- */
  $("timeline").innerHTML = S.experience.map((x) => {
    const extra = more(x);
    return `
    <li class="job">
      <p class="job-dates">${esc(x.dates)}${x.note ? `<span>${esc(x.note)}</span>` : ""}</p>
      <div class="job-body">
        <h3>${esc(x.role)}</h3>
        <p class="job-org">${esc(x.org)}</p>
        <ul>${x.points.map((pt) => `<li>${esc(pt)}</li>`).join("")}</ul>
        ${extra ? `<details class="auto-more"><summary>More</summary><div class="more">${extra}</div></details>` : ""}
      </div>
    </li>`;
  }).join("");

  $("edu").innerHTML = S.education.map((e) => `
    <li><strong>${esc(e.title)}</strong><span>${esc(e.org)}${e.note ? `, ${esc(e.note)}` : ""}</span></li>`).join("");
  $("stack").innerHTML = Object.entries(S.stack).map(([k, v]) => `
    <div class="stack-row"><h4>${esc(k)}</h4><ul class="chips">${v.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>`).join("");

  /* ---------- Contact ---------- */
  const c = p.contact, links = [];
  if (c.email) links.push(`<a class="btn btn-solid" href="mailto:${esc(c.email)}">Email ${esc(c.email)}</a>`);
  if (c.linkedin) links.push(`<a class="btn btn-line" href="${esc(c.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>`);
  if (c.github) links.push(`<a class="btn btn-line" href="${esc(c.github)}" target="_blank" rel="noopener">GitHub</a>`);
  if (c.cv) links.push(`<a class="btn btn-line" href="${esc(c.cv)}" download>Download CV</a>`);
  $("contact-links").innerHTML = links.join("");

  /* ---------- Active section in nav ---------- */
  const navLinks = [...document.querySelectorAll(".topbar nav a")];
  const secObs = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (e.isIntersecting) navLinks.forEach((a) => a.classList.toggle("here", a.getAttribute("href") === "#" + e.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main section[id]").forEach((s) => secObs.observe(s));
})();
