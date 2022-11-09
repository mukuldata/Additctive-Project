import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { countryList } from '../services/country-list.service'
import { UserModel } from './user.model';
import { ApiService } from '../services/api.service'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],

})
export class ProfileComponent implements OnInit {
  formValue!: FormGroup;
  countrylist!: any[];
  searchTerm: String = '';
  filteredResult: any[] = [];
  userModelObj: UserModel = new UserModel();
  userData: any = [];
  


  constructor(
    private _countryService: countryList,
    private api: ApiService,
  ) {

  }

  ngOnInit() {
    this.formValue = new FormGroup({
      'name': new FormControl(null),
      'dob': new FormControl(null),
      'country': new FormControl(null),
      'resume':new FormControl(null)
    })
    this.countrylist = this._countryService.getCountrylist();
    // this.fileInfos = this.api.getFiles();
    this.getUserDetails();
  }


  



  get name() {
    return this.formValue.get('name');
  }

  get dob() {
    return this.formValue.get('dob');
  }
  get country() {
    return this.formValue.get('country');
  }

  // DOB format :
  dateFormatChange(dob: any) {
    // console.log(dob);
    const db = new Date(dob);
    return db.toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" });
  }

  // Get user details:
  getUserDetails() {
    this.api.getUser()
      .subscribe((res: any) => {
        this.userData = res;
      })
  }

  addUsers() {
    this.formValue.reset();
  }

  // Post user details on form submit
  postUserDetails() {
    this.userModelObj.name = this.formValue.value.name;
    this.userModelObj.dob = this.dateFormatChange(this.formValue.value.dob)
    this.userModelObj.country = this.formValue.value.country;
    this.api.postUser(this.userModelObj)
      .subscribe((res: any) => {
        // console.log(res);
        alert("User added successfully");
        this.formValue.reset();
        let ref = document.getElementById('cancel');
        ref?.click();
        this.getUserDetails()
      })
  }

  // Delete user:
  deleteUserDetails(value: any) {
    this.api.deleteUser(value._id).
      subscribe((res: any) => {
        alert("User Deleted");
        this.getUserDetails();
      })
   
  }

  //filter country list based on user input
  filterCountryList() {
    if (this.searchTerm && this.searchTerm !== '') {
      let _term = this.searchTerm.toLowerCase();
      this.filteredResult = this.countrylist.filter(function (el: any) {
        return el.name.toLowerCase().indexOf(_term.toLowerCase()) > -1;
      });
    } else {
      this.filteredResult = [];
    }
  }

  //set selected country
  selectCountry(name: String) {
    this.searchTerm = name;
    this.formValue.value.country = name;
    this.filteredResult = [];
  }

  // Searching:
  search() {
    if (this.userData.name == '') {
      this.getUserDetails();
    }
    else {
      this.userData = this.userData.filter((res: any) => {
        return res.name.toLocaleLowerCase().match(this.userData.name.toLocaleLowerCase());
      })
    }
  }

  // Sorting :
  key = 'id';
  reverse: boolean = false
  sort(key: any) {
    this.key = key;
    this.reverse = !this.reverse;

  }

  // Pagination:
  p: number = 1;
  

  

}
