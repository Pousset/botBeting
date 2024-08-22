const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'start',
    description: 'Envoie un message embed de bienvenue pour le bot de paris sportif',
    async execute(client, message, args) {
        const embed = new EmbedBuilder()
            .setColor(0x4FAF00)
            .setTitle('Betting_MEGA')
            .setURL('https://github.com/Pousset/botBeting')
            .setDescription('Bienvenue sur le BOT de paris sportif du discord MEGA, \nPour utiliser le bot cliquer sur l\'un des boutons ci-dessous :');

        const row1 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('createBet')
                    .setLabel('Créer Bet')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('joinBet')
                    .setLabel('Join Bet')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('endBet')
                    .setLabel('End Bet')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('showBet')
                    .setLabel('Show Bet')
                    .setStyle(ButtonStyle.Secondary)
            );

        const row2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('test1')
                    .setLabel('test')
                    .setStyle(ButtonStyle.Secondary)
            );

        const row3 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('test2')
                    .setLabel('test')
                    .setStyle(ButtonStyle.Secondary)
            );

        const row4 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('dropdown')
                    .setLabel('test')
                    .setStyle(ButtonStyle.Secondary)
            );

        await message.reply({ 
            content: "Welcome to **Embed Generator**! 🎉 Create stunning embed messages for your Discord server with ease!", 
            embeds: [embed], 
            components: [row1, row2, row3, row4] 
        });
    },
};
