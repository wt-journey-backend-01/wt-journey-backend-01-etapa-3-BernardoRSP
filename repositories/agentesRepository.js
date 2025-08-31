const db = require("../db/db.js");

// Mostrar Todos os Agentes
async function listar() {
  const listado = await db("agentes");
  return listado;
}

// Mostrar Agente Referente ao ID
async function encontrar(id) {
  const encontrado = await db("agentes")
    .where({ id: Number(id) })
    .first();
  return encontrado;
}

// Adicionar Novo Agente
async function adicionar(agente) {
  const adicionado = await db("agentes").insert(agente).returning("*");
  return adicionado;
}

// Atualizar Informações do Agente
async function atualizar(dadosAtualizados, id) {
  const atualizado = await db("agentes")
    .where({ id: Number(id) })
    .update(dadosAtualizados)
    .returning("*");
  return atualizado[0];
}

// Deletar Agente
async function deletar(id) {
  const deletado = await db("agentes")
    .where({ id: Number(id) })
    .del();
  return deletado;
}

// Mostrar Casos de Agente
async function listarCasos(agente_id) {
  const listado = await db("casos").where({ agente_id: Number(agente_id) });
  return listado;
}

module.exports = {
  listar,
  encontrar,
  adicionar,
  atualizar,
  deletar,
  listarCasos,
};
