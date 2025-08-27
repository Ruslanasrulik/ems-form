export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const webhookURL = process.env.DISCORD_WEBHOOK; // 🔒 secreto en Vercel
    const payload = req.body;

    const response = await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Discord error");

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
