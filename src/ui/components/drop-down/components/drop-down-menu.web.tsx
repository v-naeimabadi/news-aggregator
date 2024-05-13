import { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { FocusItemContext } from "../contexts/focus-item-context";
import { IndexContext } from "../contexts/index-context";
import { DropDownMenuProps } from "./drop-down-menu";

export function DropDownMenu({
  items,
  ...props
}: Omit<DropDownMenuProps, "ref">) {
  const focusItemContext = useContext(FocusItemContext);
  const itemsLength = useRef(items.length);
  itemsLength.current = items.length;

  useEffect(() => {
    if (focusItemContext) {
      const [activeIndexRef, setActiveIndex] = focusItemContext;
      const listener = (e: KeyboardEvent) => {
        if (e.key === "ArrowDown" && activeIndexRef.current === null) {
          e.preventDefault();
          setActiveIndex(0);
        } else if (e.key === "ArrowUp" && activeIndexRef.current === null) {
          e.preventDefault();
          setActiveIndex(itemsLength.current - 1);
        }
      };
      document.addEventListener("keydown", listener);
      return () => {
        document.removeEventListener("keydown", listener);
      };
    }
    return undefined;
  }, [focusItemContext]);

  return (
    <StyledList {...props}>
      {items.map((item, index) => (
        <IndexContext.Provider value={index} key={index}>
          {item}
        </IndexContext.Provider>
      ))}
    </StyledList>
  );
}

const StyledList = styled("ul")`
  list-style: none;
  margin: 0;
  padding: 0;
`;
