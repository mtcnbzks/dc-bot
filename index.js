require("dotenv").config();
const token = process.env.DISCORD_TOKEN;

const fs = require("fs");
const path = require("path");

const Discord = require("discord.js");
const client = new Discord.Client();

const myID = "313284967214088196";

function isAttachImage(msgAttach) {
    let url = msgAttach.url;
    // True if this url is a png image.
    return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1;
}

const greetingList = [
    "sa",
    "sea",
    "selam",
    "selamun aleyküm",
    "selamunaleyküm",
];

const blacklistFile = fs.readFileSync(
    path.join(__dirname, "blacklist.txt"),
    "utf-8"
);
const blacklist = blacklistFile.split("\n");

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
    // if msg contains any blacklist word
    if (greetingList.includes(msg.content.toLowerCase())) {
        msg.reply("Aleyküm selam.");
    }
    if (blacklist.some((word) => msg.content.toLowerCase().includes(word))) {
        msg.delete();
    }
    if (msg.author.id === myID) {
        msg.react("💯");
    }
    // if (msg.author.id === yunusID) {
    //   msg.delete();
    // }
});

client.on("message", (msg) => {
    //if (msg.author.id == myID)
    if (msg.channel.id === "1042119132293902466") {
        if (msg.content.toUpperCase() === "HELLO THERE") {
            msg.reply("General Kenobi!");
        }
        if (msg.attachments.size > 0) {
            if (msg.attachments.every(isAttachImage)) {
                msg.reply("Photo detected.");
            }
        }
    }
});

client.login(token);
