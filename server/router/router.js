const express = require("express");
const router = express.Router();
const {
  cadastroDePedido,
  consultaTodosPedidos,
  editarPedidoController,
  deletarPedidoController,
  verificarPedidoExistente
} = require("../controllers/pedido.js");
const {
  validarCadastro,
  validarEdicao,
} = require("../middlewares/validationMiddleware");
const {obterPedidos} = require('../controllers/excel.js')

router.post("/pedidos", validarCadastro, cadastroDePedido);
router.get("/pedidos", consultaTodosPedidos);
router.put("/pedidos/:numero", validarEdicao, editarPedidoController);
router.delete("/pedidos/:numero", deletarPedidoController);
router.get("/consultarpedido", verificarPedidoExistente)
router.get('/planilha',obterPedidos )
router.get('/ping', (req, res)=> res.status(200).json({"api": true}))


router.get("/logo", (req, res) => {
  const imagePath = path.join(
    __dirname,
    "../public/img",
    "marinha-removebg-preview.png"
  );
  res.sendFile(imagePath);
});

module.exports = router;
