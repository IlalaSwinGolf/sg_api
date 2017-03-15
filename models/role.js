'use strict';

const Bookshelf = require('../bookshelf');
const BaseModel = require('../helpers/base-model');
const Promise = require('bluebird');

const Role = BaseModel.extend({
    tableName: 'roles',
    users: function() {
        return this.hasMany('User', 'role_id');
    },
    isPowerfull: function(role_id) {
        return Promise.coroutine(function*() {
            const role = yield Role.findOne({
                id: role_id
            }, {});
            if (!role) {
                throw new CustomErrors.modelNotFoundError(422, CustomErrors.messages.roleDoesNotExists);
            }
            switch(role.authority){
            	case "guest": return true;
            	case "user": return ["admin","root","user"].indexOf(this.authority) > -1;
            	case "admin": return ["admin","root"].indexOf(this.authority) > -1;
            	case "admin": return this.authority == "root";
            }
        })();
    }
});

module.exports = Bookshelf.model('Role', Role);