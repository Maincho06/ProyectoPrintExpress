using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Common;
using Entity;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProyectoPrintExpress.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaterialPedidoController : ControllerBase
    {

        MaterialInsumoData materialInsumo = new MaterialInsumoData();

        // GET: api/<MaterialPedidoController>
        [HttpGet]
        public IEnumerable<MaterialPedidoId> Get()
        {
            return null;
        }

        // GET api/<MaterialPedidoController>/5
        [HttpGet("{id}")]
        public IEnumerable<MaterialPedidoId> Get(int id)
        {
            return materialInsumo.getAllMaterialPedidoId(id);
        }

        // POST api/<MaterialPedidoController>
        [HttpPost]
        public int Post([FromBody] CreateMaterialPedido value)
        {
            return materialInsumo.createMaterialPedido(value);
        }

        // PUT api/<MaterialPedidoController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<MaterialPedidoController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
