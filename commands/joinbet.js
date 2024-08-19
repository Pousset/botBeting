const { getBets, addUserPrediction } = require('../utils/betManager');

module.exports = {
    name: 'joinbet',
    description: 'Rejoindre un pari en cours',
    async execute(client, message, args) {
        const bets = getBets();
        if (bets.length === 0) {
            return message.channel.send("Aucun pari en cours.");
        }

        let betList = "Voici les paris en cours. Veuillez choisir un pari par son ID :\n";
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

        await message.channel.send(`Qui gagnera selon vous, \`${bet.equipe1}\` ou \`${bet.equipe2}\` ?`);
        const winnerMessage = await message.channel.awaitMessages({ filter: m => m.author.id === message.author.id, max: 1, time: 60000 });
        const winner = winnerMessage.first().content.toLowerCase();

        if (![bet.equipe1.toLowerCase(), bet.equipe2.toLowerCase()].includes(winner)) {
            return message.channel.send("Équipe invalide. Veuillez recommencer.");
        }

        await message.channel.send(`Quel sera le score de \`${bet.equipe1}\` ?`);
        const score1Message = await message.channel.awaitMessages({ filter, max: 1, time: 60000 });
        const score1 = parseInt(score1Message.first().content);

        if (isNaN(score1)) {
            return message.channel.send("Le score doit être un nombre. Veuillez recommencer.");
        }

        await message.channel.send(`Quel sera le score de \`${bet.equipe2}\` ?`);
        const score2Message = await message.channel.awaitMessages({ filter, max: 1, time: 60000 });
        const score2 = parseInt(score2Message.first().content);

        if (isNaN(score2)) {
            return message.channel.send("Le score doit être un nombre. Veuillez recommencer.");
        }

        addUserPrediction(bet.id, message.author.id, winner, score1, score2);
        message.channel.send(`Votre pari a été enregistré : \`${winner}\` avec un score de \`${bet.equipe1} ${score1} ${bet.equipe2} ${score2}\``);
    },
};
