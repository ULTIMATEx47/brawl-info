const btn = document.getElementById("btn");
const tagInput = document.getElementById("tag");
const output = document.getElementById("output");
const raw = document.getElementById("raw");

btn.addEventListener("click", async () => {
  const tag = tagInput.value.trim();
  if (!tag) return output.innerText = "Tag boş olamaz.";

  output.innerText = "Yükleniyor...";
  raw.style.display = "none";

  try {
    const res = await fetch(`/api/player?tag=${encodeURIComponent(tag)}`);
    const data = await res.json();
    if (!res.ok) return output.innerText = data.error || "Hata oluştu.";

    output.innerHTML = `
      <b>${data.name}</b> (${data.tag})<br>
      🏆 Kupalar: ${data.trophies}<br>
      🔥 En Yüksek Kupa: ${data.highestTrophies}<br>
      🥇 3v3 Zafer: ${data["3vs3Victories"] || 0}<br>
      🧍‍♂️ Solo Zafer: ${data.soloVictories || 0}<br>
      👥 Duo Zafer: ${data.duoVictories || 0}<br>
      Brawler Sayısı: ${data.brawlers ? data.brawlers.length : 0}
    `;
    raw.style.display = "block";
    raw.innerText = JSON.stringify(data, null, 2);
  } catch (e) {
    output.innerText = "Bağlantı hatası: " + e.message;
  }
});
