import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './modulos/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { RegistrarPedidoComponent } from './modulos/pedido/registrar-pedido/registrar-pedido.component';
import { AdministrarPedidoComponent } from './modulos/pedido/administrar-pedido/administrar-pedido.component';
import { AdministrarAlmacenComponent } from './modulos/almacen/administrar-almacen/administrar-almacen.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'menu',
    component: MenuComponent,
    children: [
      { path: 'aAlmacen', component: AdministrarAlmacenComponent },
      { path: 'rPedido', component: RegistrarPedidoComponent },
      { path: 'aPedido', component: AdministrarPedidoComponent },
    ]
  },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
