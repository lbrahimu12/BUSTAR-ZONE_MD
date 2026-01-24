"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");

zokou({ nomCom: "test", reaction: "💧", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    const { ms } = commandeOptions;
    
    // Custom Assets
    const channelJid = "120363353854480831@newsletter";
    const imageUrl = "https://files.catbox.moe/aktbgo.jpg";
    const audioUrl = "https://files.catbox.moe/zqbr13.mp3";
    const videoUrl = 'https://files.catbox.moe/sm1om8.mp4';

    let z = '*🌟𝑩𝒐𝒕 𝒊𝒔 𝒐𝒏𝒍𝒊𝒏𝒆🌟* 🙏 \n\n' + "𝑻𝒉𝒆 𝒃𝒐𝒕 𝒊𝒔 𝒄𝒖𝒓𝒓𝒆𝒏𝒕𝒍𝒚 𝒘𝒐𝒓𝒌𝒊𝒏𝒈 𝒂𝒕 𝒂 𝒈𝒐𝒐𝒅 𝒔𝒑𝒆𝒆𝒅😉👍\n";
    let d = '𝑯𝒆𝒂𝒍𝒕𝒉 𝒔𝒕𝒂𝒕𝒖𝒔✨';
    let varmess = z + d;

    try {
        // 1. Send Video with Modern Channel Context
        await zk.sendMessage(dest, { 
            video: { url: videoUrl }, 
            caption: varmess,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: channelJid,
                    serverMessageId: 144,
                    newsletterName: "RAHMAN-AI STATUS",
                },
                externalAdReply: {
                    title: "RAHMAN-AI SYSTEM TEST",
                    body: "System is Active and Stable",
                    thumbnailUrl: imageUrl,
                    mediaType: 1,
                    sourceUrl: `https://whatsapp.com/channel/${channelJid.split('@')[0]}`,
                    renderLargerThumbnail: true,
                    showAdAttribution: true
                }
            }
        }, { quoted: ms });

        // 2. Send the Welcome Audio as a Voice Note (PTT)
        await zk.sendMessage(dest, { 
            audio: { url: audioUrl }, 
            mimetype: 'audio/mp4', 
            ptt: true,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: channelJid,
                    newsletterName: "RAHMAN-AI AUDIO",
                }
            }
        }, { quoted: ms });

    } catch (e) {
        console.log("Error in test command: " + e);
    }
});
