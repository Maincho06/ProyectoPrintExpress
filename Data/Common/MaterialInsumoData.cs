using Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace Data.Common
{
    public class MaterialInsumoData
    {
        string connectionString = Connection.connectionString;

        public IEnumerable<MaterialPedidoId> getAllMaterialPedidoId(int pedidoId)
        {
            try
            {
                List<MaterialPedidoId> lpedido = new List<MaterialPedidoId>();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spGetAllMaterialPedidoId", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@pedidoId", pedidoId);
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        MaterialPedidoId pedido = new MaterialPedidoId();
                        pedido.pedidoId = Convert.ToInt32(reader["pedidoId"]);
                        pedido.materialCodigo = Convert.ToInt32(reader["insumoCodigo"]);
                        pedido.materialNombre = Convert.ToInt32(reader["insumoNombre"]);
                        pedido.materialCantidad = Convert.ToInt32(reader["materialCantidad"]);
                        lpedido.Add(pedido);
                    }
                    con.Close();
                }
                return lpedido;
            }
            catch (Exception e)
            {

                throw;
            }
        }

        public int createMaterialPedido(CreateMaterialPedido materialPedido)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spInsertMaterialPedido", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@pedidoId", materialPedido.pedidoId);
                    cmd.Parameters.AddWithValue("@insumoId", materialPedido.insumoId);
                    cmd.Parameters.AddWithValue("@cantidad", materialPedido.cantidad);
                    con.Open();
                    cmd.ExecuteNonQuery();
                    con.Close();
                }
                return 1;
            }
            catch (Exception e)
            {

                throw;
            }
        }

    }
}
