import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ContactService } from "../../contact.service";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit {
  contact = {
    firstName: "",
    lastName: "",
    number: null,
    group: ""
  };
  constructor(private service: ContactService) { }

  isValidFormSubmitted = false;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  error = false;

  ngOnInit() {
    this.service.editGetContact().subscribe((res: any) => {
      console.log(res);
      this.error = false;
      this.contact = {
        firstName: res.firstName,
        lastName: res.lastName,
        number: res.number,
        group: res.group
      };
    });
  }
  onBlur(event: any) {
    const pattern = /(7|8|9)\d{9}/;
    console.log(event.target.value);
    let inputChar = String.fromCharCode(event.charCode);
    console.log(pattern.test(event.target.value));
    if (event.keyCode != 8 && !pattern.test(event.target.value)) {
      this.error = true;
    }
  }
  onSubmit(form: NgForm) {
    this.isValidFormSubmitted = false;
    if (form.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.service.postOrPutContact(form.value);
    this.contact = {
      firstName: "",
      lastName: "",
      number: null,
      group: ""
    };
  }
}
