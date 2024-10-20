module.exports = async ({ inter }) => {
    inter.message.delete()
    inter.deleteReply()
}