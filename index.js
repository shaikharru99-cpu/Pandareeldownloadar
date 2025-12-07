const TelegramBot = require("node-telegram-bot-api");

// 🔴 Yahan apna NEW BotFather token daalo
const TOKEN = "8165786683:AAGDJNjhFg2utvyAt7ZSv-L54VDCnA5l5Ns";

const bot = new TelegramBot(TOKEN, { polling: true });

// ✅ /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "👋 Welcome!\n\n✅ Public Instagram Reel ka link bhejo.\nMain tumhe safe download button de dunga.\n\n⚠️ Note: Private reels supported nahi hain."
  );
});

// ✅ Reel link detect
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text || "";

  // Simple Instagram URL check
  const igRegex = /(https?:\/\/)?(www\.)?instagram\.com\/(reel|p)\//i;

  if (igRegex.test(text)) {
    // ✅ Safe third-party download pages (user-side)
    const encoded = encodeURIComponent(text);

    const buttons = [
      [
        {
          text: "⬇️ Download (Server 1)",
          url: `https://snapinsta.app/`
        },
        {
          text: "⬇️ Download (Server 2)",
          url: `https://igram.io/`
        }
      ]
    ];

    bot.sendMessage(chatId, "✅ Public reel detected!\n\nDownload ke liye koi bhi button dabao:", {
      reply_markup: {
        inline_keyboard: buttons
      }
    });

  } else if (text !== "/start") {
    // Agar reel link nahi hai
    bot.sendMessage(
      chatId,
      "❌ Ye valid Instagram reel link nahi lag raha.\n\n✅ Example:\nhttps://www.instagram.com/reel/xxxx"
    );
  }
});
