import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialExampleModule } from '../material.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PetModule } from './pet/pet.module';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AuthModule,
    BrowserModule,
    CoreModule,
    HttpClientModule,
    PetModule,
    AppRoutingModule,
    MaterialExampleModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }