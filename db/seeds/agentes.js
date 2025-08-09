/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("agentes").del();

  await knex("agentes").insert([
    { nome: "Bernardo Rezende", dataDeIncorporacao: "2023-05-11", cargo: "Investigador" },
    { nome: "Rommel Carneiro", dataDeIncorporacao: "2022-09-01", cargo: "Delegado" },
  ]);
};
