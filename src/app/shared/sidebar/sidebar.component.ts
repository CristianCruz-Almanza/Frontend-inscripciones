import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [`
  a {
    text-decoration: none;
  }
`]
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.onOffSideBar();
  }

  onOffSideBar() : void {
    const sidebarToggle = document.body.querySelector('.toggle-sidebar-btn');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('toggle-sidebar');
        });
    }
  }

}
