import "./style.css";

import { SpatialNavigation } from "./SpatialNavigation";

(window as any).SpatialNavigation = SpatialNavigation;

SpatialNavigation.init({
  shouldFocusDOMNode: true,
});

document.addEventListener("focusin", (e) => {
  console.log(e);
});

function setFocusableClass(el: HTMLElement, focused: boolean, className = "focused") {
  if (focused) {
    el.classList.add(className);
  } else {
    el.classList.remove(className);
  }
}

function addElement(id: string, parentFocusKey = "SN:ROOT") {
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
  });

  return x;
}

addElement("#row1");
addElement("#row2");

addElement("#item1", "#row1");
addElement("#item2", "#row1");
addElement("#item3", "#row1");
addElement("#item4", "#row1");
addElement("#item5", "#row2");
addElement("#item6", "#row2");
addElement("#item7", "#row2");
addElement("#item8", "#row2");

SpatialNavigation.setFocus("#item1");
