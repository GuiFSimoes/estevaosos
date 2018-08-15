import { Injectable } from '@angular/core';
// import { ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';
// import { Label } from '../../environments/resource';
import { ToastrService, GlobalToastrConfig } from 'ngx-toastr';

export interface CustomToastOption extends GlobalToastrConfig {
    // animate: 'fade'; // you can override any options available
    newestOnTop: false;
    autoDismiss: true;
    closeButton: true;
    positionClass: 'toast-top-center';
    toastLife: 10000;
    enableHTML: true;
    preventDuplicates: true;
}

// Serviço de notificações de mensagens
@Injectable()
export class NotificacaoService {

    private optionsToast = {
        newestOnTop: false,
        autoDismiss: true,
        closeButton: true,
        positionClass: 'toast-top-center',
        toastLife: 10000,
        enableHTML: true,
        preventDuplicates: true
    };

    constructor(private toastr: ToastrService) { }

    public sucesso = (body: string, title = 'Sucesso', options: any = this.optionsToast) => {
        return this.toastr.success(body, title, options);
    }

    public erro = (body: string, title = 'Ocorreu um erro!', options: any = this.optionsToast = this.optionsToast) => {
        return this.toastr.error(body, title, options);
    }

    public atencao = (body: string, title = 'Atenção', options: any = this.optionsToast) => {
        return this.toastr.warning(body, title, options);
    }

    public info = (body: string, title = 'OK', options: any = this.optionsToast) => {
        return this.toastr.info(body, title, options);
    }

    /* public onClick = () => {
        return this.toastr;
    } */
}
