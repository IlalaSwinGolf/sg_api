'use strict';

const CustomErrors = {
    genericError: function(status, message, name) {
        this.status = status;
        this.message = message;
        this.name = name;
    },
    applicationError: function(status, message) {
        CustomErrors.genericError.call(this, status, message, CustomErrors.types.applicationError);
    },
    duplicateEntryError: function(status, message) {
        CustomErrors.genericError.call(this, status, message, CustomErrors.types.duplicateEntryError);
    },
    authenticationError: function(status, message) {
        CustomErrors.genericError.call(this, status, message, CustomErrors.types.authenticationError);
    },
    routeError: function(status, message) {
        CustomErrors.genericError.call(this, status, message, CustomErrors.types.routeError);
    },
    forbiddenActionError: function(status, message) {
        CustomErrors.genericError.call(this, status, message, CustomErrors.types.forbiddenActionError);
    },
    modelNotFoundError: function(status, message) {
        CustomErrors.genericError.call(this, status, message, CustomErrors.types.modelNotFoundError);
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
        wrongPassword: "Password does not match with username.",
        tooLowAuthority: "Your account has not sufficient authority.",
        nonDisabledUserOnCreation: "You can't create a non-disabled user.",
        modelNotFoundError: "The requested ressource has not been found.",
        roleDoesNotExists: "Role does not exists",
        notAuthenticated: "You are not authenticated.",
        userNotFound: "User not found.",
        restrictedFields: "You can't update restricted fields of an other user.",
    },
};
CustomErrors.genericError.prototype = Error.prototype;
CustomErrors.applicationError.prototype = CustomErrors.genericError.prototype;
CustomErrors.duplicateEntryError.prototype = CustomErrors.genericError.prototype;
CustomErrors.authenticationError.prototype = CustomErrors.genericError.prototype;
CustomErrors.routeError.prototype = CustomErrors.genericError.prototype;
CustomErrors.forbiddenActionError.prototype = CustomErrors.genericError.prototype;
CustomErrors.modelNotFoundError.prototype = CustomErrors.genericError.prototype;


module.exports = CustomErrors;