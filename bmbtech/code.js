const util = require("util");
const fs = require("fs-extra");
const path = require("path");
const os = require("os");
const moment = require("moment-timezone");

const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const s = require(__dirname + "/../set");

const cyberDivider = "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓";
const fancyEnd = "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓";

// Styled bot info
function getBotInfo(mode) {
  moment.tz.setDefault("EAT");
  const currentTime = moment().format("HH:mm:ss");
  const usedRAM = format(os.totalmem() - os.freemem());
  const totalRAM = format(os.totalmem());

  return `
╔═══[ 🤖 B.M.B-TECH BOT ]═══╗

🧠 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫: @255767862457
🌐 𝐌𝐨𝐝𝐞: ${mode.toUpperCase()}
⏰ 𝐓𝐢𝐦𝐞: ${currentTime} (EAT)
💾 𝐑𝐀𝐌: ${usedRAM} / ${totalRAM}

╚═══${cyberDivider}═══╝
`;
}

// Styled menu categories
function buildMenu(coms, prefixe) {
  let menu = `
╔═[ ⚙️ COMMAND MENU ⚙️ ]═╗

💡 Use: *${prefixe}help <command>* for details
`;

  const categoryStyles = {
    General: { icon: "🌐" },
    Group: { icon: "👥" },
    Mods: { icon: "🛡️" },
    Fun: { icon: "🎉" },
    Search: { icon: "🔎" },
    Logo: { icon: "🎨" },
    Utilities: { icon: "🧰" },
    Adult: { icon: "🔞" },
    Download: { icon: "📥" },
  };

  for (const cat in coms) {
    const icon = categoryStyles[cat]?.icon || "✨";
    menu += `\n╭───⟪ ${icon} *${cat.toUpperCase()}* ⟫───╮\n`;

    coms[cat]
      .sort((a, b) => a.localeCompare(b)) // Optional: Sort commands
      .forEach((cmd) => {
        menu += `┃◈┃✪ ${cmd}\n`;
      });

    menu += `╰────────────────────╯\n`;
  }

  menu += `
📞 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫𝐬:
↳ @255767862457 (Main)
↳ @255767862457 (BMB)

${fancyEnd}
`;

  return menu;
}

// Send media (video, image, or fallback to text)
async function sendMenuMedia(zk, dest, ms, mediaUrl, caption, mentions) {
  if (mediaUrl.match(/\.(mp4|gif)$/i)) {
    await zk.sendMessage(
      dest,
      {
        video: { url: mediaUrl },
        caption,
        footer: "⚡ BMB-XBOT ⚡",
        mentions,
        gifPlayback: true,
      },
      ms ? { quoted: ms } : {}
    );
  } else if (mediaUrl.match(/\.(jpeg|jpg|png)$/i)) {
    await zk.sendMessage(
      dest,
      {
        image: { url: mediaUrl },
        caption,
        footer: "⚡ BMB-XBOT ⚡",
        mentions,
      },
      ms ? { quoted: ms } : {}
    );
  } else {
    await zk.sendMessage(
      dest,
      {
        text: caption,
        mentions,
      },
      ms ? { quoted: ms } : {}
    );
  }
}

// Send random voice note
async function sendRandomVoiceNote(zk, dest, ms, repondre) {
  const folder = path.join(__dirname, "../bmb/");
  if (!fs.existsSync(folder)) {
    return repondre(`📁 Audio folder not found at:\n${folder}`);
  }

  const audioFiles = fs.readdirSync(folder).filter((f) => f.endsWith(".mp3"));
  if (!audioFiles.length) {
    return repondre(`⚠️ No audio files found in folder.`);
  }

  const randomAudio = audioFiles[Math.floor(Math.random() * audioFiles.length)];
  const audioPath = path.join(folder, randomAudio);

  await zk.sendMessage(
    dest,
    {
      audio: { url: audioPath },
      mimetype: "audio/mpeg",
      ptt: true,
      fileName: `B.M.B VOICE ✧`,
    },
    { quoted: ms }
  );
}

// Main command export
zokou(
  {
    nomCom: "menu3",
    categorie: "General",
    reaction: "⚡",
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    const { cm } = require(__dirname + "/../framework/zokou");

    let coms = {};
    let mode = s.MODE.toLowerCase() !== "yes" ? "private" : "public";

    for (const com of cm) {
      if (!coms[com.categorie]) coms[com.categorie] = [];
      coms[com.categorie].push(com.nomCom);
    }

    try {
      const lien = await mybotpic();
      const infoText = getBotInfo(mode);
      const menuText = buildMenu(coms, prefixe);
      const fullCaption = infoText + menuText;
      const mentions = ["255767862457@s.whatsapp.net"];
      const newsletterJid = "120363382023564830@newsletter";

      // Send to user
      await sendMenuMedia(zk, dest, ms, lien, fullCaption, mentions);
      await sendRandomVoiceNote(zk, dest, ms, repondre);

      // Forward to newsletter
      await sendMenuMedia(zk, newsletterJid, null, lien, fullCaption, []);
      console.log(`[✅ MENU FORWARDED] Sent to Newsletter: ${newsletterJid}`);
    } catch (err) {
      console.error(`[❌ MENU ERROR]: ${err}`);
      repondre(`❌ Failed to load menu:\n${err.message}`);
    }
  }
);
