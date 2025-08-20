"use server"

import { createClient } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { handleError } from "../../lib/utils";

export async function loginAction(email, password) {
  try {
    const { auth } = await createClient();
    const { error } = await auth.signInWithPassword({ email, password });
    if (error?.code === "email_not_confirmed") return { errorMessage: "Email not confirmed" };
    if (error) throw error;
    return { errorMessage: null };
  } catch (err) {
    return handleError(err);
  }
}

export const logOutAction = async () => {
  try {
    const { auth } = await createClient();

    const { error } = await auth.signOut();
    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export async function signUpAction(email, password) {
  try {
    const { auth } = await createClient();
    const { data, error } = await auth.signUp({ email, password });
    if (error) return { errorMessage: error.message };

    const supabaseId = data.user?.id;
    if (!supabaseId) throw new Error("Error signing up");

    await prisma.user.create({ data: { email, supabaseId } });

    return { errorMessage: null };
  } catch (err) {
    return handleError(err);
  }
}


export async function resendConfirmationAction(email) {
  try {
    const { auth } = await createClient();
    await auth.resend({ type: "signup", email });
    return { errorMessage: null };
  } catch (err) {
    return handleError(err);
  }
}



// export const signUpAction = async (email, password) => {
//   try {
//     const { auth } = await createClient();

//     const { data, error } = await auth.signUp({
//       email,
//       password,
//     });
//     if (error) throw error;

//     const userId = data.user?.id;
//     if (!userId) throw new Error("Error signing up");

//     await prisma.user.create({
//       data: {
//         id: userId,
//         email,
//       },
//     });

//     return { errorMessage: null };
//   } catch (error) {
//     return handleError(error);
//   }
// };
