import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { EditarPedidoComponent, Estado } from './components/editar-pedido/editar-pedido.component';
import { PedidoService } from '../pedido.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { UpdateEstadoPedido } from '../models/pedido.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { MaterialService } from '../../material/material.service';
import { MaterialpedidoService } from '../../material/materialpedido.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-administrar-pedido',
  templateUrl: './administrar-pedido.component.html',
  styleUrls: ['./administrar-pedido.component.css']
})
export class AdministrarPedidoComponent implements OnInit {
  listaEstado: Estado[] = [
    {estadoPedidoId: 1, estadoPedidoNombre: 'Cotizado'},
    {estadoPedidoId: 2, estadoPedidoNombre: 'Cancelado'},
    {estadoPedidoId: 1004, estadoPedidoNombre: 'Pago Completo'},
    {estadoPedidoId: 1005, estadoPedidoNombre: 'Finalizado'},
    {estadoPedidoId: 1006, estadoPedidoNombre: 'Distribución'},
    {estadoPedidoId: 1007, estadoPedidoNombre: 'Entregado'},
  ]
  displayedColumns: string[] = ['id', 'descripcion', 'monto', 'cliente','estado','fecha', 'opciones'];
  dataSource: any;
  listaPedido: any;
  listaPedidoFija: any;
  listaMaterial: any;
  listaMaterialPedido: any;
  form: FormGroup;
  @ViewChild(MatPaginator, { static: false}) paginator: MatPaginator;
  constructor(
    public fb:FormBuilder,
    public dialog: MatDialog, 
    private pedidoService: PedidoService, 
    private cdRef: ChangeDetectorRef, 
    private spinner: NgxSpinnerService, 
    private materialService: MaterialService,
    private materialPedidoService: MaterialpedidoService) { 
      this.crearFormulario();
      this.llenarFormulario();
  }

  async ngOnInit() {
    this.spinner.show();
    this.listaPedido = await this.pedidoService.getAllPedido();
    this.listaPedidoFija = await this.pedidoService.getAllPedido();
    
    console.log('MATERIAL',this.listaMaterial);
    console.log(this.listaPedido);
    this.cargarLista(this.listaPedido);
    console.log(this.listaPedido);
    this.cambioTipo('Cotizado');
    this.spinner.hide();
  }

  crearFormulario() {
    this.form = this.fb.group({
      'tipo': ['']
    });
  }

  llenarFormulario() {
    this.form.reset({
      tipo: 'Cotizado'
    })
  }


  cambioTipo(event) {
    console.log(event);
    let listaTemp = [];
    listaTemp = this.listaPedido.filter(item => item.estadoNombre === event);
    this.cargarLista(listaTemp);
  }



  cargarLista(lista) {
    this.dataSource = new MatTableDataSource(lista);
    // this.cdRef.detectChanges();
    this.dataSource.paginator = this.paginator;
  }

  editar(data) {
    const dialogRef = this.dialog.open(EditarPedidoComponent, {
      width: '98%',
      height: '98%',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('GG',result );
      if ( result ) {
        console.log('RESULT',result);
        const formulario = result as FormGroup;
        const id = formulario.get('id').value ;
        const descripcion = formulario.get('descripcion').value ;
        const fechaEnvio = formulario.get('fechaEnvio').value ;
        const monto = formulario.get('monto').value ;
        const direccion = formulario.get('direccion').value ;
        const estadoId = formulario.get('estadoId').value;
        console.log('ESTADOID',estadoId);
        const estado = this.listaEstado.filter(item => item.estadoPedidoId === estadoId)[0];
        console.log('ESTADO',estado);
        this.listaPedido.map( item => {
          if(item.id === id ) {
            item.descripcion = descripcion;
            item.fechaEnvio = fechaEnvio;
            item.monto = monto;
            item.direccion = direccion;
            item.estadoNombre = estado.estadoPedidoNombre;
          }
          return item;
        })
      }
    });
  }

  async eliminarPedido(data) {
    await Swal.fire({
      title: '¿Está seguro?',
      text: "Usted cancelará este pedido",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cancelarlo'
    }).then(async (result) => {
      let pedido: UpdateEstadoPedido;
      pedido = {
        estadoPedido: 2,
        pedidoId: data.id
      }
      if(result.isConfirmed) {
        await this.pedidoService.updateEstadoPedido(pedido)
        this.listaPedido = this.listaPedido.filter(item => item.id !== data.id);
        this.cargarLista(this.listaPedido);
        if (result.isConfirmed) {
          Swal.fire(
            'El pedido fue cancelado',
            '',
            'success'
          )
        }
      }
      
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
