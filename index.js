const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const create = require("./gusBot.js");

const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: "testGus",
  }),
  //   puppeteer: {
  //     args: ["--no-sandbox", "--disable-setuid-sandbox"],
  //   },
});

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Client is ready!");
});

// When the client received QR-Code
client.on("qr", (qr) => {
  console.log("QR RECEIVED", qr);
  qrcode.generate(qr, { small: true });
});

client.on("message_create", async (message) => {
  if (message.body.startsWith("hey goopa, ")) {
    // Verifica se começa com "hey goopa, "
    const prompt = message.body.replace(/^hey goopa, /, ""); // Remove "hey goopa, "
    const data = await create(prompt);
    await client.sendMessage(message.from, data);
  }
});

// Start your client
client.initialize();
