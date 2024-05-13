import { useIsMobile } from "../../../ui/hooks/use-is-mobile";
import { Button } from "../../../ui/components/button";
import styled from "styled-components";
import { TextInput } from "../../../ui/components/text-input";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Article } from "../../../typings/news";
import { useNewsLazy } from "../../../api/queries/news/use-news";
import { errorMessageHandler } from "../../../utils/error-handler/error-handler";
import { ErrorEnum } from "../../../utils/error-handler/error-enums";
import { AxiosError } from "axios";
import { Table } from "./table";
import Select from "react-select";
import { shuffleArray } from "../../../utils/error-handler/shuffel";
import { DatePickerInput } from "../../../ui/components/date-picker-input";
import { useTimeZone } from "../../../hooks/use-time-zone";
import { useFilters, useSetFilters } from "../../../ui/components/filters";
import { Filters } from "../typings/filters";
import {
  formatDateTime,
  formatUserFullName,
  parseDate,
} from "../../../ui/__common__";
import useDebounce from "../../../hooks/useDebounce";

const options = [
  { value: "none", label: "Select news source" },
  { value: "newsapi", label: "News Api" },
  { value: "theguardian", label: "The Guardian" },
  { value: "nytimes", label: "The New York Times" },
];

export function NewsPage(): React.ReactElement | null {
  const isMobile = useIsMobile();
  const timeZone = useTimeZone();
  const filters = useFilters<Filters>();
  const setFilters = useSetFilters<Filters>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [source, setSource] = useState(
    options.find((option) => option.value === filters?.source) || options[0]
  );

  const [data, setData] = useState<Article[] | []>([]);
  const [keyword, setKeyword] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  const debouncedAuthor = useDebounce(author, 100);
  const getNews = useNewsLazy();
  const handleChange = (selectedOption: any) => {
    setSource(selectedOption);
    setFilters((filters) => ({
      ...filters,
      source: selectedOption.value,
    }));
    // You can handle the selected news source here
  };

  const searchNews = async () => {
    try {
      if (!keyword) {
        errorMessageHandler(ErrorEnum.emptyField);
        return;
      }
      setLoading(true);
      let articles: Article[] | [] = [];
      try {
        let nytimesNews = [];
        for (let i = 1; i <= 5; i++) {
          const news = await getNews({
            keyword: keyword,
            source: "nytimes",
            page: i,
          });
          nytimesNews.push(...news.data.response.docs);
        }

        if (nytimesNews.length > 0) {
          const _data = nytimesNews.map((results: any) => {
            return {
              source: "nytimes",
              author: formatUserFullName(results.byline.person[0]) ?? "",
              title: results.headline.main,
              description: results.snippet,
              url: results.web_url,
              urlToImage:
                results?.multimedia?.length > 0
                  ? `https://www.nytimes.com/${results.multimedia[0].url}`
                  : "",
              publishedAt: results.pub_date,
              content: results.lead_paragraph,
            };
          });
          articles = [...articles, ..._data];
        }
      } catch (e) {}

      try {
        const newsapiResponse = await getNews({
          keyword: keyword,
          source: "newsapi",
        });
        if (newsapiResponse?.data?.articles) {
          const _data = newsapiResponse?.data?.articles?.map((article: any) => {
            return {
              source: "newsapi",
              author: article.author,
              title: article.title,
              description: article.description,
              url: article.url,
              urlToImage: article.urlToImage,
              publishedAt: article.publishedAt,
              content: article.content,
            };
          });
          articles = [...articles, ..._data];
        }
      } catch (e) {}

      try {
        const theguardianResponse = await getNews({
          keyword: keyword,
          source: "theguardian",
        });

        if (theguardianResponse?.data?.response?.results) {
          const _data = theguardianResponse.data.response.results.map(
            (results: any) => {
              return {
                source: "theguardian",
                author: "",
                title: "",
                description: results.webTitle,
                url: results.webUrl,
                urlToImage: "",
                publishedAt: results.webPublicationDate,
                content: "",
              };
            }
          );
          articles = [...articles, ..._data];
        }
      } catch (e) {}

      const shuffledArticles = shuffleArray(articles);
      setData(shuffledArticles);
    } catch (e) {
      errorMessageHandler((e as AxiosError).message);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = useMemo(() => {
    return data.filter((article) => {
      let isSameDate = true;
      if (filters.date) {
        const dateFormat = "MMMM do, yyyy";
        const _filtersDate = filters.date;
        const _publishedAt = article.publishedAt
          ? parseDate(article.publishedAt)
          : undefined;

        isSameDate = !!(
          _filtersDate &&
          _publishedAt &&
          formatDateTime(_filtersDate, dateFormat, timeZone) ===
            formatDateTime(_publishedAt, dateFormat, timeZone)
        );
      }
      return (
        (filters.source && filters.source !== "none"
          ? article.source === filters.source
          : true) &&
        (filters.author
          ? article?.author
              ?.toLowerCase()
              .includes(filters.author.toLowerCase())
          : true) &&
        (filters.date ? isSameDate : true)
      );
    });
  }, [data, filters, timeZone]);

  useEffect(() => {
    setFilters((filters) => ({
      ...filters,
      author: debouncedAuthor ? debouncedAuthor : undefined,
    }));
  }, [debouncedAuthor, setFilters]);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef?.current) {
        const height = containerRef.current.getBoundingClientRect().height;
        setHeight(height);
      }
    };
    updateHeight();

    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <div>
      <StickyContainer ref={containerRef}>
        <InputContainer isMobile={isMobile}>
          <GroupContainer isMobile={isMobile}>
            <TextInput
              onChangeText={(value) => {
                setKeyword(value);
              }}
              style={{ height: "38px" }}
              placeholder={"keyword"}
            />
          </GroupContainer>
          <GroupContainer
            isMobile={isMobile}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              onClick={searchNews}
              loading={loading}
              variant="outlined"
              style={{ height: "38px" }}
              glyph="search"
            >
              Search
            </Button>
          </GroupContainer>
        </InputContainer>
        <InputContainer isMobile={isMobile}>
          <GroupContainer isMobile={isMobile}>
            <Select
              value={source}
              onChange={handleChange}
              options={options}
              styles={{
                container: (provided) => ({
                  ...provided,
                  width: "100%",
                }),
              }}
            />
          </GroupContainer>
          <GroupContainer isMobile={isMobile}>
            <TextInput
              onChangeText={(value) => {
                setAuthor(value);
              }}
              style={{ height: "38px" }}
              placeholder={"author"}
            />
          </GroupContainer>
          <GroupContainer isMobile={isMobile}>
            <DatePickerInput
              date={filters.date}
              timeZone={timeZone}
              style={{ height: "38px", width: "100%" }}
              onChange={(date) => {
                if (date) {
                  setFilters((filters) => ({
                    ...filters,
                    date,
                  }));
                }
              }}
              placeholder="date"
              onClear={() => {
                setFilters((filters) => ({
                  ...filters,
                  date: undefined,
                }));
              }}
            />
          </GroupContainer>
        </InputContainer>
      </StickyContainer>

      <Table data={filteredData} height={height} />
    </div>
  );
}

const InputContainer = styled("div").withConfig<{
  isMobile: boolean;
}>({
  shouldForwardProp: (prop) => !["isMobile"].includes(prop),
})`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? "column" : "row")};
  margin-top: 16px;
  &:not(:first-child) {
    margin-bottom: 16px;
  }
  margin-bottom: 16px;
`;
const StickyContainer = styled("div")`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: white;
  padding-bottom: 5px;
  padding-top: 16px;
`;
const GroupContainer = styled("div").withConfig<{
  isMobile: boolean;
}>({
  shouldForwardProp: (prop) => !["isMobile"].includes(prop),
})`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 16px;
  width: ${({ isMobile }) => (isMobile ? "auto" : "300px")};
  margin-top: ${({ isMobile }) => (isMobile ? "15px" : "0")};
`;
