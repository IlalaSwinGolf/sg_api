'use strict';

const SecurityConfig = ('../config/security-config');
const Bcrypt = Promise.promisifyAll(require('bcrypt'));

const SeedHelper = {
	    hashPassword: function(password) {
            Bcrypt.genSaltAsync(SecurityConfig.saltRounds)
            .then(function(salt){
            	Bcrypt.hashAsync(password, salt);	
            })
            .then(function(hashedPassword)){
            	return hashedPassword;
            };
        });
    },
};
module.exports = SeedHelper;