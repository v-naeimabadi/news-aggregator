import { ForwardedRef, forwardRef, ReactElement } from "react";
import styled from "styled-components";
import { HeaderBarTitle } from "./components/header-bar-title.web";
import { HeaderBarProps } from "./header-bar";

function RefForwardingHeaderBar(
  {
    title,
    rigthContent,
    leftContent,
    children,
    ...props
  }: Omit<HeaderBarProps, "ref">,
  ref?: ForwardedRef<HTMLDivElement>,
): ReactElement | null {
  return (
    <HeaderContainer ref={ref} {...props}>
      {leftContent}
      {typeof title === "string" ? (
        <HeaderBarTitle>{title}</HeaderBarTitle>
      ) : (
        title
      )}
      {children}
      {rigthContent}
    </HeaderContainer>
  );
}

const HeaderContainer = styled("div")`
  background-color: white;
  border-bottom: 1px solid #e8e8e8;
  box-sizing: border-box;
  // 16px bottom to account for border
  padding: 17px 32px 16px 32px;
`;

export const HeaderBar = forwardRef(RefForwardingHeaderBar);
