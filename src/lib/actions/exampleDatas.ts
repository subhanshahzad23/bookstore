import mongoose from "mongoose";
import { Groupe } from "../modals/group.modal"; // make sure the path is correct

async function addGroupEntry(
  _id: number,
  paatuoteryhma: string,
  nimi: string,
  kuvaus: string | null
): Promise<void> {
  // Add the return type as `Promise<void>`
  try {
    // Create a new instance of the Groupe model with the provided data
    const newGroup = new Groupe({
      _id,
      paatuoteryhma,
      nimi,
      kuvaus,
    });

    // Save the new group entry to the database
    await newGroup.save();
    console.log("New group entry added successfully");
  } catch (error) {
    console.log("Error adding group entry:", error);
  }
}

// Example usage:
addGroupEntry(1, "Book Category", "Fiction", "A category for fiction books");
