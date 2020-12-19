import { Component, Inject, OnInit, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatStepper } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CreatePedido } from '../../../models/pedido.model';
import { PedidoService } from '../../../pedido.service';
import Swal from 'sweetalert2';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter'
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material';
import { informepAnimations } from '../../../../shared/animations/fabtoggler';
import { MaterialpedidoService } from '../../../../material/materialpedido.service';
import { MaterialService } from '../../../../material/material.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';


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

export interface Estado {
  estadoPedidoId: number;
  estadoPedidoNombre: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { codigo: 1, descripcion: 'Madera', cantidad: 2 },
  { codigo: 2, descripcion: 'Vidrio', cantidad: 3 },
  { codigo: 3, descripcion: 'Metal', cantidad: 4 },
];

export interface Material {
  id: number;
  codigo: string;
  nombre: string;
  precioUnitario: number;
  unidadMedida: string;
}

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
export class EditarPedidoComponent implements OnInit, AfterContentChecked {

  form: FormGroup;
  formMaterial: FormGroup;
  
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
  
  listaEstado: Estado[] = [
    {estadoPedidoId: 1, estadoPedidoNombre: 'Cotizado'},
    {estadoPedidoId: 2, estadoPedidoNombre: 'Cancelado'},
    {estadoPedidoId: 1004, estadoPedidoNombre: 'Pago Completo'},
    {estadoPedidoId: 1005, estadoPedidoNombre: 'Finalizado'},
    {estadoPedidoId: 1006, estadoPedidoNombre: 'Distribución'},
    {estadoPedidoId: 1007, estadoPedidoNombre: 'Entregado'},
  ]

  displayedColumns: string[] = ['opciones', 'codigo', 'descripcion', 'cantidad', 'total']
  dataSource: any;
  listaMaterialPedido: any;
  listaMaterial: any;
  existMaterial = false;
  listaEliminar: any[];
  listaMaterialPedidoFija: any;
  listaMaterialFija: any;
  filterMaterial: Observable<Material[]>;
  constructor(private pedidoService: PedidoService,
    private cdRef : ChangeDetectorRef,
    private fb: FormBuilder,
    private fbMaterial: FormBuilder,
    private materialService: MaterialService,
    private materialPedidoService: MaterialpedidoService,
    public dialogRef: MatDialogRef<EditarPedidoComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
    console.log('DATA', this.data);
    this.crearFormulario();
    this.listaEliminar = [];
    this.llenarFormulario(this.data);
  }

  ngAfterContentChecked(): void {
    this.cdRef.detectChanges();
  }

  async ngOnInit() {
    this.crearFormularioMaterial();
    this.listaMaterial = await this.materialService.getAllMaterial();
    this.listaMaterialFija = await this.materialService.getAllMaterial();
    this.listaMaterialPedido = await this.materialPedidoService.getMaterialPedidoId(this.data.id);
    this.listaMaterialPedidoFija = await this.materialPedidoService.getMaterialPedidoId(this.data.id);
    // this.filterMaterial = this.formMaterial.controls['nombre'].valueChanges.pipe(
    //   startWith(''),
    //   map(value => typeof value === 'string' ? value : value.nombre),
    //   map(nombre => nombre ? this._filterMaterial(nombre) : this.listaMaterial.slice())
    // );
    this.cargarLista(this.listaMaterialPedido);
    console.log('MATERIAL',this.listaMaterial);
    console.log('MATERIALPEDIDO',this.listaMaterialPedido);
  }

  private _filterMaterial(nombre: string){
    const filterValue = nombre.toLowerCase();
    return this.listaMaterial.filter(option => option.nombre.toLocaleLowerCase().indexOf(filterValue) === 0 );
  }

  crearFormulario() {
    this.form = this.fb.group({
      'id': [''],
      'descripcion': [''],
      'monto': [''],
      'nombreCliente': [''],
      'estado': [''],
      'estadoId': [''],
      'fechaEmision': [''],
      'fechaEnvio': [''],
      'direccion': [''],
    });
  }

  crearFormularioMaterial() {
    this.formMaterial = this.fbMaterial.group({
      'id': ['', Validators.required],
      'codigo': ['', Validators.required],
      'nombre': ['', Validators.required],
      'precioUnitario': [ , [Validators.required,Validators.min(1)]],
      'unidadMedida': [ , Validators.required],
      'cantidad': [ , Validators.required]
    });
  }

  cargarLista(lista) {
    this.dataSource = new MatTableDataSource(lista);
    this.cdRef.detectChanges();
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

  goBack(stepper: MatStepper) {
    stepper.previous();
    this.limpiarMaterial();
  }
  
  goNext(stepper: MatStepper) {
    stepper.next();
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
      'estado': data.estadoNombre,
      'estadoId': data.estadoId,
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
      pedidoId: this.data.id,
      estadoId: this.form.get('estadoId').value
    };
    console.log('PEDIDO', pedido);
    const resp = await this.pedidoService.updatePedido(pedido);
    //Eliminar
    await this.listaEliminar.forEach(async (item) => {
      const resp = await this.materialPedidoService.deleteMaterialPedido({pedidoId: this.data.id, materialId: item.materialId});
      console.log(resp);
    })
    //Subir
    await this.listaMaterialPedido.forEach(async (item) => {
      const existMaterialBD = this.listaMaterialPedidoFija.filter(option => option.materialId === item.materialId);
      console.log('C',existMaterialBD.length);
      if(existMaterialBD.length === 0) {
        const resp = await this.materialPedidoService.createMaterialPedido({pedidoId: this.data.id,cantidad: item.cantidad,materialId: item.materialId});
        // console.log(true);
        console.log(resp);
      }
        // console.log(false);
    })
    // if(this.listaMaterialPedido !== this.listaMaterialPedidoFija) {
    // }
    
    
    await Swal.fire({
      icon: 'success',
      title: 'El pedido se actualizó de manera exitosa',
      showConfirmButton: false,
      timer: 1500
    })
    this.dialogRef.close(this.form);
    console.log('RESP', resp);
  }

  back() {
    this.limpiarMaterial();
  }


  clickFab(opc: number, index: number) {
    console.log('DATA2',this.data);
    
    switch (opc) {
      case 1:
        this.listaMaterial = this.listaMaterialFija;
        console.log('veamos');
        console.log('MATERIALESTENGO', this.listaMaterialPedido);
        this.filterMaterial = this.formMaterial.controls['nombre'].valueChanges.pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.nombre),
          map(nombre => nombre ? this._filterMaterial(nombre) : this.listaMaterial.slice())
        );
        this.listaMaterial.forEach((resp) => {
          console.log('RESP',resp);
          const obj = this.listaMaterialPedido.filter(item => item.materialId === resp.id);
          console.log('obj',obj)
          if(obj.length > 0){
            this.listaMaterial = this.listaMaterial.filter(item => item.id !== obj[0].materialId);
          }
        });
        console.log('LISTA MATERIAL', this.listaMaterial);
        break;
      case 2:
        
        break;
    }
  }

  limpiarMaterial() {
    this.formMaterial.reset({
      'id': '',
      'codigo': '',
      'nombre': '',
      'precioUnitario': '',
      'unidadMedida': '' ,
      'cantidad': ''
      
    });
  }

  async cargarMaterial(stepper) {
    // if(this.formMaterial.invalid) {
    //   await Swal.fire({
    //     icon: 'warning',
    //     title: 'Hay un error en los campos, por favor revise sus campos',
    //     showConfirmButton: false,
    //     timer: 1500
    //   });
    //   return Object.values(this.formMaterial.controls).forEach(control => {
    //     control.markAllAsTouched();
    //   });
    // }
    this.listaMaterialPedido.push( {
      'codigo': this.formMaterial.get('codigo').value,
      'nombre': this.formMaterial.get('nombre').value,
      'cantidad': this.formMaterial.get('cantidad').value,
      'precioUnitario': this.formMaterial.get('precioUnitario').value,
      'materialId': this.formMaterial.get('id').value
    });
    console.log('LISTA',this.listaMaterialPedido);
    this.cargarLista(this.listaMaterialPedido);
    this.goBack(stepper);
  }

  get materialNotFound() {
    if(this.formMaterial.get('nombre').touched) {
      const nombre = this.formMaterial.get('nombre').value;
      const listaTemp = this.listaMaterial.filter(option => option.nombre === nombre);
      if( listaTemp.length === 0 ) {
        this.limpiarMaterial();
        if(!this.existMaterial) {
          this.existMaterial = true;
        }
        return true;
      } else {
        if(this.existMaterial){
          this.formMaterial.controls.id.setValue(listaTemp[0].id );
          this.formMaterial.controls.codigo.setValue(`${listaTemp[0].codigo}` );
          this.formMaterial.controls.precioUnitario.setValue(listaTemp[0].precioUnitario  );
          this.existMaterial = false;
        }
        return false;
      }
    }
    return false;
  }

  eliminarElemento(data) {
    const existMaterialBD = this.listaMaterialPedidoFija.filter(option => option.materialId === data.materialId);
    if(existMaterialBD.length > 0) {
      this.listaEliminar.push(data);
    }
    this.listaMaterialPedido = this.listaMaterialPedido.filter(option => option.materialId !== data.materialId);
    this.cargarLista(this.listaMaterialPedido);
    console.log('ELIMINAR',this.listaEliminar);
    console.log('SUBIR', this.listaMaterialPedido);
  }

  // Get
  // get codigoNotFound () {
  //   return this.formMaterial.get('codigo').invalid && this.formMaterial.get('codigo').touched;
  // }

}
