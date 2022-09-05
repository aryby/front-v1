import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Adress } from 'app/classes/adress';
import { Bricoleur } from 'app/classes/bricoleur';
import { Service } from 'app/classes/service';
import { SousService } from 'app/classes/sous-service';
import { AdressService } from 'app/services/adress.service';
import { BricoleurService } from 'app/services/bricoleur.service';
import { ServiceService } from 'app/services/service.service';
import { SousServiceService } from 'app/services/sous-service.service';


@Component({
  selector: 'app-inscription-brico',
  templateUrl: './inscription-brico.component.html',
  styleUrls: ['./inscription-brico.component.css']
})
export class InscriptionBricoComponent implements OnInit {

  Bricoleur: Bricoleur = {
    id:null,
    nom: '',
    prenom: '',
    cin: '',
    adresse: '',
    tel: '',
    password: '',
    email: '',
    anneexperience: 0,
    apropos: '',
    id_ville: 0,
    id_sousServices: 0

  };
  submitted = false;
  Bricoleurs: Bricoleur[];
  villes: Adress[];
  category: SousService[];

  constructor(private bricoleurService: BricoleurService,
    private _adressService: AdressService,
    private _SousService: SousServiceService,
    private router : Router) { }

  ngOnInit() {
    this._adressService.getAll().subscribe((adresses:any[])=> {
      this.villes = adresses;
    }, err => {
      console.log("err");
      console.log(err);
    }
    );

    this.getSousServices();
    this.getAllBricoleur();

  }

  showBrico(brico : Bricoleur){
    this.Bricoleur = brico;
  }

  deleteBricoleur(id: any) {
    console.log("id");
    console.log(id);

    this.bricoleurService.delete(id)
      .subscribe(
        response => {
          this.Bricoleurs = [];
          this.getAllBricoleur();
          this.router.navigateByUrl('/home');        },
        error => {
          console.log(error);
        });
  }
  getSousServices() {

    this._SousService.getAll().subscribe(sousService => {
      this.category = sousService;
    }, err => {
      console.log("err");
      console.log(err);
    }
    );

  }
  saveBricoleur() {
    const data = {
      id: this.Bricoleur.id,
      nom: this.Bricoleur.nom,
      prenom: this.Bricoleur.prenom,
      cin: this.Bricoleur.cin,
      adresse: this.Bricoleur.adresse,
      tel: this.Bricoleur.tel,
      password: this.Bricoleur.password,
      email: this.Bricoleur.email,
      anneexperience: this.Bricoleur.anneexperience,
      apropos: this.Bricoleur.apropos,
      id_ville: this.Bricoleur.id_ville,
      id_sousServices: this.Bricoleur.id_sousServices
    };
    this.bricoleurService.create(data)
      .subscribe(
        response => {
          this.submitted = true;
          this.newBricoleur();
          this.Bricoleurs = [];
          this.getAllBricoleur();
          this.router.navigateByUrl('/dashboard-brico');
        },
        error => {
          console.log(error);
        });
  }

  newBricoleur() {
    this.submitted = false;
    this.Bricoleur = {
      nom: '',
      prenom: '',
      cin: '',
      adresse: '',
      tel: '',
      password: '',
      email: '',
      anneexperience: 0,
      apropos: '',
      id_ville: 0,
      id_sousServices: 0
    };
  }

  async getAllBricoleur() {
    this.bricoleurService.getAll().subscribe(bricoleurs => {
      this.Bricoleurs = bricoleurs;

    }, err => {
      console.log("err");
      console.log(err);

    }
    );
  }
}
