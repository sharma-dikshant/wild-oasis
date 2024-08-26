import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isloading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin edited successfully");
      queryClient.invalidateQueries(["cabins"]);
    //   reset(); // the reset will be done in the component where the function editCabin is called
    },
    onError: () => {
      toast.error("Error creating cabin");
    },
  });
  return { editCabin, isEditing };
}
