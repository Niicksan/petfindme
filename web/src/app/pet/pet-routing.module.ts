import { RouterModule, Routes } from "@angular/router";

import { DetailsComponent } from "./details/details.component";
import { FoundComponent } from "./found/found.component";
import { LostComponent } from "./lost/lost.component";
import { NewComponent } from "./new/new.component";
import { PetResolver } from "./resolvers/pet.resolver";


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
                resolve: {
                    pet: PetResolver
                },
                component: DetailsComponent,
                data: {
                    title: 'Детайли за сигнала',
                }
            }
        ]
    }
];

export const PetRoutingModule = RouterModule.forChild(routes);