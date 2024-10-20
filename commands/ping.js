module.exports = {
    name: 'ping',
    description: 'Pong!',

    async execute({ inter }) {
        inter.editReply(`Latency: ${Date.now() - inter.createdTimestamp}ms`)
    }
}