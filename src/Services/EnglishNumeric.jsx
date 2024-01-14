const convertToWesternNumerals = (persianNumerals) => {
    const persianToWesternMap = {
      '۰': '0',
      '۱': '1',
      '۲': '2',
      '۳': '3',
      '۴': '4',
      '۵': '5',
      '۶': '6',
      '۷': '7',
      '۸': '8',
      '۹': '9',
    };
  
    return persianNumerals.replace(/[۰-۹]/g, (match) => persianToWesternMap[match]);
  };
  
export const EnglishNumeric = (obj) => {
    if (typeof obj === 'string') {
      return convertToWesternNumerals(obj);
    } else if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          obj[key] = recursivelyConvertPersianNumerals(obj[key]);
        }
      }
    }
    return obj;
  };