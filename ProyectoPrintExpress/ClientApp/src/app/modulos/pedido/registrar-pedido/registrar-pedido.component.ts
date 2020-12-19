import { AfterContentChecked, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PedidoService } from '../pedido.service';
import { startWith, map } from 'rxjs/operators';
import { ClienteService } from '../../cliente/cliente.service';
import { Pedido } from '../models/pedido.model';
import Swal from 'sweetalert2';
import * as _moment from 'moment';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter'
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';


interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  dni: string;
  telefono: string;
}

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
}

@Component({
  selector: 'app-registrar-pedido',
  templateUrl: './registrar-pedido.component.html',
  styleUrls: ['./registrar-pedido.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE,MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ]
})
export class RegistrarPedidoComponent implements OnInit, AfterContentChecked {

  form: FormGroup;
  listaCliente: any;
  filterCliente: Observable<Cliente[]>;
  existCliente = false;
  constructor(private spinner: NgxSpinnerService,
    private cdRef : ChangeDetectorRef, private fb: FormBuilder, private clienteService: ClienteService, private pedidoService: PedidoService) { }
  ngAfterContentChecked(): void {
    this.cdRef.detectChanges();
  }

  async ngOnInit() {
    this.spinner.show();
    this.crearFormulario();
    this.listaCliente = await this.clienteService.getAllCliente();
    this.filterCliente = this.form.controls['dni'].valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.dni),
      map(dni => dni ? this._filterCliente(dni) : this.listaCliente.slice() )
    );
    this.spinner.hide();
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
      'monto': [, [Validators.required,Validators.min(0)]],
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
        if(!this.existCliente){
          this.existCliente = true;
        }
        return true;
      } else {
        this.form.controls.nombreCliente.setValue(`${listaTemp[0].nombre} ${listaTemp[0].apellido}`  );
        if(this.existCliente){
          this.existCliente = false;
        }
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
