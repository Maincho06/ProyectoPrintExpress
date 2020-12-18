import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MaterialpedidoService {

  private myUrl: string;
  constructor(private http:HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.myUrl = baseUrl + 'api/MaterialPedido';
  }

  getMaterialPedidoId(pedidoId: number) {
    const url = this.myUrl + `/${pedidoId}`;
    return this.http.get(url).toPromise();
  }

  getCreateMaterialPedido({pedidoId, materialId, cantidad}){
    const url = this.myUrl;
    const body = {
      'pedidoId': pedidoId,
      'insumoId': materialId,
      'cantidad': cantidad
    };
    return this.http.post(url,body);
  }

}
