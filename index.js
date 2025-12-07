const TelegramBot = require("node-telegram-bot-api");

// 🔴 Yahan apna REAL token paste karo
const TOKEN = "8165786683:AAGDJNjhFg2utvyAt7ZSv-L54VDCnA5l5Ns";

const bot = new TelegramBot(TOKEN, { polling: true });

// ✅ /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "👋 Welcome!\n\n✅ Public Instagram Reel ka link bhejo.\nMain tumhe *one-tap open* download button dunga.\n\n⚠️ Private reels supported nahi hain.",
    { parse_mode: "Markdown" }
  );
});

// ✅ Reel link detect
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text || "";

  // Instagram reel/post URL check
  const igRegex = /(https?:\/\/)?(www\.)?instagram\.com\/(reel|p)\//i;

  if (igRegex.test(text)) {
    const encoded = encodeURIComponent(text);

    // ✅ One-tap open: user seedha download page par khul jayega
    const buttons = [
      [
        {
          text: "⬇️ One-Tap Open & Download",
          url: `https://snapinsta.app/`
        }
      ],
      [
        {
          text: "🔁 Alternate Server",
          url: `https://igram.io/`
        }
      ]
    ];

    bot.sendMessage(
      chatId,
      "✅ *Public reel detected!*\n\n👇 Ek tap me website open hogi, wahan se download kar lo:",
      {
        parse_mode: "Markdown",
        reply_markup: { inline_keyboard: buttons }
      }
    );

  } else if (text !== "/start") {
    bot.sendMessage(
      chatId,
      "❌ Ye valid Instagram reel link nahi lag raha.\n\n✅ Example:\nhttps://www.instagram.com/reel/xxxx"
    );
  }
});
