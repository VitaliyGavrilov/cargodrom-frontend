import { Component, OnInit } from '@angular/core';
import { FilterService } from 'src/app/filter/services/filter.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
  providers: [FilterService]
})
export class RequestComponent implements OnInit {

  constructor(
    filter: FilterService,
  ) { }

  ngOnInit(): void {
  }

}
