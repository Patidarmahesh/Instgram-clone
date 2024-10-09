import axios from "axios";
const servalUrl = "http://localhost:8000";

export const GetRequest = async (endpoint, options) => {
  try {
    const response = await axios.get(`${servalUrl}${endpoint}`, {
      ...options,
    });
    if (response) {
      return response;
    } else {
      return false;
    }
  } catch (error) {
    console.log(",,,,,", error.message);
  }
};

export const deleteRequestById = async (endpoint) => {
  try {
    const response = await axios.delete(`${servalUrl}${endpoint}`, {
      withCredentials: true,
    });
    if (response) {
      return response;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const postRequest = async (endpoint, text, options) => {  
  try {
    const response = await axios.post(`${servalUrl}${endpoint}`,text, {
      ...options,
    });
    if (response) {
      return response;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateRequestById = async (endpoint,text,options) => {
  try {
    const response = await axios.put(`${servalUrl}${endpoint}`,text,{
      ...options
    });
    if (response) {
      return response;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error", error);
  }
};

