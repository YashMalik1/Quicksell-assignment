function storeData(key, value) {
  const stringValue = JSON.stringify(value);
  localStorage.setItem(key, stringValue);
}

function fetchData(key) {
  const stringValue = localStorage.getItem(key);
  try {
    return JSON.parse(stringValue);
  } catch (error) {
  return stringValue;
  }
}

export { storeData, fetchData };
