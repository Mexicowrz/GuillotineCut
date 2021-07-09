import { PanelElement } from "@models/calculation";

export type PanelSizeListProps = {
  items?: PanelElement[];
  setItems?: (items: PanelElement[]) => void;
}