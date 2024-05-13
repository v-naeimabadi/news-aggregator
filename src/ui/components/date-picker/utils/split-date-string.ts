export function splitDateString(
  value: string,
  format: "mm/dd/yyyy" | "yyyy-mm-dd",
): [string, string, string] {
  if (format === "yyyy-mm-dd") {
    const year = value.match(/^(\d{4}).*/)
      ? value.replace(/^(\d{4}).*/, "$1")
      : "";
    const month = value.match(/^\d{4}-(\d{2}).*/)
      ? value.replace(/^\d{4}-(\d{2}).*/, "$1")
      : "";
    const day = value.match(/^\d{4}-\d{2}-(\d{2}).*/)
      ? value.replace(/^\d{4}-\d{2}-(\d{2}).*/, "$1")
      : "";
    return [year, month, day];
  } else {
    const month = value.match(/^(\d{1,2}).*/)
      ? value.replace(/^(\d{1,2}).*/, "$1")
      : "";
    const day = value.match(/^\d{1,2}\/(\d{1,2}).*/)
      ? value.replace(/^\d{1,2}\/(\d{1,2}).*/, "$1")
      : "";
    const year = value.match(/^\d{1,2}\/\d{1,2}\/(\d{1,4}).*/)
      ? value.replace(/^\d{1,2}\/\d{1,2}\/(\d{1,4}).*/, "$1")
      : "";
    return [year, month, day];
  }
}
