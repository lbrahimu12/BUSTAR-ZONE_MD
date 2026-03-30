const {
  zokou
} = require("../framework/zokou");

// Function ya kuformat runtime vizuri
const formatUptime = (seconds) => {
  seconds = Number(seconds);
  
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  const parts = [];
  
  if (days > 0) {
    parts.push(`${days} ${days === 1 ? 'day' : 'days'}`);
  }
  if (hours > 0) {
    parts.push(`${hours} ${hours === 1 ? 'hour' : 'hours'}`);
  }
  if (minutes > 0) {
    parts.push(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`);
  }
  if (secs > 0 || parts.length === 0) {
    parts.push(`${secs} ${secs === 1 ? 'second' : 'seconds'}`);
  }
  
  return parts.join(', ');
};

zokou({
  'nomCom': "uptime",
  'desc': "Check bot runtime and system status",
  'Categorie': "General",
  'reaction': '⏱️',
  'fromMe': "true"
}, async (sock, m, { ms, arg, repondre }) => {
  try {
    const uptimeSeconds = process.uptime();
    const formattedUptime = formatUptime(uptimeSeconds);
    
    // Additional system info
    const memoryUsage = process.memoryUsage();
    const memoryUsed = (memoryUsage.heapUsed / 1024 / 1024).toFixed(2);
    const memoryTotal = (memoryUsage.heapTotal / 1024 / 1024).toFixed(2);
    
    const startTime = Date.now() - (uptimeSeconds * 1000);
    const startDate = new Date(startTime).toLocaleString();
    
    const uptimeMessage = `╭━━━〔 *BOT STATUS* 〕━━━┈ ⊳
┃
┃ ⏰ *Uptime:* ${formattedUptime}
┃ 📅 *Started:* ${startDate}
┃ 💾 *Memory:* ${memoryUsed}MB / ${memoryTotal}MB
┃ ⚡ *Status:* ${uptimeSeconds < 60 ? '🟢 Just Started' : uptimeSeconds < 3600 ? '🟢 Active' : '🔵 Long Running'}
┃
╰━━━━━━━━━━━━━━━━⊱`;
    
    await sock.sendMessage(m, {
      'audio': {
        'url': "https://files.catbox.moe/2wonzj.mp3"
      },
      'mimetype': "audio/mp4",
      'ptt': true,
      'contextInfo': {
        'isForwarded': true,
        'forwardedNewsletterMessageInfo': {
          'newsletterJid': "120363425127251695@newsletter",
          'newsletterName': "ʙᴜsᴛᴀʀᴢᴏɴᴇ ᴍᴅ",
          'serverMessageId': 0x8f
        },
        'forwardingScore': 0x3e7,
        'externalAdReply': {
          'title': "✨ BOT RUNTIME INFO ✨",
          'body': uptimeMessage,
          'thumbnailUrl': "https://files.catbox.moe/9nlsf2.jpg",
          'sourceUrl': "",
          'mediaType': 0x1,
          'renderLargerThumbnail': true
        }
      }
    }, {
      'quoted': ms
    });
    
  } catch (error) {
    console.error("❌ Uptime Command Error:", error);
    repondre("❌ *Error:* " + error.message);
  }
});
