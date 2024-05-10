const {
  Client,
  IntentsBitField,
  Partials,
  ActivityType,
} = require("discord.js");
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessageReactions,
  ],
  partials: [Partials.Channel, Partials.Message, Partials.Reaction],
});

let totalReactionCount = 0;

client.on("ready", async () => {
  console.log(`Bot is online as ${client.user.tag}`);
  client.user.setPresence({
    activities: [
      {
        name: "Autism™ 🎅",
        type: ActivityType.Watching,
      },
    ],
    status: "online",
  });

  const targetChannelId = "577996163215654922";
  const targetMessageId = "577998018104787017";

  try {
    const targetChannel = await client.channels.fetch(targetChannelId);
    const targetMessage = await targetChannel.messages.fetch(targetMessageId);

    targetMessage.reactions.cache.forEach((reaction) => {
      totalReactionCount += reaction.count;
    });

    console.log("Total reaction count initialized:", totalReactionCount);
  } catch (error) {
    console.error("Error fetching the target message:", error);
  }
});

client.on("messageReactionAdd", (reaction, user) => {
  if (reaction.message.id === "577998018104787017") {
    console.log(`Reaction added by ${user.tag}: ${reaction.emoji.name}`);

    totalReactionCount++;

    console.log("Total reaction count:", totalReactionCount);
  }
});

client.on("messageReactionRemove", (reaction, user) => {
  if (reaction.message.id === "577998018104787017") {
    console.log(`Reaction removed by ${user.tag}: ${reaction.emoji.name}`);

    totalReactionCount = Math.max(totalReactionCount - 1, 0);

    console.log("Total reaction count:", totalReactionCount);
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) {
    return;
  }

  const channels = {
    inicio: "1187949588481589298",
    enigma1: "1187949985510215680",
    enigma2: "1187950022365565019",
    enigma3: "1187950046554107985",
    enigma4: "1187950067122966528",
    enigma5: "1187950086550978672",
    enigma6: "1187950107358920754",
    enigma7: "1187950128691150928",
    enigma8: "1187950154314174604",
    enigma9: "1187950246295248896",
    enigma10: "1187950293950935151",
    fim: "1187950335805894736",
  };

  const roles = {
    role1: "1187950427115884567",
    role2: "1187950544573190145",
    role3: "1187950572234616944",
    role4: "1187950679382302821",
    role5: "1187950707681263667",
    role6: "1187950735665664111",
    role7: "1187950784114085968",
    role8: "1187950812891205673",
    role9: "1187950839957037128",
    role10: "1187950870114095275",
    finalRole: "1187950893409247262",
  };

  const steps = [
    {
      channel: channels.inicio,
      role: roles.role1,
      next: channels.enigma1,
      answers: ["iniciar"],
      message: "Resolve o primeiro enigma!",
    },
    {
      channel: channels.enigma1,
      role: roles.role2,
      next: channels.enigma2,
      answers: [
        "7 de outubro de 2017",
        "7 de outubro 2017",
        "7 outubro 2017",
        "7/10/2017",
        "7-10-2017",
      ],
      message: "chegaste ao enigma 2!",
    },
    {
      channel: channels.enigma2,
      role: roles.role3,
      next: channels.enigma3,
      answers: ["y"],
      message: "chegaste ao enigma 3!",
    },
    {
      channel: channels.enigma3,
      role: roles.role4,
      next: channels.enigma4,
      answers: ["main", "<#947580770866827315>"],
      message: "chegaste ao enigma 4!",
    },
    {
      channel: channels.enigma4,
      role: roles.role5,
      next: channels.enigma5,
      answers: ["camadas"],
      message: "chegaste ao enigma 5!",
    },
    {
      channel: channels.enigma5,
      role: roles.role6,
      next: channels.enigma6,
      answers: ["autismserver"],
      message: "chegaste ao enigma 6!",
    },
    {
      channel: channels.enigma6,
      role: roles.role7,
      next: channels.enigma7,
      answers: ["caralho", "o caralho", "do caralho"],
      message: "chegaste ao enigma 7!",
    },
    {
      channel: channels.enigma7,
      role: roles.role8,
      next: channels.enigma8,
      answers: [totalReactionCount],
      message: "chegaste ao enigma 8!",
    },
    {
      channel: channels.enigma8,
      role: roles.role9,
      next: channels.enigma9,
      answers: ["cu", "cú"],
      message: "chegaste ao enigma 9!",
    },
    {
      channel: channels.enigma9,
      role: roles.role10,
      next: channels.enigma10,
      answers: ["feliz natal"],
      message: "chegaste ao último enigma!",
    },
    {
      channel: channels.enigma10,
      role: roles.finalRole,
      next: channels.fim,
      answers: ["pikachu"],
      message: "chegaste ao fim da caça ao tesouro!",
    },
  ];

  for (const step of steps) {
    const lowerCaseContent = message.content.toLowerCase();
    const isNumber = typeof step.answers[0] === "number";
    const isCorrectAnswer = isNumber
      ? lowerCaseContent === step.answers[0].toString()
      : step.answers.some(
          (answer) => lowerCaseContent === answer.toLowerCase()
        );
    if (message.channel.id === step.channel) {
      if (isCorrectAnswer) {
        const member = message.guild.members.cache.get(message.author.id);
        const role = message.guild.roles.cache.get(step.role);
        const nextChannel = message.guild.channels.cache.get(step.next);

        if (member && role) {
          await member.roles.add(role);

          if (step.channel !== channels.inicio) {
            const previousRole = message.guild.roles.cache.get(
              roles[`role${steps.indexOf(step)}`]
            );
            await member.roles.remove(previousRole);
          }

          if (step.next === channels.fim) {
            nextChannel.send(`${member} ${step.message}`);
          } else {
            nextChannel.send(`${member} ${step.message}`).then((msg) => {
              setTimeout(() => msg.delete(), 20000);
            });
          }
        }
        if (message.author.id !== "362259065801277440") {
          message.delete();
        }
        break;
      }
      if (message.author.id !== "362259065801277440") {
        message.delete();
      }
    }
  }
});

client.login(
  "ODkwNzg5MDUxNjA5Nzc2MTY4.GVrAUd.blUk-pQUypLt0kJ6NPrzZnyH-uneiiobiCRrwc"
);
