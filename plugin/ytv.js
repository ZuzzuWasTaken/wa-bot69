const fs = require("fs");
const ytdl = require("ytdl-core");
const axios = require("axios");
const path = require("path");
const getRandom = (ext) => {
  return `${Math.floor(Math.random() * 10000)}${ext}`;
};

module.exports = {
  name: "ytv",
  usage: "ytv <link>",
  desc: "Downloads video from the given youtube link.",
  eg: ["ytv youtu.be/JJWE3-Q6s", "ytv youtu.be/Tjdu4-yhd"],
  group: false,
  owner: false,

  async handle(Bot) {
    try {
      const arg = Bot.arg;
      const vid = getRandom(".mp4");
      const thumb = getRandom(".jpg");

      if (arg.length == 1) {
        Bot.wrongCommand();
        return;
      }
      const url = arg[1];
      if (ytdl.validateURL(url)) {
        const info = await ytdl.getInfo(ytdl.getURLVideoID(url));
        const file = fs.createWriteStream(thumb);
        axios
          .request({
            url: info.videoDetails.thumbnails.pop().url,
            method: "GET",
            responseType: "stream"
          })
          .then((response) => {
            response.data.pipe(file);
            file.on("finish", () => {
              file.close(() => {});
            });
          });
        const msg =
          "🎪 *Title  :*\n" +
          "```" +
          info.videoDetails.title +
          "```\n\n" +
          "🍟 *Author :*  " +
          "```" +
          info.videoDetails.author.name +
          "```\n" +
          "🎥 *Views  :*  " +
          "```" +
          info.videoDetails.viewCount +
          "```\n" +
          "👍 *Likes   :*  " +
          "```" +
          info.videoDetails.likes +
          "```";
        ytdl(url)
          .pipe(fs.createWriteStream(vid))
          .on("finish", async () => {
            await Bot.replyvideo(vid, msg, path.join(__dirname, "../") + thumb);
          });
      } else {
        await Bot.replytext(Bot.mess.error.invalid);
        fs.unlinkSync(vid);
        fs.unlinkSync(thumb);
      }
    } catch (err) {
      Bot.errorlog(err);
      fs.unlinkSync(vid);
      fs.unlinkSync(thumb);
    }
  }
};
