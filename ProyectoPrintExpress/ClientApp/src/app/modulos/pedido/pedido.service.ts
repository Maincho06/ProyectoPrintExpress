import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Pedido, CreatePedido, UpdateEstadoPedido } from './models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService{

  private myUrl: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.myUrl = baseUrl + 'api/Pedido/';
  }

  // getAllCliente() {
  //   const url = this.myUrl;
  //   return this.http.get(url).toPromise();
  // }

  getAllPedido() {
    const url = this.myUrl;
    return this.http.get(url).toPromise();
  }

  createPedido(pedido: Pedido) {
    const url = this.myUrl;
    return this.http.post(url, pedido).toPromise();
  }

  updatePedido(pedido: CreatePedido) {
    const url = this.myUrl;
    return this.http.put(url, pedido).toPromise();
  }

  updateEstadoPedido(pedido: UpdateEstadoPedido) {
    const url = this.myUrl + 'UpdateEstadoPedido';
    return this.http.put(url, pedido).toPromise();
  }


}
