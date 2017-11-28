// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyADtVDvLVwt7ctShqwfWj_KJZwGffchWtk',
    authDomain: 'workshop-i5.firebaseapp.com',
    databaseURL: 'https://workshop-i5.firebaseio.com',
    projectId: 'workshop-i5',
    storageBucket: 'workshop-i5.appspot.com',
    messagingSenderId: '439534318734'
  }
};
