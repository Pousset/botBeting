require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.commands = new Collection();

// Charger les commandes dynamiquement
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Le bot est en ligne !');
});

client.on('messageCreate', async message => {
    if (!message.content.startsWith('!') || message.author.bot) return;

    const args = message.content.slice(1).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        await command.execute(client, message, args);
    } catch (error) {
        console.error(error);
        message.reply("Il y a eu une erreur en exécutant cette commande.");
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
  
    const { customId, user, message } = interaction;
    
    // Récupérer l'ID du pari à partir du contenu du message (assurez-vous qu'il est structuré de manière à être facilement récupéré)
    const betId = parseInt(message.embeds[0].description.split(':')[1]);
  
    switch (customId) {
      case 'win':
        addUserPrediction(betId, user.id, 'win', 0, 0); // Ajouter la prédiction de l'utilisateur
        await interaction.reply({ content: 'Vous avez choisi: Win (W)', ephemeral: true });
        break;
      case 'lose':
        addUserPrediction(betId, user.id, 'lose', 0, 0);
        await interaction.reply({ content: 'Vous avez choisi: Lose (L)', ephemeral: true });
        break;
      case 'draw':
        addUserPrediction(betId, user.id, 'draw', 0, 0);
        await interaction.reply({ content: 'Vous avez choisi: Draw (N)', ephemeral: true });
        break;
      case 'lock':
        await interaction.reply({ content: 'Les paris sont verrouillés pour ce pari.', ephemeral: true });
        break;
      default:
        await interaction.reply({ content: 'Action non reconnue.', ephemeral: true });
        break;
    }
  });

  
  

client.login(process.env.TOKEN);
