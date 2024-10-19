const { InteractionType } = require('discord.js')

const { noPermissionsEmbed, notFoundEmbed } = require('../embeds/index')

module.exports = async (client, inter) => {
    await inter.deferReply({ ephemeral: true })

    if(inter.type === InteractionType.ApplicationCommand) {
        const command = client.commands.get(inter.commandName)

        if(!command) {
            return inter.editReply({ embeds: [notFoundEmbed] })
        }

        if(command.permissions && !inter.member.permissions.has(command.permissions)) {
            return inter.editReply({ embeds: [noPermissionsEmbed] })
        }

        command.execute({ inter, client })
    } else if(inter.type === InteractionType.MessageComponent) {
        const customId = inter.customId
        if(!customId) return

        const actionName = customId.split("|")[0]
        if(customId.split("|").length > 1) {
            const userId = customId.split("|")[1]
            if(inter.member.id !== userId) return
        }

        const p = `../buttonActions/${actionName}.js`

        delete require.cache[require.resolve(p)]
        const action = require(p)
        if(action) return action({ client, inter, customId })
    }
}