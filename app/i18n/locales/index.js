import staticDefaults from "../extracted/static";

// Extra formats. May be customized by each locale.
export const defaultFormats = {
  number: {
    "two-decimals": {
      minimumFractionDigits: 2
    },
    "precise-percent": {
      style: "percent",
      minimumFractionDigits: 4
    }
  }
};

const en = {
  key: "en",
  language: "en",
  description: "English",
  messages: staticDefaults, // uses defaultMessage for anything not on the staticDefaults
  formats: defaultFormats //dont customize for en language
};

const pt_BR = {
  key: "pt-BR",
  language: "pt-BR",
  description: "Português do Brasil",
  messages: require("../translations/pt.json"),
  formats: defaultFormats
};

const zh_CN = {
  key: "zh-CN",
  language: "zh-CN",
  description: "简体中文",
  messages: require("../translations/zh.json"),
  formats: defaultFormats
};

// const KO = {
//   key: "KO",
//   language: "KO",
//   description: "한국어",
//   messages: require("../translations/ko.json"),
//   formats: defaultFormats
// };
// pseudo-locale for i18n testing during development. Can be freely
// modified.
const dev = {
  key: "dev",
  language: "pt-BR", // must be one of the allowed locales of format.js/react-intl
  description: "Dev Locale for testing",
  messages: require("../translations/dev.json"),
  formats: defaultFormats
};

const locales = [en, zh_CN];

if (process.env.NODE_ENV === "development") {
  locales.push(dev);
}

export default locales;

// appLocaleFromElectronLocale returns the app locale that should be used for a given
// locale returned by electron's app.getLocale() function. Note that
// app.getLocale() can only be called after the app's ready() event is fired.
//
// The locale key returned by this function is guaranteed to exist.
export function appLocaleFromElectronLocale(electronLocale) { 
  switch (electronLocale) {
    case "pt":
    case "pt-BR":
    case "pt-PT":
      return "pt-BR";
    case "zh-CN":
      return "zh-CN";
    case "KO":
    case "ko-KR":
      return "KO";

    default: return "en";
  }
}
