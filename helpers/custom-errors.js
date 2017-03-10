'use strict';

const CustomErrors = {
    genericError: function(status, message) {
        this.status = status;
        this.message = message;
        this.stack = (new Error()).stack;
    },
    applicationError: function(status, message) {
        CustomErrors.genericError.call(this, status, message);
        this.name = CustomErrors.types.applicationError;
    },
    duplicateEntryError: function(status, message) {
        CustomErrors.genericError.call(this, status, message);
        this.name = CustomErrors.types.duplicateEntryError;
    },
    authenticationError: function(status, message) {
        CustomErrors.genericError.call(this, status, message);
        this.name = CustomErrors.types.authenticationError;
    },
    routeError: function(status, message) {
        CustomErrors.genericError.call(this, status, message);
        this.name = CustomErrors.types.routeError;
    },
    types: {
        applicationError: "Application error",
        duplicateEntryError: "Duplicate entry error",
        authenticationError: "Authentication error",
        routeError: "Route error",
    },
    messages: {
        nonUniqueEmail: "Email is already used.",
        nonUniqueUsername: "Username is already used.",
        wrongPassword: "Password does not match with username",
    },
};
CustomErrors.genericError.prototype = new Error;
CustomErrors.applicationError.prototype = new CustomErrors.genericError;
CustomErrors.duplicateEntryError.prototype = new CustomErrors.genericError;
CustomErrors.authenticationError.prototype = new CustomErrors.genericError;
CustomErrors.routeError.prototype = new CustomErrors.genericError;

module.exports = CustomErrors;