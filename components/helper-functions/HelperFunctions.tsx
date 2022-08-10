import { hash, compare } from "bcryptjs";
import { MongoClient } from "mongodb";

export async function hashedPassword(password: string) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function comparePasswords(
  hashedPassword: string,
  password: string
) {
  const isValid = await compare(hashedPassword, password);
  return isValid;
}

export async function connectToDatabase() {
  const client = MongoClient.connect(
    `mongodb+srv://morfelidev:Bella27@cluster0.pywnmji.mongodb.net/?retryWrites=true&w=majority`
  );

  return client;
}
