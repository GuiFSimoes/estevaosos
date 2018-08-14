import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../environments/environment';

@Injectable()
export class UtilService {
  private apiViaCEP = environment.apiConsultaCEP;
  private apiCNPJ = environment.apiReceitaFederalConsultaCNPJ;

  //#region [métodos estaticas]

  /**
   * Valida o formato de entrada do email
   * @param email e-mail para validação
   */
  public static validateEmail(email) {
    if (email === '' || typeof email === 'undefined') {
      return true;
    }
    // tslint:disable-next-line:max-line-length
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  /**
   * Valida o formato do CPF
   * @param cpf CPF para validação
   */
  public static validateCPF(cpf) {
    if (cpf === '' || typeof cpf === 'undefined') {
      return true;
    }
    const re = /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/;
    return re.test(cpf) && this.validaDigitoCPF(cpf);
  }

  /**
   * Valida o formato do CNPJ
   * @param cnpj CPF para validação
   */
  public static validateCNPJ(cnpj) {
    if (cnpj === '' || typeof cnpj === 'undefined') {
      return true;
    }
    const re = /^[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}$/;
    return re.test(cnpj);
  }

  /**
   * Valida entrada de CPF ou CNPJ
   * @param cpf CPF ou CNPJ para validação
   */
  public static validateCPF_CNPJ(cpf) {
    return this.validateCNPJ(cpf) || this.validateCPF(cpf);
  }

  /**
   * Valida padrão de formato de senha
   * @param senha senha de autenticação para validação
   */
  public static validateSenha(senha) {
    const regSenha = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/;
    return regSenha.test(senha);
  }

  public static validaDigitoCPF(cpf: string): boolean {
    cpf = cpf.replace(/\D+/g, '');
    if (cpf == null) {
      return false;
    }
    if (cpf.length !== 11) {
      return false;
    }
    if ((cpf === '00000000000')
      || (cpf === '11111111111')
      || (cpf === '22222222222')
      || (cpf === '33333333333')
      || (cpf === '44444444444')
      || (cpf === '55555555555')
      || (cpf === '66666666666')
      || (cpf === '77777777777')
      || (cpf === '88888888888')
      || (cpf === '99999999999')) {
      return false;
    }
    let numero = 0;
    let caracter = '';
    const numeros = '0123456789';
    let j = 10;
    let somatorio = 0;
    let resto = 0;
    let digito1 = 0;
    let digito2 = 0;
    let cpfAux = '';
    cpfAux = cpf.substring(0, 9);
    for (let i = 0; i < 9; i++) {
      caracter = cpfAux.charAt(i);
      if (numeros.search(caracter) === -1) {
        return false;
      }
      numero = Number(caracter);
      somatorio = somatorio + (numero * j);
      j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;
    if (digito1 > 9) {
      digito1 = 0;
    }
    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i = 0; i < 10; i++) {
      caracter = cpfAux.charAt(i);
      numero = Number(caracter);
      somatorio = somatorio + (numero * j);
      j--;
    }
    resto = somatorio % 11;
    digito2 = 11 - resto;
    if (digito2 > 9) {
      digito2 = 0;
    }
    cpfAux = cpfAux + digito2.toString();
    if (cpf !== cpfAux) {
      return false;
    } else {
      return true;
    }
  }

  public static convertData(data): Date {
    if (data === null || data === undefined || data === '') {
      return null;
    }
    const dt = data.split('/');
    return new Date(dt[2], parseInt(dt[1], 10) - 1, dt[0]);
  }

  /**
   * Traduz para o portugues a mensagem de erro retornada pelo Google Auth
   * @param error Mensagem de erro do Google Auth
   */
  public static traduzirMensagemGoogleAuth(error: any): any {
    let message = '';
    switch (error.code) {
      case 'auth/invalid-email':
        message = 'Email inválido.'
      break;

      case 'auth/wrong-password':
        message = 'Senha incorreta.'
      break;

      case 'auth/user-disabled':
        message = 'Usuário desativado pelo administrador do sistema.'
      break;

      case 'auth/user-not-found':
        message = 'Email não cadastrado.'
      break;

      case 'auth/email-already-in-use':
        message = 'Este email já está vinculado a outro usuário.'
      break;

      case 'auth/operation-not-allowed':
        message = 'Este provedor de acesso não foi ativado no painel de autenticação do Firebase.'
      break;

      case 'auth/weak-password':
        message = 'Senha muito fraca (fácil de descobrir).'
      break;

      case 'auth/requires-recent-login':
        message = 'Seu tempo de autenticação expirou. Faça o login novamente.'
      break;

      case 'auth/user-mismatch':
        message = 'A credencial de autenticação não corresponde ao usuário atual.'
      break;

      case 'auth/invalid-credential':
        message = 'Credencial de autenticação inválida.'
      break;

      case 'auth/app-deleted':
        message = 'A instância do FirebaseApp foi removida.'
      break;

      case 'auth/app-not-authorized':
        message = 'Não há autorização para usar o Firebase Authentication. Verifique as configurações do Google API.'
      break;

      case 'auth/argument-error':
        message = 'Método invocado com argumentos inválidos.'
      break;

      case 'auth/invalid-api-key':
        message = 'A chave de API fornecida é inválida. Verifique as configurações do Firebase.'
      break;

      case 'auth/invalid-user-token':
        message = 'As credenciais do usuário são inválidas. Faça o login novamente.'
      break;

      case 'auth/network-request-failed':
        message = 'Erro de conexão. Verifique a conexão com a internet.'
      break;

      case 'auth/too-many-requests':
        message = 'As requisições deste dispositivo foram bloqueadas. Aguarde 30 minutos para tentar novamente.'
      break;

      case 'auth/unauthorized-domain':
        message = 'O domínio do aplicativo não tem autorização para fazer operações OAuth com o Firebase. Edite a lista de domínios autorizados no Firebase. '
      break;

      case 'auth/user-token-expired':
        message = 'As credenciais do usuário expiraram. Faça o login novamente.'
      break;

      case 'auth/web-storage-unsupported':
        message = 'Web storage não suportado ou desativado pelo usuário.'
      break;

      case 'auth/account-exists-with-different-credential':
        message = 'Este email já está vinculado a outro usuário.'
      break;
    
      default:
        message = typeof error == 'string' ? error : message;
        message = error.message ? error.message : message;
      break;
    }
    return { message: message, code: error.code };
  }

  //#endregion

  constructor(private http: HttpClient) { }

  /**
   * Recupera as informações de CEP
   */
  public verificaCEP(cep: string): Promise<any> {
    return new Promise((resolve, reject) => {

      // requisição get no servidor
      const url = this.apiViaCEP.replace('_CEP_', cep) + '?callback=callback';
      this.http.jsonp(url, 'callback')
        // this.http.get(this.apiCNPJ + cnpj)
        .subscribe(
          data => {
            // console.log(data);
            resolve(data);
          },
          error => {
            // console.log('Erro getListaMantenedora:', error);
            reject(error);
          }
        );
    });
  }

  /**
   * Recupera as informações da empresa no webservice da receita federal
   */
  public verificaCNPJReceita(cnpj: string): Promise<any> {
    return new Promise((resolve, reject) => {

      // requisição get no servidor
      const url = this.apiCNPJ + cnpj;
      this.http.jsonp(url, 'callback')
        // this.http.get(this.apiCNPJ + cnpj)
        .subscribe(
          data => {
            // console.log(data);
            resolve(data);
          },
          error => {
            // console.log('Erro getListaMantenedora:', error);
            reject(error);
          }
        );
    });
  }

}
