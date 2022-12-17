import { RouterModule, Routes } from "@angular/router";
import { HasUserGuard } from "../core/guards/has-user.guard";
import { IsOwnerGuard } from "../core/guards/is-owner.guard";
import { DeleteComponent } from "./delete/delete.component";

import { DetailsComponent } from "./details/details.component";
import { EditComponent } from "./edit/edit.component";
import { FoundComponent } from "./found/found.component";
import { LostComponent } from "./lost/lost.component";
import { NewComponent } from "./new/new.component";
import { PetResolver } from "./resolvers/pet.resolver";


const routes: Routes = [
    {
        path: 'catalog',
        children: [
            {
                path: 'lost',
                component: LostComponent,
                data: {
                    title: 'Сигнали за изгубени любимци'
                }
            },
            {
                path: 'found',
                component: FoundComponent,
                data: {
                    title: 'Сигнали за намерени любимци'
                }
            }
        ]
    },
    {
        path: 'pet/add',
        component: NewComponent,
        canActivate: [HasUserGuard],
        data: {
            title: 'Подай Сигнал',
        }
    },
    {
        path: 'pet/details/:id',
        resolve: {
            pet: PetResolver
        },
        component: DetailsComponent,
        data: {
            title: 'Детайли за сигнала',
        }
    },
    {
        path: 'pet/edit/:id',
        resolve: {
            pet: PetResolver
        },
        component: EditComponent,
        canActivate: [IsOwnerGuard],

        data: {
            title: 'Редактиране на сигнала',
        }
    },
    {
        path: 'pet/delete/:id',
        resolve: {
            pet: PetResolver
        },
        component: DeleteComponent,
        canActivate: [IsOwnerGuard],

        data: {
            title: 'Изтриване на сигнала',
        }
    }
];

export const PetRoutingModule = RouterModule.forChild(routes);