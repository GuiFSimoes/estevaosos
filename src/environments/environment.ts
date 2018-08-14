// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiReceitaFederalConsultaCNPJ: 'https://www.receitaws.com.br/v1/cnpj/',
  apiConsultaCEP: 'https://viacep.com.br/ws/_CEP_/json/',
  firebaseConfig: {
    apiKey: 'AIzaSyAWWvQCec9OsQGqMhlFr9153j6xo7YbImc',
    authDomain: 'estevao-cadastroclientes.firebaseapp.com',
    databaseURL: 'https://estevao-cadastroclientes.firebaseio.com',
    projectId: 'estevao-cadastroclientes',
    storageBucket: 'estevao-cadastroclientes.appspot.com',
    messagingSenderId: '606256147914'
  }
};
