using Data.Common;
using Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business
{
    public class MaterialPedidoB
    {
        MaterialInsumoData materialInsumo = new MaterialInsumoData();

        public IEnumerable<MaterialPedidoId> getAllMatrialPedidoId(int pedidoId)
        {
            return materialInsumo.getAllMaterialPedidoId(pedidoId);
        }

    }
}
