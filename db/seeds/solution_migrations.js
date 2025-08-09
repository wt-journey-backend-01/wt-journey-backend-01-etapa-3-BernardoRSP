/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('casos').del();
  await knex('agentes').del();  

  const [agente1ID, agente2ID] = await knex('agentes').insert([
    {nome: 'Bernardo Rezende', dataDeIncorporacao: '2023-05-11', cargo: 'Investigador'},
    {nome: 'Rommel Carneiro', dataDeIncorporacao: '2022-09-01', cargo: 'Delegado'}
  ]).returning('id');

  await knex('casos').insert([
    {titulo: 'Desaparecimento',
     descricao: 'Desaparecimento de eposa do filho do prefeito.',
     status: 'aberto',
     agente_id: agente1ID.id},
     
    {titulo: 'Operação Vagalume',
     descricao: 'Desaparecimento de documentos relevantes.',
     status: 'solucionado',
     agente_id: agente2ID.id}  
  ])
};
