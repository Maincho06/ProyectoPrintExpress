import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CreatePedido } from '../../../models/pedido.model';
import { PedidoService } from '../../../pedido.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-pedido',
  templateUrl: './editar-pedido.component.html',
  styleUrls: ['./editar-pedido.component.css']
})
export class EditarPedidoComponent implements OnInit {

  form: FormGroup;
  
  constructor(private pedidoService: PedidoService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditarPedidoComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
    console.log('DATA', this.data);
    this.crearFormulario();
    this.llenarFormulario(this.data);
  }

  ngOnInit() {
  }

  crearFormulario() {
    this.form = this.fb.group({
      'id': [''],
      'descripcion': [''],
      'monto': [''],
      'nombreCliente': [''],
      'fechaEmision': [''],
      'fechaEnvio': [''],
      'direccion': [''],
    });
  }

  llenarFormulario(data) {
    let fechaEmision: Date;
    let fechaEnvio: Date;
    fechaEmision = new Date(data.fechaEmision);
    fechaEnvio = new Date(data.fechaEnvio);
    this.form.reset({
      'id': data.id,
      'descripcion': data.descripcion,
      'monto': data.monto,
      'nombreCliente': data.nombreCliente,
      'fechaEmision': `${fechaEmision.getDay()}/${fechaEmision.getMonth()}/${fechaEmision.getFullYear()}`,
      'fechaEnvio': fechaEnvio,
      'direccion': data.direccion,
    })
  }

  async editarProducto() {
    let pedido: CreatePedido;
    console.log(this.form);
    pedido = {
      descripcion: this.form.get('descripcion').value,
      fechaEnvio: this.form.get('fechaEnvio').value,
      direccion: this.form.get('direccion').value,
      monto: parseInt(this.form.get('monto').value),
      pedidoId: this.data.id
    };
    console.log('PEDIDO', pedido);
    const resp = await this.pedidoService.updatePedido(pedido);
    await Swal.fire({
      icon: 'success',
      title: 'El pedido se actualizó de manera exitosa',
      showConfirmButton: false,
      timer: 1500
    })
    this.dialogRef.close(this.form);
    console.log('RESP', resp);
  }

}
