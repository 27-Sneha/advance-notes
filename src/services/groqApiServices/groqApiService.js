export async function getNoteSummary(text) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "user", content: `Summarize this in 2–3 lines:\n\n${text}` },
      ],
    }),
  });

  const data = await res.json();
  return data.choices[0].message.content;
}

export async function getNoteTags(text) {
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "user",
            content: `
              Extract 3–5 short tags from the following content.
              Return ONLY a JSON array of strings, nothing else.

              Content:
              ${text}
            `,
          },
        ],
      }),
    });

    const data = await res.json();

    const raw = data.choices?.[0]?.message?.content || "[]";

    const tags = JSON.parse(raw);

    return tags;
  } catch (error) {
    console.error("Tag Generation Error:", error);
    return [];
  }
}

export async function checkGrammar(text) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: `Identify grammar mistakes from Text and return ONLY a JSON array like and nothing else:
            [
              { "wrong": "...", "correct": "...", "explanation": "..." }
            ]
Text:
${text}`,
        },
      ],
    }),
  });

  const data = await res.json();
  return JSON.parse(data.choices[0].message.content);
}
