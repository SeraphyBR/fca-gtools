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
}
