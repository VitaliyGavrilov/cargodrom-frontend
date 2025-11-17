import { Component, OnInit } from '@angular/core';
import { FeaturesService } from './features.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'features-component',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit {

  colors$: Observable<string>;

  constructor(
    private featuresService:FeaturesService,
  ) {
    this.colors$ = this.featuresService.getColors();
   }

  ngOnInit(): void {
    // брендинг сервис

    // куренси сервис
    // мб обьединить в общий сервис фич
  }

}
