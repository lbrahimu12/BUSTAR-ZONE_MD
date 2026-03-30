function hi() {
  console.log("Hello World!");
}
hi();

const { zokou } = require(__dirname + "/../framework/zokou");
const moment = require("moment-timezone");
const set = require(__dirname + '/../set');

moment.tz.setDefault('' + set.TZ);

zokou({
  'nomCom': "ping",
  'categorie': "General"
}, async (origin, message, options) => {
  let { ms: quotedMessage } = options;
  
  const { time: currentTime, date: currentDate } = {
    'time': moment().format('HH:mm:ss'),
    'date': moment().format("DD/MM/YYYY")
  };
  
  const pingValue = Math.floor(Math.random() * 100) + 1;
  
  try {
    await message.sendMessage(origin, {
      'audio': {
        'url': "https://files.catbox.moe/2wonzj.mp3"
      },
      'mimetype': 'audio/mp4',
      'ptt': true,
      'contextInfo': {
        'isForwarded': true,
        'forwardedNewsletterMessageInfo': {
          'newsletterJid': "120363425127251695@newsletter",
          'newsletterName': "ʙᴜsᴛᴀʀᴢᴏɴᴇ ᴍᴅ",
          'serverMessageId': 143 // 0x8f in decimal
        },
        'forwardingScore': 999, // 0x3e7 in decimal
        'externalAdReply': {
          'title': "ʙᴜsᴛᴀʀᴢᴏɴᴇ ᴍᴅ",
          'body': `🌟 𝗽𝗶𝗻𝗴: ${pingValue}ms\n📅 *Date:* ${currentDate}\n⏰ *Time:* ${currentTime}`,
          'thumbnailUrl': "https://example.com/thumbnail.jpg", // Changed from newsletter JID
          'mediaType': 1,
          'renderSmallThumbnail': true
        }
      }
    }, {
      'quoted': quotedMessage
    });
  } catch (error) {
    console.log("❌ Ping Command Error: " + error);
    // Ensure repondre function exists or use message.reply
    if (typeof repondre === 'function') {
      repondre("❌ Error: " + error);
    } else {
      await message.sendMessage(origin, { text: "❌ Error: " + error });
    }
  }
});
