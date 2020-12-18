import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { CreatePedido } from '../../../models/pedido.model';
import { PedidoService } from '../../../pedido.service';
import Swal from 'sweetalert2';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter'
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material';
import { informepAnimations } from '../../../../shared/animations/fabtoggler';


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
export interface PeriodicElement {
  codigo: number;
  descripcion: string;
  cantidad: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { codigo: 1, descripcion: 'Madera', cantidad: 2 },
  { codigo: 2, descripcion: 'Vidrio', cantidad: 3 },
  { codigo: 3, descripcion: 'Metal', cantidad: 4 },
];

@Component({
  selector: 'app-editar-pedido',
  templateUrl: './editar-pedido.component.html',
  styleUrls: ['./editar-pedido.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE,MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  animations: [informepAnimations]
})
export class EditarPedidoComponent implements OnInit {

  form: FormGroup;

  // Fab
  fbMain = [
    { icon: 'add_task', tool: 'Agregar Materiales' }
  ];
  abMain = [];
  tsMain = 'inactive';

  fbView = [
    { icon: 'add', tool: 'Nuevo informe' },
    { icon: 'cancel', tool: 'Cancelar' }
  ];
  abView = [];
  tsView = 'inactive';

  displayedColumns: string[] = ['codigo', 'descripcion', 'cantidad']
  dataSource = ELEMENT_DATA

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

  onToggleFab(fab: number, stat: number) {
    switch (fab) {
      case 1:
        stat = (stat === -1) ? (this.abMain.length > 0) ? 0 : 1 : stat;
        this.tsMain = (stat === 0) ? 'inactive' : 'active';
        this.abMain = (stat === 0) ? [] : this.fbMain;
        break;
      case 2:
        stat = (stat === -1) ? (this.abView.length > 0) ? 0 : 1 : stat;
        this.tsView = (stat === 0) ? 'inactive' : 'active';
        this.abView = (stat === 0) ? [] : this.fbView;
        break;
    }
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
