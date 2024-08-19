const { createBet } = require('../utils/betManager');

module.exports = {
    name: 'bet',
    description: 'Créer un pari',
    async execute(client, message, args) {
        // Demander le premier terme du pari
        message.channel.send("Quel est le premier terme du pari ? (ex: 'équipe1')");

        const filter = m => m.author.id === message.author.id;
        const equipe1Message = await message.channel.awaitMessages({ filter, max: 1, time: 60000 });
        const equipe1 = equipe1Message.first().content;

        message.channel.send("Quel est le deuxième terme du pari ? (ex: 'équipe2')");
        const equipe2Message = await message.channel.awaitMessages({ filter, max: 1, time: 60000 });
        const equipe2 = equipe2Message.first().content;

        const bet = createBet(message.author.id, equipe1, equipe2);

        message.channel.send(`Le pari a été créé avec les équipes suivants : \`${bet.equipe1}\` vs \`${bet.equipe2}\``);
    },
};
