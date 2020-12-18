using Data.Common;
using Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business
{
    public class MaterialB
    {
        MaterialData materialData = new MaterialData();

        public IEnumerable<Material> getAllMaterial()
        {
            return materialData.getAllMaterial();
        }

    }
}
