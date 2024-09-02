const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { getBets, addUserPrediction } = require('../utils/betManager');

module.exports = {
  name: 'joinbet',
  description: 'Rejoindre un pari existant',
  async execute(client, message, args) {
    // Récupérer tous les paris en cours
    const bets = getBets();

    if (bets.length === 0) {
      return message.channel.send('Aucun pari en cours. Créez un pari avant de le rejoindre.');
    }

    // Créer un message avec la liste des paris disponibles
    let betList = bets.map(bet => `ID: ${bet.id} - ${bet.equipe1} vs ${bet.equipe2}`).join('\n');
    
    // Envoyer le message de liste des paris
    const listEmbed = new EmbedBuilder()
      .setTitle('Liste des Paris en Cours')
      .setDescription(betList)
      .setColor('#00FF00');

    await message.channel.send({ embeds: [listEmbed] });

    // Demander l'ID du pari à l'utilisateur
    message.channel.send('Veuillez entrer l\'ID du pari que vous souhaitez rejoindre :');

    // Filtre pour s'assurer que seul l'auteur du message initial peut répondre
    const filter = m => m.author.id === message.author.id;
    const collected = await message.channel.awaitMessages({ filter, max: 1, time: 60000 });

    if (!collected.size) {
      return message.channel.send('Temps écoulé. Veuillez réessayer la commande.');
    }

    const betId = parseInt(collected.first().content);

    // Vérifier si l'ID du pari existe
    const bet = bets.find(b => b.id === betId);

    if (!bet) {
      return message.channel.send('Pari non trouvé. Veuillez vérifier l\'ID et réessayer.');
    }

    // Créer l'embed et les boutons pour rejoindre le pari
    const embed = new EmbedBuilder()
      .setTitle('Rejoindre un pari')
      .setDescription(`ID du pari: ${betId}\nChoisissez votre prédiction pour ce pari en utilisant les boutons ci-dessous.`)
      .addFields(
        { name: 'Options:', value: 'Win (W) | Loose (L) | Nul (N)' },
        { name: 'Pots:', value: `W: 0 | L: 0 | N: 0`, inline: true }
      );

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('win')
          .setLabel('W')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('lose')
          .setLabel('L')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('draw')
          .setLabel('N')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('lock')
          .setLabel('Lock')
          .setStyle(ButtonStyle.Success)
      );

    // Envoyer l'embed avec les boutons
    await message.channel.send({ embeds: [embed], components: [row] });
  },
};
