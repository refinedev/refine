import { cn } from "@/lib/utils";
import type { RefineFieldDateProps } from "@refinedev/ui-types";
import dayjs, { type ConfigType } from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

type DateFieldProps = RefineFieldDateProps<
  ConfigType,
  React.ComponentProps<"div">
>;

/**
 * This field is used to display dates. It uses {@link https://day.js.org/docs/en/display/format `Day.js`} to display date format.
 *
 * @see {@link https://refine.dev/docs/api-reference/antd/components/fields/date} for more details.
 */
export function DateField({
  value,
  locales,
  format: dateFormat = "L",
  ...props
}: DateFieldProps) {
  dayjs.extend(LocalizedFormat);

  const defaultLocale = dayjs.locale();

  return (
    <div {...props} className={cn(props.className)}>
      {value
        ? dayjs(value)
            .locale(locales || defaultLocale)
            .format(dateFormat)
        : ""}
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

DateField.displayName = "DateField";
