import axios from "axios";
import { useEffect, useState } from "react";
import { ImCheckmark, ImCross } from "react-icons/im";
import { IRequest } from "../types/request.types";

const Requests = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [request, setRequest] = useState<IRequest[]>([]);
  const [status, setStatus] = useState<string>("");
  const [requestId, setRequestId] = useState<string>("");
  const [filteredRequest, setFilteredRequest] = useState<IRequest[]>([]);
  // const [users, setUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const getRequestData = async () => {
      try {
        const requestData = await axios.get("http://localhost:8000/request");
        setLoading(false);
        // console.log(requestData.data);
        setRequest(requestData.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRequestData();
  }, []);

  useEffect(() => {
    const data = {
      status: status,
    };
    if (requestId && data) {
      const productRequest = async () => {
        try {
          console.log(requestId, status);
          const updatedRequest = await axios.patch(
            `http://localhost:8000/request/update-request/${requestId}`,
            data
          );
          // console.log(updatedRequest);
          setRequest(updatedRequest.data.content);
        } catch (error) {
          console.log(error);
        }
      };
      productRequest();
    }
  }, [status, requestId]);

  useEffect(() => {
    if (request) {
      if (statusFilter == "all") {
        setFilteredRequest(request);
      } else {
        const filteredRequests = request.filter(
          (req: IRequest) => req.status == statusFilter
        );
        setFilteredRequest(filteredRequests);
      }
    }
  }, [statusFilter, request]);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold p-4">Product Requests</h1>
        <form className="flex items-center mr-2 md:mr-8">
          <label className="font-bold mr-4">Status:</label>
          <select
            className="border rounded-md px-2 py-1"
            id="statusFilter"
            onChange={(e) => setStatusFilter(e.target.value)}
            value={statusFilter}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="declined">Declined</option>
          </select>
        </form>
      </div>
      {loading ? (
        <div className="flex justify-center items-center mt-60">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="border-collapse w-full">
            <thead className="border-y-4 text-lg">
              <tr>
                <th className="p-4">SN</th>
                <th>Name</th>
                <th>Email</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody className="border-collapse w-full text-center">
              {filteredRequest?.map((user: IRequest, index: number) => {
                const { _id, name, quantity, email, status } = user;
                return (
                  <tr key={_id} className="list-bg border-b-2">
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{quantity}</td>
                    <td>
                      {status == "approved" ? (
                        <span className="font-bold text-green-500">
                          Approved
                        </span>
                      ) : status == "declined" ? (
                        <span className="font-bold text-red-500">Declined</span>
                      ) : (
                        <span className="font-bold text-yellow-500">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="flex justify-center gap-4">
                      <button
                        className="p-3 rounded-md border-green-400 bg-green-500 hover:bg-green-700"
                        // disabled={status === "approved" || status === "pending"}
                        onClick={() => {
                          setRequestId(_id);
                          setStatus("approved");
                          // productRequest(_id);
                        }}
                      >
                        <ImCheckmark />
                      </button>
                      <button
                        className="p-3 rounded-md border-red-400 bg-red-500 hover:bg-red-700"
                        // disabled={status === "approved" || status === "pending"}
                        onClick={() => {
                          setRequestId(_id);
                          setStatus("declined");
                          // productRequest(_id);
                        }}
                      >
                        <ImCross />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Requests;
