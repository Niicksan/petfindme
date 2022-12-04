import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { PetsNotFoundComponent } from './pets-not-found/pets-not-found.component';



@NgModule({
  declarations: [
    LoaderComponent,
    PetsNotFoundComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
