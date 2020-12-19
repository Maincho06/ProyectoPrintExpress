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
                        pedido.codigo = reader["insumoCodigo"].ToString();
                        pedido.nombre = reader["insumoNombre"].ToString();
                        pedido.cantidad = Convert.ToInt32(reader["materialCantidad"]);
                        pedido.materialId = Convert.ToInt32(reader["insumoId"]);
                        pedido.precioUnitario = double.Parse(reader["insumoId"].ToString());
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

        public int deleteMaterialPedido(DeleteMaterialPedido materialPedido)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spDeleteMaterialPedido", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@pedidoId", materialPedido.pedidoId);
                    cmd.Parameters.AddWithValue("@materialId", materialPedido.materialId);
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
