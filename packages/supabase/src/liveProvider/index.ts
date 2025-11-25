const mapFilter = (filters?: CrudFilters): string | undefined => {
  if (!filters || filters.length === 0) {
    return;
  }

  // Allow opt-in to the old behavior via meta.realtime.allowMultipleFilters
  const allowMultiple = meta?.realtime?.allowMultipleFilters === true;

  const mapped = filters
    .map((filter: CrudFilter): string | undefined => {
      if ("field" in filter) {
        return `${filter.field}=${mapOperator(filter.operator)}.${filter.value}`;
      }
      return;
    })
    .filter(Boolean) as string[];

  if (mapped.length === 0) {
    return;
  }

  if (mapped.length === 1) {
    return mapped[0];
  }

  // If user explicitly asked to keep multiple filters, preserve previous behavior
  if (allowMultiple) {
    return mapped.join(",");
  }

  // Default safe behavior: warn and use only the first filter
  // eslint-disable-next-line no-console
  console.warn(
    "[refine:supabase] Supabase Realtime does not support multiple filters. Using the first filter only. To preserve previous behavior, set meta.realtime.allowMultipleFilters = true",
  );

  return mapped[0];
};
