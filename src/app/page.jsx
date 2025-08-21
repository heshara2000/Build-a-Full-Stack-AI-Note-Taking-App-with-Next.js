// 'use client';

// function HomePage() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-blue-300">
//       <h1 className="text-4xl font-bold">Welcome to Goat Notes</h1>
//       <p className="mt-2 text-lg">Your note-taking app for goats!</p>
//     </div>
//   );
// }

// export default HomePage;

import { getUser } from "@/auth/server";
import AskAIButton from "@/components/AskAIButton";
import NewNoteButton from "@/components/NewNoteButton";
import NoteTextInput from "@/components/NoteTextInput";
import HomeToast from "@/components/HomeToast";
import { prisma } from "@/db/prisma";

// Removed TypeScript type alias since it's not valid in JSX files.

async function HomePage({ searchParams }) {
  const noteIdParam = (await searchParams).noteId;
  const user = await getUser();

  const noteId = Array.isArray(noteIdParam)
    ? noteIdParam[0]
    : noteIdParam || "";

  const note = await prisma.note.findUnique({
    where: { id: noteId, authorId: user?.id },
  });

  return (
    <div className="flex h-full flex-col items-center gap-4">
      <div className="flex w-full max-w-4xl justify-end gap-2">
        <AskAIButton user={user} />
        <NewNoteButton user={user} />
      </div>

      <NoteTextInput noteId={noteId} startingNoteText={note?.text || ""} />

      <HomeToast />
    </div>
  );
}

export default HomePage;