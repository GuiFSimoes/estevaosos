// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// import { BaseComponent } from './base.component';
import { ClientesComponent } from './clientes.component';
import { ProdutosComponent } from './produtos.component';

// Theme Routing
import { CadastroRoutingModule } from './cadastro-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CadastroRoutingModule
  ],
  declarations: [
    // BaseComponent,
    ClientesComponent,
    ProdutosComponent
  ]
})
export class CadastroModule { }
