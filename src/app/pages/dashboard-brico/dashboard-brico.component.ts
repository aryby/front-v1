import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Adress } from 'app/classes/adress';
import { Bricoleur } from 'app/classes/bricoleur';
import { Client } from 'app/classes/client';
import { Mission } from 'app/classes/mission';
import { SousService } from 'app/classes/sous-service';
import { BricoleurService } from 'app/services/bricoleur.service';
import { ClientService } from 'app/services/client.service';
import { MissionService } from 'app/services/mission.service';


@Component({
  selector: 'app-dashboard-brico',
  templateUrl: './dashboard-brico.component.html',
  styleUrls: ['./dashboard-brico.component.css']
})
export class DashboardBricoComponent implements OnInit {
  bricoleur: Bricoleur = {
    nom: "",
    prenom: "",
    cin: "",
    adresse: "",
    tel: "",
    password: "",
    email: "",
    anneexperience: 0,
    apropos: "",
    id_ville: 0,
    id_sousServices: 0,
  };
  villes: Adress[];
  category: SousService[];
  missions:Mission[];
  CLIENTS : Client[];

  constructor(private _bricoservice: BricoleurService,
    private router: Router,
    private _missionService: MissionService,
    private clientService: ClientService) { }

  ngOnInit(): void {

    this.bricoleur = JSON.parse(localStorage.getItem('bricoleur'));
    if (this.bricoleur ==null) { this.logout(); }
    this.getAllMissions();
  }

  
  editBricoleur() {
    this._bricoservice.update(this.bricoleur.id, this.bricoleur)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }
  
  getAllClients(){
    this.clientService.getAll().subscribe(res=>{
      this.CLIENTS = res;
    })
  }

  getAllMissions(){
    this._missionService.getAll().subscribe(mess =>{
      this.missions = mess;
    })
  }
  logout(){
    localStorage.removeItem('bricoleur');
    this.router.navigateByUrl('/home')
  }

}
