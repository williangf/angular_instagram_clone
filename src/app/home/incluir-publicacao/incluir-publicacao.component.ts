import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BdService } from '../../bd.service';

import * as firebase from 'firebase';
import { ProgressoService } from '../../progresso.service';
import { Observable, interval, observable, Subject, pipe } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  @Output() public atualizarTimeLine: EventEmitter<any> = new EventEmitter<any>();

  public email: string;
  public imagem: any;

  public progressoPublicacao: string = 'pendente';
  public porcentagemUpload: number;

  public formulario: FormGroup = new FormGroup({
    'titulo_publicacao': new FormControl(null)
  });

  constructor(private bdService: BdService, private progressoService: ProgressoService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
    });
  }

  public publicar(): void {
    this.bdService.publicar({
      email: this.email,
      titulo_publicacao: this.formulario.value.titulo_publicacao,
      imagem: this.imagem[0]
    });

    let continua = new Subject();

    continua.next(true);

    let acompanhamentoUpload = interval(1500).pipe(takeUntil(continua));

    acompanhamentoUpload.subscribe(() => {
      //console.log(this.progressoService.status);
      //console.log(this.progressoService.estado);
      this.progressoPublicacao = 'andamento';

      this.porcentagemUpload = Math.round((this.progressoService.estado.bytesTransferred / this.progressoService.estado.totalBytes) * 100);

      if (this.progressoService.status === 'finalizado') {
        this.progressoPublicacao = 'finalizado';
        //emitir um evento do componente pai (parent home)
        this.atualizarTimeLine.emit();
        continua.next(false);
      }

    })
  }

  public preparaImagemUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files;
  }

}
