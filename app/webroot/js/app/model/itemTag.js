steal(
	'jquery/model',
	'mad/model/serializer/cakeSerializer.js',
	'app/model/tag.js'
).then(function () {

		/*
		 * @class passbolt.model.ItemTag
		 * @inherits {mad.model.Model}
		 * @parent index
		 *
		 * The itemTag model
		 *
		 * @constructor
		 * Creates an ItemTag
		 * @param {array} data
		 * @return {passbolt.model.ItemTag}
		 */
		mad.model.Model('passbolt.model.ItemTag', /** @static */ {

			'validateRules': {
				'foreign_model': ['text'],
				'foreign_id': ['text'],
				'tag_id': ['text']
			},

			attributes: {
				'id': 'string',
				'tag_id': 'string',
				'foreign_model': 'string',
				'foreign_id': 'string',
				'created': 'date',
				'created_by': 'string',
				'Tag': 'passbolt.model.Tag.model'
			},

			'create': function (attrs, success, error) {
				var self = this;
				var params = mad.model.serializer.CakeSerializer.to(attrs, this);
				return mad.net.Ajax.request({
					url: APP_URL + 'itemTags/' + attrs.foreign_model + '/' + attrs.foreign_id,
					type: 'POST',
					params: params,
					success: success,
					error: error
				}).pipe(function (data, textStatus, jqXHR) {
						// pipe the result to convert cakephp response format into can format
						// else the new attribute are not well placed
						var def = $.Deferred();
						def.resolveWith(this, [mad.model.serializer.CakeSerializer.from(data, self)]);
						return def;
					});
			},

			/**
			 * Create/Edit ItemTags in bulk
			 * @param attrs
			 * 	- for this action, a new param tag_list can be passed. It is a list of tags separated by commas.
			 * @param success
			 * @param error
			 * @returns {*}
			 */
			'createBulk': function (attrs, success, error) {
				var self = this;
				var params = mad.model.serializer.CakeSerializer.to(attrs, this);
				return mad.net.Ajax.request({
					url: APP_URL + 'itemTags/updateBulk/' + attrs.foreign_model + '/' + attrs.foreign_id,
					type: 'POST',
					params: params,
					success: success,
					error: error
				}).pipe(function (data, textStatus, jqXHR) {
						var def = $.Deferred();
						def.resolveWith(this, [mad.model.serializer.CakeSerializer.from(data, self)]);
						return def;
					});
			},

			'destroy': function (id, success, error) {
				var params = {id: id};
				return mad.net.Ajax.request({
					url: APP_URL + '/itemTags/{id}',
					type: 'DELETE',
					params: params,
					success: success,
					error: error
				});
			},

			'findAll': function (params, success, error) {
				return mad.net.Ajax.request({
					url: APP_URL + 'itemTags/{foreignModel}/{foreignId}',
					type: 'GET',
					params: params,
					success: success,
					error: error
				});
			}
		}, /** @prototype */ {

			/**
			 * Override the constructor function
			 * Listen change on Category, and update the model when a category has been destroyed
			 */
			'init': function () {
				var self = this;
			},

			'destroy': function () {
				this._super();
			}
		});
	});