import { ERROR_STATUS_RESPONSES, ApiResponse } from "../models/responses";

export function sendResponse(response: ApiResponse, status?: number) {
  if (status && status != 200) {
    
    let error = ERROR_STATUS_RESPONSES[status];
    console.log(response.data)
    return response.res.status(status).send({ ...response.data, ...error });
  }

  return response.res.status(200).send({
    ...response.data,
  });
}
