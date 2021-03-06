import { getItem, setItem } from 'helpers/storage';
import { Note, NoteFormModel } from './notes.types';
import { uuid } from 'helpers/uuid';

const STORAGE_KEY = 'NOTES';

export const NotesService = {
  fetchNotes: async () => {
    const result = await getItem<Note[]>(STORAGE_KEY);

    if (!result) {
      return [];
    }
    return result;
  },

  addNote: async (newNoteData: NoteFormModel) => {
    const notes = await NotesService.fetchNotes();
    const newNote = {
      ...newNoteData,
      id: uuid(),
    };

    await setItem(STORAGE_KEY, [...notes, newNote]);

    return newNote;
  },

  removeNote: async (noteId: string) => {
    const notes = await NotesService.fetchNotes();

    const newNotes = notes.filter(({ id }) => id !== noteId);
    await setItem(STORAGE_KEY, newNotes);

    return newNotes;
  },

  editNote: async (note: Note) => {
    const notes = await NotesService.fetchNotes();

    const index = notes.findIndex(({ id }) => id === note.id);
    const editedNotes = [...notes];
    editedNotes.splice(index, 1, note);
    await setItem(STORAGE_KEY, editedNotes);

    return editedNotes;
  },
};
