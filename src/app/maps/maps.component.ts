import { Component, OnInit } from '@angular/core';
import { Adress } from 'app/classes/adress';
import { AdressService } from 'app/services/adress.service';

declare const google: any;


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
    
  Adress : Adress= {
    id:null,
	region: '',
	ville: ''

  };
  submitted = false;
  Adresss : Adress[];
  constructor(private _adressService: AdressService) { }

  ngOnInit() {
    this.getAllAdress();
  }
  showAdress(adr : Adress){
    this.Adress = adr;
  }

  deleteAdress(id: any) {
    console.log("id");
    console.log(id);

    this._adressService.delete(id)
      .subscribe(
        response => {
          this.Adresss = [];
          this.getAllAdress();
          //this.router.navigate(['/bricoleur']);
        },
        error => {
          console.log(error);
        });
  }
  saveAdress() {
    const data = {
      region: this.Adress.region,
      ville: this.Adress.ville
    };
    console.log(data);


    this._adressService.create(data)
      .subscribe(
        response => {
          this.Adresss = [];
          this.getAllAdress();
          this.newAdress();
        },
        error => {
          console.log(error);
        });
  }

  newAdress() {
    this.submitted = false;
    this.Adress = {
        region: '',
        ville: ''
    };
  }
 

  async getAllAdress() {
    this._adressService.getAll().subscribe((ee:any[] )=> {
      
      console.log(ee);
      this.Adresss = ee;
     
    }, err => {
      console.log("erreeeeeeeeeeer");
      console.log(err);

    }
    );
  }

}
