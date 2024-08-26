import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Error getting cabins");
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Error deleting cabin");
  }
}

export async function createEditCabin(newCabin, id) {
  // sample url
  //https://sxbkfaftsxzluboyxvmo.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  // creating unique name for image
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  console.log(newCabin);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  // creating path to image
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1. create/edit cabin
  let query = supabase.from("cabins");

  //A. create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //B. edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Error creating cabin");
  }

  //2. uploading image to storage
  const { data: imageData, error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    // if there is an error while uploading image, delete the cabin from database
    console.log(data);
    await supabase.from("cabins").delete().eq("id", data.at(0).id);
    console.error(storageError);
    throw new Error("Error uploading image");
  }

  return data;
}
