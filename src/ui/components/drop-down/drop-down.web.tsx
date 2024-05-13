import styled from "styled-components";
import {
  useFloating,
  offset,
  shift,
  autoUpdate,
  useClick,
  useInteractions,
  useListNavigation,
  size,
  useDismiss,
  FloatingPortal,
  Placement,
} from "@floating-ui/react";
import {
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  MutableRefObject,
  Dispatch,
  SetStateAction,
  ReactElement,
  forwardRef,
  ForwardedRef,
  useLayoutEffect,
} from "react";
import { EscapeHandler } from "../../modules/escape-handler";
import { isDescendantOf } from "../../utils/is-descendant-of";
import { DropDownProps } from "./drop-down";
import { GetItemPropsContext } from "./contexts/get-item-props-context";
import { ListRefContext } from "./contexts/list-ref-context";
import { RequestCloseContext } from "./contexts/request-close-context";
import { FocusItemContext } from "./contexts/focus-item-context";
import { CloseSource } from "./typings/close-source";
import { IsInDropDownContext } from "./contexts/is-in-drop-down-context";

export const DropDown = forwardRef(function DropDown(
  {
    content,
    height,
    width,
    placement = "bottom",
    onOpen,
    onClose,
    open: controlledOpen,
    defaultOpen = false,
    onRequestOpen,
    onRequestClose,
    children,
    elementRef,
    minHeight,
    maxHeight,
    minWidth,
    maxWidth,
    style,
    shiftX = 0,
    shiftY = 0,
    ...props
  }: Omit<DropDownProps, "ref">,
  ref?: ForwardedRef<HTMLDivElement>
): ReactElement | null {
  const isControlled = typeof controlledOpen === "boolean";
  const [stateOpen, setStateOpen] = useState(defaultOpen);
  const open = isControlled ? controlledOpen : stateOpen;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeSource = useRef<undefined | CloseSource>(undefined);
  const prevOpen = useRef(open);
  useEffect(() => {
    if (open !== prevOpen.current) {
      prevOpen.current = open;
      if (open && onOpen) onOpen();
      else if (!open && onClose) onClose();
    }
  }, [open, onOpen, onClose]);

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (open) {
        const event = new Event("requestOpen", { bubbles: true });
        if (onRequestOpen) onRequestOpen(event);
        if (!isControlled) setStateOpen(open);
      } else {
        const event: Event & { source?: CloseSource } = new Event(
          "requestOpen",
          {
            bubbles: true,
          }
        );
        event.source = closeSource.current;
        closeSource.current = undefined;
        if (onRequestClose) onRequestClose(event);
        if (!isControlled) setStateOpen(open);
      }
    },
    [onRequestOpen, onRequestClose, isControlled]
  );

  const requestClose = useCallback(
    (source: CloseSource) => {
      const event: Event & { source?: CloseSource } = new Event("requestOpen", {
        bubbles: true,
      });
      event.source = source;
      closeSource.current = undefined;
      if (onRequestClose) onRequestClose(event);
      if (!isControlled) setStateOpen(false);
    },
    [onRequestClose, isControlled]
  );

  const listRef = useRef<Array<HTMLLIElement | null>>([]);
  const { x, y, refs, strategy, context, middlewareData } = useFloating({
    whileElementsMounted: autoUpdate,
    placement,
    middleware: [
      offset(4),
      {
        name: "flip",
        async fn(state) {
          const boundingRect = state.elements.reference.getBoundingClientRect();
          const availableHeight =
            window.innerHeight - (boundingRect.y + boundingRect.height);
          const minHeightRequired =
            typeof minHeight === "number" ? minHeight : 100;
          return availableHeight >= minHeightRequired
            ? {}
            : {
                reset: {
                  placement: placement.match(/^bottom/)
                    ? (placement.replace(/^bottom/, "top") as Placement)
                    : (placement.replace(/^top/, "bottom") as Placement),
                },
              };
        },
      },
      shift(),
      size({
        apply({ availableWidth, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxWidth: `${availableWidth}px`,
            maxHeight: `${availableHeight - 8}px`,
            overflow: "auto",
          });
        },
      }),
    ],
    open,
    onOpenChange,
  });

  const referenceHidden =
    typeof middlewareData.hide === "object" &&
    typeof middlewareData.hide.referenceHidden !== "undefined"
      ? middlewareData.hide.referenceHidden
      : false;

  const click = useClick(context);
  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true,
    focusItemOnHover: false,
  });

  useEffect(() => {
    if (open) {
      return EscapeHandler.addEventListener(() => {
        requestClose("escape");
        return true;
      });
    }
    return undefined;
  }, [open, requestClose]);

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, listNavigation]
  );

  useDismiss(context, {
    escapeKey: false,
    outsidePress: (event) => {
      if (
        event.target &&
        refs.reference.current &&
        (event.target === refs.reference.current ||
          isDescendantOf(event.target, refs.reference.current))
      ) {
        closeSource.current = "toggle";
      } else {
        closeSource.current = "outsidePress";
      }
      return true;
    },
  });

  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;
  const focusItemContext = useMemo(
    (): [
      MutableRefObject<null | number>,
      Dispatch<SetStateAction<null | number>>
    ] => [activeIndexRef, setActiveIndex],
    []
  );

  const triggerElementRef = useRef<HTMLElement | null>(null);

  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const [dimensions, setDimensions] = useState<{
    width: null | number;
    height: null | number;
  }>({ width: null, height: null });
  const dimensionsRef = useRef(dimensions);
  dimensionsRef.current = dimensions;

  const handleDimensions = useCallback(() => {
    if (
      mounted.current &&
      triggerElementRef.current &&
      (minWidth === "element" ||
        maxWidth === "element" ||
        minHeight === "element" ||
        maxHeight === "element")
    ) {
      const width = triggerElementRef.current.offsetWidth;
      const height = triggerElementRef.current.offsetHeight;
      if (
        width !== dimensionsRef.current.width ||
        height !== dimensionsRef.current.height
      ) {
        setDimensions({ width, height });
      }
    }
  }, [maxHeight, maxWidth, minHeight, minWidth]);

  useEffect(() => {
    window.addEventListener("resize", handleDimensions);
    return () => window.removeEventListener("resize", handleDimensions);
  }, [handleDimensions]);

  useLayoutEffect(() => {
    handleDimensions();
  });

  return (
    <>
      {isValidElement(children) ? (
        cloneElement(children, {
          ref: (instance: HTMLElement | null) => {
            refs.setReference(instance);
            if (typeof elementRef === "function") elementRef(instance);
            else if (elementRef && typeof elementRef === "object")
              (elementRef as MutableRefObject<unknown>).current = instance;
            triggerElementRef.current = instance;
          },
          ...getReferenceProps(),
        } as never)
      ) : (
        <span
          ref={(instance) => {
            refs.setReference(instance);
            triggerElementRef.current = instance;
          }}
          {...getReferenceProps()}
        >
          {children}
        </span>
      )}

      {open ? (
        <FloatingPortal>
          <IsInDropDownContext.Provider value={true}>
            <FocusItemContext.Provider value={focusItemContext}>
              <RequestCloseContext.Provider value={requestClose}>
                <ListRefContext.Provider value={listRef}>
                  <GetItemPropsContext.Provider value={getItemProps}>
                    <DropDownContainer
                      height={height}
                      width={width}
                      minWidth={
                        minWidth === "element" ? dimensions.width : minWidth
                      }
                      maxWidth={
                        maxWidth === "element" ? dimensions.width : maxWidth
                      }
                      minHeight={
                        minHeight === "element" ? dimensions.height : minHeight
                      }
                      maxHeight={
                        maxHeight === "element" ? dimensions.height : maxHeight
                      }
                      ref={(element: HTMLDivElement) => {
                        refs.setFloating(element);
                        if (typeof ref === "function") {
                          ref(element);
                        } else if (ref) {
                          ref.current = element;
                        }
                      }}
                      style={{
                        position: strategy,
                        top: y ? y - shiftY : 0,
                        left: x ? x - shiftX : 0,
                        visibility: referenceHidden ? "hidden" : "visible",
                        ...style,
                      }}
                      {...getFloatingProps()}
                      {...props}
                    >
                      {content}
                    </DropDownContainer>
                  </GetItemPropsContext.Provider>
                </ListRefContext.Provider>
              </RequestCloseContext.Provider>
            </FocusItemContext.Provider>
          </IsInDropDownContext.Provider>
        </FloatingPortal>
      ) : null}
    </>
  );
});

type DropDownContainerProps = Pick<DropDownProps, "width" | "height"> & {
  minWidth?: number | null;
  maxWidth?: number | null;
  minHeight?: number | null;
  maxHeight?: number | null;
};

const DropDownContainer = styled("div").withConfig<DropDownContainerProps>({
  shouldForwardProp: (prop) =>
    prop !== "minWidth" &&
    prop !== "maxWidth" &&
    prop !== "minHeight" &&
    prop !== "maxHeight" &&
    prop !== "width" &&
    prop !== "height",
})`
  background-clip: padding-box;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1), 0px 3px 6px rgba(0, 0, 0, 0.2),
    0px 1px 3px rgba(0, 0, 0, 0.4), 0px 0px 1px rgba(0, 0, 0, 0.2);
  margin: 0px;
  opacity: 1;
  outline: none;
  overflow: hidden;
  padding: 0px;
  position: absolute;
  text-align: center;
  ${({ width }) =>
    typeof width === "number"
      ? `width: ${width}px;`
      : width === "auto"
      ? "width: fit-content;"
      : width === "max"
      ? "width: 100vw;"
      : ""}
  ${({ height }) =>
    typeof height === "number"
      ? `height: ${height}px;`
      : height === "auto"
      ? "height: fit-content;"
      : height === "max"
      ? "height: 100vh;"
      : ""}
  ${({ maxWidth }) =>
    typeof maxWidth === "number" ? `max-width: ${maxWidth}px;` : ""}
  ${({ minWidth }) =>
    typeof minWidth === "number" ? `min-width: ${minWidth}px;` : ""}
  ${({ maxHeight }) =>
    typeof maxHeight === "number" ? `max-height: ${maxHeight}px;` : ""}
  ${({ minHeight }) =>
    typeof minHeight === "number" ? `max-height: ${minHeight}px;` : ""}
  z-index: 3000;

  &::scrollbar {
    width: 0px;
    height: 0px;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
  scrollbar-height: none;
  &::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
  }

  li {
    &:first-of-type,
    &:first-of-type > button,
    &:first-of-type > a {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
    &:last-of-type,
    &:last-of-type > button,
    &:last-of-type > a {
      border-bottom: none;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
`;
