import { Component, OnInit } from '@angular/core';
import { NgxXml2jsonService } from 'ngx-xml2json';
// import { Router } from '@angular/router';
// import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
// import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  arquivoXML: any = null;
  folderLido = '';
  mapasLidos = 0;
  sourcesLidos = 0;
  targetsLidos = 0;

  constructor(public xmlService: NgxXml2jsonService) { }

  ngOnInit(): void {
  }

  public uploadFileModal(event) {
    const arq = event.srcElement.files[0];
    if (arq) {
      this.arquivoXML = arq;
      // console.log('arq selecionado: ', this.arquivoXML);
      this.processaXML();
    } else {
      this.arquivoXML = null;
    }
  }

  private processaXML() {
    if (this.arquivoXML) {

      // const ttt = '<note><to>User</to><from>Library</from><heading>Message</heading><body>Some XML to convert to JSON!</body></note>';
      const fr = new FileReader();
      fr.onloadend = () => {

        // console.log('arq lido: ', fr.result);
        const parser = new DOMParser();
        const xml = parser.parseFromString(fr.result.toString(), 'text/xml');
        // console.log('parser: ', xml);
        // const xml = parser.parseFromString(ttt, 'text/xml');

        const objJSON: any = this.xmlService.xmlToJson(xml);
        /* console.log('JSON: ', Object.prototype.toString.call(objJSON));
        const eArray = Object.prototype.toString.call(objJSON) === '[object Array]';
        console.log('é array? ', eArray); */

        // console.log('Atributes: ', objJSON.POWERMART[1]['@attributes']);
        // console.log('Folder: ', objJSON.POWERMART[1]['REPOSITORY']['FOLDER']);
        // objJSON
        let folder: any; // = objJSON.POWERMART[objJSON.POWERMART.length - 1]['REPOSITORY']['FOLDER'];
        if (objJSON.POWERMART[objJSON.POWERMART.length - 1]) {
          folder = objJSON.POWERMART[objJSON.POWERMART.length - 1]['REPOSITORY']['FOLDER'];
        } else {
          folder = objJSON.POWERMART['REPOSITORY']['FOLDER'];
        }

        this.folderLido = folder['@attributes'].NAME;
        this.mapasLidos = folder.MAPPING.length;
        this.sourcesLidos = folder.SOURCE.length;
        this.targetsLidos = folder.TARGET.length;

      };
      fr.readAsText(this.arquivoXML); // readAsDataURL(this.arquivoXML);
    }
  }

}
