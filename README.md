# Starter Module for Grapefruit, Wine & Design React/Typescript Modules

## Getting Started
1. Clone the repository
2. Change the name of the module in package.json
3. Change the target div from ```root``` to your chosen dom element in which to show the module.
4. Add typescript files to ```src``` folder. The entry point of the module is ```App.tsx``` so make sure your new modules are imported into that.
5. Add your API endpoints to ```.local-web-server.json```. In order for these to be compatible with the front end dev server you must mirror these in the ```webpack.config.json``` config in the proxy property of the devServer object. This is needed so you can send requests to localhost:8000 from localhost:8080, else you may have CORS issues.
6. Run ```npm run start``` to start the webpack dev server. This allows for hot reloading and building of the app. 
7. To build the production version, run ```npm run build:prod```. This minifies and handles all of the bundling ready for a production build.