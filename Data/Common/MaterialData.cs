using Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace Data.Common
{
    public class MaterialData
    {
        string connectionString = Connection.connectionString;


        public IEnumerable<Material> getAllMaterial()
        {
            try
            {
                List<Material> lmaterial = new List<Material>();
                using (SqlConnection con = new SqlConnection(connectionString))
                {
                    SqlCommand cmd = new SqlCommand("spGetAllMaterial", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    con.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Material material = new Material();
                        material.id = Convert.ToInt32(reader["insumoId"]);
                        material.codigo = reader["insumoCodigo"].ToString();
                        material.nombre = reader["insumoNombre"].ToString();
                        material.unidadMedida = reader["insumoUnidadMedida"].ToString();
                        material.precioUnitario = double.Parse(reader["insumoPrecioUnitario"].ToString());
                        lmaterial.Add(material);
                    }
                    con.Close();
                }
                return lmaterial;
            }
            catch (Exception e)
            {

                throw;
            }
        }
    }
}
