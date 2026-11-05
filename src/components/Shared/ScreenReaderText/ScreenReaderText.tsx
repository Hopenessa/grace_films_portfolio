import type { ComponentPropsWithoutRef } from "react";
import { HiddenText } from "./ScreenReaderText.styles";

export function ScreenReaderText(props: ComponentPropsWithoutRef<"div">) {
  return <HiddenText {...props} />;
}
