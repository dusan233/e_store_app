import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
interface Props {
  options: any[];
  onChange: (event: any) => void;
  selectedValue: string;
}

const RadioButtonGroup = ({ options, onChange, selectedValue }: Props) => {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        onChange={onChange}
        value={selectedValue}
      >
        {options.map(({ value, label }) => {
          return (
            <FormControlLabel
              key={value}
              value={value}
              control={<Radio />}
              label={label}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonGroup;
