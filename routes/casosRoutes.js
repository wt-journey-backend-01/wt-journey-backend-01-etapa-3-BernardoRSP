const express = require("express");
const router = express.Router();
const casosController = require("../controllers/casosController.js");

/**
 * @swagger
 * tags:
 *   name: Casos
 *   description: Endpoints relacionados aos casos
 */

/**
 * @swagger
 * /casos:
 *   get:
 *     summary: Retorna todos os casos
 *     tags: [Casos]
 *     responses:
 *       200:
 *         description: Lista de casos retornada com sucesso
 */
router.get("/", casosController.listarCasos);
/**
 * @swagger
 * /casos/{id}:
 *   get:
 *     summary: Retorna um caso por ID
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do caso
 *     responses:
 *       200:
 *         description: Caso encontrado
 *       404:
 *         description: Caso não encontrado
 */
router.get("/:id", casosController.encontrarCaso);
/**
 * @swagger
 * /casos:
 *   post:
 *     summary: Adiciona um novo caso
 *     tags: [Casos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Caso criado
 */
router.post("/", casosController.adicionarCaso);

/**
 * @swagger
 * /casos/{id}:
 *   put:
 *     summary: Atualiza completamente um caso
 *     tags: [Casos]
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
 *               titulo: Atualizado
 *               descricao: Atualização completa
 *               status: fechado
 *               agente_id: id-agente
 *     responses:
 *       200:
 *         description: Caso atualizado
 *       404:
 *         description: Caso não encontrado
 */
router.put("/:id", casosController.atualizarCaso);

/**
 * @swagger
 * /casos/{id}:
 *   patch:
 *     summary: Atualiza parcialmente um caso
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *               status: fechado
 *     responses:
 *       200:
 *         description: Caso atualizado parcialmente
 *       404:
 *         description: Caso não encontrado
 */
router.patch("/:id", casosController.atualizarCasoParcial);

/**
 * @swagger
 * /casos/{id}:
 *   delete:
 *     summary: Deleta um caso
 *     tags: [Casos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Caso deletado
 *       404:
 *         description: Caso não encontrado
 */

router.delete("/:id", casosController.deletarCaso);

module.exports = router;
