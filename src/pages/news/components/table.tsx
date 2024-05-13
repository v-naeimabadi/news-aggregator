import {
  Table as TableBase,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "../../../ui/components/table";

import styled from "styled-components";
import { Text } from "../../../ui/components/text";
import { Button } from "../../../ui/components/button";
import { Article } from "../../../typings/news";
import { formatDateTime, parseDate } from "../../../ui/__common__";
import { useTimeZone } from "../../../hooks/use-time-zone";
import { useIsMobile } from "../../../ui/hooks/use-is-mobile";
import { SectionDivider } from "../../../ui/components/section-divider/section-divider.web";

interface TableProps {
  data: Article[];
  height: number | null;
}

export function Table({ data, height }: TableProps) {
  const tz = useTimeZone();
  const isMobile = useIsMobile();

  return data ? (
    <StyledTable>
      <StyledTableHeader isMobile={isMobile} top={height}>
        <TableRow type="th">
          <TableHeaderCell cellKey="avatar" width={64} />
          <StyledTableHeaderCellAuthor cellKey="author">
            author
          </StyledTableHeaderCellAuthor>
          <StyledTableHeaderCellDate cellKey="Date">
            Date
          </StyledTableHeaderCellDate>
          {!isMobile ? (
            <TableHeaderCell cellKey="description">description</TableHeaderCell>
          ) : null}

          <StyledTableHeaderCellActions cellKey="actions" />
        </TableRow>
      </StyledTableHeader>
      <TableBody>
        {data.map((el: Article, index: number) => (
          <>
            <TableRow
              key={index}
              style={{ borderBottom: isMobile ? "none" : "1px solid #d8d9d8" }}
            >
              <TableCell>
                {el.urlToImage ? (
                  <img
                    src={el.urlToImage}
                    alt={""}
                    style={{
                      borderRadius: "5px",
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      marginTop: "5px",
                    }}
                  />
                ) : null}
              </TableCell>
              <TableCell>
                <div
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "110px", // Adjust this value to suit your needs
                  }}
                >
                  <StyledName>{`${el.author}`}</StyledName>
                </div>
              </TableCell>
              <TableCell>
                <Text>
                  {el.publishedAt
                    ? formatDateTime(
                        parseDate(el.publishedAt) as Date,
                        "MMMM do, yyyy",
                        tz
                      )
                    : ""}
                </Text>
              </TableCell>
              {!isMobile ? (
                <TableCell>
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Text>{el.description}</Text>
                  </div>
                </TableCell>
              ) : null}

              <TableCell>
                <Button
                  variant="outlined"
                  style={{ height: "32px", width: "32px" }}
                  glyph="web"
                  onClick={() => window.open(el.url, "_blank")}
                />
              </TableCell>
            </TableRow>
            {isMobile ? (
              <div style={{ width: "95vw" }}>
                <StyledName>Description: </StyledName>
                <Text>{el.description}</Text>
                <SectionDivider />
              </div>
            ) : null}
          </>
        ))}
      </TableBody>
    </StyledTable>
  ) : null;
}

const StyledTableHeader = styled(TableHeader).withConfig<{
  top: number | null;
  isMobile: boolean;
}>({
  shouldForwardProp: (prop) => !["isMobile"].includes(prop),
})`
  top: ${({ top, isMobile }) =>
    top ? `${top}px` : isMobile ? "300px" : "100px"};
  position: sticky;
  background: #292727;
  z-index: 1;
`;

const StyledName = styled(Text)`
  font-size: 14px;
  font-weight: 600;
`;

const StyledTable = styled(TableBase)`
  min-width: auto;
  /* margin-top: 16px; */
`;

const StyledTableHeaderCellActions = styled(TableHeaderCell)`
  width: 32px !important;
  font-weight: 600;
`;

const StyledTableHeaderCellDate = styled(TableHeaderCell)`
  width: 180px !important;
  font-weight: 600;
`;

const StyledTableHeaderCellAuthor = styled(TableHeaderCell)`
  width: 120px !important;
  font-weight: 600;
`;
