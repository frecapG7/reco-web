import { useQuery } from "@tanstack/react-query";

import { post } from "../index";

const getEmbed = async (url) => {
  const response = await post("/api/embed", {
    url,
  });
  return response;
};

export const useEmbed = (url) => {
  return useQuery({
    queryKey: ["embed", url],
    queryFn: () => getEmbed(url),
    enabled: !!url,
    // staleTime: "Infinity",
  });
};
