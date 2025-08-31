const express = require("express");
const router = express.Router();
const agentesController = require("../controllers/agentesController.js");

/**
 * @swagger
 * tags:
 *   name: Agentes
 *   description: Endpoints relacionados aos agentes
 */

/**
 * @swagger
 * /agentes:
 *   get:
 *     summary: Retorna todos os agentes
 *     tags: [Agentes]
 *     responses:
 *       200:
 *         description: Lista de agentes retornada com sucesso
 */
router.get("/", agentesController.listarAgentes);

/**
 * @swagger
 * /agentes/{id}:
 *   get:
 *     summary: Retorna um agente por ID
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do agente
 *     responses:
 *       200:
 *         description: Agente encontrado
 *       404:
 *         description: Agente não encontrado
 */
router.get("/:id", agentesController.encontrarAgente);

/**
 * @swagger
 * /agentes:
 *   post:
 *     summary: Adiciona um novo agente
 *     tags: [Agentes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Agente criado
 */
router.post("/", agentesController.adicionarAgente);

/**
 * @swagger
 * /agentes/{id}:
 *   put:
 *     summary: Atualiza completamente um agente
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               nome: Nome Atualizado
 *               email: atualizado@email.com
 *     responses:
 *       200:
 *         description: Agente atualizado
 *       404:
 *         description: Agente não encontrado
 */

router.put("/:id", agentesController.atualizarAgente);

/**
 * @swagger
 * /agentes/{id}:
 *   patch:
 *     summary: Atualiza parcialmente um agente
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *               nome: Novo nome
 *     responses:
 *       200:
 *         description: Agente atualizado parcialmente
 *       404:
 *         description: Agente não encontrado
 */

router.patch("/:id", agentesController.atualizarAgenteParcial);

/**
 * @swagger
 * /agentes/{id}:
 *   delete:
 *     summary: Deleta um agente pelo ID
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Agente deletado
 *       404:
 *         description: Agente não encontrado
 */
router.delete("/:id", agentesController.deletarAgente);

router.get("/:id/casos", agentesController.listarCasosDoAgente);

module.exports = router;
