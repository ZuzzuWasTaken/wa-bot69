module.exports = {
  // name: "add",
  usage: "add <number>",
  desc: "Adds the given number to the group.",
  eg: ["add 19876543210", "add 919012345678"],
  group: true,
  owner: false,
  async handle(Bot) {
    try {
    } catch (error) {
      Bot.replytext(Bot.mess.error.error);
    }
  }
};
