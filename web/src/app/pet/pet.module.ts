import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetRoutingModule } from './pet-routing.module';
import { LatestComponent } from './latest/latest.component';
import { LostComponent } from './lost/lost.component';
import { FoundComponent } from './found/found.component';
import { NewComponent } from './new/new.component';
import { DetailsComponent } from './details/details.component';
import { PetItemComponent } from './shared/pet-item/pet-item.component';
import { PetsListComponent } from './shared/pets-list/pets-list.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { PetsNotFoundComponent } from './shared/pets-not-found/pets-not-found.component';


@NgModule({
  declarations: [
    LatestComponent,
    LostComponent,
    FoundComponent,
    NewComponent,
    DetailsComponent,
    PetItemComponent,
    PetsListComponent,
    LoaderComponent,
    PetsNotFoundComponent
  ],
  imports: [
    CommonModule,
    PetRoutingModule
  ],
  exports: [
    LatestComponent
  ]
})
export class PetModule { }