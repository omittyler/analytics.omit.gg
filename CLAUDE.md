# analytics.omit.gg

Static dashboard of OMiT's social media analytics. No build step, no dependencies.

- `data/` — source screenshots (not deployed). One folder per platform; X has one subfolder per account (`data/X/@OMiTBrooklyn/`) plus `data/X/Affiliates - Creators & Players/`. `data/Year To Date/` holds longer-range snapshots (X audience + video, Instagram/TikTok summaries) — check each screenshot's date range; some X ones are last 12 months (1Y).
- `public/` — the deployed site. `metrics.js` is the only file that changes month to month; `app.js`, `styles.css` and `index.html` are the dashboard.

The page always opens on Year to date + All platforms (selections aren't stored in the URL).

Preview locally: `python -m http.server 4173 --directory public` (also in `.claude/launch.json`).

## Monthly update

When asked to add a month (e.g. "add September"):

1. Find the new screenshots. Naming conventions:
   - `data/X/@<Account>/@<Account> - Account Overview - <Month>.png`
   - `data/X/Affiliates - Creators & Players/X Affiliates - <Month>.png`
   - `data/Instagram/Instagram - <Month>.png`, `data/TikTok/TikTok - <Month>.png`
   - `data/YouTube/YouTube - <Month>.png`
2. Read every new screenshot and add a `"YYYY-MM"` entry to that channel's `months` in `public/metrics.js`. Metric keys per platform are listed in `PLATFORMS[...].tiles` in `public/app.js`.
   - X: prefer the exact impressions / engagement rate from the chart tooltip over the rounded tile values (e.g. `557,631` not `557.6K`). Other tiles are abbreviated (`11K` → `11000`). Followers come from the "/ 8.4K" next to Verified followers.
   - X affiliates ("Organic Analytics"): impressions, engagementRate, newFollows, replies, likes, reposts. Update `affiliateCount` if the "N affiliates" chip changes. Screenshots must have "Include organization" OFF (creators & players only). It's `group: "affiliates"` and shown in its own section, separate from org channel totals.
   - Instagram / TikTok: `Total Followers` → `followers`, the `+56` beside it → `followerChange`. TikTok `Video Views` → `views`. Watch time is minutes, avg watch time is seconds.
   - Leave out any metric the screenshot doesn't show; don't record 0 for missing data. Real zeros (no posts that month) are recorded as 0.
3. If `data/Year To Date/` screenshots were refreshed, update each channel's `period` (and `asOf`). Use `videoLabel` / `audienceLabel` when a block covers a different range than `period.label`.
4. Set `updated` at the top of `metrics.js` to today's date.
5. A new account (X or otherwise) is a new object in `channels`; a channel with empty `months` stays hidden until its first month is added. A new platform also needs a `PLATFORMS` entry and a `--series-*` color in `styles.css`.
6. Sanity-check with the deltas printed on the screenshots (e.g. X "↓ -78%"), then preview the site.

## Deploy

GitHub Pages via `.github/workflows/pages.yml`: every push to `main` publishes `public/` to https://analytics.omit.gg (custom domain from `public/CNAME`; DNS is a GoDaddy CNAME `analytics` → `<github-user>.github.io`). `data/` is gitignored because the repo is public — screenshots live on Synology Drive only. After a monthly update: commit `public/metrics.js` and push.
