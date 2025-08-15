/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';



/**
 * Авторизация пользователей
 */
@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `userCreate()` */
  static readonly UserCreatePath = '/user_create';

  /**
   * Регистрация пользователя.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userCreate$Response(
    params?: {
      body?: {

/**
 * Название компании
 */
'company': string;

/**
 * Ответственное лицо
 */
'fio': string;

/**
 * Номер телефона:
 */
'phone': string;

/**
 * ИНН
 */
'inn'?: string;

/**
 * E-mail
 */
'email': string;

/**
 * Пароль
 */
'password': string;

/**
 * Подтверждение пароля
 */
'password_confirm': string;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Идентификатор регистрации
 */
'uid': string;
}>> {
    const rb = new RequestBuilder(this.rootUrl, UserService.UserCreatePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * Идентификатор регистрации
         */
        'uid': string;
        }>;
      })
    );
  }

  /**
   * Регистрация пользователя.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userCreate(
    params?: {
      body?: {

/**
 * Название компании
 */
'company': string;

/**
 * Ответственное лицо
 */
'fio': string;

/**
 * Номер телефона:
 */
'phone': string;

/**
 * ИНН
 */
'inn'?: string;

/**
 * E-mail
 */
'email': string;

/**
 * Пароль
 */
'password': string;

/**
 * Подтверждение пароля
 */
'password_confirm': string;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Идентификатор регистрации
 */
'uid': string;
}> {
    return this.userCreate$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Идентификатор регистрации
 */
'uid': string;
}>): {

/**
 * Идентификатор регистрации
 */
'uid': string;
} => r.body)
    );
  }

  /** Path part for operation `userSendCode()` */
  static readonly UserSendCodePath = '/user_send_code';

  /**
   * Отправка кода для регистрации пользователя.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userSendCode()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userSendCode$Response(
    params?: {
      body?: {

/**
 * Идентификатор регистрации
 */
'uid': string;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Идентификатор регистрации
 */
'uid': string;
}>> {
    const rb = new RequestBuilder(this.rootUrl, UserService.UserSendCodePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * Идентификатор регистрации
         */
        'uid': string;
        }>;
      })
    );
  }

  /**
   * Отправка кода для регистрации пользователя.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userSendCode$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userSendCode(
    params?: {
      body?: {

/**
 * Идентификатор регистрации
 */
'uid': string;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Идентификатор регистрации
 */
'uid': string;
}> {
    return this.userSendCode$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Идентификатор регистрации
 */
'uid': string;
}>): {

/**
 * Идентификатор регистрации
 */
'uid': string;
} => r.body)
    );
  }

  /** Path part for operation `userConfirm()` */
  static readonly UserConfirmPath = '/user_confirm';

  /**
   * Подтверждение регистрация пользователя.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userConfirm()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userConfirm$Response(
    params?: {
      body?: {

/**
 * Идентификатор регистрации
 */
'uid': string;

/**
 * Код подтверждения
 */
'code': string;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * ID
 */
'id'?: number;
}>> {
    const rb = new RequestBuilder(this.rootUrl, UserService.UserConfirmPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * ID
         */
        'id'?: number;
        }>;
      })
    );
  }

  /**
   * Подтверждение регистрация пользователя.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userConfirm$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userConfirm(
    params?: {
      body?: {

/**
 * Идентификатор регистрации
 */
'uid': string;

/**
 * Код подтверждения
 */
'code': string;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * ID
 */
'id'?: number;
}> {
    return this.userConfirm$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * ID
 */
'id'?: number;
}>): {

/**
 * ID
 */
'id'?: number;
} => r.body)
    );
  }

  /** Path part for operation `userSendResetCode()` */
  static readonly UserSendResetCodePath = '/user_send_reset_code';

  /**
   * Отправка кода для сброса пароля пользователя.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userSendResetCode()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userSendResetCode$Response(
    params?: {
      body?: {

/**
 * Логин
 */
'login': string;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Идентификатор регистрации
 */
'uid': string;
}>> {
    const rb = new RequestBuilder(this.rootUrl, UserService.UserSendResetCodePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * Идентификатор регистрации
         */
        'uid': string;
        }>;
      })
    );
  }

  /**
   * Отправка кода для сброса пароля пользователя.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userSendResetCode$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userSendResetCode(
    params?: {
      body?: {

/**
 * Логин
 */
'login': string;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Идентификатор регистрации
 */
'uid': string;
}> {
    return this.userSendResetCode$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Идентификатор регистрации
 */
'uid': string;
}>): {

/**
 * Идентификатор регистрации
 */
'uid': string;
} => r.body)
    );
  }

  /** Path part for operation `userResetPassword()` */
  static readonly UserResetPasswordPath = '/user_reset_password';

  /**
   * Сброс пароля.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userResetPassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userResetPassword$Response(
    params?: {
      body?: {

/**
 * Идентификатор запроса
 */
'uid': string;

/**
 * Код из письма
 */
'code'?: string;

/**
 * Новый пароль
 */
'password': string;

/**
 * Подтверждение нового пароля
 */
'confirm_password': string;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, UserService.UserResetPasswordPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * Статус выполнения
         */
        'result': 'OK';
        }>;
      })
    );
  }

  /**
   * Сброс пароля.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userResetPassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userResetPassword(
    params?: {
      body?: {

/**
 * Идентификатор запроса
 */
'uid': string;

/**
 * Код из письма
 */
'code'?: string;

/**
 * Новый пароль
 */
'password': string;

/**
 * Подтверждение нового пароля
 */
'confirm_password': string;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.userResetPassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>): {

/**
 * Статус выполнения
 */
'result': 'OK';
} => r.body)
    );
  }

  /** Path part for operation `userCreateInvite()` */
  static readonly UserCreateInvitePath = '/user_create_invite';

  /**
   * Создание приглашения для сотрудника.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userCreateInvite()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userCreateInvite$Response(
    params?: {
      body?: {

/**
 * ID сотрудника
 */
'id': number;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, UserService.UserCreateInvitePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * Статус выполнения
         */
        'result': 'OK';
        }>;
      })
    );
  }

  /**
   * Создание приглашения для сотрудника.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userCreateInvite$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userCreateInvite(
    params?: {
      body?: {

/**
 * ID сотрудника
 */
'id': number;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.userCreateInvite$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>): {

/**
 * Статус выполнения
 */
'result': 'OK';
} => r.body)
    );
  }

  /** Path part for operation `userRegisterInvite()` */
  static readonly UserRegisterInvitePath = '/user_register_invite';

  /**
   * Установка логина и пароля.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userRegisterInvite()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userRegisterInvite$Response(
    params?: {
      body?: {

/**
 * Идентификатор приглашения
 */
'uid'?: string;

/**
 * Новый пароль
 */
'password': string;

/**
 * Подтверждение нового пароля
 */
'confirm_password': string;

/**
 * Логин (вместе со старым паролем, при смене)
 */
'login'?: string;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, UserService.UserRegisterInvitePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * Статус выполнения
         */
        'result': 'OK';
        }>;
      })
    );
  }

  /**
   * Установка логина и пароля.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userRegisterInvite$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userRegisterInvite(
    params?: {
      body?: {

/**
 * Идентификатор приглашения
 */
'uid'?: string;

/**
 * Новый пароль
 */
'password': string;

/**
 * Подтверждение нового пароля
 */
'confirm_password': string;

/**
 * Логин (вместе со старым паролем, при смене)
 */
'login'?: string;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.userRegisterInvite$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>): {

/**
 * Статус выполнения
 */
'result': 'OK';
} => r.body)
    );
  }

  /** Path part for operation `userUpdatePassword()` */
  static readonly UserUpdatePasswordPath = '/user_update_password';

  /**
   * Смена логина и пароля.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userUpdatePassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userUpdatePassword$Response(
    params?: {
      body?: {

/**
 * Идентификатор приглашения
 */
'uid'?: string;

/**
 * Старый пароль (при смене)
 */
'old_password': string;

/**
 * Новый пароль
 */
'password': string;

/**
 * Подтверждение нового пароля
 */
'confirm_password': string;

/**
 * Логин (вместе со старым паролем, при смене)
 */
'login'?: string;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, UserService.UserUpdatePasswordPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * Статус выполнения
         */
        'result': 'OK';
        }>;
      })
    );
  }

  /**
   * Смена логина и пароля.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userUpdatePassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userUpdatePassword(
    params?: {
      body?: {

/**
 * Идентификатор приглашения
 */
'uid'?: string;

/**
 * Старый пароль (при смене)
 */
'old_password': string;

/**
 * Новый пароль
 */
'password': string;

/**
 * Подтверждение нового пароля
 */
'confirm_password': string;

/**
 * Логин (вместе со старым паролем, при смене)
 */
'login'?: string;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.userUpdatePassword$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>): {

/**
 * Статус выполнения
 */
'result': 'OK';
} => r.body)
    );
  }

  /** Path part for operation `userInviteData()` */
  static readonly UserInviteDataPath = '/user_invite_data';

  /**
   * Данные по приглашению.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userInviteData()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userInviteData$Response(
    params?: {
      body?: {

/**
 * Идентификатор приглашения
 */
'uid': string;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Имеется ли старый пароль
 */
'has_old_password'?: boolean;

/**
 * Текущий логин
 */
'login'?: string;
}>> {
    const rb = new RequestBuilder(this.rootUrl, UserService.UserInviteDataPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * Имеется ли старый пароль
         */
        'has_old_password'?: boolean;
        
        /**
         * Текущий логин
         */
        'login'?: string;
        }>;
      })
    );
  }

  /**
   * Данные по приглашению.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userInviteData$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userInviteData(
    params?: {
      body?: {

/**
 * Идентификатор приглашения
 */
'uid': string;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Имеется ли старый пароль
 */
'has_old_password'?: boolean;

/**
 * Текущий логин
 */
'login'?: string;
}> {
    return this.userInviteData$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Имеется ли старый пароль
 */
'has_old_password'?: boolean;

/**
 * Текущий логин
 */
'login'?: string;
}>): {

/**
 * Имеется ли старый пароль
 */
'has_old_password'?: boolean;

/**
 * Текущий логин
 */
'login'?: string;
} => r.body)
    );
  }

  /** Path part for operation `userLogin()` */
  static readonly UserLoginPath = '/user_login';

  /**
   * Авторизация пользователя по паролю.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userLogin()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userLogin$Response(
    params?: {
      body?: {

/**
 * Логин (email)
 */
'login': string;

/**
 * Пароль
 */
'password': string;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Токен доступа, передается в заголовке "Bearer ACCESS_TOKEN" всех запросов кроме авторизации
 */
'token': string;

/**
 * Время жизни токена доступа
 */
'token_expire': string;

/**
 * Токен продления, используется для продления токена доступа и выхода
 */
'refresh_token': string;

/**
 * Время жизни токена продления
 */
'refresh_token_expire': string;
}>> {
    const rb = new RequestBuilder(this.rootUrl, UserService.UserLoginPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * Токен доступа, передается в заголовке "Bearer ACCESS_TOKEN" всех запросов кроме авторизации
         */
        'token': string;
        
        /**
         * Время жизни токена доступа
         */
        'token_expire': string;
        
        /**
         * Токен продления, используется для продления токена доступа и выхода
         */
        'refresh_token': string;
        
        /**
         * Время жизни токена продления
         */
        'refresh_token_expire': string;
        }>;
      })
    );
  }

  /**
   * Авторизация пользователя по паролю.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userLogin$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userLogin(
    params?: {
      body?: {

/**
 * Логин (email)
 */
'login': string;

/**
 * Пароль
 */
'password': string;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Токен доступа, передается в заголовке "Bearer ACCESS_TOKEN" всех запросов кроме авторизации
 */
'token': string;

/**
 * Время жизни токена доступа
 */
'token_expire': string;

/**
 * Токен продления, используется для продления токена доступа и выхода
 */
'refresh_token': string;

/**
 * Время жизни токена продления
 */
'refresh_token_expire': string;
}> {
    return this.userLogin$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Токен доступа, передается в заголовке "Bearer ACCESS_TOKEN" всех запросов кроме авторизации
 */
'token': string;

/**
 * Время жизни токена доступа
 */
'token_expire': string;

/**
 * Токен продления, используется для продления токена доступа и выхода
 */
'refresh_token': string;

/**
 * Время жизни токена продления
 */
'refresh_token_expire': string;
}>): {

/**
 * Токен доступа, передается в заголовке "Bearer ACCESS_TOKEN" всех запросов кроме авторизации
 */
'token': string;

/**
 * Время жизни токена доступа
 */
'token_expire': string;

/**
 * Токен продления, используется для продления токена доступа и выхода
 */
'refresh_token': string;

/**
 * Время жизни токена продления
 */
'refresh_token_expire': string;
} => r.body)
    );
  }

  /** Path part for operation `userLogout()` */
  static readonly UserLogoutPath = '/user_logout';

  /**
   * Выход пользователя.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userLogout()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userLogout$Response(
    params?: {
      body?: {

/**
 * Токен доступа
 */
'token': string;

/**
 * Выйти из всех авторизаций
 */
'everywhere'?: boolean;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, UserService.UserLogoutPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * Статус выполнения
         */
        'result': 'OK';
        }>;
      })
    );
  }

  /**
   * Выход пользователя.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userLogout$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userLogout(
    params?: {
      body?: {

/**
 * Токен доступа
 */
'token': string;

/**
 * Выйти из всех авторизаций
 */
'everywhere'?: boolean;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.userLogout$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>): {

/**
 * Статус выполнения
 */
'result': 'OK';
} => r.body)
    );
  }

  /** Path part for operation `userUpdateToken()` */
  static readonly UserUpdateTokenPath = '/user_update_token';

  /**
   * Обновление токена доступа.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userUpdateToken()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userUpdateToken$Response(
    params?: {
      body?: {

/**
 * Токен продления
 */
'refresh_token': string;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * токен доступа
 */
'token'?: string;

/**
 * Время жизни токена доступа
 */
'token_expire'?: string;

/**
 * Новый токен продления
 */
'refresh_token'?: string;

/**
 * Время жизни токена продления
 */
'refresh_token_expire'?: string;
}>> {
    const rb = new RequestBuilder(this.rootUrl, UserService.UserUpdateTokenPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * токен доступа
         */
        'token'?: string;
        
        /**
         * Время жизни токена доступа
         */
        'token_expire'?: string;
        
        /**
         * Новый токен продления
         */
        'refresh_token'?: string;
        
        /**
         * Время жизни токена продления
         */
        'refresh_token_expire'?: string;
        }>;
      })
    );
  }

  /**
   * Обновление токена доступа.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userUpdateToken$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userUpdateToken(
    params?: {
      body?: {

/**
 * Токен продления
 */
'refresh_token': string;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * токен доступа
 */
'token'?: string;

/**
 * Время жизни токена доступа
 */
'token_expire'?: string;

/**
 * Новый токен продления
 */
'refresh_token'?: string;

/**
 * Время жизни токена продления
 */
'refresh_token_expire'?: string;
}> {
    return this.userUpdateToken$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * токен доступа
 */
'token'?: string;

/**
 * Время жизни токена доступа
 */
'token_expire'?: string;

/**
 * Новый токен продления
 */
'refresh_token'?: string;

/**
 * Время жизни токена продления
 */
'refresh_token_expire'?: string;
}>): {

/**
 * токен доступа
 */
'token'?: string;

/**
 * Время жизни токена доступа
 */
'token_expire'?: string;

/**
 * Новый токен продления
 */
'refresh_token'?: string;

/**
 * Время жизни токена продления
 */
'refresh_token_expire'?: string;
} => r.body)
    );
  }

  /** Path part for operation `userSaveTableParam()` */
  static readonly UserSaveTableParamPath = '/user_save_table_param';

  /**
   * Сохранение параметров вывода таблицы.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userSaveTableParam()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userSaveTableParam$Response(
    params?: {
      body?: {

/**
 * Метод таблицы
 */
'method': string;

/**
 * Параметры таблицы, в структуре ...list_param
 */
'param': {
};
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, UserService.UserSaveTableParamPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * Статус выполнения
         */
        'result': 'OK';
        }>;
      })
    );
  }

  /**
   * Сохранение параметров вывода таблицы.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userSaveTableParam$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userSaveTableParam(
    params?: {
      body?: {

/**
 * Метод таблицы
 */
'method': string;

/**
 * Параметры таблицы, в структуре ...list_param
 */
'param': {
};
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.userSaveTableParam$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>): {

/**
 * Статус выполнения
 */
'result': 'OK';
} => r.body)
    );
  }

  /** Path part for operation `userResetTableParam()` */
  static readonly UserResetTableParamPath = '/user_reset_table_param';

  /**
   * Сброс параметров вывода таблицы.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userResetTableParam()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userResetTableParam$Response(
    params?: {
      body?: {

/**
 * Метод таблицы
 */
'method': string;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, UserService.UserResetTableParamPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * Статус выполнения
         */
        'result': 'OK';
        }>;
      })
    );
  }

  /**
   * Сброс параметров вывода таблицы.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userResetTableParam$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userResetTableParam(
    params?: {
      body?: {

/**
 * Метод таблицы
 */
'method': string;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.userResetTableParam$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>): {

/**
 * Статус выполнения
 */
'result': 'OK';
} => r.body)
    );
  }

  /** Path part for operation `userGetParam()` */
  static readonly UserGetParamPath = '/user_get_param';

  /**
   * Получение параметров пользователя.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userGetParam()` instead.
   *
   * This method doesn't expect any request body.
   */
  userGetParam$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Часовой пояс
 */
'timezone'?: string;

/**
 * Язык интерфейса
 */
'language'?: string;

/**
 * Основная валюта
 */
'currency_main'?: string;

/**
 * Валюта №2
 */
'currency_2'?: string;

/**
 * Валюта №3
 */
'currency_3'?: string;

/**
 * events
 */
'events'?: {
};

/**
 * Способ уведомления: SMS
 */
'notify_sms'?: boolean;

/**
 * Способ уведомления: E-mail
 */
'notify_email'?: boolean;

/**
 * Способ уведомления: Skype
 */
'notify_skype'?: boolean;

/**
 * Способ уведомления: Система
 */
'notify_system'?: boolean;
}>> {
    const rb = new RequestBuilder(this.rootUrl, UserService.UserGetParamPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * Часовой пояс
         */
        'timezone'?: string;
        
        /**
         * Язык интерфейса
         */
        'language'?: string;
        
        /**
         * Основная валюта
         */
        'currency_main'?: string;
        
        /**
         * Валюта №2
         */
        'currency_2'?: string;
        
        /**
         * Валюта №3
         */
        'currency_3'?: string;
        
        /**
         * events
         */
        'events'?: {
        };
        
        /**
         * Способ уведомления: SMS
         */
        'notify_sms'?: boolean;
        
        /**
         * Способ уведомления: E-mail
         */
        'notify_email'?: boolean;
        
        /**
         * Способ уведомления: Skype
         */
        'notify_skype'?: boolean;
        
        /**
         * Способ уведомления: Система
         */
        'notify_system'?: boolean;
        }>;
      })
    );
  }

  /**
   * Получение параметров пользователя.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userGetParam$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userGetParam(
    params?: {
    },
    context?: HttpContext
  ): Observable<{

/**
 * Часовой пояс
 */
'timezone'?: string;

/**
 * Язык интерфейса
 */
'language'?: string;

/**
 * Основная валюта
 */
'currency_main'?: string;

/**
 * Валюта №2
 */
'currency_2'?: string;

/**
 * Валюта №3
 */
'currency_3'?: string;

/**
 * events
 */
'events'?: {
};

/**
 * Способ уведомления: SMS
 */
'notify_sms'?: boolean;

/**
 * Способ уведомления: E-mail
 */
'notify_email'?: boolean;

/**
 * Способ уведомления: Skype
 */
'notify_skype'?: boolean;

/**
 * Способ уведомления: Система
 */
'notify_system'?: boolean;
}> {
    return this.userGetParam$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Часовой пояс
 */
'timezone'?: string;

/**
 * Язык интерфейса
 */
'language'?: string;

/**
 * Основная валюта
 */
'currency_main'?: string;

/**
 * Валюта №2
 */
'currency_2'?: string;

/**
 * Валюта №3
 */
'currency_3'?: string;

/**
 * events
 */
'events'?: {
};

/**
 * Способ уведомления: SMS
 */
'notify_sms'?: boolean;

/**
 * Способ уведомления: E-mail
 */
'notify_email'?: boolean;

/**
 * Способ уведомления: Skype
 */
'notify_skype'?: boolean;

/**
 * Способ уведомления: Система
 */
'notify_system'?: boolean;
}>): {

/**
 * Часовой пояс
 */
'timezone'?: string;

/**
 * Язык интерфейса
 */
'language'?: string;

/**
 * Основная валюта
 */
'currency_main'?: string;

/**
 * Валюта №2
 */
'currency_2'?: string;

/**
 * Валюта №3
 */
'currency_3'?: string;

/**
 * events
 */
'events'?: {
};

/**
 * Способ уведомления: SMS
 */
'notify_sms'?: boolean;

/**
 * Способ уведомления: E-mail
 */
'notify_email'?: boolean;

/**
 * Способ уведомления: Skype
 */
'notify_skype'?: boolean;

/**
 * Способ уведомления: Система
 */
'notify_system'?: boolean;
} => r.body)
    );
  }

  /** Path part for operation `userSaveParam()` */
  static readonly UserSaveParamPath = '/user_save_param';

  /**
   * Сохранение параметров пользователя.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userSaveParam()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userSaveParam$Response(
    params?: {
      body?: {

/**
 * Часовой пояс
 */
'timezone'?: string;

/**
 * Язык интерфейса
 */
'language'?: string;

/**
 * Основная валюта
 */
'currency_main'?: string;

/**
 * Валюта №2
 */
'currency_2'?: string;

/**
 * Валюта №3
 */
'currency_3'?: string;

/**
 * events
 */
'events'?: {
};

/**
 * Способ уведомления: SMS
 */
'notify_sms'?: boolean;

/**
 * Способ уведомления: E-mail
 */
'notify_email'?: boolean;

/**
 * Способ уведомления: Skype
 */
'notify_skype'?: boolean;

/**
 * Способ уведомления: Система
 */
'notify_system'?: boolean;
}
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>> {
    const rb = new RequestBuilder(this.rootUrl, UserService.UserSaveParamPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * Статус выполнения
         */
        'result': 'OK';
        }>;
      })
    );
  }

  /**
   * Сохранение параметров пользователя.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userSaveParam$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userSaveParam(
    params?: {
      body?: {

/**
 * Часовой пояс
 */
'timezone'?: string;

/**
 * Язык интерфейса
 */
'language'?: string;

/**
 * Основная валюта
 */
'currency_main'?: string;

/**
 * Валюта №2
 */
'currency_2'?: string;

/**
 * Валюта №3
 */
'currency_3'?: string;

/**
 * events
 */
'events'?: {
};

/**
 * Способ уведомления: SMS
 */
'notify_sms'?: boolean;

/**
 * Способ уведомления: E-mail
 */
'notify_email'?: boolean;

/**
 * Способ уведомления: Skype
 */
'notify_skype'?: boolean;

/**
 * Способ уведомления: Система
 */
'notify_system'?: boolean;
}
    },
    context?: HttpContext
  ): Observable<{

/**
 * Статус выполнения
 */
'result': 'OK';
}> {
    return this.userSaveParam$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Статус выполнения
 */
'result': 'OK';
}>): {

/**
 * Статус выполнения
 */
'result': 'OK';
} => r.body)
    );
  }

  /** Path part for operation `userFormParamParam()` */
  static readonly UserFormParamParamPath = '/user_form_param_param';

  /**
   * Параметры для формы параметров пользователя.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userFormParamParam()` instead.
   *
   * This method doesn't expect any request body.
   */
  userFormParamParam$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Часовые пояса
 */
'timezone': Array<{
}>;

/**
 * Языки
 */
'language': Array<{
}>;

/**
 * Валюты
 */
'currency': Array<{
}>;

/**
 * События
 */
'events': Array<{
}>;
}>> {
    const rb = new RequestBuilder(this.rootUrl, UserService.UserFormParamParamPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * Часовые пояса
         */
        'timezone': Array<{
        }>;
        
        /**
         * Языки
         */
        'language': Array<{
        }>;
        
        /**
         * Валюты
         */
        'currency': Array<{
        }>;
        
        /**
         * События
         */
        'events': Array<{
        }>;
        }>;
      })
    );
  }

  /**
   * Параметры для формы параметров пользователя.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userFormParamParam$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userFormParamParam(
    params?: {
    },
    context?: HttpContext
  ): Observable<{

/**
 * Часовые пояса
 */
'timezone': Array<{
}>;

/**
 * Языки
 */
'language': Array<{
}>;

/**
 * Валюты
 */
'currency': Array<{
}>;

/**
 * События
 */
'events': Array<{
}>;
}> {
    return this.userFormParamParam$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Часовые пояса
 */
'timezone': Array<{
}>;

/**
 * Языки
 */
'language': Array<{
}>;

/**
 * Валюты
 */
'currency': Array<{
}>;

/**
 * События
 */
'events': Array<{
}>;
}>): {

/**
 * Часовые пояса
 */
'timezone': Array<{
}>;

/**
 * Языки
 */
'language': Array<{
}>;

/**
 * Валюты
 */
'currency': Array<{
}>;

/**
 * События
 */
'events': Array<{
}>;
} => r.body)
    );
  }

}
