const {
  cadastrarPedido,
  consultarTodosPedidos,
  consultarUmPedidos,
  editarPedido,
  deletarPedido,
} = require("../database/query");

const cadastroDePedido = async (req, res) => {
  const pedido = req.body;

  const pedidoExistente = await consultarUmPedidos(pedido.numero);
  if (pedidoExistente.length) {
    return res
      .status(400)
      .json({ mensagem: "Há pedido existente para esse número" });
  }

  const cadastro = await cadastrarPedido(pedido);
  return res
    .status(201)
    .json({ mensagem: "Pedido cadastrado", nome: cadastro });
};

const consultaTodosPedidos = async (req, res) => {
  try {
    const pedidos = await consultarTodosPedidos();
    return res.status(200).json(pedidos);
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: "Erro ao consultar pedidos", error });
  }
};

const editarPedidoController = async (req, res) => {
  const pedido = req.body;
  const numero = parseInt(req.params.numero)


  
  const pedidoExistente = await consultarUmPedidos(numero);
  if (!pedidoExistente.length) {
    return res.status(404).json({ mensagem: "Pedido não encontrado" });
  }

  try {
    const pedidoAtualizado = await editarPedido({...pedido, numero});
    console.log(pedidoAtualizado);
    
    return res
      .status(201)
      .json({ mensagem: "Pedido atualizado", nome: pedidoAtualizado });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao editar pedido", error });
  }
};

const deletarPedidoController = async (req, res) => {
  const { numero } = req.params;

  const pedidoExistente = await consultarUmPedidos(parseInt(numero));
  if (!pedidoExistente.length) {
    return res.status(404).json({ mensagem: "Pedido não encontrado" });
  }

  try {
    await deletarPedido(parseInt(numero));
    return res.status(200).json({ mensagem: "Pedido deletado com sucesso" });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao deletar pedido", error });
  }
};

const verificarPedidoExistente = async(req, res) => {
  try {
    const { numero } = req.body

    const pedido = await consultarUmPedidos(numero)

    console.log(pedido);
    
    if(pedido.length > 0){
      return res.status(200).json({exite: true, numero: pedido[0].numero})
    }
    
    return res.status(200).json({pedido: false})
  } catch (error) {
    return res.status(500).json({mensagem: "Erro ao consultar pedido"})
  }
}

module.exports = {
  cadastroDePedido,
  consultaTodosPedidos,
  editarPedidoController,
  deletarPedidoController,
  verificarPedidoExistente
};
