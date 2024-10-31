const { criarPlanilha } = require("../service/excel");
const { consultarTodosPedidos } = require('../database/query')

const obterPedidos = async (req, res) => {
  const pedidos = await consultarTodosPedidos()
  
  try {
    const buffer = await criarPlanilha(pedidos);
    res.set({
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": "attachment; filename=pedidos.xlsx",
    });
    res.send(buffer);
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ error: "Erro ao gerar a planilha" });
  }
};

module.exports = { obterPedidos };
