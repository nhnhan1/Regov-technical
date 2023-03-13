export interface Countries {
  ID: string
  Country: string
  CountryCode: string
  Slug: string
  NewConfirmed: number
  TotalConfirmed: number
  NewDeaths: number
  TotalDeaths: number
  NewRecovered: number
  TotalRecovered: number
  Date: string
  Premium: object
}
export interface Global {
  NewConfirmed: number
  TotalConfirmed: number
  NewDeaths: number
  TotalDeaths: number
  NewRecovered: number
  TotalRecovered: number
  Date: string
}

export interface SummaryCase {
  ID: string
  Message: string
  Global: Global
  Countries: Countries[]
  Date: string
}

export interface CountryCase {
  ID: string
  Country: string
  CountryCode: string
  Province: string
  City: string
  CityCode: string
  Lat: string
  Lon: string
  Confirmed: number
  Deaths: number
  Recovered: number
  Active: number
  Date: string
}

export interface SearchConfig {
  page?: number | string
  limit?: number | string
  name?: string
  code?: string
}
export type QueryConfig = {
  [key in keyof SearchConfig]: string
}
