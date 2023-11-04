import * as RequestRepository from "../Repository";
export const addRequest = async (request: any) => {
  try {
    return await RequestRepository.addRequest(request);
  } catch (error) {
    throw error;
  }
};

export const listRequest = async () => {
  try {
    return await RequestRepository.listRequest();
  } catch (error) {
    return error;
  }
};

export const updatedRequest = async (id: any, data: any) => {
  try {
    return await RequestRepository.updateRequest(id, data);
  } catch (error) {
    return error;
  }
};

export const deleteRequest = async (id: any) => {
  try {
    return await RequestRepository.deleteRequest(id);
  } catch (error) {
    return error;
  }
};
