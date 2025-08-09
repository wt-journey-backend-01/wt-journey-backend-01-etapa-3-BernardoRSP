const casosRepository = require("../repositories/casosRepository.js");
const agentesRepository = require("../repositories/agentesRepository.js");
const intPos = /^\d+$/;

// Mostrar Todos os Casos
async function listarCasos(req, res) {
  try {
    const casos = await casosRepository.listar();
    res.status(200).json(casos);
  } catch (error) {
    console.log("Erro referente a: listarCasos\n");
    console.log(error);
    res.status(500).json({ status: 500, mensagem: "Erro interno do servidor" });
  }
}

// Mostrar Caso Referente ao ID
async function encontrarCaso(req, res) {
  try {
    const { id } = req.params;
    if (!intPos.test(id)) {
      return res.status(400).json({ status: 400, mensagem: "Parâmetros inválidos", errors: { id: "O ID deve ter um padrão válido" } });
    }
    const caso = await casosRepository.encontrar(id);
    if (!caso || Object.keys(caso).length === 0) {
      return res.status(404).json({ status: 404, mensagem: "Caso não encontrado" });
    }
    res.status(200).json(caso);
  } catch (error) {
    console.log("Erro referente a: encontrarCaso\n");
    console.log(error);
    res.status(500).json({ status: 500, mensagem: "Erro interno do servidor" });
  }
}

// Adicionar Novo Caso
async function adicionarCaso(req, res) {
  try {
    const { titulo, descricao, status, agente_id } = req.body;
    const agenteDoCaso = await agentesRepository.encontrar(agente_id);
    if (!agenteDoCaso || Object.keys(agenteDoCaso).length === 0) {
      return res.status(404).json({ status: 404, mensagem: "O agente com o ID fornecido não foi encontrado" });
    }
    const erros = {};
    if (!titulo || !descricao || !status || !agente_id) {
      erros.geral = "Os campos 'titulo', 'descricao', 'status' e 'agente_id' são obrigatórios";
    }
    if (status && status !== "aberto" && status !== "solucionado") {
      erros.status = "O Status deve ser 'aberto' ou 'solucionado'";
    }
    if (agente_id && !intPos.test(agente_id)) {
      erros.agente_id = "O agente_id deve ter um padrão válido";
    }
    if (Object.keys(erros).length > 0) {
      return res.status(400).json({ status: 400, mensagem: "Parâmetros inválidos", errors: erros });
    }

    const novoCaso = {
      titulo,
      descricao,
      status,
      agente_id,
    };
    const [casoCriado] = await casosRepository.adicionar(novoCaso);
    res.status(201).json(casoCriado);
  } catch (error) {
    console.log("Erro referente a: adicionarCaso\n");
    console.log(error);
    res.status(500).json({ status: 500, mensagem: "Erro interno do servidor" });
  }
}

// Atualizar Informações do Caso
async function atualizarCaso(req, res) {
  try {
    const { id } = req.params;
    const dados = req.body;

    const casoExistente = await casosRepository.encontrar(id);
    if (!casoExistente) return res.status(404).json({ mensagem: "Caso não encontrado" });

    delete dados.id;

    // Filtra apenas os campos válidos com base no objeto original
    const dadosValidos = Object.keys(dados).reduce((obj, chave) => {
      if (casoExistente.hasOwnProperty(chave)) {
        obj[chave] = dados[chave];
      }
      return obj;
    }, {});

    const [casoAtualizado] = await casosRepository.atualizar(dadosValidos, id);
    res.json(casoAtualizado);
  } catch (error) {
    console.log("Erro referente a: atualizarCaso\n");
    console.log(error);
    res.status(500).json({ status: 500, mensagem: "Erro interno do servidor" });
  }
}

// Deletar Caso
async function deletarCaso(req, res) {
  try {
    const { id } = req.params;
    if (!intPos.test(id)) {
      return res.status(400).json({ status: 400, mensagem: "Parâmetros inválidos", errors: { id: "O ID deve ter um padrão válido" } });
    }
    const sucesso = await casosRepository.deletar(id);
    if (!sucesso) {
      return res.status(404).json({ status: 404, mensagem: "Caso não encontrado" });
    }
    res.status(204).send();
  } catch (error) {
    console.log("Erro referente a: deletarCaso\n");
    console.log(error);
    res.status(500).json({ status: 500, mensagem: "Erro interno do servidor" });
  }
}

// Exports
module.exports = {
  listarCasos,
  encontrarCaso,
  adicionarCaso,
  atualizarCaso,
  deletarCaso,
};
