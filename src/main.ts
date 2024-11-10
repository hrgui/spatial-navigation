import { SpatialNavigation } from "./SpatialNavigation";
import type { FocusableComponent } from "./SpatialNavigation";

import "./style.css";

(window as any).SpatialNavigation = SpatialNavigation;

SpatialNavigation.init({
  shouldFocusDOMNode: false,
  shouldUseNativeEvents: false,
  debug: true,
});

document.addEventListener("focusin", (e) => {
  console.log(e);
});

SpatialNavigation.eventEmitter.on("sn/onDidNotNavigate", (e) => {
  console.log("didNotNavigate", e);
});

function setFocusableClass(el: HTMLElement, focused: boolean, className = "focused") {
  if (focused) {
    el.classList.add(className);
  } else {
    el.classList.remove(className);
  }
}

function addElement({
  focusKey: id,
  parentFocusKey = "SN:ROOT",
  ...otherProps
}: Partial<FocusableComponent>) {
  const x = document.querySelector(id) as HTMLElement;
  SpatialNavigation.addFocusable({
    focusKey: id,
    node: document.querySelector(id),
    // onEnterPress: () => {},
    // onEnterRelease: () => {},
    // onArrowPress: () => true,
    // onFocus: () => {},
    // onBlur: () => {},
    parentFocusKey,
    onUpdateFocus: (isFocused) => {
      setFocusableClass(x, isFocused);
    },
    onUpdateHasFocusedChild: (isFocused = false) => {
      setFocusableClass(x, isFocused, "focused-root");
    },
    // saveLastFocusedChild: true,
    trackChildren: true,
    // autoRestoreFocus: true,
    // forceFocus: false,
    // isFocusBoundary: false,
    // focusable: true,
    ...otherProps,
  });

  return x;
}

addElement({ focusKey: "#row1" });
addElement({
  focusKey: "#row2",
  onGetChildSibling: ({
    isVerticalDirection,
    isIncrementalDirection,
    proposedSibling,
    currentComponent,
  }) => {
    const currentComponentExtraProps = currentComponent.extraProps;
    const proposedSiblingExtraProps = proposedSibling.extraProps;
    const isHorizontalDirection = !isVerticalDirection;

    if (currentComponentExtraProps && proposedSiblingExtraProps && isHorizontalDirection) {
      const nextIndex = currentComponentExtraProps.index + 1;
      const prevIndex = currentComponentExtraProps.index - 1;

      return isIncrementalDirection
        ? nextIndex === proposedSiblingExtraProps.index
        : prevIndex === proposedSiblingExtraProps.index;
    }

    return false;
  },
});

addElement({ focusKey: "#item1", parentFocusKey: "#row1", extraProps: { index: 1 } });
addElement({ focusKey: "#item2", parentFocusKey: "#row1", extraProps: { index: 2 } });
addElement({ focusKey: "#item3", parentFocusKey: "#row1", extraProps: { index: 3 } });
addElement({ focusKey: "#item4", parentFocusKey: "#row1", extraProps: { index: 4 } });

addElement({ focusKey: "#item5", parentFocusKey: "#row2", extraProps: { index: 1 } });
addElement({ focusKey: "#item6", parentFocusKey: "#row2", extraProps: { index: 2 } });
addElement({ focusKey: "#item7", parentFocusKey: "#row2", extraProps: { index: 3 } });
addElement({ focusKey: "#item8", parentFocusKey: "#row2", extraProps: { index: 4 } });

SpatialNavigation.setFocus("#item1");
