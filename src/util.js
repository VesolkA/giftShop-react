export const getValidFilters = (filters) => {
  const validFilters = {};
  for (const key in filters) {
    if (Object.hasOwnProperty.call(filters, key) && filters[key]) {
      validFilters[key] = filters[key]
    }
  }

  return validFilters;
};

export const debounce = (fn, msec) => {
  let lastCall = 0;
  let lastCallTimer = 0;

  return (...arg) => {
    const prevCall = lastCall;
    lastCall = Date.now()

    if (prevCall && lastCall - prevCall <= msec) {
      clearTimeout(lastCallTimer);
    }

    lastCallTimer = setTimeout(() => fn(...arg), msec); 
  };
};

export const formatNumber = (num) => {
  const formatter = new Intl.NumberFormat('ru', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  });
  return formatter.format(num);  
}
