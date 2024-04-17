document.addEventListener('DOMContentLoaded', function () {
    const notesList = document.getElementById('notes-list');
    const addNoteForm = document.getElementById('add-note-form');
    const noteInput = document.getElementById('note-input');

    // Funkcja do dodawania nowej notatki/zadania
    function addNote() {
        const noteText = noteInput.value.trim();

        if (noteText !== '') {
            const li = document.createElement('li');
            li.textContent = noteText;

            const editButton = document.createElement('button');
            editButton.textContent = 'Edytuj';
            editButton.addEventListener('click', editNote);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Usuń';
            deleteButton.addEventListener('click', removeNote);

            li.appendChild(editButton);
            li.appendChild(deleteButton);
            notesList.appendChild(li);

            noteInput.value = '';
            saveNotesToLocalStorage();
        }
    }

    // Funkcja do edycji istniejącej notatki/zadania
    function editNote() {
        const editedText = prompt("Edytuj notatkę:", this.parentNode.textContent);
        if (editedText !== null) {
            const noteText = editedText.trim();
            if (noteText !== '') {
                this.parentNode.textContent = noteText;
                saveNotesToLocalStorage();
            } else {
                alert("Treść notatki nie może być pusta!");
            }
        }
    }

    // Funkcja do usuwania notatki/zadania
    function removeNote() {
        this.parentNode.remove();
        saveNotesToLocalStorage();
    }

    // Funkcja zapisująca notatki do pamięci lokalnej
    function saveNotesToLocalStorage() {
        const notes = [];
        notesList.querySelectorAll('li').forEach(note => {
            notes.push(note.textContent);
        });
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    // Wczytaj notatki z pamięci lokalnej po załadowaniu strony
    function loadNotesFromLocalStorage() {
        const notes = JSON.parse(localStorage.getItem('notes'));
        if (notes) {
            notes.forEach(noteText => {
                const li = document.createElement('li');
                li.textContent = noteText;

                const editButton = document.createElement('button');
                editButton.textContent = 'Edytuj';
                editButton.addEventListener('click', editNote);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Usuń';
                deleteButton.addEventListener('click', removeNote);

                li.appendChild(editButton);
                li.appendChild(deleteButton);
                notesList.appendChild(li);
            });
        }
    }

    addNoteForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addNote();
    });

    loadNotesFromLocalStorage();
});
