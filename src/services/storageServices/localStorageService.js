class localStorageService {
  static NOTES_KEY = "notes";

  static getNotes() {
    const notes = localStorage.getItem(this.NOTES_KEY);
    return notes ? JSON.parse(notes) : [];
  }

  static sortNotes = (notes) => {
    return [...notes].sort((a, b) => {
      if (a.pinned !== b.pinned) {
        return b.pinned - a.pinned;
      }
      return b.id - a.id;
    });
  };

  static saveNotes(notes) {
    localStorage.setItem(this.NOTES_KEY, JSON.stringify(notes));
  }

  static getNoteById(id) {
    const notes = this.getNotes();
    var note = notes.find((note) => note.id == id);
    return note;
  }
}

export default localStorageService;
