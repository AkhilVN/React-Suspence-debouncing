import axios from 'axios';
export function fetchPostalData(value) {
    let postalPromise = fetchData(value);
    return {
      user: wrapPromise(postalPromise),
    };
  }

  function wrapPromise(promise) {
    let status = "pending";
    let result;
    let suspender = promise.then(
      res => {
        status = "success";
        result = res;
      },
      err => {
        status = "error";
        result = err;
      }
    );
    return {
      read() {
        if (status === "pending") {
          throw suspender;
        } else if (status === "error") {
          throw result;
        } else if (status === "success") {
          return result;
        }
      }
    };
  }
  
  export function fetchData(postal) {
    const path = /^\d{6}$/.test(postal) ? 'pincode' : 'postoffice'
    return axios.get(`https://api.postalpincode.in/${path}/${postal}`)
    .then(res => res.data)
  }