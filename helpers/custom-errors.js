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
    forbiddenActionError: function(status, message) {
        CustomErrors.genericError.call(this, status, message);
        this.name = CustomErrors.types.forbiddenActionError;
    },
    modelNotFoundError: function(status, message) {
        CustomErrors.genericError.call(this, status, message);
        this.name = CustomErrors.types.modelNotFoundError;
    },
    types: {
        applicationError: "Application error",
        duplicateEntryError: "Duplicate entry error",
        authenticationError: "Authentication error",
        routeError: "Route error",
        forbiddenActionError: "Forbbiden action error",
        modelNotFOundError: "Model not found error"
    },
    messages: {
        nonUniqueEmail: "Email is already used.",
        nonUniqueUsername: "Username is already used.",
        wrongPassword: "Password does not match with username",
        nonDisabledUserOnCreation: "A created user could not be enabled.",
        tooLowAuthority: "Your account has not sufficient authority.",
        nonDisabledUserOnCreation: "You can't create a non-disabled user.",
        modelNotFoundError: "The requested ressource has not been found."
    },
};
CustomErrors.genericError.prototype = new Error;
CustomErrors.applicationError.prototype = new CustomErrors.genericError;
CustomErrors.duplicateEntryError.prototype = new CustomErrors.genericError;
CustomErrors.authenticationError.prototype = new CustomErrors.genericError;
CustomErrors.routeError.prototype = new CustomErrors.genericError;
CustomErrors.forbiddenActionError.prototype = new CustomErrors.genericError;
CustomErrors.modelNotFoundError.prototype = new CustomErrors.modelNotFoundError;


module.exports = CustomErrors;