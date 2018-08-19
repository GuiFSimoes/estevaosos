import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// import { Usuario } from '../models/usuario';
import { environment } from '../../environments/environment';

import * as firebase from 'firebase/app';
import 'firebase/auth';

// import * as firebaseui from 'firebaseui';

@Injectable()
export class AutenticacaoService {
  // private apiUrlAuth = `${environment.urlAPI}/auth`;

  constructor(/* private http: HttpClient */) { }

  /**
   * logado: return boolean;
   *    > get: Verifica se o usuário corrente está logado
   *    > set: Define o estado do usuário
   */
  public get logado(): boolean {
    const logado = localStorage.getItem('logado') || sessionStorage.getItem('logado');
    if (logado !== undefined) {
      return JSON.parse(logado);
    }
    return false;
  }
  public set logado(value: boolean) {
    if (this.manterLogado) {
      localStorage.setItem('logado', value.toString());
      sessionStorage.removeItem('logado');
    } else {
      sessionStorage.setItem('logado', value.toString());
      localStorage.removeItem('logado');
    }
  }

  /**
   * userToken: retorna o token do usuário logado
   *   > get: retorna a string de token
   *   > set: grava a string de token
   */
  public get userToken(): string {
    const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
    if (token !== undefined) {
      return token;
    }
    return '';
  }
  public set userToken(value: string) {
    if (this.manterLogado) {
      localStorage.setItem('userToken', value);
      sessionStorage.removeItem('userToken');
    } else {
      sessionStorage.setItem('userToken', value);
      localStorage.removeItem('userToken');
    }
  }

  /**
   * user: retorna os dados do usuário logado
   */
  public get user(): firebase.auth.UserCredential {
    const userInfo = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo');
    return userInfo !== undefined ? JSON.parse(userInfo) : null;
  }
  public set user(value: firebase.auth.UserCredential) {
    // console.log('salvar usuario: ' + JSON.stringify(value));
    if (this.manterLogado) {
      localStorage.setItem('userInfo', JSON.stringify(value));
      sessionStorage.removeItem('userInfo');
    } else {
      sessionStorage.setItem('userInfo', JSON.stringify(value));
      localStorage.removeItem('userInfo');
    }
  }
  /* public get user(): Usuario {
    const userInfo = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo');
    return userInfo !== undefined ? JSON.parse(userInfo) : new Usuario();
  }
  public set user(value: Usuario) {
    // console.log('salvar usuario: ' + JSON.stringify(value));
    if (this.manterLogado) {
      localStorage.setItem('userInfo', JSON.stringify(value));
      sessionStorage.removeItem('userInfo');
    } else {
      sessionStorage.setItem('userInfo', JSON.stringify(value));
      localStorage.removeItem('userInfo');
    }
  } */

  /**
   * metodo Get e Set manterLogado
   */
  public set manterLogado(value: boolean) {
    localStorage.setItem('manterLogado', value.toString());
  }
  public get manterLogado(): boolean {
    const mL = localStorage.getItem('manterLogado');
    // console.log('manter:', mL);
    return mL !== undefined ? JSON.parse(mL) : false;
  }

  /**
   * login: faz o login do usuário
   */
  public login(email: string, senha: string): Promise<any> {

    return new Promise((resolve, reject) => {

      // login por email e senha no Firebase
      // console.log('lc: ', firebase.auth().languageCode);
      // firebase.auth().languageCode = 'pt';
      // console.log('lc 2: ', firebase.auth().languageCode);
      firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(usuarioAtenticado => {
          // console.log('Retorno firebase: ', usuarioAtenticado);
          this.user = usuarioAtenticado;
          this.logado = true;
          // console.log('lc 3.1: ', firebase.auth().languageCode);
          // recuperar informações adicionais do usuário no banco...
          resolve(this.user);
        })
        .catch(error => {
          // console.log('lc 3.2: ', firebase.auth().languageCode);
          // Handle Errors here.
          /* var errorCode = error.code;
          var errorMessage = error.message; */
          reject(error);
          // ...
        });
    });
  }

  /**
   * logoff: faz o logoff do usuário
   */
  public logoff() {
    this.logado = false;
    firebase.auth().signOut();
    sessionStorage.removeItem('userInfo');
    localStorage.removeItem('userInfo');
    sessionStorage.removeItem('userToken');
    localStorage.removeItem('userToken');
  }

  /* public validaTokenSenha(token) {
    return new Promise((resolve, reject) => {
      // requisição post no servidor de autenticação - verificação de token de senha
      const body = `token=${token}`;
      this.http.post(this.apiUrlAuth + '-tokenSenha', body)
        .subscribe(data => {
          if (data['type']) {
            // console.log('retorno POST', data);
            resolve(data['data'].login);
          } else {
            reject(data['data']);
          }
        },
          error => {
            console.log('Erro autenticação:', error);
            reject(error);
          });
    });
  } */

  /* public resetSenha(novaSenha, token): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = `novaSenha=${novaSenha}&token=${token}`;
      // requisição post no servidor de autenticação
      this.http.post(this.apiUrlAuth + '-reset', body)
        .subscribe(
          data => {
            // console.log('retorno POST', data);
            if (data['type']) {
              resolve(true);
            } else {
              reject(false);
            }
          },
          error => {
            console.log('Erro:', error);
            reject(error);
          }
        );
    });
  } */

  /* public solicitaResetSenha(cpf_cnpj): Promise<any> {
    return new Promise((resolve, reject) => {
      const body = `cpf_cnpj=${cpf_cnpj}&`;
      // requisição post no servidor de autenticação
      this.http.post(this.apiUrlAuth + '-solicitarReset', body)
        .subscribe(
          data => {
            // console.log('retorno POST', data);
            if (data['type']) {
              resolve(data['token']);
            } else {
              reject(false);
            }
          },
          error => {
            console.log('Erro:', error);
            reject(error);
          }
        );
    });
  } */
}
