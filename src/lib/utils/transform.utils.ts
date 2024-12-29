export function toEnglishDigits(str: string) {
  // convert persian digits [۰۱۲۳۴۵۶۷۸۹]
  var e = "۰".charCodeAt(0);
  str = str.replace(/[۰-۹]/g, (t: string) => {
    return (t.charCodeAt(0) - e).toString();
  });

  // convert arabic indic digits [٠١٢٣٤٥٦٧٨٩]
  e = "٠".charCodeAt(0);
  str = str.replace(/[٠-٩]/g, (t: string) => {
    return (t.charCodeAt(0) - e).toString();
  });
  return str;
}

export function formatCurrency(value: number | string) {
  if (typeof value === "string") {
    const number = Number(value);
    const isNumber = !isNaN(number);
    if (isNumber) {
      return Intl.NumberFormat("en-US").format(number);
    } else {
      console.warn("[price value is incorrect]");
      return 0;
    }
  }
  return Intl.NumberFormat("en-US").format(value);
}

export function normalizeCurrency(value: string) {
  const numericString = value.replace(/,/g, "");
  return parseFloat(numericString);
}

// @ts-ignore
export function acceptOnlyNumberOnKeyPress(e: KeyboardEvent<HTMLInputElement>) {
  // eslint-disable-next-line no-useless-escape
  const isNumeric = /^[0-9۰-۹\-\+\.\,\/]*$/;
  if (!isNumeric.test(e.key)) {
    e.preventDefault();
  }
}

export function separateNumberDigits(number: number, showDigits = false) {
  if (!number || isNaN(number)) return "0";
  const _number = showDigits ? number.toFixed(2) : number.toFixed();
  return (_number + "").replace(/\d(?=(\d{3})+$)/g, "$&,");
}

export function summarizeTheNumber(number: number) {
  if (!number || isNaN(number)) return "0";
  if (number > 1e12) return `${(number / 1e12).toFixed(2)} T`;
  if (number > 1e9) return `${(number / 1e9).toFixed(2)} B`;
  if (number > 1e6) return `${(number / 1e6).toFixed(2)} M`;
  if (number > 1e3) return `${(number / 1e3).toFixed(1)} K`;

  return number.toFixed();
}