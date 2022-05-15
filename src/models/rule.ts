export type TriadicAssociationRule = {
  left_side: string[]
  right_side: string[]
  condition: string[]
  support: number
  confidence: number
}

export type FcatoolsTriadicData = {
  bacars_implication_rules: TriadicAssociationRule[]
  bacars_association_rules: TriadicAssociationRule[]
  bcaars_implication_rules: TriadicAssociationRule[]
  bcaars_association_rules: TriadicAssociationRule[]
}
