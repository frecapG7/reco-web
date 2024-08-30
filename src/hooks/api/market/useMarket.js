import { useQuery } from "@tanstack/react-query";

const getIconItems = () => {
  return [
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
};

export const useGetIconItems = () => {
  return useQuery({
    queryKey: ["market", "icons"],
    queryFn: getIconItems,
  });
};

const getVariousItems = () => {
  return [
    {
      name: "Invitation Token",
      type: "INVITATION",
      img: "https://storage.googleapis.com/reco_dev/icons/gift-svgrepo-com.svg",
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
