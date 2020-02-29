// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  Url_Service: 'http://localhost:3000/api/',
  permisos_Usuarios:[

    // 0
    {

    },
    
    // Normal user like monica
    // 1
    {
      normas: false,
      tipo_servicio: false,
      costos: false,
      cotizacion: false,
      empresas: true,
      prospectos: true,
      servicios: true,
      usuarios: true,
      movimientos: false
    },

    // Admin user like liliana
    // 2
    {
      normas: true,
      tipo_servicio: true,
      costos: true,
      cotizacion: true,
      empresas: true,
      prospectos: true,
      servicios: true,
      usuarios: true,
      movimientos: false
    },

    // super admin user like bruno
    // 3
    {
      normas: true,
      tipo_servicio: true,
      costos: true,
      cotizacion: true,
      empresas: true,
      prospectos: true,
      servicios: true,
      usuarios: true,
      movimientos: true
    }
  ],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
