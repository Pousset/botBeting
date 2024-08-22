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

    const { customId } = interaction;

    switch (customId) {
        case 'createBet':
            interaction.reply('Commande !bet exécutée.');
            break;
        case 'joinBet':
            interaction.reply('Commande !joinbet exécutée.');
            break;
        case 'endBet':
            interaction.reply('Commande !endbet exécutée.');
            break;
        case 'showBet':
            interaction.reply('Commande !showbet exécutée.');
            break;
        default:
            interaction.reply('Action non reconnue.');
            break;
    }
});

client.login(process.env.TOKEN);
