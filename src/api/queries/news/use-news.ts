import { useQueryClient } from "@tanstack/react-query";
import {
  GUARDIAN_API_KEY,
  NEWS_API_KEY,
  NYTIMES_API_KEY,
} from "../../../config/env";
import { axios } from "../../../config/axios";

export interface NewsQueryVariables {
  keyword?: string;
  source: "newsapi" | "theguardian" | "nytimes";
  page?: number;
}

export const searchNews = async (variables: NewsQueryVariables) => {
  let _API_KEY = "";
  let url = "";
  switch (variables.source) {
    case "newsapi":
      axios.defaults.baseURL = "https://cors-anywhere.herokuapp.com/https://newsapi.org/v2";
      _API_KEY = NEWS_API_KEY;
      url = "/everything";
      break;
    case "theguardian":
      axios.defaults.baseURL = "https://content.guardianapis.com";
      _API_KEY = GUARDIAN_API_KEY;
      url = "/search";
      break;
    case "nytimes":
      axios.defaults.baseURL =
        "https://cors-anywhere.herokuapp.com/http://api.nytimes.com";
      _API_KEY = NYTIMES_API_KEY;
      url = "/svc/search/v2/articlesearch.json";
      axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
      break;
    default:
      break;
  }
  return await axios.get(url, {
    params: {
      q: variables.keyword,
      query: variables.keyword,
      sortBy: "popularity",
      apiKey: _API_KEY,
      "api-key": _API_KEY,
      "page-size": 100,
      page: variables.page,
    },
  });
};

export const useNewsLazy = () => {
  const queryClient = useQueryClient();
  return (variables: NewsQueryVariables) =>
    queryClient.ensureQueryData({
      queryKey: ["newsPageSearchQuery", variables],
      queryFn: () => searchNews(variables),
    });
};
