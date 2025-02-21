import { Collection, Db, ObjectId, WithId } from "mongodb";
import { connectToDatabase } from "./db.js";
import { User } from "../models/users.js";

export type UserId = ObjectId;

// Funktion för att hämta alla användare
export const getAllUsers = async (): Promise<WithId<User>[]> => {
  try {
    const db: Db = await connectToDatabase();
    const col: Collection<User> = db.collection<User>("userInfo");
    const users: WithId<User>[] = await col.find({}).toArray();
    console.log("Users:", users);
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Could not fetch users");
  }
};

// Validerar lösenord och användarnamn
async function validateUser(
  username: string,
  password: string
): Promise<ObjectId | null> {
  const db: Db = await connectToDatabase();
  const col: Collection<User> = db.collection<User>("userInfo");

  const matchingUser = await col.findOne({ username });

  if (matchingUser && matchingUser.password === password) {
    console.log("User validated:", matchingUser._id);
    return matchingUser._id;
  }
  console.log("User validation failed for username:", username);
  return null;
}

async function getUserData(userId: ObjectId): Promise<User | null> {
  const db: Db = await connectToDatabase();
  const col: Collection<User> = db.collection<User>("userInfo");

  const user = await col.findOne({ _id: userId });
  return user || null;
}

async function checkUserCredentials(username: string, password: string) {
  const db: Db = await connectToDatabase();
  const col: Collection<User> = db.collection<User>("userInfo");
  console.log("!!! CREDS !!!: ", username, password);
  const user = await col.findOne({ username: username });


  return user || null;
}

async function logInUser(id: ObjectId) {
  const db: Db = await connectToDatabase();
  const col: Collection<User> = db.collection<User>("userInfo");
  console.log("!!! logInUser !!!");
  const updatedUser = await col.updateOne(
    { _id: new ObjectId(id) },
    { $set: { isLoggedIn: true } }
  );

  return updatedUser;
}

export { validateUser, getUserData, checkUserCredentials, logInUser };