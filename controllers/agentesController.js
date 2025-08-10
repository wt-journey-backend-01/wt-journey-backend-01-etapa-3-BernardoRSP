const agentesRepository = require("../repositories/agentesRepository.js");
const intPos = /^\d+$/; // Regex para aceitar número inteiro positivo

// Mostrar Todos os Agentes
async function listarAgentes(req, res) {
  try {
    const agentes = await agentesRepository.listar();
    res.status(200).json(agentes);
  } catch (error) {
    console.log("Erro referente a: listarAgentes\n");
    console.log(error);
    res.status(500).json({ status: 500, mensagem: "Erro interno do servidor" });
  }
}

// Mostrar Agente Referente ao ID
async function encontrarAgente(req, res) {
  try {
    const { id } = req.params;
    if (!intPos.test(id)) {
      return res.status(400).json({ status: 400, mensagem: "Parâmetros inválidos", errors: { id: "O ID deve ter um padrão válido" } });
    }
    const agente = await agentesRepository.encontrar(id);
    if (!agente) {
      return res.status(404).json({ status: 404, mensagem: "Agente não encontrado" });
    }

    res.status(200).json(agente);
  } catch (error) {
    console.log("Erro referente a: encontrarAgente\n");
    console.log(error);
    res.status(500).json({ status: 500, mensagem: "Erro interno do servidor" });
  }
}

// Adicionar Novo Agente
async function adicionarAgente(req, res) {
  try {
    const { nome, dataDeIncorporacao, cargo } = req.body;
    const erros = {};

    if (!nome || !dataDeIncorporacao || !cargo) {
      erros.geral = "Os campos 'nome', 'dataDeIncorporacao' e 'cargo' são obrigatórios";
    }

    if (dataDeIncorporacao && !dataDeIncorporacao.match(/^\d{4}\-(0[1-9]|1[0-2])\-(0[1-9]|[12][0-9]|3[01])$/)) {
      erros.dataDeIncorporacao = "A data de incorporação deve ser uma data válida no formato AAAA-MM-DD";
    } else if (new Date(dataDeIncorporacao) > new Date()) {
      erros.dataDeIncorporacao = "A data de incorporação não pode ser uma data futura";
    }

    if (Object.keys(erros).length > 0) {
      return res.status(400).json({ status: 400, mensagem: "Parâmetros inválidos", errors: erros });
    }

    const novoAgente = { nome, dataDeIncorporacao, cargo };

    const [agenteCriado] = await agentesRepository.adicionar(novoAgente);
    res.status(201).json(agenteCriado);
  } catch (error) {
    console.log("Erro referente a: adicionarAgente\n");
    console.log(error);
    res.status(500).json({ status: 500, mensagem: "Erro interno do servidor" });
  }
}

// Atualizar Informações do Agente
async function atualizarAgente(req, res) {
  try {
    const { id } = req.params;
    const { nome, dataDeIncorporacao, cargo, id: bodyId } = req.body;

    if (!intPos.test(id)) {
      return res.status(400).json({ status: 400, mensagem: "Parâmetros inválidos", errors: { id: "O ID na URL deve ter um padrão válido" } });
    }

    const erros = {};

    if (bodyId) {
      erros.id = "Não é permitido alterar o ID de um agente.";
    }

    if (!nome || !dataDeIncorporacao || !cargo) {
      erros.geral = "Todos os campos são obrigatórios para atualização completa (PUT)";
    }

    if (dataDeIncorporacao && !dataDeIncorporacao.match(/^\d{4}\-(0[1-9]|1[0-2])\-(0[1-9]|[12][0-9]|3[01])$/)) {
      erros.dataDeIncorporacao = "A data de incorporação deve ser uma data válida no formato AAAA-MM-DD";
    } else if (new Date(dataDeIncorporacao) > new Date()) {
      erros.dataDeIncorporacao = "A data de incorporação não pode ser uma data futura";
    }

    if (Object.keys(erros).length > 0) {
      return res.status(400).json({ status: 400, mensagem: "Parâmetros inválidos", errors: erros });
    }

    const agenteAtualizado = await agentesRepository.atualizar({ nome, dataDeIncorporacao, cargo }, id);
    if (!agenteAtualizado) {
      return res.status(404).json({ status: 404, mensagem: "Agente não encontrado" });
    }

    res.status(200).json(agenteAtualizado);
  } catch (error) {
    console.log("Erro referente a: atualizarAgente\n");
    console.log(error);
    res.status(500).json({ status: 500, mensagem: "Erro interno do servidor" });
  }
}

// Atualizar Informações Parciais do Agente
async function atualizarAgenteParcial(req, res) {
  try {
    const { id } = req.params;
    const { nome, dataDeIncorporacao, cargo, id: bodyId } = req.body;

    if (!intPos.test(id)) {
      return res.status(400).json({ status: 400, mensagem: "Parâmetros inválidos", errors: { id: "O ID na URL deve ter um padrão válido" } });
    }

    const erros = {};

    if (bodyId) {
      erros.id = "Não é permitido alterar o ID de um agente.";
    }

    if (dataDeIncorporacao && !dataDeIncorporacao.match(/^\d{4}\-(0[1-9]|1[0-2])\-(0[1-9]|[12][0-9]|3[01])$/)) {
      erros.dataDeIncorporacao = "A data de incorporação deve ser uma data válida no formato AAAA-MM-DD";
    } else if (new Date(dataDeIncorporacao) > new Date()) {
      erros.dataDeIncorporacao = "A data de incorporação não pode ser uma data futura";
    }

    if (Object.keys(erros).length > 0) {
      return res.status(400).json({ status: 400, mensagem: "Parâmetros inválidos", errors: erros });
    }
    const dadosAtualizados = {};
    if (nome !== undefined) dadosAtualizados.nome = nome;
    if (dataDeIncorporacao !== undefined) dadosAtualizados.dataDeIncorporacao = dataDeIncorporacao;
    if (cargo !== undefined) dadosAtualizados.cargo = cargo;

    if (Object.keys(dadosAtualizados).length === 0) {
      return res.status(400).json({ status: 400, mensagem: "Nenhum campo válido para atualização foi enviado." });
    }

    const agenteAtualizado = await agentesRepository.atualizar(dadosAtualizados, id);
    if (!agenteAtualizado) {
      return res.status(404).json({ status: 404, mensagem: "Agente não encontrado" });
    }

    res.status(200).json(agenteAtualizado);
  } catch (error) {
    console.log("Erro referente a: atualizarAgente\n");
    console.log(error);
    res.status(500).json({ status: 500, mensagem: "Erro interno do servidor" });
  }
}

// Deletar Agente
async function deletarAgente(req, res) {
  try {
    const { id } = req.params;
    if (!intPos.test(id)) {
      return res.status(400).json({ status: 400, mensagem: "Parâmetros inválidos", errors: { id: "O ID deve ter um padrão válido" } });
    }
    const sucesso = await agentesRepository.deletar(id);
    if (!sucesso) {
      return res.status(404).json({ status: 404, mensagem: "Agente não encontrado" });
    }
    res.status(204).send();
  } catch (error) {
    console.log("Erro referente a: deletarAgente\n");
    console.log(error);
    res.status(500).json({ status: 500, mensagem: "Erro interno do servidor" });
  }
}

module.exports = {
  listarAgentes,
  encontrarAgente,
  adicionarAgente,
  atualizarAgente,
  atualizarAgenteParcial,
  deletarAgente,
};
