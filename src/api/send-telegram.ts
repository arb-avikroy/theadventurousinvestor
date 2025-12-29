export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, message } = req.body;

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  const text = `
📩 New Contact Message

📧 Email: ${email}
💬 Message:
${message}
`;
console.log("telegram triggered");
  try {
    await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text
        })
      }
    );
    console.log("telegram triggered");
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "Telegram send failed" });
  }
}