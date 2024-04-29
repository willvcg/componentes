import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tables',
    pathMatch: 'full',
  },
  {
    path: 'tables',
    loadComponent: () =>
      import('./pages/tables-page/tables-page.component').then(
        (c) => c.TablesPageComponent
      ),
  },
  {
    path: 'buttons',
    loadComponent: () =>
      import('./pages/buttons-page/buttons-page.component').then(
        (c) => c.ButtonsPageComponent
      ),
  },
  {
    path: 'modals',
    loadComponent: () =>
      import('./pages/modals-page/modals-page.component').then(
        (c) => c.ModalsPageComponent
      ),
  },
  {
    path: 'directives',
    loadComponent: () =>
      import('./pages/directives-pages/directives-pages.component').then(
        (c) => c.DirectivesPagesComponent
      ),
  },
  {
    path: 'inputs',
    loadComponent: () =>
      import('./pages/inputs-pages/inputs-pages.component').then(
        (c) => c.InputsPagesComponent
      ),
  },
  {
    path: 'spinners',
    loadComponent: () =>
      import('./pages/spinner-pages/spinner-pages.component').then(
        (c) => c.SpinnerPagesComponent
      ),
  },
  {
    path: 'accordion',
    loadComponent: () =>
      import('./pages/accordion-page/accordion-page.component').then(
        (c) => c.AccordionPageComponent
      ),
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
