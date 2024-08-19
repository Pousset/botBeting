

module.exports = {
    name: '!hello',
    description: 'Répond "Hello, World!"',
    execute(client, message, args) {
        message.channel.send('Hello, World!');
    },
};
