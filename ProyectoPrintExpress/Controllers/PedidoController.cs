using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Business;
using Entity;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProyectoPrintExpress.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidoController : ControllerBase
    {
        PedidoB pedido = new PedidoB();

        // GET: api/<PedidoController>
        [HttpGet]
        public IEnumerable<Pedido> Get()
        {
            return pedido.getAllPedido();
        }

        // GET api/<PedidoController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<PedidoController>
        [HttpPost]
        public int Post([FromBody] CreatePedido value)
        {
            return pedido.createPedido(value);
        }

        // PUT api/<PedidoController>/5
        [HttpPut]
        public int Put([FromBody] UpdatePedido value)
        {
            return pedido.createPedido(value);
        }

        [HttpPut]
        [Route("UpdateEstadoPedido")]
        public int UpdateEstadoPedido([FromBody] UpdateEstadoPedido value)
        {
            return pedido.updateEstadoPedido(value);
        }

        // DELETE api/<PedidoController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
