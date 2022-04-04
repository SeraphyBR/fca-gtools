use std::any::Any;

use axum::extract::{multipart::MultipartError, Multipart};

pub trait FieldNames {
  fn field_names() -> &'static [&'static str];
  fn set_field_by_name(&mut self, field_name: &str, value: &dyn Any);
}

macro_rules! zoom_and_enhance {
    (pub struct $name:ident { $($v:vis $fname:ident : $ftype:ty),* }) => {
        use crate::server::utils::FieldNames;
        use std::any::Any;

        #[derive(Default, Debug)]
        pub struct $name {
            $($v $fname: $ftype),*
        }

        impl FieldNames for $name {
            fn field_names() -> &'static [&'static str] {
                static NAMES: &'static [&'static str] = &[$(stringify!($fname)),+];
                NAMES
            }

            fn set_field_by_name(&mut self, field_name: &str, value: &dyn Any) {
                match field_name {
                  $(stringify!($fname) => {
                    if let Some(typed_value) = value.downcast_ref::<$ftype>() {
                      self.$fname = typed_value.clone();
                    }
                  }), +
                  _ => ()
                }
            }
        }
    }
}

pub(crate) use zoom_and_enhance;

pub async fn extract_struct_from_multipart<T: FieldNames + Default>(
  mut multipart: Multipart,
) -> Result<T, MultipartError> {
  let mut result_struct = T::default();
  let field_names = T::field_names();

  while let Some(field) = multipart.next_field().await? {
    let name = field.name().unwrap().to_string();

    if field_names.contains(&name.as_str()) {
      if let Some(_) = field.file_name() {
        let bytes = field.bytes().await?;
        result_struct.set_field_by_name(&name.as_str(), &bytes)
      } else {
        let value = field.text().await?;
        result_struct.set_field_by_name(&name.as_str(), &value)
      }
    }
  }

  Ok(result_struct)
}
