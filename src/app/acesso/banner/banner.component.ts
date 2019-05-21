import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Imagem } from './imagem.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner', [
      state('escondido', style({
        opacity: 0
      })),
      state('visivel', style({
        opacity: 1
      })),
      transition('escondido <=> visivel', animate('1s ease-in'))
    ])
  ]
})
export class BannerComponent implements OnInit {

  public estado: string = 'escondido';
  public i: number = 0;

  public imagens: Imagem[] = [];

  constructor() {

    for (let i: number = 0; i <= 4; i++) {
      i === 4 ?
        this.imagens.push({ estado: 'visivel', url: '/assets/banner-acesso/img_' + (i + 1) + '.png' })
        :
        this.imagens.push({ estado: 'escondido', url: '/assets/banner-acesso/img_' + (i + 1) + '.png' });
    }
  }

  ngOnInit() {
    setTimeout(() => this.logicaRotacao(), 4500);
  }

  public logicaRotacao(): void {

    for (let i: number = 0; i <= 4; i++) {
      if (this.imagens[i].estado === 'visivel') {
        this.imagens[i].estado = 'escondido';
        i === 4 ? this.imagens[0].estado = 'visivel' : this.imagens[i + 1].estado = 'visivel';
        break;
      }
    }

    setTimeout(() => this.logicaRotacao(), 4500);
  }

}
