use serde::{Deserialize, Serialize};

// For convert TriadicContext::relations into Vec<TriadicIncidence>, used in python
#[derive(Serialize, Deserialize, Debug)]
pub struct TriadicIncidence {
  pub obj: String,
  pub attr: String,
  pub conditions: Vec<String>,
}

/// Model used by the json format of triadic input from lattice miner
#[derive(Serialize, Deserialize, Debug)]
pub struct TriadicContext {
  pub name: String,
  pub objects: Vec<String>,
  pub attributes: Vec<String>,
  pub conditions: Vec<String>,
  pub relations: Vec<Vec<Vec<String>>>,
}

// Model used by pthon library fcatools
#[derive(Serialize, Deserialize, Debug)]
pub struct TriadicContextPy {
  pub objects: Vec<String>,
  pub attributes: Vec<String>,
  pub conditions: Vec<String>,
  pub incidences: Vec<TriadicIncidence>,
}

// Model used by react frontend to display data
#[derive(Serialize, Deserialize, Debug)]
pub struct TriadicObjectRelationData {
  #[serde(rename = "attributeIdx")]
  attribute_idx: usize,
  #[serde(rename = "conditionIdx")]
  condition_idx: usize,
}

// Model used by react frontend to display data
#[derive(Serialize, Deserialize, Debug)]
pub struct TriadicObjectData {
  pub name: String,
  pub relation: Vec<TriadicObjectRelationData>,
}

// Model used by react frontend to display data
#[derive(Serialize, Deserialize, Debug)]
pub struct TriadicContextData {
  pub name: String,
  pub attributes: Vec<String>,
  pub conditions: Vec<String>,
  pub objects: Vec<TriadicObjectData>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct TriadicAssociationRule {
  pub left_side: Vec<String>,
  pub right_side: Vec<String>,
  pub condition: Vec<String>,
  pub support: f64,
  pub confidence: f64,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct FcatoolsTriadicData {
  pub bacars_implication_rules: Vec<TriadicAssociationRule>,
  pub bacars_association_rules: Vec<TriadicAssociationRule>,
  pub bcaars_implication_rules: Vec<TriadicAssociationRule>,
  pub bcaars_association_rules: Vec<TriadicAssociationRule>,
}

impl TriadicContext {
  pub fn get_list_incidences(&self) -> Vec<TriadicIncidence> {
    let mut incidences: Vec<TriadicIncidence> = Vec::new();

    for (o, x) in self.relations.iter().enumerate() {
      for (a, y) in x.iter().enumerate() {
        let incidence = TriadicIncidence {
          obj: self.objects[o].clone(),
          attr: self.attributes[a].clone(),
          conditions: y.clone(),
        };
        incidences.push(incidence)
      }
    }

    incidences
  }

  pub fn get_python_struct(&self) -> TriadicContextPy {
    TriadicContextPy {
      objects: self.objects.clone(),
      attributes: self.attributes.clone(),
      conditions: self.conditions.clone(),
      incidences: self.get_list_incidences(),
    }
  }

  pub fn get_front_struct(&self) -> TriadicContextData {
    let mut objects: Vec<TriadicObjectData> = Vec::new();

    for (o, x) in self.relations.iter().enumerate() {
      let mut relation: Vec<TriadicObjectRelationData> = Vec::new();

      for (a, y) in x.iter().enumerate() {
        for (_c, z) in y.iter().enumerate() {
          relation.push(TriadicObjectRelationData {
            attribute_idx: a,
            condition_idx: self.conditions.iter().position(|ci| ci.eq(z)).unwrap(),
          })
        }
      }

      let object = TriadicObjectData {
        name: self.objects[o].clone(),
        relation,
      };

      objects.push(object)
    }

    TriadicContextData {
      name: self.name.clone(),
      attributes: self.attributes.clone(),
      conditions: self.conditions.clone(),
      objects,
    }
  }

  pub fn from_front_struct(data: TriadicContextData) -> Self {
    let objects_names: Vec<String> = data.objects.iter().map(|o| o.name.clone()).collect();

    let mut relations: Vec<Vec<Vec<String>>> = Vec::new();

    for object in data.objects.iter() {
      let mut rel1 = Vec::new();
      for (aidx, _attribute) in data.attributes.iter().enumerate() {
        let mut rel2 = Vec::new();

        if let Some(r) = object.relation.iter().find(|r| r.attribute_idx == aidx) {
          rel2.push(data.conditions[r.condition_idx].clone())
        }

        rel1.push(rel2)
      }

      relations.push(rel1);
    }

    Self {
      name: data.name,
      attributes: data.attributes,
      conditions: data.conditions,
      objects: objects_names,
      relations,
    }
  }
}
