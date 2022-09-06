// Fetch API
export const getFetchApiHeader = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

export function postFetchApiHeader(bodyData) {
  let header = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  };
  return header;
}
