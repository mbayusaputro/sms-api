'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.get('/site', 'Site1Controller.index');
Route.get('/data','Site1Controller.getData')
Route.get('/table','Site1Controller.table')

Route.get('/site2', 'Site2Controller.index');
Route.get('/data2','Site2Controller.getData')
Route.get('/table2','Site2Controller.table')