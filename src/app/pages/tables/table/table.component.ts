import { CountryService } from './../../services/country.service';
import { environment } from './../../../../environments/environment';
import { debounceTime, distinctUntilChanged, Subject, takeUntil, tap } from 'rxjs';
import { City } from './../../../api/custom_models/city';
import { Association } from './../../../api/custom_models/association';
import { Country } from './../../../api/custom_models/country';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contractor, ContractorRequestFormat, ContractorType } from '../../../api/custom_models/contractor';
import { ContractorService } from '../../../api/services/contractor.service';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CityService } from './../../services/city.service';
import { Location } from '@angular/common';
import { TaxSystem } from 'src/app/api/custom_models';
import { SystemService, TransportService } from 'src/app/api/services';
import { Counterparty } from 'src/app/api/custom_models/counterparty';
import { FilterService } from 'src/app/filter/services/filter.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit {

  snackBarWithShortDuration: MatSnackBarConfig = { duration: 1000 };
  snackBarWithLongDuration: MatSnackBarConfig = { duration: 5000 };

  readonly xlsxMimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

  @Input() column:any;
  @Input() rows:any;
  @Input() columnsData:any;

  @Output() import = new EventEmitter<any>();
  @Output() export = new EventEmitter<void>();
  @Output() exportTemplate = new EventEmitter<void>();
  // @Output() selectFile = new EventEmitter<void>();

  @ViewChild('file', { static: true }) file?: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private contractorService: ContractorService,
    private countryService: CountryService,
    private cityService: CityService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private location: Location,
    private systemService: SystemService,
    private transportService: TransportService,
    public filterService: FilterService,
  ) {
  }

  ngOnInit(): void {

  }


  exportChange(): void {
    this.export.emit();
  }
  exportTemplateChange(): void {
    this.exportTemplate.emit();
  }

  getVal(obj: any, path: string): any {
    if (!path?.includes('/')) {
        return obj[path] !== undefined ? obj[path] : null;
    }
    const keys = path?.split('/');
    for (const key of keys) {
      if (obj && obj.hasOwnProperty(key)) {
          obj = obj[key];
      } else {
          return null; // Если ключ не найден, возвращаем null
      }
    }
    return obj !== undefined ? obj : null; // Проверка на undefined
  }


}
