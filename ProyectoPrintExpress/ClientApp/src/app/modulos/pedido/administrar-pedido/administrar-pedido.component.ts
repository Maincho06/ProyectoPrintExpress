import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { EditarPedidoComponent } from './components/editar-pedido/editar-pedido.component';
import { PedidoService } from '../pedido.service';
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
  displayedColumns: string[] = ['id', 'descripcion', 'monto', 'cliente', 'fecha', 'opciones'];
  dataSource: any;
  listaPedido: any;

  constructor(public dialog: MatDialog, private pedidoService: PedidoService, private cdRef: ChangeDetectorRef) { 
  }

  async ngOnInit() {
    this.listaPedido = await this.pedidoService.getAllPedido();
    this.cargarLista(this.listaPedido);
    console.log(this.listaPedido);
  }



  cargarLista(lista) {
    this.dataSource = new MatTableDataSource(lista);
    this.cdRef.detectChanges();
    // this.dataSource.paginator = this.paginator;
  }

  editar(data) {
    const dialogRef = this.dialog.open(EditarPedidoComponent, {
      width: '90%',
      height: '90%',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('GG',result );
    });
  }

}
