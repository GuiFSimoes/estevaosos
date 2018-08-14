import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AutenticacaoService, NotificacaoService, UtilService } from '../../services';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  public usuario: any = {
    email: '',
    senha: ''
  };

  constructor(
    private router: Router,
    public authService: AutenticacaoService,
    public notifService: NotificacaoService) { }

  ngOnInit(): void {

    // verifica se o usuário está logado
    if (this.authService.logado) {
      // direciona para a página inicial do sistema
      this.router.navigate(['/dashboard']);
    }
  }

  public login(usuario: any) {

    this.authService.login(usuario.email, usuario.senha)
      .then((usuarioRetorno) => {
        // login OK!

        // [routerLink]="['/dashboard']"
        this.notifService.sucesso(`Bem vindo "${usuarioRetorno.user.displayName}"!`, 'Login');
        this.router.navigate(['/dashboard']);

      }).catch((err) => {
        const saidaErro = UtilService.traduzirMensagemGoogleAuth(err);
        this.notifService.erro('Falha ao logar: ' + saidaErro.message, 'Login erro!');
      });

  }

}
