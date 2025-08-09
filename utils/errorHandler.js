// aptura erros que ocorrem na aplicação.
function errorHandler(err, req, res, next) {
  console.error(err.stack); // Loga o erro no console para debug

  // Se o erro já tiver um status, usa ele. Senão, assume erro 500.
  const statusCode = err.statusCode || 500;
  const message = err.message || "Ocorreu um erro interno no servidor.";

  res.status(statusCode).json({
    status: statusCode,
    mensagem: message,
  });
}

module.exports = errorHandler;
