const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const TOKEN = process.env.BRAWL_TOKEN;
  if (!TOKEN) return res.status(500).json({ error: "BRAWL_TOKEN yok!" });

  const tag = req.query.tag;
  if (!tag) return res.status(400).json({ error: "Oyuncu tag eksik." });

  const fixedTag = tag.startsWith("#") ? tag : `#${tag}`;
  const encodedTag = encodeURIComponent(fixedTag);

  try {
    const r = await fetch(`https://api.brawlstars.com/v1/players/${encodedTag}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: "application/json",
      },
    });

    if (r.status === 404) return res.status(404).json({ error: "Oyuncu bulunamadı." });
    if (!r.ok) return res.status(500).json({ error: `Brawl Stars API hatası: ${r.status}` });

    const data = await r.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Sunucu hatası", detail: err.message });
  }
};
