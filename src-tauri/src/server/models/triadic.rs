use serde::{Deserialize, Serialize};

/// Model used by the json format of triadic input from lattice miner
#[derive(Serialize, Deserialize, Debug)]
pub struct TriadicContext {
  pub name: String,
  pub objects: Vec<String>,
  pub attributes: Vec<String>,
  pub conditions: Vec<String>,
  pub relations: Vec<Vec<Vec<String>>>,
}

// For convert TriadicContext::relations into Vec<TriadicIncidence>, used in python
#[derive(Serialize, Deserialize, Debug)]
pub struct TriadicIncidence {
  pub obj: String,
  pub attr: String,
  pub conditions: Vec<String>,
}
