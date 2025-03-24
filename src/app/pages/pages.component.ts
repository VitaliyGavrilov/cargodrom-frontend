import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PagesComponent implements OnInit {
  

  constructor(

  ) { }

  ngOnInit(): void {
  }

}
