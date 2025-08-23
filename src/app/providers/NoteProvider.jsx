"use client";

import { createContext, useState } from "react";

// Context for note text and setter
export const NoteProviderContext = createContext({
  noteText: "",
  setNoteText: () => {},
});

function NoteProvider({ children }) {
  const [noteText, setNoteText] = useState("");

  return (
    <NoteProviderContext.Provider value={{ noteText, setNoteText }}>
      {children}
    </NoteProviderContext.Provider>
  );
}

export default NoteProvider;