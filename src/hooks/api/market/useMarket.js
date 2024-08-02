import { useQuery } from "@tanstack/react-query";

import avatar1 from "../../../assets/avatars/avatar-thinking-1-svgrepo-com.svg";
import avatar2 from "../../../assets/avatars/avatar-thinking-6-svgrepo-com.svg";
import krishna from "../../../assets/avatars/krishna-svgrepo-com.svg";

import gift from "../../../assets/icons/gift-svgrepo-com.svg";
const getIconItems = () => {
  return [
    {
      name: "The All knowing",
      img: avatar1,
      price: 10,
    },
    {
      name: "The Wise",
      img: avatar2,
      price: 40,
    },
    {
      name: "The HistoryMan",
      img: krishna,
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
      img: gift,
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
