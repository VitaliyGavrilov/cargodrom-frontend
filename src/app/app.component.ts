import { UserService } from './api/services/user.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { LoaderService } from '../app/pages/services/loader.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'cargodrom-frontend';
  isLoading$ = this.loaderService.isLoading$;

  constructor(
    private userService: UserService,
    private loaderService: LoaderService) {
  }

  ngOnInit(): void {
  }
}
