using Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace Data.Common
{
    public class PedidoData
    {
        string connectionString = Connection.connectionString;

        public IEnumerable<Pedido> getAllPedido()
        {
            
            try
            {
                List<Pedido> lpedido = new List<Pedido>();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spGetAllPedido", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Pedido pedido = new Pedido();
                        pedido.id = Convert.ToInt32(reader["pedidoId"]);
                        pedido.descripcion = reader["pedidoDescripcion"].ToString();
                        pedido.monto = Convert.ToDouble(reader["pedidoMonto"]); ;
                        pedido.contraroUrl = reader["pedidoContratoUrl"].ToString();
                        pedido.fechaEmision = Convert.ToDateTime(reader["pedidoFechaEmision"]);
                        pedido.fechaEnvio = Convert.ToDateTime(reader["pedidoFechaEnvio"]);
                        pedido.direccion = reader["pedidoDireccion"].ToString();
                        pedido.nombreCliente = reader["nombreCliente"].ToString();
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

        public int createPedido(CreatePedido pedido)
        {
            try
            {
                using(SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spCreatePedido",con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@descripcion", pedido.descripcion);
                    cmd.Parameters.AddWithValue("@monto", pedido.monto);
                    cmd.Parameters.AddWithValue("@contrato", pedido.contratoUrl);
                    cmd.Parameters.AddWithValue("@fechaEntrega", pedido.fechaEnvio);
                    cmd.Parameters.AddWithValue("@direccion", pedido.direccion);
                    cmd.Parameters.AddWithValue("@clienteId", pedido.clienteId);
                    cmd.Parameters.AddWithValue("@empresaId", pedido.empresaId);
                    cmd.Parameters.AddWithValue("@estadoPedidoId", pedido.estadoPedidoId);
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

        public int updatePedido(UpdatePedido pedido)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spUpdatePedido", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@descripcion", pedido.descripcion);
                    cmd.Parameters.AddWithValue("@fechaEnvio", pedido.fechaEnvio);
                    cmd.Parameters.AddWithValue("@direccion", pedido.direccion);
                    cmd.Parameters.AddWithValue("@monto", pedido.monto);
                    cmd.Parameters.AddWithValue("@pedidoId", pedido.pedidoId);
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

        public int updateEstadoPedido(UpdateEstadoPedido pedido)
        {
            try
            {
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spUpdateEstadoPedido", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@estadoId", pedido.estadoPedido);
                    cmd.Parameters.AddWithValue("@pedidoId", pedido.pedidoId);
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
