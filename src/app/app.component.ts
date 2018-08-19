import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from '../environments/environment';

import * as firebase from 'firebase';

// import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    /* public toastr: ToastsManager,
    vRef: ViewContainerRef */) {
    // this.toastr.setRootViewContainerRef(vRef);
    window.dispatchEvent(new Event('resize'));
  }

  ngOnInit() {
    firebase.initializeApp(environment.firebaseConfig);
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
