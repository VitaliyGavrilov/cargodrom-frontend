import { Component, OnInit } from "@angular/core";
import { TableListService } from "../../table-list/table-list.service";

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
//   styleUrls: ['./test-page.component.scss'],
//   encapsulation: ViewEncapsulation.None
})
export class TestPage implements OnInit {

  constructor(
    private tableList: TableListService
  ) {}

  ngOnInit(): void {
    this.tableList.getRows().subscribe({
      next: (rows) => {
        console.log(rows);
        
      },
      error: (err) => {}
    });
  }
}