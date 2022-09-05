import { Component, OnInit } from '@angular/core';
import { Adress } from 'app/classes/adress';
import { Bricoleur } from 'app/classes/bricoleur';
import { Service } from 'app/classes/service';
import { SousService } from 'app/classes/sous-service';
import { AdressService } from 'app/services/adress.service';
import { BricoleurService } from 'app/services/bricoleur.service';
import { ServiceService } from 'app/services/service.service';
import { SousServiceService } from 'app/services/sous-service.service';
import { Mission } from 'app/classes/mission';
import { MissionService } from 'app/services/mission.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  IDSERVICE: number;
  IDVILLE: number;
  IDSOUSSERVICE: number;

  //list des services
  list_services: Service[];
  //all sous services
  list_sous_services: SousService[];
  // les sous services selectionnee par services
  selected_list_sous_services: SousService[] = [];
  all_missions: Mission[];
  //all adresses
  list_adresses: Adress[];
  //les adresses selectionnee par sous service 
  selected_list_adresses: Adress[] = [];

  bricos: Bricoleur[];
  succes_message;
  constructor(private _serviceService: ServiceService,
    private _adressService: AdressService,
    private _sousService: SousServiceService,
    private _bricoservice: BricoleurService,
    private _missionService: MissionService,
    private activatedRoute: ActivatedRoute) {
    //notification lorsque l'ajout d'un mission
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      console.log(params['succes']);
      if (params['succes'] == "succes") {
        this.succes_message = "votre demande a été enregistre avec success...";
      }

    });
  }


  ngOnInit(): void {
    this.getAllServices();
    this.getAllBricoleurs();
    this.getAllMission();
    this.getAllSousServices();
    this.getAllAdress();
    console.log(this.adresID);

  }
  //get service
  // get id service
  onEmentId(id_ser) {
    this.IDSERVICE = id_ser;
    this.selected_list_sous_services = [];
    for (let sous_s of this.list_sous_services) {
      if (sous_s.serviceId == id_ser) {
        this.selected_list_sous_services.push(sous_s);
      }
    }


  }

  adresID: any;

  BRICOLEURS: Bricoleur[];

  recherche(id_v) {
    this.IDVILLE = id_v;
    this.BRICOLEURS = [];

    console.log(this.IDSERVICE);
    console.log(this.IDVILLE);
    console.log(this.IDSOUSSERVICE);
    this.bricos.forEach(element => {
      if (element.id_ville != this.IDVILLE) {
      } else {
        this.BRICOLEURS.push(element);
      }
    });

    console.log(this.BRICOLEURS);

  }


  //selectioner adress

  onEmitAdresId(sous_and_ville) {
    var newarr = sous_and_ville.split("x");
    this.IDSOUSSERVICE = Number(newarr[0]);
    this.list_adresses.forEach(adr => {
      if (adr.id == Number(newarr[1])) {
        this.selected_list_adresses.push(adr);
      }
    });
    console.log("this.selected_list_adresses");
    console.log(this.selected_list_adresses);
    ;

  }

  // all mission bricoleur services
  getAllMission() {
    this._missionService.getAll().subscribe((result: Mission[]) => {
      this.all_missions = result;
    }, err => {
      console.log("erreuur");
      console.log(err);
    });
  }

  getAllSousServices() {
    this._sousService.getAll().subscribe((result: SousService[]) => {
      this.list_sous_services = result;
    });
  }

  getAllBricoleurs() {
    this._bricoservice.getAll().subscribe((result: Bricoleur[]) => {
      this.bricos = result;
    }, err => {
      console.log(err);

    }
    );
  }


  getAllServices() {
    this._serviceService.getAll().subscribe((res) => {
      this.list_services = res;
      console.log(this.list_services);

    }, err => {
      console.log(err);
    });
  }


  getAllAdress() {
    this._adressService.getAll().subscribe((res: Adress[]) => {
      this.list_adresses = res;
    });
  }

}
