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
    public class ClienteController : ControllerBase
    {
        ClienteB clienteB = new ClienteB();
        // GET: api/<ClienteController>
        [HttpGet]
        public IEnumerable<Cliente> Get()
        {
            return clienteB.getAllCliente();
        }

        // GET api/<ClienteController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ClienteController>
        [HttpPost]
        public void Post([FromBody] string pedido)
        {
        }

        // PUT api/<ClienteController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ClienteController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
