import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './home/form/form.component';
import { ContactListComponent } from './home/contact-list/contact-list.component';
import { ContactRoutingModule } from './contact-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ContactService } from './contact.service';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [HomeComponent, FormComponent, ContactListComponent],
  providers:[
    ContactService
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    HttpClientModule,
    MatTableModule,
    FormsModule
  ]
})
export class ContactsModule { }
