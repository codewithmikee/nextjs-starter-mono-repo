export type ControllerComboBoxProps<T> = {
  data: T[];
  labelKey: keyof T;
  valueKey: keyof T;
  onChange?: (value: string) => void;
  selectedValue?: string;
  queryKey?: string | null;
  placeHolder: string;
};

export type AppComboBoxProps<T> = {
  data: T[];
  labelKey: keyof T;
  valueKey: keyof T;
  onChange?: (value: string) => void;
  defaultValue?: string;
  selectedValue?: string;
  placeHolder: string;
};

export type AppComboBoxPropsWithUrl<T> = {
  paramKey: string;
} & AppComboBoxProps<T>;
