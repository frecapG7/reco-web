import { useQuery } from "@tanstack/react-query";
import { get } from "../index";

const getRequests = async (pageSize, pageNumber) => {
  debugger;
  const response = await get("/api/requests", {
    params: {
      pageSize: pageSize || 10,
      pageNumber: pageNumber || 1,
    },
  });

  return response;
};

export const useGetRequests = (pageSize, pageNumber) => {
  return useQuery({
    queryKey: ["requests", pageSize, pageNumber],
    queryFn: () => getRequests(pageSize, pageNumber),
  });
};
