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
    if (status && status !== "aberto" && status !== "fechado") {
      erros.status = "O Status deve ser 'aberto' ou 'fechado'";
    }
    if (agente_id && !isUUID(agente_id)) {
      erros.agente_id = "O agente_id deve ser um UUID válido";
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
    await casosRepository.adicionar(novoCaso);
    res.status(201).json(novoCaso);
  } catch (error) {
    console.log("Erro referente a: adicionarCaso\n");
    console.log(error);
  }
}

// Atualizar Informações do Caso
/*async function atualizarCaso(req, res) {
    try{
        const { id } = req.params;
        const { titulo, descricao, status, agente_id, id: bodyId } = req.body;
        if (!intPos.test(id)) {
            return res.status(400).json({ status: 400, mensagem: "Parâmetros inválidos", errors: { id: "O ID na URL deve ter um padrão válido" } });
        }

        const casoAtualizado = await casosRepository.atualizar({ id, titulo, descricao, status, agente_id }, id);
        if (!casoAtualizado) {
            return res.status(404).json({ status: 404, mensagem: "Caso não encontrado" });
        }
        const erros = {};

        if (bodyId) {
            erros.id = "Não é permitido alterar o ID de um caso.";
        }
        if (!titulo || !descricao || !status || !agente_id) {
            erros.geral = "Todos os campos são obrigatórios para atualização completa (PUT)";
        }
        if (status && status !== "aberto" && status !== "fechado") {
            erros.status = "O Status deve ser 'aberto' ou 'fechado'";
        }
        if (agente_id && !isUUID(agente_id)) {
            erros.agente_id = "O agente_id deve ser um UUID válido";
        } else if (agente_id && !await agentesRepository.encontrar(agente_id)) {
            erros.agente_id = "O agente com o ID fornecido não foi encontrado";
        }
        if (Object.keys(erros).length > 0) {
            return res.status(400).json({ status: 400, mensagem: "Parâmetros inválidos", errors: erros });
        }

        res.status(200).json(casoAtualizado);
    } catch (error) {
        console.log("Erro referente a: atualizarCaso\n");
        console.log(error);
    }
}*/

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

    const casoAtualizado = await casosRepository.atualizar(dadosValidos, id);
    res.json(casoAtualizado);
  } catch (error) {
    console.log("Erro referente a: atualizarCaso\n");
    console.log(error);
  }
}

// Deletar Caso
async function deletarCaso(req, res) {
  try {
    const { id } = req.params;
    if (!intPos.test(id)) {
      return res.status(400).json({ status: 400, mensagem: "Parâmetros inválidos", errors: { id: "O ID deve ter um padrão válido" } });
    }
    const sucesso = await casosRepository.deleteById(id);
    if (!sucesso) {
      return res.status(404).json({ status: 404, mensagem: "Caso não encontrado" });
    }
    res.status(204).send();
  } catch (error) {
    console.log("Erro referente a: deletarCaso\n");
    console.log(error);
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
