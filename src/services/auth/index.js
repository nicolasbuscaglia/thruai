import { COOKIE_KEY_ACCESS_TOKEN } from "@/constants";
import { getCookie } from "@/utils/getCookie";

const getAccessToken = () => {
  return getCookie(COOKIE_KEY_ACCESS_TOKEN);
};

export { getAccessToken };
