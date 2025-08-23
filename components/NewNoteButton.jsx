"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { createNoteAction } from "@/actions/notes";

/**
 * @param {{ user: import("@supabase/supabase-js").User | null }} props
 */
function NewNoteButton({ user }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleClickNewNoteButton = async () => {
    if (!user) {
      router.push("/login");
    } else {
      setLoading(true);
      const savingToast = toast({
        title: "Saving Current Note",
        description: "Saving your current note before saving the new note",
        variant: "default",
      });

      await new Promise((resolve) => 
        setTimeout(resolve, 500));

      const uuid = uuidv4();
      await createNoteAction(uuid);
      router.push(`/?noteId=${uuid}&toastType=newNote`);

      savingToast.dismiss();
      toast({
        title: "New Note Created",
        description: "Your new note has been created.",
        variant: "success",
      });

      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClickNewNoteButton}
      variant="secondary"
      className="w-24"
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : "New Note"}
    </Button>
  );
}

export default NewNoteButton;