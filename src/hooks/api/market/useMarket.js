import { useQuery } from "@tanstack/react-query";
import { get } from "../index";
const mockData = [
  {
    name: "The All knowing",
    img: "https://storage.googleapis.com/reco_dev/avatars/avatar-thinking-1-svgrepo-com.svg",
    price: 10,
  },
  {
    name: "The Wise",
    img: "https://storage.googleapis.com/reco_dev/avatars/avatar-thinking-6-svgrepo-com.svg",
    price: 40,
  },
  {
    name: "The HistoryMan",
    img: "https://storage.googleapis.com/reco_dev/avatars/krishna-svgrepo-com.svg",
    price: 20,
  },
];

const getIconItems = async () => {
  const response = await get("/api/stores/icons");
  return response;
};

export const useGetIconItems = () => {
  return useQuery({
    queryKey: ["stores", "icons"],
    queryFn: getIconItems,
  });
};

const getItem = async (id) => {
  const response = await get(`/api/stores/items/${id}`);
  return response;
};
export const useGetItem = (id) => {
  return useQuery({
    queryKey: ["stores", "items", id],
    queryFn: () => getItem(id),
  });
};

const getVariousItems = () => {
  return [
    {
      name: "Invitation Token",
      type: "INVITATION",
      url: "https://storage.googleapis.com/reco_dev/icons/gift-svgrepo-com.svg",
      price: 20,
      description: "Invite a friend to join the community",
    },
  ];
};

export const useGetVariousItems = () => {
  return useQuery({
    queryKey: ["market", "various"],
    queryFn: getVariousItems,
  });
};
