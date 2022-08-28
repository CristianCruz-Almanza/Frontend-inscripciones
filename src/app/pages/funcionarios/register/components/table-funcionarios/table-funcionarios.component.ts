import { DatePipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { debounceTime, Subject, Subscription } from 'rxjs';
import { ColsTable, SearchFor } from 'src/app/interfaces/table.interface';
import { ErrorLogsService } from 'src/app/services/error-logs.service';
import Swal from 'sweetalert2';
import { Regsoli } from '../../../interfaces/regsoli.interface';
import { RegsoliService } from '../../../services/regsoli.service';
import { Users } from '../../../interfaces/users.interface';
import { AuthService } from '../../../../../auth/auth.service';


@Component({
  selector: 'app-table-funcionarios',
  templateUrl: './table-funcionarios.component.html',
  styles: [
  ]
})
export class TableRegsolisComponent implements OnInit, OnDestroy {


  cols: ColsTable[] = [
    { field: 'nameperson', header: 'NOMBRE A.' , style:'min-width:120px; max-width:130px;', tooltip: true},
    { field: 'constitution', header: 'TIPO DE CONSTITUCION' , style:'min-width:250px;',tooltip: true },
    { field: 'nameproject', header: 'UBICACION', style:'min-width:270px; max-width:270px;', tooltip: true},
    { field: 'yearexperience', header: 'AÑOS EXPERIENCIA', style:'min-width:270px; max-width:270px;', tooltip: true},
    { field: 'timeProposal', header: 'TIEMPO PROPUESTA', style:'min-width:270px; max-width:270px;', tooltip: true},
    { field: 'investment', header: 'FINANCIAMIENTO', style:'min-width:130px; max-width:130px', isButton:true},
    { field: 'status', header: 'OPCIONES', style:'min-width:130px; max-width:130px', isButton:true}
  ];
  searchFor: SearchFor[] = [
    {name: 'Nombre actor', code: 'nameactor'},

  ];
  searchSelect: string = 'nameactor';
  loading: boolean = true;
  rows: number = 50;
  from: number = 0;
  to: number = 0; 
  total: number = 0;
  regSoli: Regsoli[]=[];
  @Input() status: boolean = true;
  heigthtable: string = '400px';
  isSearching:boolean = false;
  savingSubs!: Subscription;
  debouncer: Subject<string> = new Subject();
  txtTermino: UntypedFormControl = new UntypedFormControl();
  pipe = new DatePipe('en-US');
  constructor(
    private regsoliService: RegsoliService,
    private errorLogService: ErrorLogsService,
    private AuthService: AuthService
  ) { }

  ngOnInit(): void {
    this.getAllRegsoli(this.status,1,this.rows, this.AuthService.getUser.id);
    this.savingSubs = this.regsoliService.saving
        .subscribe(saving => {
          this.getAllRegsoli(this.status,1,this.rows,this.AuthService.getUser.id);
        });
    this.debouncer.pipe( debounceTime(500))
        .subscribe(valor =>{
          this.getSearchRegsoli(this.searchSelect,this.status,this.rows,1,valor,);
        });
  }

  ngOnDestroy(): void {
    this.debouncer.unsubscribe();
    this.savingSubs.unsubscribe();
  }


  getAllRegsoli(status:boolean , page: number, per_page:number, id_user:number ) {
    this.loading = true;
    this.regsoliService.getAllRegsoliPaginate( status, page, per_page, id_user).subscribe({
      next: (resp) => {
        this.regSoli = resp.data;
        this.total = resp.total;
        this.from = resp.from;
        this.to = resp.to;
      },
      error: (err) => this.errorLogService.logDeErroresReads(err),
      complete: () => { this.loading = false; this.isSearching = false;}
    });
  }

  getSearchRegsoli(type:string, status:boolean, per_page: number, page:number, search: string) {
    this.regsoliService.getSearchRegsoli(type, per_page, page, search)
        .subscribe({
          next: (resp) => {
            this.regSoli = resp.data;
            this.total = resp.total;
            this.from = resp.from;
            this.to = resp.to;
          },
          error: (err) => this.errorLogService.logDeErroresReads(err),
          complete: () => this.isSearching = true
        });
  }

  searchDewey() {
    const txtInput = this.txtTermino.value;
    if(txtInput.length === 0) {
      this.getAllRegsoli(this.status,1,this.rows,this.AuthService.getUser.id);
      return ;
    }
    if(this.searchSelect.length > 0) {
      this.debouncer.next(txtInput);
    }
  }

  paginate(event : any) {
    const page = event.page+1;
    const per_page = event.rows;
    this.heigthtable = per_page === 50 ? '400px' : '600px';
    if(this.isSearching){
      this.getSearchRegsoli(this.searchSelect,this.status,per_page,page,this.txtTermino.value);
    } else {
      this.getAllRegsoli(this.status, page , per_page,this.AuthService.getUser.id);
    }
  }


  editRegsoliShowModal(regsoli: Regsoli) {
    this.regsoliService.isEdit = true;
    this.regsoliService.editSubs.emit(regsoli);
    this.regsoliService.setModalRegsoli = true;
  }
  printPdf(regsoli: Regsoli){
    this.regsoliService.getNewPaginaPdfOpen(regsoli);
  }

  


}
