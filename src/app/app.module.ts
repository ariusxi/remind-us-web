import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Pages
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

// Fullcalendar
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interationPlugin from '@fullcalendar/interaction';
import googleCalendarPlugin from '@fullcalendar/google-calendar';

// Skeleton
import { NgxSkeletonLoaderModule } from '@exalif/ngx-skeleton-loader';

// Components
import { CalendarComponent } from './components/calendar/calendar.component';
import { CardComponent } from './components/card/card.component';
import { CategoriesComponent } from './pages/home/components/categories/categories.component';
import { CategoryFormComponent } from './pages/home/components/category-form/category-form.component';
import { CategoryRemoveComponent } from './pages/home/components/category-remove/category-remove.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DividerComponent } from './components/divider/divider.component';
import { IconComponent } from './components/icon/icon.component';
import { IconResponseComponent } from './components/icon-response/icon-response.component';
import { ImageComponent } from './components/image/image.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { InputButtonComponent } from './components/input-button/input-button.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ProfileDialogComponent } from './pages/home/components/profile-dialog/profile-dialog.component';
import { RemindersComponent } from './pages/home/components/reminders/reminders.component';
import { ScheduleComponent } from './pages/home/components/schedule/schedule.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabBodyComponent } from './components/tab-body/tab-body.component';
import { TextComponent } from './components/text/text.component';

FullCalendarModule.registerPlugins([
    dayGridPlugin,
    timeGridPlugin,
    interationPlugin,
    googleCalendarPlugin,
]);

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
    IconComponent,
    IconResponseComponent,
    ImageComponent,
    InputButtonComponent,
    InputFieldComponent,
    NavbarComponent,
    PaginatorComponent,
    ProfileDialogComponent,
    RemindersComponent,
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
    // Fullcalendar
    FullCalendarModule,
    // Skeletor
    NgxSkeletonLoaderModule,
    // Material Theme
    MatButtonModule,
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
  ],
  providers: [
      { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
      JwtHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
