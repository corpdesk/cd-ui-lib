// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiEndpoint: 'http://localhost/cdapi/public/api/cd',
  consumerToken: 'B0B3DA99-1859-A499-90F6-1E3F69575DCD',// current company consumer
  USER_RESOURCES: 'http://localhost/user-resources',
  HOST: 'http://localhost',
  consumer: '',
  clientAppId: 2, // this client application identifies itself to the server with this id
  SOCKET_IO_PORT: 3200, // push server port
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
