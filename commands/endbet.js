const { endBet, getBets } = require('../utils/betManager');

module.exports = {
    name: 'endbet',
    description: 'Terminer un pari et afficher le classement',
    async execute(client, message, args) {
        const bets = getBets();
        if (bets.length === 0) {
            return message.channel.send("Aucun pari en cours.");
        }

        let betList = "Voici les paris en cours. Veuillez choisir un pari par son ID pour terminer :\n";
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

        await message.channel.send(`Quel est le score final de \`${bet.equipe1}\` ?`);
        const score1Message = await message.channel.awaitMessages({ filter, max: 1, time: 60000 });
        const actualScore1 = parseInt(score1Message.first().content);

        if (isNaN(actualScore1)) {
            return message.channel.send("Le score doit être un nombre. Veuillez recommencer.");
        }

        await message.channel.send(`Quel est le score final de \`${bet.equipe2}\` ?`);
        const score2Message = await message.channel.awaitMessages({ filter, max: 1, time: 60000 });
        const actualScore2 = parseInt(score2Message.first().content);

        if (isNaN(actualScore2)) {
            return message.channel.send("Le score doit être un nombre. Veuillez recommencer.");
        }

        const leaderboard = endBet(bet.id, actualScore1, actualScore2);

        let leaderboardMessage = "Classement final :\n";
        leaderboard.forEach((prediction, index) => {
            leaderboardMessage += `${index + 1}. <@${prediction.userId}> - Points: ${prediction.points}, Prédiction: \`${bet.equipe1} ${prediction.score1} ${bet.equipe2} ${prediction.score2}\`\n`;
        });

        message.channel.send(leaderboardMessage);
    },
};
