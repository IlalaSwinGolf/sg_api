const ErrorsLabels = require('./errors-labels');

const CustomErrors = {
    genericError: function(status, message) {
        this.status = status;
        this.message = message;
        this.stack = (new Error()).stack;
    },
    applicationError: function(status, message) {
    	CustomErrors.genericError.call(this, status, message);
        this.name = ErrorsLabels.applicationError;
    },
    duplicateEntryError: function(status, message) {
    	CustomErrors.genericError.call(this, status, message);
        this.name = ErrorsLabels.duplicateEntryError;
    },
    wrongPasswordError: function(status, message) {
    	CustomErrors.genericError.call(this, status, message);
        this.name = ErrorsLabels.wrongPasswordError;
    },
    routeError: function(status, message) {
    	CustomErrors.genericError.call(this, status, message);
        this.name = ErrorsLabels.routeError;
    },
};
CustomErrors.genericError.prototype = new Error;
CustomErrors.applicationError.prototype = new CustomErrors.genericError;
CustomErrors.duplicateEntryError.prototype = new CustomErrors.genericError;
CustomErrors.wrongPasswordError.prototype = new CustomErrors.genericError;
CustomErrors.routeError.prototype = new CustomErrors.genericError;

module.exports = CustomErrors;