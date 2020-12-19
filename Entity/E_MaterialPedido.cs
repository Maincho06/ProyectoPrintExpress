using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class MaterialPedido
    {
        public int pedidoId { get; set; }
        public int materialId { get; set; }
        public int cantidad { get; set; }
    }

    public class MaterialPedidoId
    {
        public string codigo { get; set; }
        public string nombre { get; set; }
        public int cantidad { get; set; }
        public int materialId { get; set; }
        public double precioUnitario { get; set; }
    }

    public class CreateMaterialPedido
    {
        public int pedidoId { get; set; }
        public int insumoId { get; set; }
        public int cantidad { get; set; }
    }

    public class DeleteMaterialPedido
    {
        public int pedidoId { get; set; }
        public int materialId { get; set; }
    }

}
