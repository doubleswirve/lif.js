export function displayByNumSys ({count, type}) {
  switch (type) {
    case 'BIN':
      // @see https://stackoverflow.com/a/16155417/1858091
      return (count >>> 0).toString(2);
    case 'DEC':
      return count;
    default:
      return 'N/A';
  }
}
