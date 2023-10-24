import { NgModule } from '@angular/core';
import { RouterModule , Routes } from '@angular/router';
import { LoginPage } from './pages/user/login.page';
import { PokerPage } from './pages/game/poker.page';

const routes: Routes = [
    { path: '' , component: LoginPage } ,
    { path: 'poker' , component: PokerPage },
];

@NgModule( {
    imports: [ RouterModule.forRoot( routes ) ] ,
    exports: [ RouterModule ],
} )
export class AppRoutingModule {
}

