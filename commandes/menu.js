const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

zokou({ nomCom: "menu", categorie: "Menu" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../framework/zokou");
    let coms = {};
    let mode = "public";

    if ((s.MODE).toLowerCase() !== "yes") {
        mode = "private";
    }

    cm.map((com) => {
        if (!coms[com.categorie]) {
            coms[com.categorie] = [];
        }
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    let infoMsg = `
╭━━✧ 👻 ʙᴜsᴛᴀʀᴢᴏɴᴇ ᴍᴅ ʙᴏᴛ ✧━━❖
┊✺┌────••••────⊷
┃✇│◎ ᴏᴡɴᴇʀ : ${s.OWNER_NAME}
┃✇│◎ ᴘʀᴇғɪx : [ ${s.PREFIXE} ]
┃✇│◎ ᴍᴏᴅᴇ : ${mode}
┃✇│◎ ʀᴀᴍ   : 8/132 GB
┃✇│◎ ᴅᴀᴛᴇ  : ${date}
┃✇│◎ ᴘʟᴀᴛғᴏʀᴍ : ${os.platform()}
┃✇│◎ ᴄʀᴇᴀᴛᴏʀ : ʙᴜsᴛᴀʀᴢᴏɴᴇ ᴍᴅ 
┃✇│◎ ᴄᴏᴍᴍᴀɴᴅs : ${cm.length}
┃✇│◎ ᴛʜᴇᴍᴇs : ʀᴀʜᴍᴀɴɪ ᴍᴅ
┊  └────••••────⊷
╰━━━••✧ʙᴜsᴛᴀʀᴢᴏɴᴇ ᴍᴅ ʙᴏᴛ✧••━━━◆ \n`;

    let menuMsg = `ʙᴜsᴛᴀʀᴢᴏɴᴇ ᴍᴅ ʙᴏᴛ`;
    
    for (const cat in coms) {
        menuMsg += `
╭━━━❂ *${cat}* ❂⁠⁠⁠⁠━━─••
║╭━━══••══━━••⊷ `;
        for (const cmd of coms[cat]) {
            menuMsg += `          
║┊◆ ${s.PREFIXE}  *${cmd}*`;    
        }
        menuMsg += `
║╰━━══••══━━••⊷
╰════────════◆◆◆`;
    }
    
    menuMsg += `
> @ʙᴜsᴛᴀʀᴢᴏɴᴇ ᴍᴅ ʙᴏᴛ\n`;

    try {
        const senderName = nomAuteurMessage || message.from;  // Use correct variable for sender name
        await zk.sendMessage(dest, {
            text: infoMsg + menuMsg,
            contextInfo: {
                mentionedJid: [senderName],
                externalAdReply: {
                    title: "ʙᴜsᴛᴀʀᴢᴏɴᴇ ᴍᴅ",
                    body: "Tap here my friend join channel update",
                    thumbnailUrl: "https://files.catbox.moe/9nlsf2.jpg",
                    sourceUrl: "https://whatsapp.com/channel/0029Vb7HhcI2ZjCj6clT5D1x",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
    } catch (error) {
        console.error("Menu error: ", error);
        repondre("🥵🥵 Menu error: " + error);
    }
});
