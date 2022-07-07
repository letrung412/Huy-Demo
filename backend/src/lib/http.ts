
export const enum HttpStatusCodes {
    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404,
    MethodNotAllowed = 405,
}

export class HttpError extends Error {
    constructor(message: string, private __httpStatusCode: number) {
        super(message);
    }

    HttpStatusCode() {
        return this.__httpStatusCode;
    }
}

export function HttpNotFound(msg = 'not found') {
    return new HttpError(msg, HttpStatusCodes.NotFound);
}

export function HttpBadRequest(msg = 'bad input') {
    return new HttpError(msg, HttpStatusCodes.BadRequest);
}

export const HttpParamValidators = {
    MustBeString(obj: any, key: string, min = 1, max = 512) {
        const v = obj[key];
        if (typeof v !== 'string') {
            throw HttpBadRequest(`${key} must be string`);
        }
        if (v.length < min) {
            throw HttpBadRequest(`${key} must be at least ${min} characters`);
        }
        if (v.length > max) {
            throw HttpBadRequest(`${key} must be shorter than ${max} characters`);
        }
        return v;
    },
    MustBeArrayString(obj:any, key: string){
        const v= obj[key];
        if(typeof v !== 'object'){
            throw HttpBadRequest(`${key} must be array`);
        }
        v.some((el:string)=>{
            if(typeof el !== 'string'){
            throw HttpBadRequest(`${el} must be string`);
            }
        })
        return v

    },
    MustBeNumber(obj: any, key: string, min = 1, max =512){
        const v = obj[key];
        if (typeof v !== 'number') {
            throw HttpBadRequest(`${key} must be number`);
        }
        // return positive number
        return +v
    },
    CheckPhone(obj: any, key: string, min = 1, max =512){
        const v=obj[key];
        if (typeof v !== 'string') {
            throw HttpBadRequest(`${key} must be string`);
        }
        if (v.length < min) {
            throw HttpBadRequest(`${key} must be at least ${min} characters`);
        }
        if (v.length > max) {
            throw HttpBadRequest(`${key} must be shorter than ${max} characters`);
        }
        if(!Number.isInteger(+v)){
            throw HttpBadRequest(`${key} can't contain chacacter`)
        }
        return v
    },
    MustBeOneOf<T>(obj: any, key: string, values: T[] = []): T {
        const value = obj[key];
        for (const v of values) {
            if (v === value) {
                return v;
            }
        }
        throw HttpBadRequest(`${key} must be one of ${values.join(',')}`);
    },
}