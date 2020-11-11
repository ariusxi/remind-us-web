import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Pages
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

// Components
import { CardComponent } from './components/card/card.component';
import { IconComponent } from './components/icon/icon.component';
import { ImageComponent } from './components/image/image.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { InputButtonComponent } from './components/input-button/input-button.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabBodyComponent } from './components/tab-body/tab-body.component';
import { TextComponent } from './components/text/text.component';

@NgModule({
  declarations: [
    AppComponent,
    // Pages
    HomeComponent,
    LoginComponent,
    // Components
    CardComponent,
    IconComponent,
    ImageComponent,
    InputButtonComponent,
    InputFieldComponent,
    PaginatorComponent,
    TabsComponent,
    TabBodyComponent,
    TextComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // Material Theme
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTabsModule,
  ],
  providers: [
      { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
      JwtHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
