import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { FormsModule, ReactiveFormsModule   } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './modulos/login/login.component';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import { AdministrarPedidoComponent } from './modulos/pedido/administrar-pedido/administrar-pedido.component';
import { RegistrarPedidoComponent } from './modulos/pedido/registrar-pedido/registrar-pedido.component';
import { AdministrarAlmacenComponent } from './modulos/almacen/administrar-almacen/administrar-almacen.component';
import { EditarPedidoComponent } from './modulos/pedido/administrar-pedido/components/editar-pedido/editar-pedido.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    AdministrarPedidoComponent,
    RegistrarPedidoComponent,
    AdministrarAlmacenComponent,
    EditarPedidoComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  entryComponents: [
    EditarPedidoComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [NgxSpinnerService],
  bootstrap: [AppComponent],
})
export class AppModule { }
