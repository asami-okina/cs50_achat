// Fetch API
export const get_fetch_api_header = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

export function post_fetch_api_header(bodyData) {
  let header = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  };
  return header;
}
