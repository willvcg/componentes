import { Component, inject, signal } from '@angular/core';
import { EMPTY, catchError, tap } from 'rxjs';
import {
  ButtonsOptions,
  CustomItem,
  HeadTable,
  SelectOptions,
  TableComponent,
} from '../../componentes/table/table.component';
import { PokemonList } from '../../models/pokemon';
import { SpaceXLaunch } from '../../models/space-x';
import { PokemonService } from '../../services/entities/pokemon.service';
import { SpaceXService } from '../../services/entities/space-x.service';

export interface User {
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
    nombre: 'usuario1',
    email: 'usuario1@example.com',
    rol: 'admin',
    listaOpciones: ['Seleccione una tarea', 'Opcion 1'],
  },
  {
    nombre: 'usuario2',
    email: 'usuario2@example.com',
    rol: 'usuario',
    listaOpciones: ['Seleccione una tarea', 'Opcion 1'],
  },
  {
    nombre: 'usuario3',
    email: 'usuario3@example.com',
    rol: 'usuario',
    listaOpciones: ['Seleccione una tarea', 'Opcion 1'],
  },
];

export const sampleData: TableRow[] = [
  {
    id: 1,
    name: 'John Doe',
    age: 30,
    email: 'john@example.com',
    listado: ['primero', 'segundo'],
  },
  {
    id: 2,
    name: 'Jane Smith',
    age: 25,
    email: 'jane@example.com',
    listado: ['primero', 'segundo'],
  },
  {
    id: 3,
    name: 'Alice Johnson',
    age: 35,
    email: 'alice@example.com',
    listado: ['primero', 'segundo'],
  },
  {
    id: 4,
    name: 'Bob Brown',
    age: 40,
    email: 'bob@example.com',
    listado: ['primero', 'segundo'],
  },
  {
    id: 5,
    name: 'Eve Wilson',
    age: 28,
    email: 'eve@example.com',
    listado: ['primero', 'segundo'],
  },
];

@Component({
  selector: 'app-tables-page',
  standalone: true,
  templateUrl: './tables-page.component.html',
  styleUrl: './tables-page.component.css',
  imports: [TableComponent],
})
export class TablesPageComponent {
  //#region Table
  headArray = signal<HeadTable[]>([
    { head: 'Nombre', fieldName: 'nombre' },
    { head: 'Email', fieldName: 'email' },
    { head: 'Rol', fieldName: 'rol' },
    { head: 'Opciones', fieldName: 'buttonsOptions' },
    { head: 'Elecciones', fieldName: 'selectsOptions' },
  ]);
  gridArray = signal<User[]>(Arrayusuarios);
  buttonsArray = signal<ButtonsOptions>({
    buttons: [
      {
        title: 'Create',
        class: '',
        tooltip: '',
        callback: (ev) => {
          this.onCallBackButton(ev);
        },
      },
      {
        title: 'Delete',
        class: '',
        tooltip: '',
        callback: (ev) => {
          this.onCallBackButton(ev);
        },
      },
    ],
  });
  selectArray = signal<SelectOptions>({
    selectedKey: 'email',
    selectKeyValues: 'listaOpciones',
    callback: (tareaAux) => this.onCallBackSelect(tareaAux),
  });

  headTable = signal<HeadTable[]>([
    { head: 'Id', fieldName: 'id' },
    { head: 'Name', fieldName: 'name' },
    { head: 'Age', fieldName: 'age' },
    { head: 'Email', fieldName: 'email' },
    { head: 'Opciones', fieldName: 'buttonsOptions' },
    { head: 'Opciones', fieldName: 'selectsOptions' },
  ]);
  dataTable = signal<TableRow[]>(sampleData);
  buttonsTabla = signal<ButtonsOptions>({
    buttons: [
      {
        title: 'Edit',
        class: '',
        tooltip: '',
        callback: (ev) => {
          this.onCallBackButton(ev);
        },
      },
    ],
  });
  selectTable = signal<SelectOptions>({
    selectedKey: 'rol',
    selectKeyValues: 'listado',
    callback: (tareaAux) => this.onCallBackSelect(tareaAux),
  });
  //#endregion

  //#region SpaceX
  protected headEndpoints = signal<HeadTable[]>([
    { head: 'Nombre', fieldName: 'name' },
    { head: 'Número de vuelo', fieldName: 'flight_number' },
    { head: 'Hora local', fieldName: 'date_local' },
  ]);
  protected gridEndpoints = signal<SpaceXLaunch[]>([]);
  //#endregion

  //#region Pokemon
  protected headPokemon = signal<HeadTable[]>([
    { head: 'Nombre', fieldName: 'name' },
    { head: 'URL', fieldName: 'url' },
  ]);
  protected gridPokemon = signal<PokemonList>({
    count: 0,
    next: '',
    previous: '',
    results: [],
  });
  //#endregion

  private spaceXService = inject(SpaceXService);
  private pokemonService = inject(PokemonService);

  errorMessage = '';
  constructor() {
    this.spaceXService.getLaunchs().subscribe(
      (data) => {
        this.gridEndpoints.set(data);
        console.log(this.gridEndpoints());
      },
      (error) => {
        console.error('Error al obtener los lanzamientos', error);
      }
    );

    this.pokemonService
      .getPokemonsList()
      .pipe(
        tap((data) => {
          this.gridPokemon.set(data);
          console.log(this.gridPokemon());
          console.log(data);
        }),
        catchError((error) => {
          this.errorMessage = error;
          return EMPTY;
        })
      )
      .subscribe();
  }

  protected onCallBackButton(ev: CustomItem) {
    console.log('ev', ev);
  }

  protected onCallBackSelect(ev: CustomItem) {
    console.log('ev', ev);
  }

  protected onNextPage(nextPage: string): void {
    console.log('next page', nextPage);
    const match = nextPage.match(/offset=(\d+)&limit=(\d+)/);

    if (match) {
      const offset = parseInt(match[1], 10);
      const limit = parseInt(match[2], 10);

      const paginator = { limit, offset };
      this.pokemonService
        .getPokemonsList(paginator)
        .pipe(
          tap((data) => {
            this.gridPokemon.set(data);
            console.log(this.gridPokemon());
            console.log(data);
          }),
          catchError((error) => {
            this.errorMessage = error;
            return EMPTY;
          })
        )
        .subscribe();
    }
  }

  protected onPrevPage(nextPage: string): void {
    console.log('next page', nextPage);
    const match = nextPage.match(/offset=(\d+)&limit=(\d+)/);

    if (match) {
      const offset = parseInt(match[1], 10);
      const limit = parseInt(match[2], 10);

      const paginator = { limit, offset };
      this.pokemonService
        .getPokemonsList(paginator)
        .pipe(
          tap((data) => {
            this.gridPokemon.set(data);
            console.log(this.gridPokemon());
            console.log(data);
          }),
          catchError((error) => {
            this.errorMessage = error;
            return EMPTY;
          })
        )
        .subscribe();
    }
  }
}
