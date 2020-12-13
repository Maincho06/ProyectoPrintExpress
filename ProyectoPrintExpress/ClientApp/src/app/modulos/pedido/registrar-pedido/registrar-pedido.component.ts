import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PedidoService } from '../pedido.service';
import { startWith, map } from 'rxjs/operators';
import { ClienteService } from '../../cliente/cliente.service';
import { Pedido } from '../models/pedido.model';
import Swal from 'sweetalert2';

interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  dni: string;
  telefono: string;
}

@Component({
  selector: 'app-registrar-pedido',
  templateUrl: './registrar-pedido.component.html',
  styleUrls: ['./registrar-pedido.component.css']
})
export class RegistrarPedidoComponent implements OnInit {

  form: FormGroup;
  listaCliente: any;
  filterCliente: Observable<Cliente[]>;
  constructor(private fb: FormBuilder, private clienteService: ClienteService, private pedidoService: PedidoService) { }

  async ngOnInit() {
    this.crearFormulario();
    this.listaCliente = await this.clienteService.getAllCliente();
    this.filterCliente = this.form.controls['dni'].valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.dni),
      map(dni => dni ? this._filterCliente(dni) : this.listaCliente.slice() )
    );
    console.log(this.listaCliente);
  }

  private _filterCliente(dni: string){
    const filterValue = dni.toLocaleLowerCase();
    return this.listaCliente.filter(option => option.dni.toLocaleLowerCase().indexOf(filterValue) === 0 );
  }

  crearFormulario(): void {
    this.form = this.fb.group({
      'dni': ['', Validators.required],
      'nombreCliente': ['', Validators.required],
      'direccion': ['', Validators.required],
      'monto': [, Validators.required],
      'fechaEntrega': [, Validators.required],
      'descripcion': [, Validators.required]
    });
  }

  limpiarCliente() {
    this.form.controls.nombreCliente.setValue(``);
  }

  async crearPedido() {
    let pedido: Pedido;
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }
    pedido = {
      descripcion: this.form.get('descripcion').value,
      monto: this.form.get('monto').value,
      contratoUrl: 'a',
      fechaEnvio: this.form.get('fechaEntrega').value,
      direccion: this.form.get('direccion').value,
      clienteId: 1,
      empresaId: 1,
      estadoPedidoId: 1
    };
    console.log('PEDIDO', pedido)
    await this.pedidoService.createPedido(pedido);
    this.limpiarFormulario();
    Swal.fire({
      icon: 'success',
      title: 'El pedido se registró de manera exitosa',
      showConfirmButton: false,
      timer: 1500
    })
  }

  limpiarFormulario() {
    this.form.reset({
      'dni': '',
      'nombreCliente': '',
      'direccion': '',
      'monto': '',
      'fechaEntrega': '',
      'descripcion': ''
    })
  }

  get clienteNotFound() {
    if (this.form.get('dni').touched) {
      const dni = this.form.get('dni').value;
      const listaTemp = this.listaCliente.filter(option => option.dni === dni);
      if ( listaTemp.length === 0) {
        this.limpiarCliente();
        return true;
      } else {
        this.form.controls.nombreCliente.setValue(`${listaTemp[0].nombre} ${listaTemp[0].apellido}`  );
        return false;
      }
    }
    return false;
  }

  // Gets
  get dniNoValido() {
    return this.form.get('dni').invalid && this.form.get('dni').touched;
  }

  get nombreClienteNoValido() {
    return this.form.get('nombreCliente').invalid && this.form.get('nombreCliente').touched;
  }

  get direccionNoValido() {
    return this.form.get('direccion').invalid && this.form.get('direccion').touched;
  }

  get montoNoValido() {
    return this.form.get('monto').invalid && this.form.get('monto').touched;
  }

  get fechaEntregaNoValido() {
    return this.form.get('fechaEntrega').invalid && this.form.get('fechaEntrega').touched;
  }

  get descripcionEntregaNoValido() {
    return this.form.get('descripcion').invalid && this.form.get('descripcion').touched;
  }

}
