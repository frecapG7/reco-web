import { useQuery } from "@tanstack/react-query";

const getRequests = async () => {
  return {
    resultSet: [
      {
        id: 1,
        title: "Request 1",
        description: "Description of request 1",
        status: "pending",
        created: "2021-10-01",
        author: {
          id: 1,
          name: "John Doe",
          title: "Software Engineer",
        },
      },
      {
        id: 3,
        title: "Request 1",
        description: "Description of request 1",
        status: "pending",
        created: "2021-10-01",
        author: {
          id: 1,
          name: "John Doe",
          title: "Software Engineer",
          avatar: "https://randomuser.me/api/port",
        },
      },
      {
        id: 4,
        title: "Request 1",
        description: "Description of request 1",
        status: "pending",
        created: "2021-10-01",
        author: {
          id: 1,
          name: "John Doe",
          title: "Software Engineer",
          avatar: "https://randomuser.me/api/port",
        },
      },
    ],
    total: 100,
  };
};

export const useGetRequests = () => {
  return useQuery({
    queryKey: ["requests"],
    queryFn: getRequests,
  });
};
