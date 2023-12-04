import { Projector } from "../store/types";

export function swapRentedToFirst(projectors: Projector[]) {
  let index = projectors.findIndex(projector => projector.rent === true)  
  if (index !== -1) {
    const item = projectors.splice(index, 1); // Remove the item at the specified index
    projectors.unshift(item[0]); // Add the item to the beginning of the array
    }
    return projectors
}