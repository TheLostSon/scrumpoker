import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPage } from './pages/user/login.page';
import { PokerPage } from './pages/game/poker.page';
import { GroupsComponent } from './components/user/groups/groups.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './components/game/users/user/user.component';
import { CardsComponent } from './components/game/cards/cards.component';
import { CardComponent } from './components/game/card/card.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { GroupLegendComponent } from './components/game/group-legend/group-legend.component';

const config: SocketIoConfig = {
  url: 'http://localhost:3001/',
  options: {
    withCredentials: false,
    extraHeaders: {},
  },
};

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    PokerPage,
    GroupsComponent,
    UserComponent,
    CardsComponent,
    CardComponent,
    GroupLegendComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
    NoopAnimationsModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
