import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import { Cliente } from '../models/cliente';

@Injectable()
export class ClientesDALService {

    private itemsCollection: AngularFirestoreCollection<Cliente>;
    private itemDoc: AngularFirestoreDocument<Cliente>;

    constructor(private afs: AngularFirestore) { }

    public getLista(): Observable<Cliente[]> {
        this.itemsCollection = this.afs.collection<Cliente>('clientes');
        return this.itemsCollection.valueChanges();
    }

    public getItem(key): Observable<Cliente> {
        this.itemDoc = this.afs.doc<Cliente>(`clientes/${key}`);
        return this.itemDoc.valueChanges();
    }

    public adiciona(item: Cliente) {
        this.itemsCollection.add(item);
    }

    public atualiza(item: Cliente) {
        if (this.itemDoc) {
            this.itemDoc.update(item);
        }
    }

    public deleta() {
        if (this.itemDoc) {
            this.itemDoc.delete();
        }
    }

}
