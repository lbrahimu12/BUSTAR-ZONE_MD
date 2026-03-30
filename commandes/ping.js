function hi() {
  console.log("Hello World!");
}
hi();

const { zokou } = require(__dirname + "/../framework/zokou");
const moment = require("moment-timezone");
const set = require(__dirname + '/../set');
const axios = require('axios'); // Add axios for checking URL

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
    // Try multiple audio URLs in case one fails
    const audioUrls = [
      "https://files.catbox.moe/2wonzj.mp3", // Original
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Backup 1
      "https://samplelib.com/lib/preview/mp3/sample-3s.mp3" // Backup 2
    ];
    
    let audioUrl = audioUrls[0];
    let audioWorking = false;
    
    // Check which audio URL works
    for (const url of audioUrls) {
      try {
        await axios.head(url, { timeout: 5000 });
        audioUrl = url;
        audioWorking = true;
        break;
      } catch (e) {
        continue;
      }
    }
    
    // If no audio URL works, send without audio
    const messageContent = audioWorking ? {
      'audio': { 'url': audioUrl },
      'mimetype': 'audio/mp4',
      'ptt': true,
      'contextInfo': {
        'isForwarded': true,
        'forwardedNewsletterMessageInfo': {
          'newsletterJid': "120363425127251695@newsletter",
          'newsletterName': "ʙᴜsᴛᴀʀᴢᴏɴᴇ ᴍᴅ",
          'serverMessageId': 143
        },
        'forwardingScore': 999,
        'externalAdReply': {
          'title': "ʙᴜsᴛᴀʀᴢᴏɴᴇ ᴍᴅ",
          'body': `🌟 𝗽𝗶𝗻𝗴: ${pingValue}ms\n📅 *Date:* ${currentDate}\n⏰ *Time:* ${currentTime}`,
          'thumbnailUrl': "https://telegra.ph/file/8e6e3e7f7e7e3e7e7e7e7.jpg",
          'mediaType': 1,
          'renderSmallThumbnail': true
        }
      }
    } : {
      'text': `🌟 *PING*\n\n⚡ Speed: ${pingValue}ms\n📅 Date: ${currentDate}\n⏰ Time: ${currentTime}\n\n*ʙᴜsᴛᴀʀᴢᴏɴᴇ ᴍᴅ*`
    };
    
    await message.sendMessage(origin, messageContent, {
      'quoted': quotedMessage
    });
    
  } catch (error) {
    console.log("❌ Ping Command Error: " + error);
    
    // Send text-only response if everything fails
    try {
      await message.sendMessage(origin, {
        'text': `🌟 *PING*\n\n⚡ Speed: ${pingValue}ms\n📅 Date: ${currentDate}\n⏰ Time: ${currentTime}\n\n*ʙᴜsᴛᴀʀᴢᴏɴᴇ ᴍᴅ*`
      }, {
        'quoted': quotedMessage
      });
    } catch (finalError) {
      console.log("❌ Final Error: " + finalError);
    }
  }
});
