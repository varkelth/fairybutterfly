const DEFAULT_TARGET = 'https://fairybutterfly.duckdns.org/sleepware/players.json';

module.exports = async (req, res) => {
  const target = process.env.MAP_DATA_URL || DEFAULT_TARGET;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate=30');
  try {
    const r = await fetch(target, { signal: AbortSignal.timeout(8000) });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const data = await r.json();
    res.status(200).json({ ok: true, data });
  } catch (e) {
    res.status(200).json({ ok: false, error: String(e && e.message ? e.message : e) });
  }
};
