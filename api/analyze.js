// api/analyze.js
// Proxy para a API da Anthropic (evita CORS no navegador)
// Variável de ambiente necessária: ANTHROPIC_API_KEY

export default async function handler(req, res) {
  // Aceita apenas POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt não fornecido" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "ANTHROPIC_API_KEY não configurada nas variáveis de ambiente do Vercel" });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type":      "application/json",
        "x-api-key":         apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model:      "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages:   [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Erro ao chamar Anthropic:", error);
    return res.status(500).json({ error: "Erro interno ao chamar a IA" });
  }
}
