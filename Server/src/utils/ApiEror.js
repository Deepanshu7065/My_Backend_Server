
class ApiError extends Error {
    constructor(status, message = "something went wrong", errors, statck = "") {
        super(message);
        this.status = status;
        this.message = message;
        this.data = null
        this.success = false
        this.errors = errors
     if(statck){
        this.statck = statck

     }else {
        Error.captureStackTrace(this, this.constructor)
     }
    
    }

}


export default ApiError