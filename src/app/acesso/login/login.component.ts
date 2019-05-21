import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public mensagemErro: string;

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required]),
    'senha': new FormControl(null, [Validators.minLength(6)])
  });

  @Output() public estadoPainelErro: EventEmitter<string> = new EventEmitter<string>();

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro');
  }

  public autenticar(): void {
    this.authService.autenticar(this.formulario.value.email, this.formulario.value.senha)
      .then((resposta: any) => {
        console.log(resposta);
        this.mensagemErro = resposta.message;
        this.estadoPainelErro.emit('erro');
      })
      .catch((erro: Error) => {
        //this.mensagemErro = erro.message;
        console.log(erro);
      })

  }

}
