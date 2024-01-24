import Axios from "./axios";

let token = null;

function setToken(newToken) {
  token = `Bearer ${newToken}`;
}

async function list() {
  const config = {
    headers: { Authorization: token },
  };

  const response = await Axios.get('/inventory/list', config);
  return response.data;
}

async function create(payload) {
  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await Axios.post('/inventory/create', payload, config);
    return response.data;
  } catch (error) {
    console.error("Error adding inventory:", error);
    throw new Error("Failed to add inventory item");
  }
}

async function update(payload) {
  const config = {
    headers: { Authorization: token },
  };

  const response = await Axios.patch(
    `/inventory/update`,
    payload,
    config
  );
  return response.data;
}

async function _delete(id) {
  const config = {
    headers: { Authorization: token },
  };

  console.log("Request Config:", config); // Add this line for debugging

  const response = await Axios.delete(`/inventory/delete/${id}`, config);
  return response;
}

export default {
  setToken,
  list,
  create,
  _delete,
  update,
};
