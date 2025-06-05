// api/cadastrar.js

/**
 * Função serverless que recebe { name, email, city } via POST
 * e insere um novo registro na tabela do Airtable usando Personal Access Token (PAT).
 */

module.exports = async (req, res) => {
  // Permitir apenas requisições POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    // Extrai os dados do corpo JSON
    const { name, email, city } = req.body || {};

    // Validação simples dos campos
    if (!name || !email || !city) {
      return res.status(400).json({ error: 'Faltando name, email ou city no payload.' });
    }

    // Recupera as variáveis de ambiente definidas no Vercel
    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;  // agora contém o PAT
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;  // Base ID da base Airtable

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      console.error('Erro: AIRTABLE_API_KEY ou AIRTABLE_BASE_ID não definidos nas variáveis de ambiente.');
      return res.status(500).json({ error: 'Configuração de ambiente incompleta.' });
    }

    // Nome da tabela (caso você tenha renomeado a tabela, substitua 'Table 1' pelo nome exato)
    const tableName = encodeURIComponent('CadastrosPL');

    // Monta a URL para inserir registros
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tableName}`;

    // Monta o corpo da requisição conforme a API do Airtable espera
    const body = {
      records: [
        {
          fields: {
            name:  name,
            email: email,
            city:  city
            // Se você criou coluna "Timestamp" como "Created time", ela será preenchida automaticamente
          }
        }
      ]
    };

    // Envia POST para a API do Airtable usando o Bearer token (PAT)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AIRTABLE_API_KEY}`
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Erro ao inserir no Airtable:', data);
      return res.status(response.status).json({ error: data });
    }

    console.log('Novo cadastro inserido no Airtable:', data);

    // Se tudo correu bem, retorna sucesso
    return res.status(200).json({ success: true, record: data.records[0] });
  } catch (err) {
    console.error('Erro interno ao processar /api/cadastrar:', err);
    return res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};
