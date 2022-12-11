import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "../core/guards/auth.guard";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { LogoutComponent } from "./logout/logout.component";
import { ProfileComponent } from "./profile/profile.component";


const routes: Routes = [
    {
        path: 'auth/login',
        component: LoginComponent,
        //canActivate: [AuthGuard],
        data: {
            title: 'Login',
            loginRequired: false
        }
    },
    {
        path: 'auth/register',
        component: RegisterComponent,
        //canActivate: [AuthGuard],
        data: {
            title: 'Register',
            loginRequired: false
        }
    },
    {
        path: 'auth/logout',
        component: LogoutComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Logout',
            loginRequired: true
        }
    },
    {
        path: 'user/profile',
        component: ProfileComponent,
        //canActivate: [AuthGuard],
        data: {
            title: 'Profile',
            loginRequired: true
        }
    }
];

export const AuthRoutingModule = RouterModule.forChild(routes);