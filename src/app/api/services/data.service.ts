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
 * Справочная информация
 */
@Injectable({ providedIn: 'root' })
export class DataService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `dataInfo()` */
  static readonly DataInfoPath = '/data_info';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `dataInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  dataInfo$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Код ошибки
 */
'error_code'?: number;

/**
 * Тект ошибки
 */
'error_message'?: string;

/**
 * Подробное описание ошибки
 */
'error_message_description'?: string;

/**
 * Подробное описание ошибки по полям
 */
'error_fields_description'?: {
};
}>> {
    const rb = new RequestBuilder(this.rootUrl, DataService.DataInfoPath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * Код ошибки
         */
        'error_code'?: number;
        
        /**
         * Тект ошибки
         */
        'error_message'?: string;
        
        /**
         * Подробное описание ошибки
         */
        'error_message_description'?: string;
        
        /**
         * Подробное описание ошибки по полям
         */
        'error_fields_description'?: {
        };
        }>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `dataInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  dataInfo(
    params?: {
    },
    context?: HttpContext
  ): Observable<{

/**
 * Код ошибки
 */
'error_code'?: number;

/**
 * Тект ошибки
 */
'error_message'?: string;

/**
 * Подробное описание ошибки
 */
'error_message_description'?: string;

/**
 * Подробное описание ошибки по полям
 */
'error_fields_description'?: {
};
}> {
    return this.dataInfo$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Код ошибки
 */
'error_code'?: number;

/**
 * Тект ошибки
 */
'error_message'?: string;

/**
 * Подробное описание ошибки
 */
'error_message_description'?: string;

/**
 * Подробное описание ошибки по полям
 */
'error_fields_description'?: {
};
}>): {

/**
 * Код ошибки
 */
'error_code'?: number;

/**
 * Тект ошибки
 */
'error_message'?: string;

/**
 * Подробное описание ошибки
 */
'error_message_description'?: string;

/**
 * Подробное описание ошибки по полям
 */
'error_fields_description'?: {
};
} => r.body)
    );
  }

  /** Path part for operation `dataMake()` */
  static readonly DataMakePath = '/data_make';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `dataMake()` instead.
   *
   * This method doesn't expect any request body.
   */
  dataMake$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Код ошибки
 */
'error_code'?: number;

/**
 * Тект ошибки
 */
'error_message'?: string;

/**
 * Подробное описание ошибки
 */
'error_message_description'?: string;

/**
 * Подробное описание ошибки по полям
 */
'error_fields_description'?: {
};
}>> {
    const rb = new RequestBuilder(this.rootUrl, DataService.DataMakePath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * Код ошибки
         */
        'error_code'?: number;
        
        /**
         * Тект ошибки
         */
        'error_message'?: string;
        
        /**
         * Подробное описание ошибки
         */
        'error_message_description'?: string;
        
        /**
         * Подробное описание ошибки по полям
         */
        'error_fields_description'?: {
        };
        }>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `dataMake$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  dataMake(
    params?: {
    },
    context?: HttpContext
  ): Observable<{

/**
 * Код ошибки
 */
'error_code'?: number;

/**
 * Тект ошибки
 */
'error_message'?: string;

/**
 * Подробное описание ошибки
 */
'error_message_description'?: string;

/**
 * Подробное описание ошибки по полям
 */
'error_fields_description'?: {
};
}> {
    return this.dataMake$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Код ошибки
 */
'error_code'?: number;

/**
 * Тект ошибки
 */
'error_message'?: string;

/**
 * Подробное описание ошибки
 */
'error_message_description'?: string;

/**
 * Подробное описание ошибки по полям
 */
'error_fields_description'?: {
};
}>): {

/**
 * Код ошибки
 */
'error_code'?: number;

/**
 * Тект ошибки
 */
'error_message'?: string;

/**
 * Подробное описание ошибки
 */
'error_message_description'?: string;

/**
 * Подробное описание ошибки по полям
 */
'error_fields_description'?: {
};
} => r.body)
    );
  }

  /** Path part for operation `dataUpdate()` */
  static readonly DataUpdatePath = '/data_update';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `dataUpdate()` instead.
   *
   * This method doesn't expect any request body.
   */
  dataUpdate$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Код ошибки
 */
'error_code'?: number;

/**
 * Тект ошибки
 */
'error_message'?: string;

/**
 * Подробное описание ошибки
 */
'error_message_description'?: string;

/**
 * Подробное описание ошибки по полям
 */
'error_fields_description'?: {
};
}>> {
    const rb = new RequestBuilder(this.rootUrl, DataService.DataUpdatePath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * Код ошибки
         */
        'error_code'?: number;
        
        /**
         * Тект ошибки
         */
        'error_message'?: string;
        
        /**
         * Подробное описание ошибки
         */
        'error_message_description'?: string;
        
        /**
         * Подробное описание ошибки по полям
         */
        'error_fields_description'?: {
        };
        }>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `dataUpdate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  dataUpdate(
    params?: {
    },
    context?: HttpContext
  ): Observable<{

/**
 * Код ошибки
 */
'error_code'?: number;

/**
 * Тект ошибки
 */
'error_message'?: string;

/**
 * Подробное описание ошибки
 */
'error_message_description'?: string;

/**
 * Подробное описание ошибки по полям
 */
'error_fields_description'?: {
};
}> {
    return this.dataUpdate$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Код ошибки
 */
'error_code'?: number;

/**
 * Тект ошибки
 */
'error_message'?: string;

/**
 * Подробное описание ошибки
 */
'error_message_description'?: string;

/**
 * Подробное описание ошибки по полям
 */
'error_fields_description'?: {
};
}>): {

/**
 * Код ошибки
 */
'error_code'?: number;

/**
 * Тект ошибки
 */
'error_message'?: string;

/**
 * Подробное описание ошибки
 */
'error_message_description'?: string;

/**
 * Подробное описание ошибки по полям
 */
'error_fields_description'?: {
};
} => r.body)
    );
  }

  /** Path part for operation `dataDelete()` */
  static readonly DataDeletePath = '/data_delete';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `dataDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  dataDelete$Response(
    params?: {
    },
    context?: HttpContext
  ): Observable<StrictHttpResponse<{

/**
 * Код ошибки
 */
'error_code'?: number;

/**
 * Тект ошибки
 */
'error_message'?: string;

/**
 * Подробное описание ошибки
 */
'error_message_description'?: string;

/**
 * Подробное описание ошибки по полям
 */
'error_fields_description'?: {
};
}>> {
    const rb = new RequestBuilder(this.rootUrl, DataService.DataDeletePath, 'get');
    if (params) {
    }

    return this.http.request(
      rb.build({ responseType: 'json', accept: 'application/json', context })
    ).pipe(
      filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<{
        
        /**
         * Код ошибки
         */
        'error_code'?: number;
        
        /**
         * Тект ошибки
         */
        'error_message'?: string;
        
        /**
         * Подробное описание ошибки
         */
        'error_message_description'?: string;
        
        /**
         * Подробное описание ошибки по полям
         */
        'error_fields_description'?: {
        };
        }>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `dataDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  dataDelete(
    params?: {
    },
    context?: HttpContext
  ): Observable<{

/**
 * Код ошибки
 */
'error_code'?: number;

/**
 * Тект ошибки
 */
'error_message'?: string;

/**
 * Подробное описание ошибки
 */
'error_message_description'?: string;

/**
 * Подробное описание ошибки по полям
 */
'error_fields_description'?: {
};
}> {
    return this.dataDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<{

/**
 * Код ошибки
 */
'error_code'?: number;

/**
 * Тект ошибки
 */
'error_message'?: string;

/**
 * Подробное описание ошибки
 */
'error_message_description'?: string;

/**
 * Подробное описание ошибки по полям
 */
'error_fields_description'?: {
};
}>): {

/**
 * Код ошибки
 */
'error_code'?: number;

/**
 * Тект ошибки
 */
'error_message'?: string;

/**
 * Подробное описание ошибки
 */
'error_message_description'?: string;

/**
 * Подробное описание ошибки по полям
 */
'error_fields_description'?: {
};
} => r.body)
    );
  }

}
