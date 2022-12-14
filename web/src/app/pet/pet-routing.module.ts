import { RouterModule, Routes } from "@angular/router";
import { HasUserGuard } from "../core/guards/has-user.guard";

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
    },
    {
        path: 'pets/new',
        component: NewComponent,
        canActivate: [HasUserGuard],
        data: {
            title: 'Подай Сигнал',
        }
    },
];

export const PetRoutingModule = RouterModule.forChild(routes);