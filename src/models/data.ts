export type TriadicObjectData = {
  name: string
  relation: {
    attributeIdx: number
    conditionIdx: number
  }[]
}

export type TriadicContextData = {
  name: String
  attributes: string[]
  conditions: string[]
  objects: TriadicObjectData[]
}
