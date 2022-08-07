import { CountryService } from './../../services/country.service';
import { environment } from './../../../../environments/environment';
import { tap } from 'rxjs';
import { City } from './../../../api/custom_models/city';
import { Association } from './../../../api/custom_models/association';
import { Country } from './../../../api/custom_models/country';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contractor, ContractorRequestFormat, ContractorType } from './../../../api/custom_models/contractor';
import { ContractorService } from './../../../api/services/contractor.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-contractor-editor',
  templateUrl: './contractor-editor.component.html',
  styleUrls: ['./contractor-editor.component.scss'],
})
export class ContractorEditorComponent implements OnInit {

  contractor: Partial<Contractor> = {};
  isEditMode: boolean = false;
  contractorForm: FormGroup;
  associations: Association[] = [];
  contractorTypes: ContractorType[] = [];
  countries: Country[] = [];
  cities: Partial<City>[] = [];
  snackBarWithShortDuration: MatSnackBarConfig = { duration: 1000 };
  snackBarWithLongDuration: MatSnackBarConfig = { duration: 3000 };
  requestFormats: ContractorRequestFormat[] = [];
  production = environment.production;

  constructor(
    private route: ActivatedRoute,
    private contractorService: ContractorService,
    private countryService: CountryService,
    private cityService: CityService,
    private location: Location,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.contractorForm = this.fb.group({
      id: [''],
      address: ['', []],
      name: ['', [Validators.required]],
      ind: ['', [Validators.required]],
      city_name: ['', [Validators.required]],
      phone: ['', []],
      web: ['', []],
      rating_nps: [0, []],
      user_rating_nps: [0, []],
      contacts: fb.array([]),
      association_id: [[]],
      tax_id: [undefined, [Validators.required]],
      type_id: [undefined, [Validators.required]],
      language_id: [undefined, [Validators.required]],
      country_id: ['', [Validators.required]],
      city_id: ['', [Validators.required]],
      request_format_id: ['', [Validators.required]],
      exclude_from_trade: [false]
    });
  }

  ngOnInit(): void {
    const segments = this.route.snapshot.url.map(s => s.path);
    this.isEditMode = segments[1] === 'edit';
    if (this.isEditMode) {
      this.getContractor();
    }
    this.getContractorTypes();
    this.getAssociations();
    this.getCountries();
    this.getRequestFormats();
  }

  goBack(): void {
    this.location.back();
  }
  
  goToContractors(): void {
    this.router.navigate(['/pages/contractor']);
  }
  
  goToContractor(id: number): void {
    this.router.navigate(['/pages/contractor/edit', id]);
  }

  removeContact(i: number): void {
    this.contacts.removeAt(i);
  }

  addContact() {
    this.contacts.push(this.fb.control({
      contractor_id: this.contractor.id
    }))
  }

  get contacts() {
    return <FormArray>this.contractorForm.get('contacts');
  }

  save(): void {
    const body = this.contractorForm.value;
    if (typeof this.contractor.id === 'number') {
      this.updateContractor(body);
    } else {
      this.createContractor(body);
    }
  }
  
  remove(): void {
    this.snackBar.open("Удаление подрядчика...", "Отменить", this.snackBarWithLongDuration)
      .afterDismissed().subscribe(res => {
        if (!res.dismissedByAction) {
          this.removeContractor();
        }
      });
  }

  get assocAsText(): string {
    const ids: string[] = this.contractorForm.controls['association_id'].value || [];
    return ids.map(id => this.associations.find(a => a.id === id)?.name).join(', ');
  }

  onCountryChange(countryId: number): void {
    this.contractorForm.controls['city_id'].reset(undefined);
    this.getCities(countryId);
  }
  
  canSave(): boolean {
    return this.contractorForm.valid && this.contractorForm.dirty;
  }

  private updateContractor(body: any) {
    this.contractorService.contractorUpdate({ body }).pipe().subscribe({
      next: () => this.snackBar.open(`Подрядчик сохранен`, undefined, this.snackBarWithShortDuration),
      error: (err) => this.snackBar.open(`Ошибка сохранения подрядчика: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
    });
  }

  private createContractor(body: any) {
    this.contractorService.contractorCreate({ body }).pipe().subscribe({
      next: ({id}) => {
        this.goToContractor(id);
        this.snackBar.open(`Подрядчик создан`, undefined, this.snackBarWithShortDuration)
      },
      error: (err) => this.snackBar.open(`Ошибка создания подрядчика: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
    });
  }
  
  private removeContractor() {
    const body = { id: this.contractor.id! };
    this.contractorService.contractorDelete({ body }).subscribe({
      next: () => {
        this.snackBar.open('Подрядчик удален', undefined, this.snackBarWithShortDuration);
        this.goToContractors();
      },
      error: (err) => this.snackBar.open(`Ошибка сохранения подрядчика: ` + err.error.error_message, undefined, this.snackBarWithShortDuration)
    });
  }

  private getAssociations() {
    this.contractorService.contractorAssociation()
      .subscribe(associations => this.associations = associations as Association[]);
  }

  private getContractorTypes() {
    this.contractorService.contractorType()
      .subscribe(contractorTypes => this.contractorTypes = contractorTypes as ContractorType[]);
  }

  private getCountries() {
    this.countryService.getCountries()
      .subscribe(countries => this.countries = countries);
  }

  private getRequestFormats(): void {
    this.contractorService.contractorRequestFormat()
      .pipe(tap(console.table))
      .subscribe(formats => this.requestFormats = formats);
  }

  private getCities(countryId: number) {
    this.cityService.getCities(countryId)
      .subscribe(cities => this.cities = cities);
  }

  private getContractor(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.contractorService.contractorInfo({ id })
      .pipe(tap(contractor => {
        // currently, when contactor doesn't exist the service returns HTTP 200 with empty response body instead of HTTP 404
        // therefore we have to handle that case manually
        if (!contractor) {
          throw ({error: {error_message: `подрядчик не существует`}});
        }
      }))
      .subscribe({
        next: contractor => {
          console.table(contractor);
          this.contractor = contractor as Contractor;
          const contactsControls = this.contacts;
          this.contractor.contacts?.forEach(contact => contact.contractor_id = contractor.id);
          this.contractor.contacts?.forEach(contact => contactsControls.push(this.fb.control(contact)));
          this.contractorForm.patchValue(this.contractor);
          if (typeof contractor.country_id === 'number') {
            this.getCities(contractor.country_id);
          }
        },
        error: (err: any) => {
          this.snackBar.open(`Подрядчик не найден: ` + err.error.error_message, undefined, this.snackBarWithShortDuration);
          this.goToContractors();
        }
      });
  }

}
