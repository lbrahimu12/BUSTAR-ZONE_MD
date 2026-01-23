const axios = require('axios');
const fs = require('fs');
const { writeFile } = require('fs/promises')
zokou({
  nomCom: "currencylist",
  aliases: ["currencies", "conversionrates"],
  reaction: '💲',
  categorie: "trade-place"
}, async (dest, zk, commandeOptions) => {
  const { repondre } = commandeOptions;

  const fetchCurrencyRates = async () => {
    try {
      const response = await axios.get('https://v6.exchangerate-api.com/v6/0d36793326ec3af0c240a8d4/latest/USD');
      const data = response.data;

      // Check if the response is successful
      if (data && data.result === "success") {
        return data.conversion_rates;
      } else {
        throw new Error('Failed to retrieve currency rates.');
      }
    } catch (error) {
      console.error('Error fetching currency rates:', error);
      return null;
    }
  };

  try {
    const conversionRates = await fetchCurrencyRates();

    if (!conversionRates) {
      return repondre('Failed to retrieve currency rates. Please try again later.');
    }

    let message = '*Currency Conversion Rates*\n\n';
    for (const [currency, rate] of Object.entries(conversionRates)) {
      message += `*${currency}*: ${rate}\n`;
    }

    await zk.sendMessage(dest, { text: message });
  } catch (error) {
    console.error('Error sending currency list:', error);
    await repondre('Something went wrong while sending the currency list. Please try again later.');
  }
});
// Commande waifu
zokou({
  nomCom: "waifu",
  categorie: "Weeb",
  reaction: "😏"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://api.waifu.pics/sfw/waifu'; // Remplacez avec le lien réel de l'API waifu.pics

  try {

    for (let i = 0; i < 5; i++) {
      const response = await axios.get(url);
      const imageUrl = response.data.url;

      zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms });
    }
  } catch (error) {
    repondre('Error occurred while retrieving the data. :', error);
  }
});

// Commande neko
zokou({
  nomCom: "neko",
  categorie: "Weeb",
  reaction: "😺"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://api.waifu.pics/sfw/neko'; // Remplacez avec le lien réel de l'API waifu.pics ou une autre API de nekos

  try {
    for (let i = 0; i < 5; i++) {
      const response = await axios.get(url);
      const imageUrl = response.data.url;

      zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms });
    }
  } catch (error) {
    repondre('Error occurred while retrieving the data. :', error);
  }
});

// Commande shinobu
zokou({
  nomCom: "shinobu",
  categorie: "Weeb",
  reaction: "🦋"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://api.waifu.pics/sfw/shinobu'; // Remplacez avec le lien réel de l'API waifu.pics ou une autre API avec des images de Shinobu

  try {
    for (let i = 0; i < 5; i++) {
      const response = await axios.get(url);
      const imageUrl = response.data.url;

      zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms });
    }
  } catch (error) {
    repondre('Error occurred while retrieving the data. :', error);
  }
});

// Commande megumin
zokou({
  nomCom: "megumin",
  categorie: "Weeb",
  reaction: "💥"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://api.waifu.pics/sfw/megumin'; // Remplacez avec le lien réel de l'API waifu.pics ou une autre API avec des images de Megumin

  try {
    for (let i = 0; i < 5; i++) {
      const response = await axios.get(url);
      const imageUrl = response.data.url;

      zk.sendMessage(origineMessage,{ image: { url: imageUrl } }, { quoted: ms });
    }
  } catch (error) {
    repondre('Error occurred while retrieving the data. :', error);
  }
});



zokou({
  nomCom: "cosplay",
  categorie: "Weeb",
  reaction: "😏"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;



  try {
    for (let i = 0; i < 5; i++) {
      let url = 'https://fantox-cosplay-api.onrender.com/'

   const response = await   axios.get(url, { responseType: 'arraybuffer' })



  const image = response.data;

   await writeFile('./cosplay.jpg', image)
      zk.sendMessage(origineMessage,{image : {url : `./cosplay.jpg`}},{quoted :ms}) }

  } catch (e) {
    repondre("je reçois malheureusement une erreur : " + e);
  }
});
zokou({
  nomCom: "forex",
  categorie: "trade-place",
  desc: "Fetches the latest forex news",
  reaction: "💲",
}, async (dest, zk, commandeOptions) => {
  const { repondre } = commandeOptions;

  try {
    const apiUrl = "https://api.polygon.io/v2/reference/news?apiKey=Y4iTYoJANwppB8I3Bm4QVWdV5oXlvc45";
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (!data.results || data.results.length === 0) {
      return repondre("*No forex news available at the moment.*");
    }

    const articles = data.results;
    let output = "";

    articles.forEach((article, index) => {
      output += `*Title:* ${article.title}\n`;
      output += `*Publisher:* ${article.publisher.name}\n`;
      output += `*Published UTC:* ${article.published_utc}\n`;
      output += `*Article URL:* ${article.article_url}\n\n`;

      if (index < articles.length - 1) {
        output += "---\n\n";
      }
    });

    return repondre(output, { quoted: zk });
  } catch (error) {
    console.error('Error fetching forex news:', error);
    return repondre("*Failed to fetch forex news.*");
  }
});
zokou({
  nomCom: "fxstatus",
  categorie: "trade-place",
  desc: "Fetches the current status of the forex market",
  reaction: "💲",
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  try {
    const apiUrl = "https://api.polygon.io/v1/marketstatus/now?apiKey=Y4iTYoJANwppB8I3Bm4QVWdV5oXlvc45";
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (!data) {
      return repondre("*Failed to fetch forex market status.*");
    }

    let output = "*Forex Market Status:*\n";
    output += `After Hours: ${data.afterHours ? "Closed" : "Open"}\n`;
    output += `Market: ${data.market ? "Open" : "Closed"}\n`;

    const currencies = data.currencies;
    output += "\n*Currencies:*\n";
    output += `Crypto: ${currencies.crypto}\n`;
    output += `FX: ${currencies.fx}\n`;

    const exchanges = data.exchanges;
    output += "\n*Exchanges:*\n";
    output += `NASDAQ: ${exchanges.nasdaq}\n`;
    output += `NYSE: ${exchanges.nyse}\n`;
    output += `OTC: ${exchanges.otc}\n`;

    const indicesGroups = data.indicesGroups;
    output += "\n*Indices Groups:*\n";
    output += `S&P: ${indicesGroups.s_and_p}\n`;
    output += `Societe Generale: ${indicesGroups.societe_generale}\n`;
    output += `MSCI: ${indicesGroups.msci}\n`;
    output += `FTSE Russell: ${indicesGroups.ftse_russell}\n`;
    output += `MStar: ${indicesGroups.mstar}\n`;
    output += `MStarC: ${indicesGroups.mstarc}\n`;
    output += `CCCY: ${indicesGroups.cccy}\n`;
    output += `CGI: ${indicesGroups.cgi}\n`;
    output += `NASDAQ: ${indicesGroups.nasdaq}\n`;
    output += `Dow Jones: ${indicesGroups.dow_jones}\n`;

    output += `\n*Server Time:* ${data.serverTime}\n`;

    return repondre(output, { quoted: ms });
  } catch (error) {
    console.error('Error fetching forex market status:', error);
    return repondre("*Failed to fetch forex market status.*");
  }
});

zokou({
  nomCom: "fxpairs",
aliases: ["forexpairs", "pairforex"],
  categorie: "trade-place",
  desc: "Fetches a list of active forex currency pairs",
  reaction: "💲",
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  try {
    const apiUrl = "https://api.polygon.io/v3/reference/tickers?market=fx&active=true&apiKey=Y4iTYoJANwppB8I3Bm4QVWdV5oXlvc45";
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (!data || !data.results || data.results.length === 0) {
      return repondre("*Failed to fetch forex currency pairs.*");
    }

    let output = "*Active Forex Currency Pairs:*\n\n";
    data.results.forEach((pair) => {
      output += `${pair.ticker}: ${pair.name}\n`;
    });

    return repondre(output, { quoted: ms });
  } catch (error) {
    console.error('Error fetching forex currency pairs:', error);
    return repondre("*Failed to fetch forex currency pairs.*");
  }
});

zokou({
  nomCom: "stocktickers",
  aliases: ["stockticks", "tickets"],
  categorie: "trade-place",
  desc: "Fetches a list of active stock tickers",
  reaction: "💲",
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  try {
    const limit = 100; // Assuming a default limit of 100, or you can customize this as needed
    const apiUrl = `https://api.polygon.io/v3/reference/tickers?active=true&limit=${limit}&apiKey=Y4iTYoJANwppB8I3Bm4QVWdV5oXlvc45`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (!data || !data.results || data.results.length === 0) {
      return repondre("*No active stock tickers found.*");
    }

    let output = `*Active Stock Tickers (Limit: ${limit}):*\n\n`;
    data.results.forEach((ticker) => {
      output += `${ticker.ticker}: ${ticker.name}\n`;
    });

    return repondre(output, { quoted: ms });
  } catch (error) {
    console.error('Error fetching stock tickers:', error);
    return repondre("*Failed to fetch stock tickers.*");
  }
});

zokou({
  nomCom: "fxexchange",
  aliases: ["forexexchange", "exchangerate"],
  categorie: "trade-place",
  desc: "Fetches the latest foreign exchange rates against the US Dollar",
  reaction: "💲",
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  try {
    const currencyCode = "USD"; // Using default currency code as USD
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${currencyCode}`;
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (!data || !data.rates) {
      return repondre(`*Failed to fetch exchange rates for ${currencyCode}.*`);
    }

    let output = `*Foreign Exchange Rates (${data.base})*\n\n`;
    for (const [currency, rate] of Object.entries(data.rates)) {
      output += `${currency}: ${rate.toFixed(4)}\n`;
    }

    return repondre(output, { quoted: ms });
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return repondre("*Failed to fetch exchange rates.*");
  }
});
zokou({
  'nomCom': "guesscapital",
  'categorie': "Games"
}, async (_0x4d7648, _0x864b53, _0x44ebdc) => {
  const {
    ms: _0x18517b,
    repondre: _0x474575,
    prefixe: _0x134a54
  } = _0x44ebdc;
  const _0x4744fb = capitalGame[Math.floor(Math.random() * capitalGame.length)];
  await _0x864b53.sendMessage(_0x4d7648, {
    'text': "🌍 Guess the capital city of this country: " + _0x4744fb.country + "\n\nYou have 30 seconds to guess!"
  }, {
    'quoted': _0x18517b
  });
  const _0x1acc69 = async (_0x37e5cf, _0xbf3a82, _0x3e1079) => {
    return _0x37e5cf.toLowerCase() === _0x4744fb.capital.toLowerCase() ? (await _0x864b53.sendMessage(_0x4d7648, {
      'text': "✅ Correct! The capital city is " + _0x4744fb.capital + '.'
    }, {
      'quoted': _0xbf3a82
    }), true) : _0x3e1079 === 0x1 ? (await _0x864b53.sendMessage(_0x4d7648, {
      'text': "❌ Wrong answer! You have one more try."
    }, {
      'quoted': _0xbf3a82
    }), false) : (await _0x864b53.sendMessage(_0x4d7648, {
      'text': "⏳ Time's up! The correct answer was: " + _0x4744fb.capital
    }, {
      'quoted': _0xbf3a82
    }), true);
  };
  const _0x594193 = _0x5bdfda => new Promise(_0x2eb2d6 => setTimeout(_0x2eb2d6, _0x5bdfda));
  await _0x594193(0x2710);
  const _0x357047 = {
    'text': 'exampleUserResponse',
    'message': _0x18517b
  };
  if (!(await _0x1acc69('exampleUserResponse', _0x357047.message, 0x1))) {
    await _0x594193(0x3e8);
    await _0x864b53.sendMessage(_0x4d7648, {
      'text': "You now have 10 seconds to make another guess!"
    }, {
      'quoted': _0x18517b
    });
    await _0x594193(0x2710);
    const _0x3ba42a = {
      'text': "exampleUserResponse",
      'message': _0x18517b
    };
    await _0x1acc69("exampleUserResponse", _0x3ba42a.message, 0x2);
  } else {
    await _0x864b53.sendMessage(_0x4d7648, {
      'text': "Try, you might get this!"
    }, {
      'quoted': _0x18517b
    });
  }
})
