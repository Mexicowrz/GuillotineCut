import { ItemElement } from "@models/calculation";

export type ItemListProps = {
  title: string;
  items?: ItemElement[];
  setItems?: (items: ItemElement[]) => void;
};