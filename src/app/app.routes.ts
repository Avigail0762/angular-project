import { Routes } from '@angular/router';
import { Gifts } from './components/Gift/gifts/gifts';
import { AddGift } from './components/Gift/add-gift/add-gift';
import { Donors } from './components/Donor/donors/donors';
import { AddDonor } from './components/Donor/add-donor/add-donor';
import { UpdateGift } from './components/Gift/update-gift/update-gift';
import { Auth } from './components/auth/auth';

export const routes: Routes = [
    {
        path: 'gifts', component: Gifts, children: [
            { path: 'add', component: AddGift },
            { path: 'update', component: UpdateGift }
        ]
    },
    { path: 'donors', component: Donors, children: [
            { path: 'add', component: AddDonor }
    ] },

    {path: 'login', component: Auth },
    {path: 'register', component: Auth }
];
