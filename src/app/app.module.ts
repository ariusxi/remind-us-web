import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Pages
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

// Skeleton
import { NgxSkeletonLoaderModule } from '@exalif/ngx-skeleton-loader';

// Calendar
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

// Components
import { CalendarComponent } from './components/calendar/calendar.component';
import { CardComponent } from './components/card/card.component';
import { CategoriesComponent } from './pages/home/components/categories/categories.component';
import { CategoryFormComponent } from './pages/home/components/category-form/category-form.component';
import { CategoryRemoveComponent } from './pages/home/components/category-remove/category-remove.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DividerComponent } from './components/divider/divider.component';
import { DotComponent } from './components/dot/dot.component';
import { IconComponent } from './components/icon/icon.component';
import { IconResponseComponent } from './components/icon-response/icon-response.component';
import { ImageComponent } from './components/image/image.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { InputButtonComponent } from './components/input-button/input-button.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ProfileDialogComponent } from './pages/home/components/profile-dialog/profile-dialog.component';
import { RemindersComponent } from './pages/home/components/reminders/reminders.component';
import { ServiceTermsComponent } from './pages/login/components/service-terms/service-terms.component';
import { ScheduleComponent } from './pages/home/components/schedule/schedule.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabBodyComponent } from './components/tab-body/tab-body.component';
import { TextComponent } from './components/text/text.component';
import {
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    // Pages
    HomeComponent,
    LoginComponent,
    // Components
    CalendarComponent,
    CardComponent,
    CategoriesComponent,
    CategoryFormComponent,
    CategoryRemoveComponent,
    CheckboxComponent,
    DividerComponent,
    DotComponent,
    IconComponent,
    IconResponseComponent,
    ImageComponent,
    InputButtonComponent,
    InputFieldComponent,
    NavbarComponent,
    PaginatorComponent,
    ProfileDialogComponent,
    RemindersComponent,
    ServiceTermsComponent,
    ScheduleComponent,
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
    // Calendar
    CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory,
    }),
    // Skeletor
    NgxSkeletonLoaderModule,
    // Material Theme
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  providers: [
      { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
      JwtHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
