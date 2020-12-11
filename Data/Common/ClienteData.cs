using Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace Data.Common
{
    public class ClienteData
    {
        string connectionString = Connection.connectionString;

        public IEnumerable<Cliente> getAllCliente()
        {
            try
            {
                List<Cliente> lcliente = new List<Cliente>();
                using(SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spGetAllCliente", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Cliente cliente = new Cliente();
                        cliente.id = Convert.ToInt32(reader["clienteId"].ToString());
                        cliente.nombre = reader["clienteNombre"].ToString();
                        cliente.apellido = reader["clienteApellido"].ToString();
                        cliente.dni = reader["clienteDni"].ToString();
                        cliente.telefono = reader["clienteTelefono"].ToString();
                        cliente.email = reader["clienteEmail"].ToString();
                        lcliente.Add(cliente);
                    }
                    con.Close();
                }
                return lcliente;
            }
            catch (Exception e)
            {

                throw;
            }
        }

    }
}
