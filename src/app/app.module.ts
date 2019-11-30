import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ClienteComponent } from './clientes/cliente/cliente.component';
import { ClienteFormComponent } from './clientes/cliente-form/cliente-form.component';
import { MenuComponent } from './menu/menu.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { ContatoComponent } from './contato/contato.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; 

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    ClienteFormComponent,
    MenuComponent,
    ProdutosComponent,
    ContatoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NgbModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ClienteFormComponent]
})
export class AppModule { }
