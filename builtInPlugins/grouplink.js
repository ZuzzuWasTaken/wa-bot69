
module.exports = {
  name: "grouplink",
  usage: "grouplink",
  desc: "Creates a group invite link for the group.",
  eg: ["grouplink"],
  group: true,
  owner: false,
  async handle(Bot) {
    try {
      if (!Bot.isBotGroupAdmins) {
        Bot.replytext(Bot.mess.only.Badmin);
        return;
      }
      const grplink = await Bot.client.groupInviteCode(Bot.from);
      Bot.replytext(
        "```https://chat.whatsapp.com/```" + "```" + grplink + "```"
      );
    } catch (error) {
      Bot.errorlog(error);
    }
  },
};
