export function extractDatabaseTableName(query: string) {
  // Match "select * from" pattern, including and excluding spaces
  const match = query.match(
    /\b\s*select\s+\*\s+from\b|\b\s*select\*\s+from\b|\b\s*select\s+\*\b|\b\s*select\*\b/gi
  );

  if (!match) return null;

  // Get the substring after the matched pattern
  const startIndex = match[0].indexOf("from") + 4;
  const substring = query.substring(startIndex).trim();

  // Split the substring by whitespace characters and return the first word
  const words = substring.split(/\s+/);
  return words.length > 0 ? words[0] : null;
}

export function flattenObject(obj: { [key: string]: any }) {
  let flatObject: { [key: string]: any } = {};

  for (let key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(flatObject, flattenObject(obj[key]));
    } else {
      flatObject[key] = obj[key];
    }
  }

  return flatObject;
}
