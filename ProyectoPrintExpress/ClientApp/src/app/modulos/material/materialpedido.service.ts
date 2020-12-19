import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DeleteMaterialPedido } from '../pedido/models/pedido.model';

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

  createMaterialPedido({pedidoId, materialId, cantidad}){
    const url = this.myUrl;
    const body = {
      'pedidoId': pedidoId,
      'insumoId': materialId,
      'cantidad': cantidad
    };
    console.log('body',body);
    return this.http.post(url,body).toPromise();
  }

  deleteMaterialPedido({pedidoId, materialId}) {
    const url = this.myUrl + '/DeleteMaterialPedido';
    // const url = this.myUrl + '/' + 1;
    let body: DeleteMaterialPedido;
    body = {
      "pedidoId": pedidoId,
      "materialId": materialId
    };
    console.log('body',body);
    // return this.http.post(url,body).toPromise();
    return this.http.post(url,body, {headers: {
      'Content-Type': 'application/json'
    } }).toPromise();
  }

}
