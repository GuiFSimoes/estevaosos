import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild,
    Route
} from '@angular/router';
import { AutenticacaoService } from './autenticacao.service';
// import { Mensagem } from '../../environments/resource';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private authService: AutenticacaoService,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        const url = state.url;
        return this.checkLogin(url);
    }

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        return this.canActivate(route, state);
    }

    checkLogin(url: string): boolean {
        if (this.authService.logado) {
            // console.log('Logado!');
            return true;
        }

        // console.log('Redirecionado para login!');
        // retorna a página de login... sessão terminada ou logoff!
        this.router.navigate(['/login'], { queryParams: { mensagem: 'Sessão encerrada, favor logar-se novamente!' } } );
        return false;
    }
}
