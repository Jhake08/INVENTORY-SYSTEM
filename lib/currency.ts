export const CURRENCIES = {
  PHP: {
    code: "PHP",
    symbol: "₱",
    name: "Philippine Peso",
    locale: "en-PH",
  },
  USD: {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    locale: "en-US",
  },
} as const

export type CurrencyCode = keyof typeof CURRENCIES

export function formatCurrency(amount: number, currencyCode: CurrencyCode = "PHP"): string {
  const currency = CURRENCIES[currencyCode]
  return new Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currency.code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatNumber(value: number, locale = "en-PH"): string {
  return new Intl.NumberFormat(locale).format(value)
}
