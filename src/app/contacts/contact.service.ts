import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class ContactService {
  constructor(private http: HttpClient) { }
  contactsSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  editSubject: BehaviorSubject<{}> = new BehaviorSubject({
    firstName: "",
    lastName: "",
    number: null,
    group: ""
  });
  id = null;
  public async getContact(id?: number) {
    if (id) {
      let contact = {};
      this.id = id;
      this.http.get("http://localhost:3000/contacts/" + id).subscribe(res => {
        contact = res;
        this.editSetContact(contact);
      });
    } else {
      let contacts : any;
      this.http.get("http://localhost:3000/contacts").subscribe(res => {
        contacts = res;
        this.setContactList(contacts);
      });
      return;
    }
  }

  public setContactList(contacts) {
    this.contactsSubject.next(contacts);
  }
  public getContactList() {
    return this.contactsSubject.asObservable();
  }
  public editSetContact(individualContact) {
    this.editSubject.next(individualContact);
  }
  public editGetContact() {
    return this.editSubject.asObservable();
  }

  postOrPutContact(body) {
    if (this.id) {
      this.http
        .put("http://localhost:3000/contacts/" + this.id, body)
        .subscribe(res => {
          this.id = null;
          this.getContact();
        });
    } else {
      this.http.post("http://localhost:3000/contacts", body).subscribe(res => {
        this.getContact();
      });
    }
  }

  deleteContact(id) {
    this.http.delete("http://localhost:3000/contacts/" + id).subscribe(res => {
      this.getContact();
    });
  }
}
