import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonsOptions, CustomItem, HeadTable, SelectOptions, TableComponent } from "./componentes/table/table.component";
import { ButtonComponent } from "./componentes/button/button.component";
import { TooltipDirective } from './directives/tooltip.directive';
import { ModalComponent } from "./componentes/modal/modal.component";
export interface User{
  nombre: string;
  email: string;
  rol: string;
  // listaOpciones?: Record<string, string>;
  listaOpciones?: string[];
}

export interface TableRow {
  id: number;
  name: string;
  age: number;
  email: string;
  listado?: string[];
}

const Arrayusuarios: User[] = [
  {
    nombre: "usuario1",
    email: "usuario1@example.com",
    rol: "admin",
    listaOpciones: [
      'Seleccione una tarea','Opcion 1'
    ]
  },
  {
    nombre: "usuario2",
    email: "usuario2@example.com",
    rol: "usuario",
    listaOpciones: [
      'Seleccione una tarea','Opcion 1'
    ]
  },
  {
    nombre: "usuario3",
    email: "usuario3@example.com",
    rol: "usuario",
    listaOpciones: [
      'Seleccione una tarea','Opcion 1'
    ]
  }
]

export const sampleData: TableRow[] = [
  { id: 1, name: "John Doe", age: 30, email: "john@example.com", listado: ['primero', 'segundo'] },
  { id: 2, name: "Jane Smith", age: 25, email: "jane@example.com", listado: ['primero', 'segundo'] },
  { id: 3, name: "Alice Johnson", age: 35, email: "alice@example.com", listado: ['primero', 'segundo'] },
  { id: 4, name: "Bob Brown", age: 40, email: "bob@example.com", listado: ['primero', 'segundo'] },
  { id: 5, name: "Eve Wilson", age: 28, email: "eve@example.com", listado: ['primero', 'segundo'] }
];

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, TableComponent, ButtonComponent, TooltipDirective, ModalComponent]
})
export class AppComponent {
  //#region Table
  headArray = signal<HeadTable[]>([
    {head: 'Nombre', fieldName: 'nombre'},
    {head: 'Email', fieldName: 'email'}, 
    {head: 'Rol', fieldName: 'rol'},
    {head: 'Opciones', fieldName: 'buttonsOptions'},
    {head: 'Elecciones', fieldName: 'selectsOptions'}
  ])
  gridArray = signal<User[]>(Arrayusuarios)
  buttonsArray = signal<ButtonsOptions>({
    buttons: [{
      title:'Create',
      class: '',
      tooltip: '',
      callback: (ev) => {
        this.onCallBackButton(ev)
      },
    },
    {
      title:'Delete',
      class: '',
      tooltip: '',
      callback: (ev) => {
        this.onCallBackButton(ev)
      },
    }
  ]
  })
  selectArray = signal<SelectOptions>({
    selectedKey: 'email',
    selectKeyValues: 'listaOpciones',
    callback: (tareaAux) => this.onCallBackSelect(tareaAux)
  })

  headTable = signal<HeadTable[]>([
    {head: 'Id', fieldName: 'id'},
    {head: 'Name', fieldName: 'name'}, 
    {head: 'Age', fieldName: 'age'},
    {head: 'Email', fieldName: 'email'},
    {head: 'Opciones', fieldName: 'buttonsOptions'},
    {head: 'Opciones', fieldName: 'selectsOptions'}
  ])
  dataTable = signal<TableRow[]>(sampleData)
  buttonsTabla = signal<ButtonsOptions>({
    buttons: [{
      title:'Edit',
      class: '',
      tooltip: '',
      callback: (ev) => {
        this.onCallBackButton(ev)
      },
    }]
  })
  selectTable = signal<SelectOptions>({
    selectedKey: 'rol',
    selectKeyValues: 'listado',
    callback: (tareaAux) => this.onCallBackSelect(tareaAux)
  })
  //#endregion

  //#region Button
  title = signal<string>('Create');
  class = signal<string>('');
  //#endregion

  //#region Modal
  showModal = signal(false)
  //#endregion

  protected onCallBackButton(ev: CustomItem){
    console.log("ev", ev)
  }

  protected onCallBackSelect(ev: CustomItem){
    console.log("ev", ev)
  }

  protected clickButton() {
    console.log("click", )
  }

  protected onOkModal(){
    this.showModal.set(false)
  }

  protected onCancelModal(){
    this.showModal.set(false)
  }
}
