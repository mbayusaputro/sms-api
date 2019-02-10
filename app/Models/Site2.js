'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Site2 extends Model {
	static get table() {
		return 'site_2'
	}
}

module.exports = Site2
