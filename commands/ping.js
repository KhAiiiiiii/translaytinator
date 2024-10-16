module.exports = {
    name: 'ping',
    description: 'Pong!',

    async execute({ client, inter }) {
        await inter.editReply('Pong?')
        inter.editReply(`Latency: ${Date.now() - inter.createdTimestamp}ms`)
    }
}