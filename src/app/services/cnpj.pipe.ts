import { Pipe, PipeTransform } from '@angular/core';
import { conformToMask } from 'angular2-text-mask';
// import { Mascaras } from 'environments/resource';
// import { validate_cnpj, MASKS } from '../core/utils';

@Pipe({
    name: 'cnpj',
})
export class CNPJPipe implements PipeTransform {
    transform(cnpjValue: any) {
        if (!cnpjValue) {
            return '';
        }

        return conformToMask(
            cnpjValue,
            [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/],
            { guide: false }
        ).conformedValue;
    }
}