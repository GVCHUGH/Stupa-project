import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'product';

  private routerSubscription: any;

  showHeaderFooter = false;

  constructor(private router: Router) {}
  ngOnInit() {
    this.routerSubscription = this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (event.url == '/' || event.url == '/login') {
          this.showHeaderFooter = true;
        } else {
          this.showHeaderFooter = false;
        }
      }
    });
  }
}
