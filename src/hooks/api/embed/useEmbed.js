import { useQuery } from "@tanstack/react-query";

import { post } from "../index";

// const mock = {
//   title: "Ele Luz @ Fusion Festival  | Tanzwüste | 2023 by Ele Luz",
//   author: "Ele Luz",
//   description:
//     "Fusion Tanzwüste Samstag 22-00, ich bin immer noch total überwältigt und gerührt was in der Nacht passiert ist. Trotz kurzen Regens war es knüppelvoll und ich konnte bei jedem Strobo-Blitzlicht immer weiter und weiter nach hinten gucken und tanzend leuchtende Totems erblicken, die mir aus der Ferne zuwinkten. Danke für eure Energie und der riesen Freude die ihr mir bereitet habt. Ganz viel Spaß mit der meiner Aufnahme 🌪️\n\nFusion Tanzwüste Saturday 22-00, I am still totally overwhelmed and moved by what happened that night. Despite the brief rain, it was packed and with every strobe light I could see further and further back and glowing dancing totems waving at me from afar. Thanks for your energy and the huge joy you gave me. Have fun with my recording 🌪️",
//   medium: "audio",
//   provider: {
//     name: "SoundCloud",
//     icon: "https://www.youtube.com/s/desktop/4261a0db/img/logos/favicon_32x32.png",
//   },
//   html: '<div><div style="left: 0; width: 100%; height: 140px; position: relative;"><iframe src="//cdn.iframe.ly/api/iframe?card=small&app=1&theme=light&url=https%3A%2F%2Fsoundcloud.com%2Fele_luz%2Fele-luz-tanzwuste-fusion-festival-2023%3Fsi%3Da01e21c9ef63400790d7040f8700eee4%26utm_source%3Dclipboard%26utm_medium%3Dtext%26utm_campaign%3Dsocial_sharing&key=3bfef4cf586ad76048e1aff7cbc5f05e" style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0;" allowfullscreen allow="autoplay *;"></iframe></div></div>',
//   url: "https://soundcloud.com/ele_luz/ele-luz-tanzwuste-fusion-festival-2023?si=a01e21c9ef63400790d7040f8700eee4&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
// };

const getEmbed = async (url) => {
  const response = await post("/api/embed", {
    url,
  });
  return response;
};

export const useEmbed = (url, options) => {
  return useQuery({
    queryKey: ["embed", url],
    queryFn: () => getEmbed(url),
    ...options,
    // staleTime: "Infinity",
  });
};
