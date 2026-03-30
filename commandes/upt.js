const {
  zokou
} = require("../framework/zokou");

const runtime = function (_0x28ca1c) {
  _0x28ca1c = Number(_0x28ca1c);
  var _0x268c3d = Math.floor(_0x28ca1c / 86400);
  var _0x345b56 = Math.floor(_0x28ca1c % 86400 / 3600);
  var _0x239dce = Math.floor(_0x28ca1c % 3600 / 60);
  var _0x206c14 = Math.floor(_0x28ca1c % 60);
  
  var _0x19d16e = _0x268c3d > 0 ? _0x268c3d + (_0x268c3d == 1 ? " day, " : " days, ") : '';
  var _0x49ce9c = _0x345b56 > 0 ? _0x345b56 + (_0x345b56 == 1 ? " hour, " : " hours, ") : '';
  var _0x249a90 = _0x239dce > 0 ? _0x239dce + (_0x239dce == 1 ? " minute, " : " minutes, ") : '';
  var _0x12266c = _0x206c14 > 0 ? _0x206c14 + (_0x206c14 == 1 ? " second" : " seconds") : '';
  
  if (!_0x19d16e && !_0x49ce9c && !_0x249a90 && !_0x12266c) {
    return "0 seconds";
  }
  
  return _0x19d16e + _0x49ce9c + _0x249a90 + _0x12266c;
};

zokou({
  'nomCom': "uptime",
  'desc': "To check bot runtime",
  'Categorie': "General",
  'reaction': '🕐',
  'fromMe': "true"
}, async (_0x4d1cb2, _0x6e67fd, _0x17c78a) => {
  const {
    ms: _0x42d661,
    arg: _0x32ab8b,
    repondre: _0x1e9691
  } = _0x17c78a;
  
  try {
    const uptimeValue = process.uptime();
    const formattedUptime = runtime(uptimeValue);
    
    const memoryUsage = process.memoryUsage();
    const heapUsedMB = (memoryUsage.heapUsed / 1024 / 1024).toFixed(1);
    const heapTotalMB = (memoryUsage.heapTotal / 1024 / 1024).toFixed(1);
    
    const statusMessage = `╭━━━❪ *BOT STATUS* ❫━━━┈ ⊳
┃
┃ ⏰ *Uptime* : ${formattedUptime}
┃ 💾 *Memory* : ${heapUsedMB}MB / ${heapTotalMB}MB
┃ 🤖 *Status* : ${uptimeValue < 60 ? '🟢 Just Started' : uptimeValue < 3600 ? '🟢 Active' : '🔵 Long Running'}
┃ 📅 *Started* : ${new Date(Date.now() - (uptimeValue * 1000)).toLocaleString()}
┃
╰━━━━━━━━━━━━━━━━━━⊱`;
    
    // Option 1: Send as text message (No audio - to avoid 404 error)
    await _0x6e67fd.sendMessage(_0x4d1cb2, {
      'text': statusMessage,
      'contextInfo': {
        'isForwarded': true,
        'forwardedNewsletterMessageInfo': {
          'newsletterJid': "120363425127251695@newsletter",
          'newsletterName': "ʙᴜsᴛᴀʀᴢᴏɴᴇ ᴍᴅ",
          'serverMessageId': 0x8f
        },
        'forwardingScore': 0x3e7,
        'externalAdReply': {
          'title': "✨ SYSTEM RUNTIME ✨",
          'body': "Bot is running smoothly",
          'thumbnailUrl': "https://telegra.ph/file/5f7c8c5c0b1f2d3e4a5b6.jpg",
          'sourceUrl': "https://whatsapp.com/channel/0029VaoZpXrJDUVPLA0fS30y",
          'mediaType': 0x1,
          'renderLargerThumbnail': true
        }
      }
    }, {
      'quoted': _0x42d661
    });
    
  } catch (_0x141e7b) {
    console.log("❌ uptime Command Error: " + _0x141e7b);
    // Fallback: send simple message if complex one fails
    try {
      const simpleUptime = runtime(process.uptime());
      await _0x1e9691(`⏰ *Bot Uptime:* ${simpleUptime}`);
    } catch (e) {
      _0x1e9691("❌ Error: " + _0x141e7b.message);
    }
  }
});
