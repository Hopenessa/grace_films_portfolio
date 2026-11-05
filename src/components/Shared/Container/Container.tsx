import type { ComponentPropsWithoutRef } from "react";
import { Frame } from "./Container.styles";

export function Container(props: ComponentPropsWithoutRef<"div">) {
  return <Frame {...props} />;
}
