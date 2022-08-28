import { Component, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styles: [
  ]
})
export class BreadcrumbComponent implements OnInit {

  public titulo: string = '';
  public tituloSubs$! : Subscription;
  public breadcrumbs:any = [];
  constructor(private router: Router) {
    this.tituloSubs$ = this.getArgumentosRuta()
                        .subscribe((data: any) => {
                          this.breadcrumbs = data.data;
                          this.titulo = this.breadcrumbs[this.breadcrumbs.length - 1].title
                          document.title = `Inscripciones | ${this.titulo}`;
                        });
  }

  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getArgumentosRuta() {
    return this.router.events
      .pipe(
        filter( (event: any) => event instanceof ActivationEnd),
        filter( (event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data)
      );
  }

}
