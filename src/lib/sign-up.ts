import { authClient } from "@/lib/auth-client";

export const signUpUser = async (
  email: string,
  password: string,
  name: string,
  image?: string
) => {
  try {
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
      image,
      callbackURL: "/dashboard"
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data };
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    throw error;
  }
};

export const signInUser = async (email: string, password: string) => {
  try {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, data };
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await authClient.signOut();
    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
    throw error;
  }
};