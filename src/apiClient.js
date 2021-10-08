import axios from "axios";
const url = "https://hawkservices.herokuapp.com/";

export class ApiClient {
  constructor(tokenProvider, logoutHandler) {
    this.tokenProvider = tokenProvider;
    this.logoutHandler = logoutHandler;
  }

  // old work
  apiCall(method, url, data) {
    return axios({
      method,
      url,
      headers: {
        auth: this.tokenProvider(),
      },
      data,
    }).catch((error) => {
      if (error.response.status === 403) {
        this.logoutHandler();
        return Promise.reject();
      } else {
        throw error;
      }
    });
  }

  // space
  // space
  // space
  // space
  // space
  // space
  // space

  // new work
  getRooms(id) {
    return this.apiCall("get", `${url}rooms/${id}`);
  }

  getServices(id) {
    return this.apiCall("get", `${url}services/${id}`);
  }

  createBooking(
    token,
    requestDate,
    firstName,
    surname,
    addressLine1,
    addressLine2,
    postCode,
    telephoneNumber
  ) {
    return this.apiCall("post", `${url}booking`, {
      token,
      requestDate,
      firstName,
      surname,
      addressLine1,
      addressLine2,
      postCode,
      telephoneNumber,
    });
  }

  createJob(clientId, roomId, serviceId) {
    return this.apiCall("post", `${url}job`, { clientId, roomId, serviceId });
  }

  deleteJob(jobId) {
    return this.apiCall("delete", `${url}job/${jobId}`);
  }

  createQuote(clientId, employeeId, jobList) {
    return this.apiCall("post", `${url}quote`, {
      clientId,
      employeeId,
      jobList,
    });
  }

  // space
  // space
  // space
  // space
  // space
  // space
  // space

  // old work
  getEvents() {
    return this.apiCall("get", url);
  }

  addEvent(eventName, location, description, imageLink, date, time) {
    console.log(time);
    return this.apiCall("post", url, {
      eventName,
      location,
      description,
      imageLink,
      date,
      time,
    });
  }

  removeEvent(id) {
    return this.apiCall("delete", `${url}${id}`);
  }

  updateEvent(id, eventName, location, description, imageLink, date, time) {
    return this.apiCall("put", `${url}${id}`, {
      eventName,
      location,
      description,
      imageLink,
      date,
      time,
    });
  }

  // new work
  async login(username, password) {
    return await axios({
      method: "POST",
      url: `${url}login`,
      data: {
        username,
        password,
      },
    });
  }

  async signUp(username, email, password, type) {
    return await axios({
      method: "POST",
      url: `${url}Signup/${type}`,
      data: {
        username,
        email,
        password,
      },
    });
  }
}
