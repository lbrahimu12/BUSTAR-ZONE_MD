const { zokou } = require("../framework/zokou")
const { ajouterOuMettreAJourJid, mettreAJourAction, verifierEtatJid } = require("../bdd/antilien")

zokou({ nomCom: "antilink", categorie: 'Group', reaction: "🔗" }, async (dest, zk, commandeOptions) => {
    var { repondre, arg, verifGroupe, superUser, verifAdmin } = commandeOptions;

    if (!verifGroupe) {
        return repondre("❌ This command is for groups only.");
    }

    if (!superUser && !verifAdmin) {
        return repondre("❌ You are not authorized. Admins only.");
    }

    try {
        const isEnabled = await verifierEtatJid(dest);

        if (!arg || !arg[0]) {
            return repondre(
`╔══════════════════════╗
║     🔗 *ANTI-LINK*     ║
╚══════════════════════╝

📌 *Commands:*
▸ *antilink on* — Enable antilink
▸ *antilink off* — Disable antilink
▸ *antilink action/delete* — Delete link only (default)
▸ *antilink action/remove* — Delete link + remove user
▸ *antilink action/warn* — Warn user first

📊 *Status:* ${isEnabled ? "✅ Enabled" : "🚫 Disabled"}`
            );
        }

        if (arg[0] === 'on') {
            if (isEnabled) {
                return repondre("✅ Antilink is already enabled for this group.");
            }
            await ajouterOuMettreAJourJid(dest, "oui");
            repondre("✅ *Antilink enabled!*\nAll links will be deleted automatically.");

        } else if (arg[0] === 'off') {
            if (!isEnabled) {
                return repondre("❌ Antilink is not enabled for this group.");
            }
            await ajouterOuMettreAJourJid(dest, "non");
            repondre("🔴 *Antilink disabled.*");

        } else if (arg.join('').split("/")[0] === 'action') {
            const action = (arg.join('').split("/")[1] || "").toLowerCase();
            if (!action) {
                return repondre("❌ Please specify an action: delete, remove, or warn");
            }
            if (!['remove', 'warn', 'delete'].includes(action)) {
                return repondre("❌ Invalid action. Available: delete, remove, warn");
            }
            await mettreAJourAction(dest, action);
            repondre(`✅ *Antilink action updated to: ${action}*`);

        } else {
            repondre(
`╔══════════════════════╗
║     🔗 *ANTI-LINK*     ║
╚══════════════════════╝

📌 *Commands:*
▸ *antilink on* — Enable antilink
▸ *antilink off* — Disable antilink
▸ *antilink action/delete* — Delete link only (default)
▸ *antilink action/remove* — Delete link + remove user
▸ *antilink action/warn* — Warn user first`
            );
        }

    } catch (error) {
        console.log("antilink command error: " + error);
        repondre("❌ An error occurred: " + error);
    }
});
