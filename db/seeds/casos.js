/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("casos").del();

  await knex("casos").insert([
    { titulo: "Desaparecimento", descricao: "Desaparecimento de eposa do filho do prefeito.", status: "aberto", agente_id: 1 },
    { titulo: "Operação Vagalume", descricao: "Desaparecimento de documentos relevantes.", status: "solucionado", agente_id: 2 },
  ]);
};
