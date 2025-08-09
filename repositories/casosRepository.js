const db = require("../db/db.js");

// Mostrar Todos os Casos
async function listar() {
  const listado = await db("casos");
  return listado;
}

// Mostrar Caso Referente ao ID
async function encontrar(id) {
  const encontrado = await db("casos").where({ id: id }).first();
  return encontrado;
}

// Adicionar Novo Caso
async function adicionar(caso) {
  const adicionado = await db("casos").insert(caso, ["*"]);
  return adicionado;
}

// Atualizar Informações do Caso
async function atualizar(dadosAtualizados, id) {
  const atualizado = await db("casos").where({ id: id }).update(dadosAtualizados, ["*"]);
  return atualizado;
}

// Deletar Caso
async function deletar() {
  const deletado = await db("casos").where({ id: id }).del();
  return deletado;
}

module.exports = {
  listar,
  encontrar,
  adicionar,
  atualizar,
  deletar,
};
