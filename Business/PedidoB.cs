using Data.Common;
using Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business
{
    public class PedidoB
    {
        PedidoData pedidoData = new PedidoData();

        public IEnumerable<Pedido> getAllPedido()
        {
            return pedidoData.getAllPedido();
        }

        public int createPedido(CreatePedido pedido)
        {
            return pedidoData.createPedido(pedido);
        }

        public int createPedido(UpdatePedido pedido)
        {
            return pedidoData.updatePedido(pedido);
        }
    }
}
