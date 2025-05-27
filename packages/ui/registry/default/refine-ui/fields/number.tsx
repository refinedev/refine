import { cn } from "@/lib/utils";
import type { RefineFieldNumberProps } from "@refinedev/ui-types";

type NumberFieldProps = RefineFieldNumberProps<
  string | number,
  React.ComponentProps<"div">
>;

export function NumberField({
  value,
  locale,
  options,
  ...props
}: NumberFieldProps) {
  const number = Number(value);

  return (
    <div {...props} className={cn("tabular-nums", props.className)}>
      {toLocaleStringSupportsOptions()
        ? number.toLocaleString(locale, options)
        : number}
    </div>
  );
}

function toLocaleStringSupportsOptions() {
  return !!(
    typeof Intl === "object" &&
    Intl &&
    typeof Intl.NumberFormat === "function"
  );
}

NumberField.displayName = "NumberField";
