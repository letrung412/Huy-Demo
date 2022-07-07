import Axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const LOCALSTORAGE = {
    TOKEN: 'token',
    USER: 'user'
}
export class Http {

  // constructor() { }

  static _getHeader() {
    return {
      "Authorization": `Bearer ${window.sessionStorage.getItem(LOCALSTORAGE.TOKEN) || ''}`,
    };
  }
  static get = (endPoint, params) => {
    const options = {
      headers: this._getHeader(),
    };
    if (params && Object.keys(params).length) {
      options.params = params;
    }
    return Axios.get(BASE_URL + endPoint, options);
  };
  static post = (endPoint, payload) => {
    return Axios.post(BASE_URL + endPoint, payload, {
      headers: this._getHeader(),
    });
  };

  static put = (endPoint, payload) => {
    return Axios.put(BASE_URL + endPoint, payload, {
      headers: this._getHeader(),
    });
  };

  static patch = (endPoint, payload) => {
    return Axios.patch(BASE_URL + endPoint, payload, {
      headers: this._getHeader(),
    });
  };

  static delete = (endPoint, id) => {
    return Axios.delete(BASE_URL + endPoint + "/" + id, {
      headers: this._getHeader(),
    });
  };
}
