'use strict';

Object.defineProperty(exports, "__esModule", {
  'value': true
});

const { zokou } = require("../framework/zokou");

zokou({
  'nomCom': "support",
  'reaction': '🐥',
  'categorie': "Support-Owner",
  'nomFichier': __filename
}, async (zk, dest) => {
    await zk.sendMessage(dest, {
        text: "*Holla*\n\n*Click on the button below to join the official WhatsApp Channel*",
        contextInfo: {
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363382023564830@newsletter',
                newsletterName: "B.M.B-TECH",
                serverMessageId: 143,
            },
            forwardingScore: 999, // Score to indicate it has been forwarded
            externalAdReply: {
                title: "B.M.B-TECH",
                body: "Next Generation",
                thumbnailUrl: 'https://files.catbox.moe/rpea5k.jpg', // Add thumbnail URL if required 
                sourceUrl: 'https://whatsapp.com/channel/0029VawO6hgF6sn7k3SuVU3z', // Add source URL if necessary
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    });
});
