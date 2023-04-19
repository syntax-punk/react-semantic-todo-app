import React from "react";
import { Button } from "semantic-ui-react";

const FilterButton = (props) => {
  return (
    <Button
      type="button"
      content={props.name}
      basic
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    />
  );
}

export { FilterButton };
