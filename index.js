const { REST, Routes } = require('discord.js');

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];

const rest = new REST({ version: '10' }).setToken('');

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(''), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds,
                                      GatewayIntentBits.GuildMessages,
                                      // GatewayIntentBits.MessageContent,
                                      // GatewayIntentBits.GuildMembers
                                    ] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login('');

// client.on('message', msg => {
//   if (msg.content === 'ping') {
//     msg.reply('Pong!');
//       }
//     });

// //make sure this line is the last line
// client.login(process.env.CLIENT_TOKEN); //login bot using token