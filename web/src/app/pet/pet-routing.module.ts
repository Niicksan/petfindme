import { RouterModule, Routes } from "@angular/router";

import { DetailsComponent } from "./details/details.component";
import { FoundComponent } from "./found/found.component";
import { LostComponent } from "./lost/lost.component";
import { NewComponent } from "./new/new.component";


const routes: Routes = [
    {
        path: 'pets',
        children: [
            {
                path: 'lost',
                component: LostComponent,
                data: {
                    title: 'Изгубени'
                }
            },
            {
                path: 'found',
                component: FoundComponent,
                data: {
                    title: 'Намерени'
                }
            },
            {
                path: 'new',
                component: NewComponent,
                data: {
                    title: 'Подай Сигнал',
                    //loginRequired: false
                }
            },
            {
                path: 'details/:id',
                // resolve: {
                //     pet: 
                // },
                component: DetailsComponent,
                data: {
                    title: 'Login',
                }
            }
        ]
    }
];

export const PetRoutingModule = RouterModule.forChild(routes);