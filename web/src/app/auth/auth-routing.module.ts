import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../core/guards/auth.guard";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { LogoutComponent } from "./logout/logout.component";
import { ProfileComponent } from "./profile/profile.component";
import { HasUserGuard } from "../core/guards/has-user.guard";


const routes: Routes = [
    {
        path: 'auth/login',
        component: LoginComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Вход'
        }
    },
    {
        path: 'auth/register',
        component: RegisterComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Регистрация'
        }
    },
    {
        path: 'auth/logout',
        component: LogoutComponent,
        canActivate: [HasUserGuard],
        data: {
            title: 'Изход'
        }
    },
    {
        path: 'user/profile',
        component: ProfileComponent,
        canActivate: [HasUserGuard],
        data: {
            title: 'Моят профил'
        }
    }
];

export const AuthRoutingModule = RouterModule.forChild(routes);