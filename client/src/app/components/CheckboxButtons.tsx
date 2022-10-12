import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useEffect, useState } from "react";

interface Props {
  items: string[];
  checked: string[];
  onChange: (items: string[]) => void;
}

const CheckboxButtons = ({ items, checked, onChange }: Props) => {
  const [checkedItems, setCheckedItems] = useState(checked || []);

  function handleChecked(value: string) {
    const currentIndex = checkedItems.findIndex((item) => item === value);
    let newChecked: string[] = [];
    if (currentIndex === -1) newChecked = [...checkedItems, value];
    else newChecked = checkedItems.filter((item) => item !== value);
    setCheckedItems(newChecked);
    onChange(newChecked);
  }

  useEffect(() => {
    setCheckedItems(checked);
  }, [checked]);

  return (
    <FormGroup>
      {items.map((item) => {
        return (
          <FormControlLabel
            control={
              <Checkbox
                onClick={() => handleChecked(item)}
                checked={checkedItems.indexOf(item) !== -1}
              />
            }
            label={item}
            key={item}
          />
        );
      })}
    </FormGroup>
  );
};

export default CheckboxButtons;
