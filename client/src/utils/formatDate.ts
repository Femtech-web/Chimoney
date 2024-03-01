export function formatDate(timestamp: number) {
  if (timestamp) {
    const milliseconds = timestamp * 1000;

    const date = new Date(milliseconds);

    const options: any = { day: "numeric", month: "short", year: "numeric" };
    const dateString = date.toLocaleDateString("en-US", options);

    console.log(dateString);
    return dateString;
  }
}

export function formatLocalDate(value: any) {
  if (value) {
    const date = new Date(value);

    if (value !== null) {
      const options: any = { day: "numeric", month: "short", year: "numeric" };
      const dateString = date.toLocaleDateString("en-US", options);

      console.log(dateString);
      return dateString;
    } else {
      return null;
    }
  }
}
