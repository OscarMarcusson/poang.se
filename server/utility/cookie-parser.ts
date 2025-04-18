export function convertCookieStringToRecord(
  cookies: string | undefined | null
): Record<string, string> {
  const output: Record<string, string> = {};

  if (cookies) {
    for (const raw of cookies.split(";")) {
      const start = raw.indexOf("=");
      if (start > 0) {
        const key = raw.substring(0, start);
        const value = raw.substring(start + 1);
        output[key] = value;
      }
    }
  }

  return output;
}
