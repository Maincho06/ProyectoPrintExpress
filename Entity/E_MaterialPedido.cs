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
        public int pedidoId { get; set; }
        public int materialCodigo { get; set; }
        public int materialNombre { get; set; }
        public int materialCantidad { get; set; }
    }

    public class CreateMaterialPedido
    {
        public int pedidoId { get; set; }
        public int insumoId { get; set; }
        public int cantidad { get; set; }
    }

}
