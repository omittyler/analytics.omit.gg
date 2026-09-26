(function () {
  "use strict";

  var DATA = window.OMIT_METRICS;
  var SVGNS = "http://www.w3.org/2000/svg";

  // ---- Configuration -------------------------------------------------------

  var PLATFORMS = {
    x: {
      label: "X", color: "--series-x", headline: "impressions",
      tiles: ["impressions", "engagements", "engagementRate", "likes", "reposts", "replies", "bookmarks", "shares", "profileVisits", "followers"],
      chart: ["impressions", "engagements", "engagementRate", "likes", "profileVisits"]
    },
    instagram: {
      label: "Instagram", color: "--series-instagram", headline: "views",
      tiles: ["followers", "views", "reach", "posts", "reactions", "comments", "shares", "saves", "engagementRate", "followsFromPosts", "watchTimeMin", "avgWatchTimeSec"],
      chart: ["views", "reach", "reactions", "posts", "engagementRate", "watchTimeMin"]
    },
    tiktok: {
      label: "TikTok", color: "--series-tiktok", headline: "views",
      tiles: ["followers", "views", "reach", "posts", "reactions", "comments", "shares", "engagementRate", "watchTimeMin", "avgWatchTimeSec"],
      chart: ["views", "reach", "reactions", "posts", "engagementRate", "watchTimeMin"],
      labels: { views: "Video views" }
    },
    youtube: {
      label: "YouTube", color: "--series-youtube", headline: "views",
      tiles: ["views", "watchTimeHours", "subscribersGained", "posts", "likes", "comments", "shares", "ctr"],
      chart: ["views", "watchTimeHours", "subscribersGained", "posts", "likes"],
      labels: { posts: "Videos published" }
    }
  };

  var METRICS = {
    impressions: { label: "Impressions" },
    engagements: { label: "Engagements" },
    engagementRate: { label: "Engagement rate", fmt: "pct" },
    likes: { label: "Likes" },
    reposts: { label: "Reposts" },
    replies: { label: "Replies" },
    bookmarks: { label: "Bookmarks" },
    shares: { label: "Shares" },
    profileVisits: { label: "Profile visits" },
    followers: { label: "Followers" },
    verifiedFollowers: { label: "Verified followers" },
    views: { label: "Views" },
    reach: { label: "Reach" },
    posts: { label: "Posts" },
    reactions: { label: "Reactions" },
    comments: { label: "Comments" },
    saves: { label: "Saves" },
    followsFromPosts: { label: "Follows from posts" },
    newFollows: { label: "New follows" },
    watchTimeMin: { label: "Watch time", fmt: "min" },
    avgWatchTimeSec: { label: "Avg. watch time", fmt: "sec" },
    watchTimeHours: { label: "Watch time", fmt: "hrs" },
    subscribersGained: { label: "Subscribers gained" },
    ctr: { label: "Thumbnail CTR", fmt: "pct" }
  };

  // X affiliate program (creators & players with an OMiT badge). Shown in its own
  // section, separate from the org channel totals.
  var AFFILIATES = {
    label: "X", color: "--series-affiliates", headline: "impressions",
    tiles: ["impressions", "engagementRate", "newFollows", "likes", "replies", "reposts"],
    chart: ["impressions", "engagementRate", "newFollows", "likes"]
  };
  function isAffiliate(c) { return c.group === "affiliates"; }
  function cfg(c) { return isAffiliate(c) ? AFFILIATES : PLATFORMS[c.platform]; }

  // Engagements summed for the cross-platform total.
  function engagementsOf(platform, m) {
    if (!m) return null;
    if (platform === "x") return m.engagements != null ? m.engagements : null;
    var keys = ["reactions", "likes", "comments", "shares", "saves"];
    var total = 0, any = false;
    keys.forEach(function (k) { if (m[k] != null) { total += m[k]; any = true; } });
    return any ? total : null;
  }

  function metricLabel(platform, key) {
    var p = PLATFORMS[platform];
    return (p.labels && p.labels[key]) || METRICS[key].label;
  }

  // ---- Formatting ----------------------------------------------------------

  var MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  function monthParts(key) { var p = key.split("-"); return { y: +p[0], m: +p[1] - 1 }; }
  function monthShort(key) { return MONTHS_SHORT[monthParts(key).m]; }
  function monthLong(key) { var p = monthParts(key); return MONTHS_LONG[p.m] + " " + p.y; }
  function monthMid(key) { var p = monthParts(key); return MONTHS_SHORT[p.m] + " " + p.y; }
  function dateLong(iso) {
    var p = iso.split("-");
    return MONTHS_SHORT[+p[1] - 1] + " " + (+p[2]) + ", " + p[0];
  }

  var compactFmt = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 });
  function compact(v) {
    if (Math.abs(v) >= 1000) return compactFmt.format(v);
    return String(Math.round(v * 100) / 100);
  }
  function fmtValue(v, fmt) {
    if (v == null) return "—";
    if (fmt === "pct") return (Math.round(v * 100) / 100) + "%";
    if (fmt === "min") return compact(v >= 1000 ? v : Math.round(v)) + " min";
    if (fmt === "hrs") return compact(v >= 1000 ? v : Math.round(v * 10) / 10) + " hrs";
    if (fmt === "sec") return v.toFixed(2) + "s";
    return compact(v);
  }
  function fmtFull(v, fmt) {
    if (v == null) return "—";
    if (fmt === "pct") return v + "%";
    if (fmt === "sec") return v.toFixed(2) + "s";
    var s = v.toLocaleString("en-US", { maximumFractionDigits: 2 });
    return fmt === "min" ? s + " min" : fmt === "hrs" ? s + " hrs" : s;
  }

  // ---- DOM helpers ---------------------------------------------------------

  function h(tag, attrs, children) {
    var el = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "class") el.className = attrs[k];
      else if (k === "text") el.textContent = attrs[k];
      else if (k.slice(0, 2) === "on") el.addEventListener(k.slice(2), attrs[k]);
      else el.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c != null) el.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return el;
  }
  function s(tag, attrs) {
    var el = document.createElementNS(SVGNS, tag);
    Object.keys(attrs || {}).forEach(function (k) { el.setAttribute(k, attrs[k]); });
    return el;
  }
  function clear(el) { while (el.firstChild) el.removeChild(el.firstChild); }
  function swatch(colorVar) { var d = h("span", { class: "dot" }); d.style.background = "var(" + colorVar + ")"; return d; }

  // ---- Months & date ranges ------------------------------------------------

  function addMonths(key, n) {
    var p = monthParts(key);
    var t = p.y * 12 + p.m + n;
    var y = Math.floor(t / 12), m = t - y * 12 + 1;
    return y + "-" + (m < 10 ? "0" : "") + m;
  }
  function monthSpan(start, end) {
    var out = [];
    for (var k = start; k <= end; k = addMonths(k, 1)) out.push(k);
    return out;
  }
  function yearOf(key) { return monthParts(key).y; }

  // Every month that has at least one channel's data.
  var allMonths = (function () {
    var set = {};
    DATA.channels.forEach(function (c) { Object.keys(c.months).forEach(function (k) { set[k] = true; }); });
    return Object.keys(set).sort();
  })();
  var firstMonth = allMonths[0];
  var latestMonth = allMonths[allMonths.length - 1];
  var latestYear = yearOf(latestMonth);
  var dataYears = allMonths.map(yearOf).filter(function (y, i, a) { return a.indexOf(y) === i; }).sort(function (a, b) { return b - a; });

  // "Jun–Aug 2026", "Nov 2026 – Feb 2027", "August 2026"
  function spanLabel(start, end, longSingle) {
    if (start === end) return longSingle ? monthLong(start) : monthMid(start);
    if (yearOf(start) === yearOf(end)) return monthShort(start) + "–" + monthShort(end) + " " + yearOf(end);
    return monthMid(start) + " – " + monthMid(end);
  }

  /**
   * Range ids (also used in the URL):
   *   "YYYY-MM"           one month
   *   "ytd"               Jan → latest month of the most recent year with data
   *   "last3|last6|last12" trailing months ending at the latest month
   *   "year-YYYY"         a full calendar year (offered for years before the latest)
   *   "YYYY-MM..YYYY-MM"  custom span
   * Comparisons: YTD and full years compare to the same months a year earlier;
   * everything else compares to the equal-length period immediately before.
   */
  function resolveRange(id) {
    var start, end, title, yoy = false, kind = "custom";
    var mm = /^(\d{4}-\d{2})\.\.(\d{4}-\d{2})$/.exec(id || "");
    if (/^\d{4}-\d{2}$/.test(id || "")) { start = end = id; kind = "month"; }
    else if (id === "ytd") {
      start = latestYear + "-01"; end = latestMonth; yoy = true; kind = "ytd";
      title = (end.slice(5) === "12" ? latestYear + " full year" : "Year to date");
    } else if (/^last(3|6|12)$/.test(id || "")) {
      var n = +id.slice(4);
      end = latestMonth; start = addMonths(end, -(n - 1)); kind = "last";
      title = "Last " + n + " months";
    } else if (/^year-\d{4}$/.test(id || "")) {
      var y = id.slice(5);
      start = y + "-01"; end = y + "-12"; yoy = true; kind = "year";
      title = y + " full year";
    } else if (mm) {
      start = mm[1] <= mm[2] ? mm[1] : mm[2]; end = mm[1] <= mm[2] ? mm[2] : mm[1];
      if (start === end) kind = "month";
    } else return resolveRange(latestMonth);

    var months = monthSpan(start, end);
    var cmpStart = yoy ? addMonths(start, -12) : addMonths(start, -months.length);
    var cmpEnd = yoy ? addMonths(end, -12) : addMonths(start, -1);
    var cmpLabel = kind === "month"
      ? (yearOf(cmpStart) === yearOf(start) ? monthShort(cmpStart) : monthMid(cmpStart))
      : spanLabel(cmpStart, cmpEnd);
    return {
      id: kind === "month" ? start : id, kind: kind, start: start, end: end, months: months,
      title: title || spanLabel(start, end, true),
      span: spanLabel(start, end, true),
      compare: { months: monthSpan(cmpStart, cmpEnd), label: cmpLabel }
    };
  }

  // ---- Aggregation ---------------------------------------------------------

  var POINT_IN_TIME = { followers: true, verifiedFollowers: true };
  // Rates are averaged, weighted by the channel's headline metric (or views).
  var RATE_WEIGHT = { engagementRate: null, avgWatchTimeSec: "views", ctr: "views" };

  function aggregate(c, months) {
    var rows = months.map(function (k) { return c.months[k]; }).filter(Boolean);
    if (!rows.length) return null;
    var out = { _count: rows.length };
    var keys = {};
    rows.forEach(function (r) { Object.keys(r).forEach(function (k) { keys[k] = true; }); });
    Object.keys(keys).forEach(function (key) {
      var vals = rows.filter(function (r) { return r[key] != null; });
      if (!vals.length) return;
      if (POINT_IN_TIME[key]) { out[key] = vals[vals.length - 1][key]; return; }
      if (key in RATE_WEIGHT) {
        var wk = RATE_WEIGHT[key] || cfg(c).headline;
        var sw = 0, sv = 0;
        vals.forEach(function (r) { var w = r[wk] || 0; sw += w; sv += r[key] * w; });
        out[key] = sw > 0 ? sv / sw : vals.reduce(function (a, r) { return a + r[key]; }, 0) / vals.length;
        return;
      }
      out[key] = vals.reduce(function (a, r) { return a + r[key]; }, 0);
    });
    return out;
  }

  // Comparison only counts when every month of the prior period was captured.
  function aggregateCompare(c, range) {
    var complete = range.compare.months.every(function (k) { return c.months[k]; });
    return complete ? aggregate(c, range.compare.months) : null;
  }

  // ---- State ---------------------------------------------------------------

  // Every visit opens on Year to date across all platforms; selections aren't kept in the URL.
  var state = { range: "ytd", platform: "all", chartMetric: {} };
  if (location.hash) history.replaceState(null, "", location.pathname + location.search);

  function currentRange() { return resolveRange(state.range); }
  function visibleChannels() {
    return DATA.channels.filter(function (c) { return state.platform === "all" || c.platform === state.platform; });
  }
  // X accounts read as "X - @Handle"; other platforms use their name as-is.
  function displayName(c) { return c.platform === "x" ? "X - " + c.name : c.name; }
  function orgChannels() { return visibleChannels().filter(function (c) { return !isAffiliate(c); }); }
  function hasData(c) { return Object.keys(c.months).length > 0; }

  // Chart window: at least the trailing 12 months, extended back to cover the selection.
  function chartWindow(range) {
    var start = range.start < addMonths(latestMonth, -11) ? range.start : addMonths(latestMonth, -11);
    if (start < firstMonth) start = firstMonth;
    return monthSpan(start, latestMonth);
  }

  // ---- Tooltip -------------------------------------------------------------

  var tip = document.getElementById("tooltip");
  function showTip(title, rows, x, y) {
    clear(tip);
    tip.appendChild(h("div", { class: "tt-title", text: title }));
    rows.forEach(function (r) {
      var key = h("span", { class: "tt-key" });
      key.style.background = "var(" + r.color + ")";
      tip.appendChild(h("div", { class: "tt-row" }, [key, h("span", { class: "tt-value", text: r.value }), h("span", { class: "tt-name", text: r.name })]));
    });
    tip.hidden = false;
    var w = tip.offsetWidth, ht = tip.offsetHeight;
    var left = Math.min(x + 14, window.innerWidth - w - 8);
    var top = y - ht - 12;
    if (top < 8) top = y + 16;
    tip.style.left = Math.max(8, left) + "px";
    tip.style.top = top + "px";
  }
  function hideTip() { tip.hidden = true; }

  // ---- Column chart --------------------------------------------------------

  function niceStep(max, count) {
    var raw = max / count;
    var pow = Math.pow(10, Math.floor(Math.log10(raw)));
    var n = raw / pow;
    var step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
    return step * pow;
  }

  function roundedTop(x, yTop, w, yBottom, r) {
    r = Math.max(0, Math.min(r, w / 2, yBottom - yTop));
    return "M" + x + "," + yBottom + "L" + x + "," + (yTop + r) + "Q" + x + "," + yTop + " " + (x + r) + "," + yTop +
      "L" + (x + w - r) + "," + yTop + "Q" + (x + w) + "," + yTop + " " + (x + w) + "," + (yTop + r) + "L" + (x + w) + "," + yBottom + "Z";
  }

  /**
   * opts: { labels: [monthKey], series: [{name, color, values}], range, fmt, metricName, onSelect(key, extend) }
   * More than one series renders stacked. Months inside `range` are full strength, others dimmed.
   */
  function columnChart(el, opts) {
    clear(el);
    var width = Math.max(280, el.clientWidth || 600);
    var height = width < 500 ? 190 : 230;
    var n = opts.labels.length;
    var inRange = function (key) { return key >= opts.range.start && key <= opts.range.end; };
    var totals = opts.labels.map(function (_, i) {
      var any = false;
      var sum = opts.series.reduce(function (acc, sr) { if (sr.values[i] != null) any = true; return acc + (sr.values[i] || 0); }, 0);
      return any ? sum : null;
    });
    var max = Math.max.apply(null, totals.map(function (v) { return v || 0; }).concat([0]));
    var step = max > 0 ? niceStep(max, 4) : 1;
    var yMax = Math.max(step, Math.ceil(max / step) * step);
    var ticks = [];
    for (var t = 0; t <= yMax + step / 2; t += step) ticks.push(t);

    var tickText = function (v) { return opts.fmt === "pct" ? (Math.round(v * 100) / 100) + "%" : compact(v); };
    var longest = ticks.reduce(function (m, v) { return Math.max(m, tickText(v).length); }, 1);
    var m = { top: 22, right: 4, bottom: 26, left: longest * 6.6 + 12 };
    var plotW = width - m.left - m.right, plotH = height - m.top - m.bottom;
    var band = plotW / n;
    var barW = Math.min(24, band * 0.6);
    var y = function (v) { return m.top + plotH - (v / yMax) * plotH; };
    var multiYear = yearOf(opts.labels[0]) !== yearOf(opts.labels[n - 1]);
    var xText = function (key, i) {
      return multiYear && (i === 0 || key.slice(5) === "01") ? monthShort(key) + " ’" + String(yearOf(key)).slice(2) : monthShort(key);
    };
    var labelEvery = band < 22 ? 3 : band < (multiYear ? 44 : 34) ? 2 : 1;

    var svg = s("svg", { viewBox: "0 0 " + width + " " + height, role: "img", "aria-label": opts.ariaLabel || "" });

    ticks.forEach(function (tv) {
      var yy = Math.round(y(tv)) + 0.5;
      svg.appendChild(s("line", { class: tv === 0 ? "baseline" : "gridline", x1: m.left, x2: width - m.right, y1: yy, y2: yy }));
      var lbl = s("text", { class: "axis-label", x: m.left - 8, y: yy + 4, "text-anchor": "end" });
      lbl.textContent = tickText(tv);
      svg.appendChild(lbl);
    });

    // Recessive band behind the selected months when a multi-month range is shown.
    if (opts.range.start !== opts.range.end) {
      var i0 = opts.labels.indexOf(opts.range.start), i1 = opts.labels.indexOf(opts.range.end);
      if (i0 < 0) i0 = 0;
      if (i1 < 0) i1 = n - 1;
      var bandRect = s("rect", { x: m.left + band * i0, y: m.top - 16, width: band * (i1 - i0 + 1), height: plotH + 16, rx: 6 });
      bandRect.style.fill = "var(--text-primary)";
      bandRect.style.fillOpacity = "0.035";
      svg.insertBefore(bandRect, svg.firstChild);
    }

    opts.labels.forEach(function (key, i) {
      var cx = m.left + band * i + band / 2;
      var dim = !inRange(key);
      var x0 = cx - barW / 2;
      var cum = 0, first = true;
      var nonzero = opts.series.map(function (sr, si) { return (sr.values[i] || 0) > 0 ? si : -1; }).filter(function (si) { return si >= 0; });
      var topIndex = nonzero[nonzero.length - 1];
      opts.series.forEach(function (sr, si) {
        var v = sr.values[i] || 0;
        if (v <= 0) return;
        var yb = y(cum) - (first ? 0 : 2);
        cum += v;
        var yt = y(cum);
        first = false;
        if (yb - yt < 0.5) return;
        var path = si === topIndex
          ? s("path", { class: "bar", d: roundedTop(x0, yt, barW, yb, 4) })
          : s("rect", { class: "bar", x: x0, y: yt, width: barW, height: yb - yt });
        path.style.fill = "var(" + sr.color + ")";
        if (dim) path.style.opacity = "0.55";
        svg.appendChild(path);
      });

      var single = opts.range.start === opts.range.end && key === opts.range.start;
      if (i % labelEvery === 0 || single) {
        var xl = s("text", { class: "axis-label", x: cx, y: height - 8, "text-anchor": "middle" });
        xl.textContent = xText(key, i);
        if (!dim) xl.style.fill = "var(--text-primary)";
        svg.appendChild(xl);
      }

      if (single && totals[i] != null) {
        var vl = s("text", { class: "value-label", x: cx, y: y(totals[i]) - 7, "text-anchor": "middle" });
        vl.textContent = tickText(totals[i]);
        svg.appendChild(vl);
      }

      var rows = function () {
        var list = opts.series.map(function (sr) {
          return { color: sr.color, value: fmtValue(sr.values[i], opts.fmt), name: sr.name };
        });
        if (opts.series.length > 1) list.push({ color: "--text-muted", value: fmtValue(totals[i], opts.fmt), name: "Total" });
        return list;
      };
      var hit = s("rect", { class: "hit", x: m.left + band * i, y: m.top - 16, width: band, height: plotH + 16, tabindex: "0", role: "button",
        "aria-label": monthLong(key) + ": " + fmtValue(totals[i], opts.fmt) + " " + (opts.metricName || "") });
      hit.addEventListener("pointermove", function (e) { showTip(monthLong(key), rows(), e.clientX, e.clientY); });
      hit.addEventListener("pointerleave", hideTip);
      hit.addEventListener("focus", function () { var r = hit.getBoundingClientRect(); showTip(monthLong(key), rows(), r.left + r.width / 2, r.top + 20); });
      hit.addEventListener("blur", hideTip);
      if (opts.onSelect) {
        hit.style.cursor = "pointer";
        hit.addEventListener("click", function (e) { hideTip(); opts.onSelect(key, e.shiftKey); });
        hit.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); hideTip(); opts.onSelect(key, e.shiftKey); } });
      }
      svg.appendChild(hit);
    });

    el.appendChild(svg);
  }

  // ---- Pieces --------------------------------------------------------------

  function deltaNode(cur, prev, fmt, vsLabel) {
    var wrap = h("div", { class: "tile-delta" });
    if (cur == null || prev == null || !vsLabel) return wrap;
    var vs = " vs " + vsLabel;
    var diff = fmt === "pct" ? Math.round((cur - prev) * 100) / 100 : cur - prev;
    if (Math.abs(diff) < 1e-9) { wrap.textContent = "No change" + vs; return wrap; }
    var up = diff > 0;
    var text;
    if (fmt === "pct") text = Math.abs(diff) + " pts";
    else if (prev === 0) { wrap.textContent = "Up from 0" + vs; return wrap; }
    else {
      var pct = Math.abs(diff / prev * 100);
      text = (pct >= 100 ? Math.round(pct).toLocaleString("en-US") : pct.toFixed(1)) + "%";
    }
    wrap.appendChild(h("span", { class: up ? "up" : "down", text: (up ? "▲ " : "▼ ") + text }));
    wrap.appendChild(document.createTextNode(vs));
    return wrap;
  }

  function changeNode(change, suffix) {
    var d = h("div", { class: "tile-delta" });
    var up = change >= 0;
    d.appendChild(h("span", { class: up ? "up" : "down", text: (up ? "▲ +" : "▼ ") + change.toLocaleString("en-US") }));
    d.appendChild(document.createTextNode(" " + suffix));
    return d;
  }

  function tile(label, value, deltaEl, hero) {
    return h("div", { class: "tile" + (hero ? " hero" : "") }, [
      h("div", { class: "tile-label", text: label, title: label }),
      h("div", { class: "tile-value", text: value }),
      deltaEl || h("div", { class: "tile-delta" })
    ]);
  }

  function tableView(headers, rows) {
    var thead = h("thead", null, [h("tr", null, headers.map(function (t) { return h("th", { text: t }); }))]);
    var tbody = h("tbody", null, rows.map(function (r) { return h("tr", null, r.map(function (c) { return h("td", { text: c }); })); }));
    return h("div", { class: "table-scroll" }, [h("table", null, [thead, tbody])]);
  }

  // ---- Overview ------------------------------------------------------------

  function totalsFor(aggs) {
    var out = { views: 0, engagements: 0, followers: 0, followerChannels: 0, posts: 0, postChannels: 0, any: false };
    aggs.forEach(function (a) {
      if (!a.agg) return;
      out.any = true;
      out.views += a.agg[PLATFORMS[a.platform].headline] || 0;
      out.engagements += engagementsOf(a.platform, a.agg) || 0;
      if (a.agg.followers != null) { out.followers += a.agg.followers; out.followerChannels++; }
      if (a.agg.posts != null) { out.posts += a.agg.posts; out.postChannels++; }
    });
    return out;
  }

  function renderOverview() {
    var range = currentRange();
    var channels = orgChannels();
    var curAggs = channels.map(function (c) { return { platform: c.platform, agg: aggregate(c, range.months) }; });
    // Prior-period totals only when every channel active now has a complete prior period.
    var prevAggs = channels.map(function (c) { return { platform: c.platform, agg: aggregateCompare(c, range) }; });
    var comparable = curAggs.every(function (a, i) { return !a.agg || prevAggs[i].agg; });
    var cur = totalsFor(curAggs);
    var prev = comparable ? totalsFor(prevAggs) : null;
    var vs = range.compare.label;

    var scope = state.platform === "all" ? "" : PLATFORMS[state.platform].label + " · ";
    document.getElementById("overview-title").textContent = scope + range.title;
    var spanEl = document.getElementById("overview-span");
    spanEl.textContent = range.title !== range.span ? range.span : "";

    var tiles = document.getElementById("overview-tiles");
    clear(tiles);
    if (!cur.any) {
      tiles.appendChild(h("p", { class: "empty-note", text: "No screenshots for " + range.span + " yet." }));
    } else {
      var viewsLabel = state.platform === "x" ? "Impressions" : state.platform === "all" ? "Views & impressions" : "Views";
      tiles.appendChild(tile(viewsLabel, fmtValue(cur.views), deltaNode(cur.views, prev && prev.views, null, vs), true));
      // Affiliate reach sits beside the org total, never inside it.
      visibleChannels().filter(isAffiliate).forEach(function (c) {
        var a = aggregate(c, range.months);
        if (!a || a.impressions == null) return;
        var pa = aggregateCompare(c, range);
        tiles.appendChild(tile("Affiliate impressions", fmtValue(a.impressions), deltaNode(a.impressions, pa && pa.impressions, null, vs)));
      });
      tiles.appendChild(tile("Engagements", fmtValue(cur.engagements), deltaNode(cur.engagements, prev && prev.engagements, null, vs)));
      var fDelta = prev && prev.followerChannels === cur.followerChannels ? deltaNode(cur.followers, prev.followers, null, vs)
        : h("div", { class: "tile-delta", text: cur.followerChannels ? "Across " + cur.followerChannels + " channel" + (cur.followerChannels > 1 ? "s" : "") : "Not captured" });
      tiles.appendChild(tile(range.kind === "month" ? "Followers" : "Followers (latest)", cur.followerChannels ? fmtValue(cur.followers) : "—", fDelta));
      if (cur.postChannels) {
        tiles.appendChild(tile("Posts", fmtValue(cur.posts), deltaNode(cur.posts, prev && prev.postChannels === cur.postChannels ? prev.posts : null, null, vs)));
      }
    }

    // Stacked columns by platform over the chart window.
    var windowMonths = chartWindow(range);
    var platforms = Object.keys(PLATFORMS).filter(function (pid) {
      return channels.some(function (c) { return c.platform === pid && hasData(c); });
    });
    var series = platforms.map(function (pid) {
      var p = PLATFORMS[pid];
      return {
        name: p.label, color: p.color,
        values: windowMonths.map(function (mk) {
          var sum = null;
          channels.forEach(function (c) {
            var m = c.months[mk];
            if (c.platform === pid && m && m[p.headline] != null) sum = (sum || 0) + m[p.headline];
          });
          return sum;
        })
      };
    });

    var legend = document.getElementById("overview-legend");
    clear(legend);
    if (series.length > 1) series.forEach(function (sr) { legend.appendChild(h("span", { class: "legend-item" }, [swatch(sr.color), sr.name])); });

    var chartEl = document.getElementById("overview-chart");
    chartEl._render = function () {
      columnChart(chartEl, { labels: windowMonths, series: series, range: range, metricName: "views", onSelect: selectFromChart,
        ariaLabel: "Monthly views by platform, " + spanLabel(windowMonths[0], windowMonths[windowMonths.length - 1]) });
    };
    chartEl._render();

    var tableEl = document.getElementById("overview-table");
    clear(tableEl);
    tableEl.appendChild(tableView(["Month"].concat(series.map(function (sr) { return sr.name; }), series.length > 1 ? ["Total"] : []),
      windowMonths.map(function (mk, i) {
        var vals = series.map(function (sr) { return sr.values[i]; });
        var row = [monthMid(mk)].concat(vals.map(function (v) { return fmtFull(v); }));
        if (series.length > 1) row.push(fmtFull(vals.reduce(function (a, b) { return a + (b || 0); }, 0)));
        return row;
      })));
  }

  // ---- Channels ------------------------------------------------------------

  function renderChannels() {
    var channelList = orgChannels().filter(hasData);
    renderChannelCards(document.getElementById("channels"), channelList, "No data captured for this platform yet.");
    var affiliates = visibleChannels().filter(function (c) { return isAffiliate(c) && hasData(c); });
    document.getElementById("affiliates-section").hidden = !affiliates.length;
    renderChannelCards(document.getElementById("affiliates"), affiliates);
  }

  function renderChannelCards(host, list, emptyText) {
    clear(host);
    var range = currentRange();
    var windowMonths = chartWindow(range);
    var capturable = range.months.filter(function (k) { return k <= latestMonth; }).length;
    if (!list.length) { if (emptyText) host.appendChild(h("p", { class: "empty-note", text: emptyText })); return; }

    list.forEach(function (c) {
      var p = cfg(c);
      var agg = aggregate(c, range.months);
      var prev = aggregateCompare(c, range);
      var metric = state.chartMetric[c.id] || p.chart[0];

      var chips = h("div", { class: "chips", role: "group", "aria-label": "Chart metric" }, p.chart.map(function (key) {
        return h("button", { class: "chip", type: "button", "aria-pressed": String(key === metric), text: metricLabel(c.platform, key),
          onclick: function () { setMetric(key); } });
      }));

      var sub = range.span;
      if (isAffiliate(c)) sub = c.affiliateCount + " affiliates" + (c.includesOrg ? " + OMiT organization" : "") + " · " + sub;
      if (agg && agg._count < capturable) sub += " · screenshots for " + agg._count + " of " + capturable + " months";
      var head = h("div", { class: "card-head" }, [
        h("div", null, [
          h("h3", { class: "card-title" }, [swatch(p.color), displayName(c)]),
          h("p", { class: "card-sub", text: sub })
        ])
      ]);

      var tilesEl = h("div", { class: "tiles small" });
      if (!agg) tilesEl.appendChild(h("p", { class: "empty-note", text: "No screenshots for " + range.span + "." }));
      else p.tiles.forEach(function (key) {
        if (agg[key] == null) return;
        var fmt = METRICS[key].fmt;
        var d = deltaNode(agg[key], prev ? prev[key] : null, fmt, range.compare.label);
        if (key === "followers" && agg.followerChange != null) {
          d = changeNode(agg.followerChange, range.kind === "month" ? "this month" : "in range");
        }
        tilesEl.appendChild(tile(metricLabel(c.platform, key), fmtValue(agg[key], fmt), d));
      });

      var chartEl = h("div", { class: "chart" });
      chartEl._render = function () {
        var values = windowMonths.map(function (mk) { var mm = c.months[mk]; return mm && mm[metric] != null ? mm[metric] : null; });
        columnChart(chartEl, {
          labels: windowMonths, range: range, fmt: METRICS[metric].fmt, metricName: metricLabel(c.platform, metric), onSelect: selectFromChart,
          series: [{ name: metricLabel(c.platform, metric), color: p.color, values: values }],
          ariaLabel: displayName(c) + " " + metricLabel(c.platform, metric) + " by month"
        });
      };

      var cols = p.tiles.filter(function (k) { return allMonths.some(function (mk) { return c.months[mk] && c.months[mk][k] != null; }); });
      var table = tableView(["Month"].concat(cols.map(function (k) { return metricLabel(c.platform, k); })),
        allMonths.filter(function (mk) { return c.months[mk]; }).map(function (mk) {
          return [monthMid(mk)].concat(cols.map(function (k) { return fmtFull(c.months[mk][k], METRICS[k].fmt); }));
        }));

      var chartSub = h("p", { class: "card-sub", text: metricLabel(c.platform, metric) + " by month" });
      // Switching metric redraws only this card's chart, so the page doesn't reflow or jump.
      function setMetric(key) {
        metric = state.chartMetric[c.id] = key;
        Array.prototype.forEach.call(chips.children, function (b, i) { b.setAttribute("aria-pressed", String(p.chart[i] === key)); });
        chartSub.textContent = metricLabel(c.platform, key) + " by month";
        chartEl._render();
      }

      var card = h("article", { class: "card channel", id: c.id }, [
        head, tilesEl,
        h("div", { class: "card-head", style: "margin: 18px 0 4px" }, [chartSub, chips]),
        chartEl,
        h("details", { class: "table-view" }, [h("summary", { text: "View all months as table" }), table])
      ]);
      host.appendChild(card);
      chartEl._render();
    });
  }

  // ---- Year in review ------------------------------------------------------

  function renderPeriod() {
    var host = document.getElementById("period");
    clear(host);
    var list = visibleChannels().filter(function (c) { return c.period; });
    document.getElementById("period-title").parentElement.hidden = !list.length;
    list.forEach(function (c) {
      var p = cfg(c);
      var per = c.period;
      var card = h("article", { class: "card" }, [
        h("div", { class: "card-head" }, [h("div", null, [
          h("h3", { class: "card-title" }, [swatch(p.color), displayName(c)]),
          h("p", { class: "card-sub", text: per.label + " · as of " + dateLong(per.asOf) })
        ])])
      ]);
      var tilesEl = h("div", { class: "tiles small" });
      p.tiles.forEach(function (key) {
        var v = per.metrics && per.metrics[key];
        if (v == null) return;
        var d = key === "followers" && per.metrics.followerChange != null ? changeNode(per.metrics.followerChange, "in period") : null;
        tilesEl.appendChild(tile(metricLabel(c.platform, key), fmtValue(v, METRICS[key].fmt), d));
      });
      if (tilesEl.childNodes.length) card.appendChild(tilesEl);

      if (per.video) {
        card.appendChild(h("h4", { class: "subhead", text: "Video" + (per.videoLabel ? " · " + per.videoLabel : "") }));
        var v = per.video;
        card.appendChild(h("div", { class: "tiles small" }, [
          tile("Video views", fmtValue(v.views)),
          tile("Watch time", fmtValue(v.watchTimeHours) + " hrs"),
          tile("Completion rate", fmtValue(v.completionRate, "pct")),
          tile("Avg. watch time", fmtValue(v.avgWatchTimeSec, "sec"))
        ]));
      }

      if (per.audience) {
        card.appendChild(h("h4", { class: "subhead", text: "Audience" + (per.audienceLabel ? " · " + per.audienceLabel : "") }));
        var aud = h("div", { class: "audience" });
        Object.keys(per.audience).forEach(function (group) {
          var block = h("div", null, [h("p", { class: "aud-title", text: group })]);
          per.audience[group].forEach(function (row) {
            var fill = h("div", { class: "hbar-fill" });
            fill.style.width = row[1] + "%";
            block.appendChild(h("div", { class: "hbar" }, [
              h("div", { class: "hbar-row" }, [h("span", { text: row[0] }), h("span", { text: row[1] + "%" })]),
              h("div", { class: "hbar-track", role: "img", "aria-label": row[0] + " " + row[1] + "%" }, [fill])
            ]));
          });
          aud.appendChild(block);
        });
        card.appendChild(aud);
      }
      host.appendChild(card);
    });
  }

  // ---- Date range control --------------------------------------------------

  var rangeSelect = document.getElementById("range-select");
  var customBox = document.getElementById("custom-range");
  var fromSelect = document.getElementById("range-from");
  var toSelect = document.getElementById("range-to");

  (function buildRangeOptions() {
    var quick = h("optgroup", { label: "Quick ranges" });
    var ytd = resolveRange("ytd");
    quick.appendChild(h("option", { value: "ytd", text: ytd.title + " (" + ytd.span + ")" }));
    [3, 6, 12].forEach(function (n) {
      if (allMonths.length >= n || n === 3) quick.appendChild(h("option", { value: "last" + n, text: "Last " + n + " months" }));
    });
    // Completed past years (every year with data before the current one).
    dataYears.filter(function (y) { return y < latestYear; }).forEach(function (y) {
      quick.appendChild(h("option", { value: "year-" + y, text: y + " full year" }));
    });
    rangeSelect.appendChild(quick);

    dataYears.forEach(function (y) {
      var group = h("optgroup", { label: String(y) });
      allMonths.filter(function (k) { return yearOf(k) === y; }).reverse().forEach(function (k) {
        group.appendChild(h("option", { value: k, text: monthLong(k) }));
      });
      rangeSelect.appendChild(group);
    });
    rangeSelect.appendChild(h("option", { value: "custom", text: "Custom range…" }));

    allMonths.forEach(function (k) {
      fromSelect.appendChild(h("option", { value: k, text: monthMid(k) }));
      toSelect.appendChild(h("option", { value: k, text: monthMid(k) }));
    });
  })();

  function syncRangeControls() {
    var range = currentRange();
    var isOption = Array.prototype.some.call(rangeSelect.options, function (o) { return o.value === range.id; });
    var custom = range.kind === "custom" || !isOption;
    rangeSelect.value = custom ? "custom" : range.id;
    customBox.hidden = !custom;
    fromSelect.value = range.start < firstMonth ? firstMonth : range.start;
    toSelect.value = range.end > latestMonth ? latestMonth : range.end;
  }

  rangeSelect.addEventListener("change", function () {
    if (rangeSelect.value === "custom") {
      var r = currentRange();
      customBox.hidden = false;
      setRange((r.start < firstMonth ? firstMonth : r.start) + ".." + (r.end > latestMonth ? latestMonth : r.end), true);
      fromSelect.focus();
      return;
    }
    setRange(rangeSelect.value);
  });
  function onCustomChange() { setRange(fromSelect.value + ".." + toSelect.value, true); }
  fromSelect.addEventListener("change", onCustomChange);
  toSelect.addEventListener("change", onCustomChange);

  function setRange(id, keepCustom) {
    state.range = id;
    renderAll(keepCustom);
  }

  // Click a column for that month; shift-click to stretch the selection to it.
  function selectFromChart(key, extend) {
    if (!extend) { setRange(key); return; }
    var r = currentRange();
    var start = key < r.start ? key : r.start;
    var end = key > r.end ? key : r.end;
    setRange(start === end ? start : start + ".." + end, true);
  }

  // ---- Wiring --------------------------------------------------------------

  var platformSelect = document.getElementById("platform-select");
  platformSelect.addEventListener("change", function () { state.platform = platformSelect.value; renderAll(); });

  function renderAll(keepCustom) {
    syncRangeControls();
    if (keepCustom) { rangeSelect.value = "custom"; customBox.hidden = false; }
    platformSelect.value = state.platform;
    renderOverview();
    renderChannels();
    renderPeriod();
  }

  document.getElementById("updated").textContent =
    "Data through " + monthMid(latestMonth) + " · updated " + dateLong(DATA.updated);

  // Theme toggle: explicit choice wins over OS; remembered per browser.
  var root = document.documentElement;
  try { var saved = localStorage.getItem("omit-theme"); if (saved) root.setAttribute("data-theme", saved); } catch (e) { /* storage unavailable */ }
  document.getElementById("theme-toggle").addEventListener("click", function () {
    var current = root.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    var next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("omit-theme", next); } catch (e) { /* storage unavailable */ }
  });

  var resizeTimer, lastWidth = window.innerWidth;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      document.querySelectorAll(".chart").forEach(function (el) { if (el._render) el._render(); });
    }, 120);
  });
  window.addEventListener("scroll", hideTip, { passive: true });

  renderAll();
})();
