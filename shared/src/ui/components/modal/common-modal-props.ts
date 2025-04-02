import { JSX, PropsWithChildren } from 'react';

export type ModalBaseProps = {
  trigger?: JSX.Element;
  triggerLabel?: string;
  title?: string;
  description?: string;
} & PropsWithChildren;
