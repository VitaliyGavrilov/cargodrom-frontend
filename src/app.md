src/
├── app/
│   ├── core/                           // Сервисы, интерсепторы, гварды (только для app)
│   │   ├── services/
│   │   ├── interceptors/
│   │   ├── guards/
│   │   └── core.module.ts              // Импортируется ТОЛЬКО в AppModule
│   │
│   ├── shared/                         // То, что используется в нескольких фичах
│   │   ├── ui/                         // Переиспользуемые "глупые" компоненты
│   │   │   ├── button/
│   │   │   ├── input/
│   │   │   └── table/
│   │   ├── pipes/                      // duration.pipe.ts, filter.pipe.ts
│   │   ├── directives/                 // tooltip.directive.ts
│   │   └── shared.module.ts            // Импортируется куда угодно 
│   │
│   ├── features/                       // Основные функциональные модули
│   │   ├── user/                       // Фича "Пользователи"
│   │   │   ├── components/             // Компоненты, используемые ТОЛЬКО внутри этой фичи
│   │   │   │   ├── user-card/
│   │   │   │   └── user-form/
│   │   │   ├── pages/                  // "Умные" компоненты-страницы, связанные с роутингом
│   │   │   │   ├── user-list-page/
│   │   │   │   └── user-detail-page/
│   │   │   ├── services/               // user.service.ts, user-api.service.ts
│   │   │   ├── models/                 // user.model.ts
│   │   │   ├── user-routing.module.ts
│   │   │   └── user.module.ts          // Может быть лениво загружен
│   │   │
│   │   └── product/                    // Фича "Продукты" (аналогичная структура)
│   │       ├── components/
│   │       ├── pages/
│   │       ├── services/
│   │       ├── product-routing.module.ts
│   │       └── product.module.ts
│   │
│   ├── app-routing.module.ts           // Корневая маршрутизация
│   ├── app.component.ts
│   └── app.module.ts                   // Корневой модуль
│
├── assets/
└── environments/

AppModule — корень.

CoreModule — для глобальных сервисов (только в корень).

SharedModule — для переиспользуемых компонентов (импортируйте где угодно).

FeatureModule — для конкретных фич (организуйте ленивую загрузку).