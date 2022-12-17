import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { ContactComponent } from './core/contact/contact.component';
import { AboutComponent } from './core/about/about.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    data: {
      title: 'PetFind.Me'
    }
  },
  {
    path: 'contact-us',
    component: ContactComponent,
    data: {
      title: 'Свържете се с нас'
    }
  },
  {
    path: 'about-us',
    component: AboutComponent,
    data: {
      title: 'За нас'
    }
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent,
    data: {
      title: 'Страницата не беше открита'
    }
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }