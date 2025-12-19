require("dotenv").config();
const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const commands = [
  new SlashCommandBuilder().setName("ping").setDescription("cek ping bot"),
  new SlashCommandBuilder().setName("halo").setDescription("sapa bot"),
  new SlashCommandBuilder().setName("about").setDescription("info tentang bot"),
  new SlashCommandBuilder().setName("serverinfo").setDescription("info tentang server ini"),

  new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("lihat avatar user")
    .addUserOption((opt) =>
      opt.setName("user").setDescription("pilih user (opsional)").setRequired(false)
    ),

  new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("info user")
    .addUserOption((opt) =>
      opt.setName("user").setDescription("pilih user (opsional)").setRequired(false)
    ),

  new SlashCommandBuilder()
    .setName("testwelcome")
    .setDescription("test welcome (admin only)"),

  new SlashCommandBuilder()
    .setName("menfesspanel")
    .setDescription("kirim panel menfess ke channel menfess (admin only)"),

  new SlashCommandBuilder()
    .setName("idcard")
    .setDescription("buat HOV IDENTITY CARD (dark/light via form)"),
].map((cmd) => cmd.toJSON());

const rest = new REST({ version: "10" });

(async () => {
  try {
    if (!process.env.DISCORD_TOKEN) throw new Error("DISCORD_TOKEN belum ada di .env");
    if (!process.env.CLIENT_ID) throw new Error("CLIENT_ID belum ada di .env");
    if (!process.env.GUILD_ID) throw new Error("GUILD_ID belum ada di .env");

    rest.setToken(process.env.DISCORD_TOKEN);

    console.log("⏳ registering slash commands...");

    await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), {
      body: commands,
    });

    console.log("✅ slash commands registered!");
  } catch (err) {
    console.error(err);
  }
})();
