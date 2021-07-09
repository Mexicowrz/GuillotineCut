import { ProductElement } from "@models/calculation";

export type ProductListProps = {
  items?: ProductElement[];
  setItems?: (items: ProductElement[]) => void;
}