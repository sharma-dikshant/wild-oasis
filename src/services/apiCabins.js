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

export async function createCabin(newCabin) {
  // sample url
  //https://sxbkfaftsxzluboyxvmo.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  // creating unique name for image

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  // creating path to image
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1. creating cabin in database
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

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
