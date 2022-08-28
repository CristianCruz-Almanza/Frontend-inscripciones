import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/auth.interface';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [`
    a {
      text-decoration: none;
    }
  `]
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  dropdownitems: boolean = false;
  showNotifications: boolean = false;

  ngOnInit(): void {
  }

  get getUser() : User {
    return this.authService.getUser;
  }

  signOut(){
    this.dropdownitems = false;
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

}
