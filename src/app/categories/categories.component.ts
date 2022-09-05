import { Component, OnInit } from '@angular/core';
import { Adress } from 'app/classes/adress';
import { Service } from 'app/classes/service';
import { SousService } from 'app/classes/sous-service';
import { AdressService } from 'app/services/adress.service';
import { ServiceService } from 'app/services/service.service';
import { SousServiceService } from 'app/services/sous-service.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {


  Service: Service = {
    id: null,
    nom: ''
  };
  submitted = false;
  Services: Service[];
  villes: Adress[];
  //sous -service
  SousService: SousService = {
    id: null,
    nom: '',
    adressId: 0,
    serviceId: 0
  };
  SousServices: SousService[];

  constructor(private ServiceService: ServiceService,
    private SousServiceService: SousServiceService,
    private _adressService: AdressService) { }

  ngOnInit() {

    this.getAllService();
    this.getAllSousService();
    this.getAllAdress();
  }


  getAllAdress() {
    this._adressService.getAll().subscribe((adresses: any[]) => {
      this.villes = adresses;
    }, err => {
      console.log(err);
    }
    );
  }

  showService(serv: Service) {
    this.Service = serv;
  }

  deleteService(id: any) {
    this.ServiceService.delete(id)
      .subscribe(
        response => {
          this.Services = [];
          this.getAllService();
          //this.router.navigate(['/bricoleur']);
        },
        error => {
          console.log(error);
        });
  }
  // save SERVICE entity
  saveService() {
    const data = {
      nom: this.Service.nom
    };
    console.log(data);


    this.ServiceService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.newService();
        },
        error => {
          console.log(error);
        });
  }

  newService() {
    this.submitted = false;
    this.Service = {
      nom: ''
    };
  }


  async getAllService() {
    this.ServiceService.getAll().subscribe(Services => {
      this.Services = Services;
      console.log("this.Services");
      console.log(this.Services);
      this.Services.forEach(element => {
        console.log(element.nom);

      });
    }, err => {
      console.log("err");
      console.log(err);

    }
    );
  }

  //sous-service

  showSousServices(ssvc: SousService) {
    this.SousService = ssvc;
  }

  deleteSousServices(id: any) {
    console.log("id");
    console.log(id);

    this.SousServiceService.delete(id)
      .subscribe(
        response => {
          this.SousServices = [];
          this.getAllSousService();
          //this.router.navigate(['/bricoleur']);
        },
        error => {
          console.log(error);
        });
  }

  //SAVE SOUS SERVICE
  saveSousService() {
    const data = {
      nom: this.SousService.nom,
      adressId: this.SousService.adressId,
      serviceId: this.SousService.serviceId
    };
    console.log(data);


    this.SousServiceService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.newSousService();
        },
        error => {
          console.log(error);
        });
  }

  newSousService() {
    this.submitted = false;
    this.SousService = {
      nom: '',
      adressId: 0,

      serviceId: 0
    };
  }


  async getAllSousService() {
    this.SousServiceService.getAll().subscribe(SousService => {
      this.SousServices = SousService;

    }, err => {
      console.log("err");
      console.log(err);

    }
    );
  }

}
