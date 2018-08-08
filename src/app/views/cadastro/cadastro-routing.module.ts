import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { BaseComponent } from './base.component';
import { ClientesComponent } from './clientes.component';
import { ProdutosComponent } from './produtos.component';

const routes: Routes = [
  {
    path: '',
    // redirectTo: 'clientes',
    // component: BaseComponent,
    data: {
      title: 'Cadastro'
    },
    children: [
      {
        path: 'clientes',
        component: ClientesComponent,
        data: {
          title: 'Clientes'
        }
      },
      {
        path: 'produtos',
        component: ProdutosComponent,
        data: {
          title: 'Produtos'
        }
      }
    ]
  }/* ,
  {
    path: 'clientes',
    component: ClientesComponent,
    data: {
      title: 'Clientes'
    }
  },
  {
    path: 'produtos',
    component: ProdutosComponent,
    data: {
      title: 'Produtos'
    }
  } */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroRoutingModule {}
