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
import { FormsModule } from '@angular/forms';

import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    CadastroRoutingModule,
    FormsModule,
    Ng2TableModule,
    PaginationModule
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
