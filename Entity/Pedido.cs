using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class Pedido
    {
        public int id { get; set; }
        public string descripcion { get; set; }
        public double monto { get; set; }
        public string contraroUrl { get; set; }
        public DateTime fechaEmision { get; set; }
        public DateTime fechaEnvio { get; set; }
        public string direccion { get; set; }
        public string nombreCliente { get; set; }
    }

    public class CreatePedido
    {
        public int id { get; set; }
        public string descripcion { get; set; }
        public double monto { get; set; }
        public string contratoUrl { get; set; }
        public DateTime fechaEnvio { get; set; }
        public string direccion { get; set; }
        public int clienteId { get; set; }
        public int empresaId { get; set; }
        public int estadoPedidoId { get; set; }
    }

    public class UpdatePedido
    {
        public int pedidoId { get; set; }
        public string descripcion { get; set; }
        public DateTime fechaEnvio { get; set; }
        public string direccion { get; set; }
        public float monto { get; set; }
    }

    public class UpdateEstadoPedido
    {
        public int estadoPedido { get; set; }
        public int pedidoId { get; set; }
    }
}
