import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Cliente } from '../../models/cliente';
import { ClientesDALService } from '../../services';
// import { getStyle, rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities';
// import { NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';


@Component({
  templateUrl: 'clientes.component.html'
})
export class ClientesComponent implements OnInit {

  // private listaClientesAsync: Observable<Cliente[]>;
  public listaClientes: Cliente[];

  //#region [atributos para controle de páginação e filtros]
  /* configuracao */
  public page = 1;
  public itemsPerPage = 10;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;

  // public  = '';
  public get campoFiltro(): string {
    const userInfo = sessionStorage.getItem('campoFiltroCliente');
    return userInfo !== undefined ? JSON.parse(userInfo) : '';
  }
  public set campoFiltro(value: string) {
    sessionStorage.setItem('campoFiltroCliente', JSON.stringify(value));
  }

  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: '', className: 'icon-people text-center', name: 'foto', sort: false },
    { title: 'Código', name: 'codigo', sort: 'asc' },
    { title: 'Cliente', name: 'nome', sort: '' },
    { title: 'CPF/CNPJ', name: 'cpf_cnpj', sort: '' },
    { title: 'Status', name: 'status', sort: '' }
  ];

  public config: any = {
    paging: true,
    sorting: { columns: this.columns },
    filtering: { filterString: '' },
    className: ['table', 'table-hover', 'table-striped', 'table-align-middle', 'thead-light']
    // className: ['table-striped', 'table-bordered', 'table-hover', 'thead-default', 'table-responsive']
    // table table-hover table-striped table-align-middle
  };
  public accent_map = {
    'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', // a
    'ç': 'c',                                                   // c
    'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',                     // e
    'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',                     // i
    'ñ': 'n',                                                   // n
    'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ø': 'o', // o
    'ß': 's',                                                   // s
    'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u',                     // u
    'ÿ': 'y'                                                    // y
  };
  //#endregion


  constructor(private clienteDalServ: ClientesDALService) { }

  ngOnInit(): void {
    this.carreraLista();
  }

  carreraLista() {
    // ler do banco...
    // this.listaClientesAsync = this.clienteDalServ.getLista();
    this.clienteDalServ.getLista().subscribe(dados => {
      // console.log('dados carregados...');
      this.listaClientes = dados;
      this.length = dados.length;
      this.onChangeTable(this.config);
    });
  }

  //#region [filtro e paginação]
  public changePage(page: any, data: Array<any> = this.listaClientes): Array<any> {
    const start = (page.page - 1) * page.itemsPerPage;
    const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }
  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    const columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (this.accent_fold(previous[columnName].toUpperCase()) > this.accent_fold(current[columnName].toUpperCase())) {
        return sort === 'desc' ? -1 : 1;
      } else if (this.accent_fold(previous[columnName].toUpperCase()) < this.accent_fold(current[columnName].toUpperCase())) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }
  /**remove acento */
  public accent_fold(s) {
    if (!s) { return ''; }
    s = s.toLowerCase();
    let ret = '';
    for (let i = 0; i < s.length; i++) {
      ret += this.accent_map[s.charAt(i)] || s.charAt(i);
    }
    return ret;

  }
  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          return this.accent_fold(item[column.name]).match(this.accent_fold(column.filtering.filterString));
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) => {
        this.accent_fold(item[config.filtering.columnName]).match(this.accent_fold(this.config.filtering.filterString));
      });
    }

    if (this.campoFiltro !== '') {
      return filteredData.filter((item: any) => this.accent_fold(item[this.campoFiltro])
        .match(this.accent_fold(this.config.filtering.filterString)));
    }

    const tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
        if (this.accent_fold(item[column.name]).match(this.accent_fold(this.config.filtering.filterString))) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    const filteredData = this.changeFilter(this.listaClientes, this.config);
    const sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  /*adiciona a imagem do botão na tabela*/
  private extendData() {
    // For every resulttable entry
    /* for (let i = 0; i < this.listaClientes.length; i++) {

    } */
  }
  //#endregion

}
