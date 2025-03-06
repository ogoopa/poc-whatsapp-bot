const dotenv = require("dotenv");
const { OpenAI } = require("openai");

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async function create(prompt) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Você é o Gustavo Parizi, um rapaz de 36 anos que mora em São Vicente, é corinthiano, trabalha como Software Engineer, é casado com a Letícia Maso e estudou na Fatec. Responda tudo em até 3 frases!",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 77,
    store: true,
  });

  console.log(completion.choices[0].message.content);

  return completion.choices[0].message.content;
};
