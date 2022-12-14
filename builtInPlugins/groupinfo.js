const http = require("https");
const fs = require("fs");
const path = require("path");
const getRandom = (ext) => {
  return `${Math.floor(Math.random() * 10000)}${ext}`;
};
module.exports = {
  name: "groupinfo",
  usage: "groupinfo",
  desc: "Provides all the information about setting of the group.",
  eg: ["groupinfo"],
  group: true,
  owner: false,
  async handle(Bot) {
    try {
      const grpdata =
        "๐ฎ *Title* : " +
        "*" +
        Bot.groupMetadata.subject +
        "*" +
        "\n\n๐ *Member* : " +
        "```" +
        Bot.groupMetadata.participants.length +
        "```" +
        "\n๐ *Admins*  : " +
        "```" +
        Bot.groupAdmins.length +
        "```" +
        "\n๐ *Prefix*      : " +
        "```" +
        Bot.groupdata.prefix +
        "```" +
        "\n๐ก *Useprefix*        : " +
        "```" +
        Bot.groupdata.useprefix +
        "```" +
        "\n๐ถ *Autosticker*    : " +
        "```" +
        Bot.groupdata.autosticker +
        "```" +
        "\n๐ค *Botaccess*      : " +
        "```" +
        Bot.groupdata.membercanusebot +
        "```" +
        "\n๐ *Filterabuse*     : " +
        "```" +
        Bot.groupdata.allowabuse +
        "```" +
        "\nโ ๏ธ *NSFW detect*  : " +
        "```" +
        Bot.groupdata.nsfw +
        "```" +
        "\n๐ซ *Credits used*  : " +
        "```" +
        Bot.groupdata.totalmsgtoday +
        "```" +
        "\n๐งถ *Total credits*  : " +
        "```" +
        Bot.botdata.dailygrouplimit +
        "```" +
        "\n๐จ *Banned users* : " +
        "```" +
        (Number(Bot.groupdata.banned_users.length) - 1) +
        "```\n";
      const ppUrl = await Bot.client.profilePictureUrl(Bot.from, "image");

      ran = getRandom(".jpeg");
      const file = fs.createWriteStream(ran);
      http.get(ppUrl, function (response) {
        response.pipe(file);
        file.on("finish", function () {
          file.close(async () => {
            Bot.replyimage(ran, grpdata);
          });
        });
      });
    } catch (error) {
      Bot.errorlog(error);
      //` Bot.replytext(grpdata);
    }
  }
};
