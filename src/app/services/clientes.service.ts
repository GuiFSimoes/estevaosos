import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';



@Injectable()
export class ClientesService {

    private itemsCollection: AngularFirestoreCollection<Item>;

    constructor() { }


}
