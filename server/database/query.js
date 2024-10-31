const knex = require("./conection.js");

const cadastrarPedido = async (pedido) => {

  const cadastro = await knex("pedidos")
    .insert({
      numero,
      nome,
      tiposanguineo,
      mangam,
      mangag,
      mangagg,
      regatam,
      regatag,
      regatagg,
    } = pedido).returning('nome')

    return cadastro[0].nome
};

const consultarTodosPedidos = async () => {
  const pedidos = await knex("pedidos");
  return pedidos;
};

const consultarUmPedidos = async (numero) => {
  const pedido = await knex("pedidos").where({ numero }).select("*");
  return pedido;
};

const editarPedido = async (pedido) => {
  const pedidoAtualizado = await knex("pedidos")
    .where({ numero: pedido.numero })
    .update(
      ({
        nome,
        tiposanguineo,
        mangam,
        mangag,
        mangagg,
        regatam,
        regatag,
        regatagg,
      } = pedido)
    )
    .returning("nome");
    return pedidoAtualizado[0].nome;
};


const deletarPedido = async (numero) => {
    const pedido = await knex('pedidos').where({numero}).del()
}

module.exports = {
    cadastrarPedido, consultarTodosPedidos, consultarUmPedidos, deletarPedido, editarPedido
}