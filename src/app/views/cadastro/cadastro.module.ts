// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// import { BaseComponent } from './base.component';
import { ClientesComponent } from './clientes.component';
import { ProdutosComponent } from './produtos.component';

// Theme Routing
import { CadastroRoutingModule } from './cadastro-routing.module';

// componentes de serviços de acesso a dados
import { ClientesDALService, ProdutosDALService } from '../../services';

@NgModule({
  imports: [
    CommonModule,
    CadastroRoutingModule
  ],
  declarations: [
    // BaseComponent,
    ClientesComponent,
    ProdutosComponent
  ],
  providers: [
    ClientesDALService,
    ProdutosDALService
  ]
})
export class CadastroModule { }
