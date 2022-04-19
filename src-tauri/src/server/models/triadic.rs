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
}
