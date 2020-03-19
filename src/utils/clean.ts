import _ from 'lodash'

export interface IFilter {
  [key: string]: number | string | undefined | null
}

export interface ICleanFilter {
  [key: string]: number | string
}

// remove undefined property in object
export const clean = (obj: IFilter): ICleanFilter => {
  return _.pickBy(obj, _.identity)
}
