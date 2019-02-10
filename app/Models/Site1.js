'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Site1 extends Model {
	static get table() {
		return 'site_1'
	}
}

module.exports = Site1
