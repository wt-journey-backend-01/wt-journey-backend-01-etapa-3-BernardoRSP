const db = require("../db/db.js");

// Mostrar Todos os Casos
async function listar() {
  const listado = await db("casos");
  return listado;
}

// Mostrar Caso Referente ao ID
async function encontrar(id) {
  const encontrado = await db("casos")
    .where({ id: Number(id) })
    .first();
  return encontrado;
}

// Adicionar Novo Caso
async function adicionar(caso) {
  const adicionado = await db("casos").insert(caso).returning("*");
  return adicionado;
}

// Atualizar Informações do Caso
async function atualizar(dadosAtualizados, id) {
  const atualizado = await db("casos")
    .where({ id: Number(id) })
    .update(dadosAtualizados)
    .returning("*");
  return atualizado[0];
}

// Deletar Caso
async function deletar(id) {
  const deletado = await db("casos")
    .where({ id: Number(id) })
    .del();
  return deletado;
}

module.exports = {
  listar,
  encontrar,
  adicionar,
  atualizar,
  deletar,
};
