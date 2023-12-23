const Discord = require('discord.js');
const QRCode = require('qrcode');

const client = new Discord.Client();
const prefix = '!'; // Change this to your desired bot prefix

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', async (message) => {
  if (message.author.bot) return; // Ignore messages from bots
  if (!message.content.startsWith(prefix)) return; // Ignore messages without the prefix

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'generateqr') {
    // Extract the text to encode from the message
    const textToEncode = args.join(' ');

    // Generate the QR code
    const qrCodeBuffer = await generateQRCode(textToEncode);

    // Send the QR code image to the Discord channel
    message.channel.send({ files: [{ attachment: qrCodeBuffer, name: 'qrcode.png' }] });
  }
});

async function generateQRCode(text) {
  try {
    // Generate QR code as a buffer
    const qrCodeBuffer = await QRCode.toBuffer(text);
    return qrCodeBuffer;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
}

const token = 'YOUR_DISCORD_BOT_TOKEN'; // Replace with your Discord bot token
client.login(token);
