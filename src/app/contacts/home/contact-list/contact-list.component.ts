import { Component, OnInit } from "@angular/core";
import { ContactService } from "../../contact.service";

@Component({
  selector: "app-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.css"]
})
export class ContactListComponent implements OnInit {
  contactList: any;
  displayedColumns: string[] = ["id", "firstName", "lastName", "number", "edit", "delete"];
  dataSource = [{ id: 1, name: "animesh", number: 484848484 }];

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.getContact();
    this.contactService.getContactList().subscribe(async res => {
      const data = await this.transform(res, 'group');
      this.contactList = data;
    });
  }
  async transform(collection: any, property: string) {
    // prevents the application from breaking if the array of objects doesn't exist yet
    if (!collection) {
      return null;
    }

    const groupedCollection = collection.reduce((previous, current) => {
      if (!previous[current[property]]) {
        previous[current[property]] = [current];
      } else {
        previous[current[property]].push(current);
      }

      return previous;
    }, {});

    // this will return an array of objects, each object containing a group of objects
    return Object.keys(groupedCollection).map(key => ({ key, value: groupedCollection[key] }));
  }
  delete(id: number) {
    if (window.confirm("Do you want to delete the contact")) {
      this.contactService.deleteContact(id);
    }
  }
  edit(id: number) {
    this.contactService.getContact(id);
  }
}
