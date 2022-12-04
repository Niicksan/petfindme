import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
    exports: [
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatPaginatorModule
    ]
})

export class MaterialExampleModule { }