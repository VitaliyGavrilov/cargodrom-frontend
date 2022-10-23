import { HttpClientModule, HttpEvent, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { Department } from '../custom_models';
import { CompanyService, UserService } from '../services';

xdescribe('CompanyService', () => {
  let companyService: CompanyService;
  let userService: UserService;
  let token: string;
  const login = '';
  const password = '';
  
  if (!login || !password) {
    return;
  }

  beforeEach((done: DoneFn) => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useValue: {
            intercept: (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> => {
              request = request.clone({
                headers: request.headers.set('Authorization', `Bearer ${token}`)
              });
              return next.handle(request)
            }
          },
          multi: true
        }
      ]
    });
    companyService = TestBed.inject(CompanyService);
    userService = TestBed.inject(UserService);

    const body = { login, password };
    userService.userLogin({ body }).subscribe(value => {
      expect(value).toBeTruthy();
      expect(typeof value.token === 'string').toBeTrue();
      token = value.token;
      done();
    });
  });

  describe('Department List', () => {
    let departments: Department[] = [];

    beforeEach((done: DoneFn) => {
      companyService.companyDepartmentList().subscribe(depts => {
        expect(depts).toBeTruthy();
        departments = depts as Department[];
        done();
      });
    });

    it('should count_position > 0 if count_user > 0', () => {
      for (const dept of departments) {
        if (dept.count_user > 0) {
          expect(dept.count_position > 0)
            .withContext(`Как минимум одна должность должна быть в подразделении id=${dept.id} (${dept.name}), count_position = ${dept.count_position}, count_user = ${dept.count_user}`)
            .toBeTrue();
        }
      }
    });
    
    it('should count_position <= count_user', () => {
      for (const dept of departments) {
        expect(dept.count_position <= dept.count_user)
          .withContext(`Должностей в подразделении не может быть больше чем сотрудников id=${dept.id} (${dept.name}), count_position = ${dept.count_position}, count_user = ${dept.count_user}`)
          .toBeTrue();
      }
    });
  });
});
