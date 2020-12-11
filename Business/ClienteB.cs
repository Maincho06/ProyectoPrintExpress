using Data.Common;
using Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business
{
    public class ClienteB
    {
        ClienteData clienteData = new ClienteData();

        public IEnumerable<Cliente> getAllCliente()
        {
            return clienteData.getAllCliente();
        }
    }
}
