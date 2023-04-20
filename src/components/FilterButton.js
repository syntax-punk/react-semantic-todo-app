import React from "react";
import { Button } from "semantic-ui-react";

const FilterButton = (props) => {
  return (
    <Button
      type="button"
      content={props.name}
      basic={props.isPressed ? false : true}
      color="blue"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    />
  );
}

export { FilterButton };
