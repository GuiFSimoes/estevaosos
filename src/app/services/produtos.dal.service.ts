import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import { Produto } from '../models/produto';

@Injectable()
export class ProdutosDALService {

    private itemsCollection: AngularFirestoreCollection<Produto>;
    private itemDoc: AngularFirestoreDocument<Produto>;

    constructor(private afs: AngularFirestore) { }

    public getLista(): Observable<Produto[]> {
        this.itemsCollection = this.afs.collection<Produto>('produtos');
        return this.itemsCollection.valueChanges();
    }

    public getItem(key): Observable<Produto> {
        this.itemDoc = this.afs.doc<Produto>(`produtos/${key}`);
        return this.itemDoc.valueChanges();
    }

    public adiciona(item: Produto) {
        this.itemsCollection.add(item);
    }

    public atualiza(item: Produto) {
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
