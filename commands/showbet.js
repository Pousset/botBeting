const { getBets } = require('../utils/betManager');

module.exports = {
    name: 'showbet',
    description: 'Afficher les prédictions pour un pari en cours',
    async execute(client, message, args) {
        const bets = getBets();
        if (bets.length === 0) {
            return message.channel.send("Aucun pari en cours.");
        }

        let betList = "Voici les paris en cours. Veuillez choisir un pari par son ID pour voir les prédictions :\n";
        bets.forEach(bet => {
            betList += `ID: ${bet.id} - \`${bet.equipe1}\` vs \`${bet.equipe2}\`, créé par <@${bet.creator}>\n`;
        });
        await message.channel.send(betList);

        const filter = m => m.author.id === message.author.id && !isNaN(m.content);
        const betIdMessage = await message.channel.awaitMessages({ filter, max: 1, time: 60000 });
        const betId = parseInt(betIdMessage.first().content);
        const bet = bets.find(b => b.id === betId);

        if (!bet) {
            return message.channel.send("Pari invalide. Veuillez recommencer.");
        }

        if (bet.predictions.length === 0) {
            return message.channel.send("Aucune prédiction pour ce pari.");
        }

        let predictionList = `Prédictions pour le pari \`${bet.equipe1}\` vs \`${bet.equipe2}\` :\n`;
        bet.predictions.forEach(prediction => {
            predictionList += `<@${prediction.userId}> a parié sur \`${prediction.winner}\` avec un score de \`${bet.equipe1} ${prediction.score1} ${bet.equipe2} ${prediction.score2}\`\n`;
        });

        message.channel.send(predictionList);
    },
};
