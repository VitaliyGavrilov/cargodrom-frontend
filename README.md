src/
├── app/
│   ├── core/                           # Singleton services, guards, interceptors
│   │   ├── guards/
│   │   │   ├── auth.guard.ts
│   │   │   └── role.guard.ts
│   │   ├── interceptors/
│   │   │   ├── auth.interceptor.ts
│   │   │   ├── loading.interceptor.ts
│   │   │   └── error.interceptor.ts
│   │   ├── services/
│   │   │   ├── api/
│   │   │   │   ├── api.service.ts
│   │   │   │   ├── api.config.ts
│   │   │   │   └── api.endpoints.ts
│   │   │   ├── storage/
│   │   │   │   ├── storage.service.ts
│   │   │   │   └── storage.types.ts
│   │   │   ├── notification/
│   │   │   │   ├── notification.service.ts
│   │   │   │   └── notification.types.ts
│   │   │   ├── loader.service.ts
│   │   │   └── config.service.ts
│   │   ├── layout/                     # Глобальные компоненты layout
│   │   │   ├── header/
│   │   │   ├── footer/
│   │   │   ├── sidebar/
│   │   │   └── layout.module.ts
│   │   └── core.module.ts
│   │
│   ├── shared/                         # Переиспользуемые модули
│   │   ├── ui/                         # UI компоненты (dumb components)
│   │   │   ├── button/
│   │   │   │   ├── button.component.ts
│   │   │   │   ├── button.component.html
│   │   │   │   ├── button.component.scss
│   │   │   │   └── button.module.ts
│   │   │   ├── input/
│   │   │   ├── table/
│   │   │   ├── modal/
│   │   │   ├── pagination/
│   │   │   └── ui.module.ts
│   │   ├── forms/                      # Формы и валидация
│   │   │   ├── validators/
│   │   │   └── form-components/
│   │   ├── pipes/                      # duration.pipe.ts, filter.pipe.ts
│   │   ├── directives/                 # tooltip.directive.ts, click-outside.directive.ts
│   │   ├── utils/                      # Вспомогательные функции
│   │   │   ├── helpers.ts
│   │   │   ├── constants.ts
│   │   │   └── formatters.ts
│   │   └── shared.module.ts
│   │
│   ├── features/                       # Все функциональные модули
│   │   ├── auth/                       # Модуль аутентификации
│   │   │   ├── pages/
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   ├── confirm/
│   │   │   │   ├── password-recovery/
│   │   │   │   └── logout/
│   │   │   ├── components/             # Внутренние компоненты фичи
│   │   │   │   ├── auth-form/
│   │   │   │   └── social-buttons/
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth-storage.service.ts
│   │   │   │   └── auth-api.service.ts
│   │   │   ├── models/
│   │   │   │   ├── user.model.ts
│   │   │   │   └── auth-request.model.ts
│   │   │   ├── guards/                 # Специфичные для auth guards
│   │   │   │   └── guest.guard.ts      # Для незалогиненных пользователей
│   │   │   ├── auth-routing.module.ts
│   │   │   └── auth.module.ts
│   │   │
│   │   ├── public/                     # Публичные страницы
│   │   │   ├── pages/
│   │   │   │   ├── home/
│   │   │   │   ├── about/
│   │   │   │   ├── contacts/
│   │   │   │   └── pricing/
│   │   │   ├── components/
│   │   │   │   ├── hero-section/
│   │   │   │   └── features-list/
│   │   │   ├── public-routing.module.ts
│   │   │   └── public.module.ts
│   │   │
│   │   ├── dashboard/                  # Личный кабинет
│   │   │   ├── pages/
│   │   │   │   ├── dashboard-home/
│   │   │   │   ├── analytics/
│   │   │   │   └── reports/
│   │   │   ├── components/
│   │   │   │   ├── stats-cards/
│   │   │   │   ├── charts/
│   │   │   │   └── recent-activity/
│   │   │   ├── services/
│   │   │   │   └── dashboard.service.ts
│   │   │   ├── models/
│   │   │   │   └── dashboard-stats.model.ts
│   │   │   ├── dashboard-routing.module.ts
│   │   │   └── dashboard.module.ts
│   │   │
│   │   ├── profile/                    # Профиль пользователя
│   │   │   ├── pages/
│   │   │   │   ├── profile-view/
│   │   │   │   ├── profile-edit/
│   │   │   │   └── settings/
│   │   │   ├── components/
│   │   │   │   ├── avatar-upload/
│   │   │   │   └── security-settings/
│   │   │   ├── services/
│   │   │   │   └── profile.service.ts
│   │   │   ├── profile-routing.module.ts
│   │   │   └── profile.module.ts
│   │   │
│   │   └── [other-features]/           # Другие функциональные модули
│   │
│   ├── models/                         # Глобальные модели и интерфейсы
│   │   ├── api/
│   │   │   ├── api-response.model.ts
│   │   │   └── pagination.model.ts
│   │   ├── user/
│   │   │   ├── user.model.ts
│   │   │   └── role.model.ts
│   │   └── shared/
│   │       ├── base.model.ts
│   │       └── form.models.ts
│   │
│   ├── app-routing.module.ts
│   ├── app.component.ts
│   └── app.module.ts
│
├── assets/
│   ├── images/
│   ├── icons/
│   ├── styles/                        # Глобальные стили
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   ├── _global.scss
│   │   └── _theme.scss
│   └── i18n/                         # Локализация
│       ├── en.json
│       └── ru.json
│
└── environments/
    ├── environment.ts
    ├── environment.prod.ts
    ├── environment.staging.ts
    └── environment.dev.ts