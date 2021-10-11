import axios from "axios";
// const url = "https://hawkservices.herokuapp.com/";
const url = "http://localhost:3001/";

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
      console.log(error);
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

  getJobStatusId(id) {
    return this.apiCall("get", `${url}Jobstatus/${id}`);
  }

  getQuotes(id) {
    return this.apiCall("get", `${url}quotes/${id}`);
  }

  getBookings(id) {
    return this.apiCall("get", `${url}booking/${id}`);
  }

  getEmployee(id) {
    return this.apiCall("get", `${url}employee/${id}`);
  }

  getJobs(id) {
    return this.apiCall("get", `${url}jobs/${id}`);
  }

  createBooking(
    token,
    requestDate,
    requestTime,
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
      requestTime,
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

  acceptQuote(quoteId) {
    console.log("hit api");
    return this.apiCall("put", `${url}quote/${quoteId}`);
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
