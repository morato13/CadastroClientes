import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteFormComponent } from '../cliente-form/cliente-form.component';
import { ClienteService } from 'src/app/cliente/services/cliente.service';
import { ClienteViewModel } from 'src/app/cliente/models/cliente-view-model';
import { analytics } from 'firebase';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  filtro: any;
  chave : string = 'Fernanda';
  
  constructor(
    private modalService:NgbModal,
    private clienteService: ClienteService
    
    ) { }

  ngOnInit() {
    this.mostrarClientes();
    
  }

  addCliente(){
    const modal = this.modalService.open(ClienteFormComponent);
    modal.result.then(this.handleModalClienteFormComponent.bind(this),
    this.handleModalClienteFormComponent.bind(this))
  }


  clientes: ClienteViewModel[] = [];
  modoInsercao : boolean = true;
  cliente: ClienteViewModel;

  mostrarClientes(){
    this.clienteService.getClientes().subscribe(response =>{
    this.clientes = [];
    response.docs.forEach(value => {
      const data = value.data();
      const id = value.id;
      const cliente: ClienteViewModel = {
      id: id,
      nome: data.nome,
      endereco: data.endereco,
      casado: data.casado,
      dataMod: data.dataMod.toDate()
    };
    this.clientes.push(cliente);

    });
    });

  }

  EditarClick(cliente: ClienteViewModel){
    const modal = this.modalService.open(ClienteFormComponent);  
    modal.result.then( 
      this.handleModalClienteFormComponent.bind(this),
      this.handleModalClienteFormComponent.bind(this)
  )
  modal.componentInstance.modoInsercao = false;
  modal.componentInstance.cliente = cliente;
  }

  checkedCasado(index: number){
    const novoValor = !this.clientes[index].casado
    this.clientes[index].casado = novoValor;

    const obj = {casado: novoValor};
    const id = this.clientes[index].id
    this.clienteService.editarClienteParcial(id, obj);

  }

  DeletarClick(clienteId: string, index: number){
    this.clienteService.deletarCliente(clienteId)
    .then(() => { this.clientes.splice(index, 1); })
    .catch(err => console.error(err));
  }

  handleModalClienteFormComponent(response){
    if(response === Object(response)){
      if(response.modoInsercao){
        response.cliente.id = response.id;
        this.clientes.unshift(response.cliente);
       
      }
      else{
        let index = this.clientes.findIndex(value => value.id == response.id);
        this.clientes[index] = response.cliente;
       
      }
    }
    
  }

}
