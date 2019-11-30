import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Cliente } from '../models/cliente';
import { ClienteViewModel } from '../models/cliente-view-model';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private db: AngularFirestore) { }ssss

  private clienteColection = 'clientes';

  getClientes(): Observable<firebase.firestore.QuerySnapshot>{
    return this.db.collection<Cliente>(this.clienteColection, ref => ref.orderBy('nome', 'asc')).get();
  }

  salvarCliente(cliente : Cliente): Promise<DocumentReference>{
    return this.db.collection(this.clienteColection).add(cliente);
  }

  editarCliente(cliente : ClienteViewModel): Promise<void>{
    return this.db.collection(this.clienteColection).doc(cliente.id).update(cliente);
  }

  editarClienteParcial(id : string, obj): Promise<void>{
    return this.db.collection(this.clienteColection).doc(id).update(obj);
  }

  deletarCliente(id : string): Promise<void>{
    return this.db.collection(this.clienteColection).doc(id).delete();
  }
  

}
