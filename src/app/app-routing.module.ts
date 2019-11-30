import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './clientes/cliente/cliente.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { ContatoComponent } from './contato/contato.component';


const routes: Routes = [
  {path: '', component: ClienteComponent},
  {path: 'produtos', component: ProdutosComponent},
  {path: 'contato', component: ContatoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
