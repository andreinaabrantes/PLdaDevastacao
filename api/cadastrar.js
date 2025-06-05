// api/cadastrar.js

export default async function handler(request, response) {
  // Permitir apenas método POST
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Método não permitido' });
  }

  try {
    // Ler o corpo da requisição (JSON)
    const { name, email, city } = request.body;
    
    // (Aqui você pode, por exemplo:)
    //  • Gravar em um banco (Firestore, Supabase, MongoDB Atlas, etc.)
    //  • Enviar um e-mail de confirmação
    //  • Gravar numa planilha via Google Sheets API
    // Por agora, vamos só logar no console
    console.log('Novo cadastro recebido:', { name, email, city });

    // Retornar sucesso
    return response.status(200).json({ success: true });
  } catch (err) {
    console.error('Erro ao processar cadastro:', err);
    return response.status(500).json({ error: 'Erro interno do servidor' });
  }
}