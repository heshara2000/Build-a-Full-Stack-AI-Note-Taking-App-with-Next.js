import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export function handleError(error) {
  console.error("Action error:", error);

  // Supabase error object often contains `message`, `code`, and `status`
  if (error && error.code) {
    return {
      errorMessage: `${error.message} (code: ${error.code})`,
      code: error.code,
      status: error.status,
      reasons: error.reasons || null,
    };
  }

  return { errorMessage: error.message || "Something went wrong" };
}


// export function handleError(error) {
//   console.error("Action error:", error);
//   return { errorMessage: error.message || "Something went wrong" };
// }