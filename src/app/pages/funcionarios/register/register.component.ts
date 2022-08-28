import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Regsoli } from '../interfaces/regsoli.interface';
import { RegisterService } from '../services/register.service';
import { RegsoliService } from '../services/regsoli.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  searchItems!: MenuItem[];
  status: boolean = true;

  constructor(
    public registerService: RegisterService,
    private regsoliService: RegsoliService,
    private userService: UsersService,
  ) { }

  ngOnInit(): void {
    this.searchItems = [
      {label: 'Registros',   icon: 'pi pi-users' ,command: () => this.status = true },
    ];
  }

  showModalRegister() {
    this.registerService.isEdit = false;
    this.registerService.setModal = true;
  }
  showModalRegsoli() {
    this.regsoliService.isEdit = false;
    this.regsoliService.setModalRegsoli = true;
  }

}
