import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bricoleur } from 'app/classes/bricoleur';
import { BricoleurService } from 'app/services/bricoleur.service';


@Component({
  selector: 'app-login-brico',
  templateUrl: './login-brico.component.html',
  styleUrls: ['./login-brico.component.css']
})
export class LoginBricoComponent implements OnInit {

  loginBrico: Bricoleur = {

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

  messageEreurr;
  messageSucces;

  constructor(private _bricoservice: BricoleurService,
    private router:Router) { }

  ngOnInit(): void {
    
  }

  login() {
    console.log(this.loginBrico);
    this._bricoservice.getBricoleurByLogin(this.loginBrico).subscribe((resut:Bricoleur) => {
      console.log(resut);
      if (!resut) {
        this.messageEreurr = "Mot de Pass ou Email incorrect";
      } else {
        // avec notification d'erreur
        localStorage.setItem('bricoleur', JSON.stringify(resut));
        //save to localstorage this.loginBrico
        this.messageSucces = "Bienvenue ! Dashboard ";
        this.router.navigateByUrl( `/dashboard-brico/${resut.id}`);
      }
    }, err => {
      console.log(err);
    });


  }


}
