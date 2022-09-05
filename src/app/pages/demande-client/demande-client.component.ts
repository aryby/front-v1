import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Adress } from 'app/classes/adress';
import { Bricoleur } from 'app/classes/bricoleur';
import { Client } from 'app/classes/client';
import { Mission } from 'app/classes/mission';
import { Service } from 'app/classes/service';
import { SousService } from 'app/classes/sous-service';
import { AdressService } from 'app/services/adress.service';
import { BricoleurService } from 'app/services/bricoleur.service';
import { ClientService } from 'app/services/client.service';
import { MissionService } from 'app/services/mission.service';
import { ServiceService } from 'app/services/service.service';
import { SousServiceService } from 'app/services/sous-service.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-demande-client',
  templateUrl: './demande-client.component.html',
  styleUrls: ['./demande-client.component.css']
})
export class DemandeClientComponent implements OnInit {

  Mission: Mission = {
    id: null,
    titre: '',
    dateMission: '',
    descriptions: '',
    prixMission: '',
    clientId: 0,
    serviceId: 0,
  };

  Client: Client = {
    id: null,
    nom: '',

    prenom: '',

    email: '',

    id_ville: 0

  };
  submitted = false;
  Clients: Client[];
  villes: Adress[];
  Missions: Mission[];
  category: SousService[];
  obs_client: Client;
  nrSelect = "SERVICE";

  constructor(private ClientService: ClientService, private _adressService: AdressService,
    private MissionService: MissionService,
    private _SousService: SousServiceService,
    private router:Router) { }

  ngOnInit() {

    this._adressService.getAll().subscribe((adresses: any[]) => {
      this.villes = adresses;
    }, err => {
      console.log("err");
      console.log(err);
    }
    );

    this.getAllClient();
    this.getAllMission();
    this.getSousServices();
  }

  //Mission 
  showMission(miss: Mission) {
    this.Mission = miss;
  }

  deleteMission(id: any) {
    console.log("id");
    console.log(id);

    this.MissionService.delete(id)
      .subscribe(
        response => {
          this.Missions = [];
          this.getAllMission();
          //this.router.navigate(['/bricoleur']);
        },
        error => {
          console.log(error);
        });
  }


  saveMission(idclt: number) {
    console.log(idclt);

    const data = {
      titre: this.Mission.titre,
      dateMission: this.Mission.dateMission,
      descriptions: this.Mission.descriptions,
      prixMission: this.Mission.prixMission,
      clientId: idclt,
      serviceId: this.Mission.serviceId,
    };
    console.log("save mission");

    console.log(data);

    this.MissionService.create(data)
      .subscribe(
        response => {
          console.log("response");
          this.router.navigateByUrl('/home?succes=succes')
        },
        error => {
          console.log(error);
        });
  }
  async getAllMission() {
    this.MissionService.getAll().subscribe(Missions => {
      this.Missions = Missions;
      console.log("this.Missions");
      console.log(this.Missions);
      this.Missions.forEach(element => {
        console.log(element.dateMission);

      });
    }, err => {
      console.log("err");
      console.log(err);

    }
    );
  }



  saveClient() {
    const data = {
      nom: this.Client.nom,
      prenom: this.Client.prenom,
      email: this.Client.email,
      id_ville: this.Client.id_ville,
    };
    console.log(data);


    this.ClientService.create(data)
      .subscribe(
        response => {
          console.log("response");
          console.log(response);

          this.obs_client = response;
          this.newClient();

        },
        error => {
          console.log(error);
        });
  }

  newClient() {
    this.submitted = false;
    this.Client = {
      nom: this.Client.nom,
      prenom: this.Client.prenom,
      email: this.Client.email,
      id_ville: this.Client.id_ville,
    };
  }


  async getAllClient() {
    this.ClientService.getAll().subscribe(Clients => {
      this.Clients = Clients;
      console.log("this.Clients");
      console.log(this.Clients);
      this.Clients.forEach(element => {
        console.log(element.email);

      });
      console.log(Clients);
      //reset champs
      //upload table
    }, err => {
      console.log("err");
      console.log(err);

    }
    );
  }

  //SousServices
  getSousServices() {

    this._SousService.getAll().subscribe(sousService => {
      this.category = sousService;
    }, err => {
      console.log("err");
      console.log(err);
    }
    );

  }



}
