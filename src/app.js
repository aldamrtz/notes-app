import {
  getAllNotes,
  createNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from './api.js';
import './styles/style.css';
import './components/note-item.js';
import './components/note-form.js';
import './components/app-bar.js';
import './components/loading-indicator.js';
import Swal from 'sweetalert2';

function showToast(message = 'Berhasil', icon = 'success') {
  Swal.fire({
    toast: true,
    position: 'bottom-end',
    icon,
    title: message,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    customClass: {
      popup: 'style-toast',
    },
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
}

let loadingStartTime = 0;
const MIN_LOADING_TIME = 1000;

function showLoading() {
  loadingStartTime = Date.now();
  const loadingEl = document.getElementById('loading-indicator');
  loadingEl.style.display = 'flex';
}

async function hideLoading() {
  const loadingEl = document.getElementById('loading-indicator');
  const elapsed = Date.now() - loadingStartTime;
  if (elapsed < MIN_LOADING_TIME) {
    await new Promise((resolve) =>
      setTimeout(resolve, MIN_LOADING_TIME - elapsed)
    );
  }
  loadingEl.style.display = 'none';
}

async function loadAndDisplayNotes(animateNoteId = null) {
  const allNotes = await getAllNotes();
  console.log('Semua note:', allNotes);
  displayNotes(allNotes, animateNoteId);
}

const modal = document.getElementById('confirm-modal');
const confirmMessage = document.getElementById('confirm-message');
const btnYes = document.getElementById('confirm-yes');
const btnNo = document.getElementById('confirm-no');

function showConfirm(message) {
  return new Promise((resolve) => {
    confirmMessage.textContent = message;
    modal.classList.remove('hidden');

    const modalContent = modal.querySelector('.modal-content');

    modalContent.style.transform = 'scale(0.8)';
    modalContent.style.opacity = '0';

    anime({
      targets: modalContent,
      scale: [0.8, 1],
      opacity: [0, 1],
      duration: 650,
      easing: 'easeOutQuart',
    });

    function cleanUp() {
      btnYes.removeEventListener('click', onYes);
      btnNo.removeEventListener('click', onNo);

      anime({
        targets: modalContent,
        scale: [1, 0.8],
        opacity: [1, 0],
        duration: 350,
        easing: 'easeInOutCubic',
        complete: () => {
          modal.classList.add('hidden');
        },
      });
    }

    function onYes() {
      resolve(true);
      cleanUp();
    }

    function onNo() {
      resolve(false);
      cleanUp();
    }

    btnYes.addEventListener('click', onYes);
    btnNo.addEventListener('click', onNo);
  });
}

function attachNoteListeners(noteElement, note) {
  noteElement.addEventListener('toggle-archive', async (e) => {
    const { id } = e.detail;
    const confirm = await showConfirm(
      note.archived
        ? 'Apakah anda yakin ingin mengaktifkan catatan ini?'
        : 'Apakah anda yakin ingin mengarsipkan catatan ini?'
    );
    if (confirm) {
      anime({
        targets: noteElement,
        opacity: [1, 0],
        duration: 250,
        easing: 'easeInCubic',
        complete: async () => {
          let success;
          if (note.archived) {
            success = await unarchiveNote(id);
            if (success) showToast('Catatan berhasil diaktifkan');
          } else {
            success = await archiveNote(id);
            if (success) showToast('Catatan berhasil diarsipkan');
          }
          if (success) await loadAndDisplayNotes(id);
        },
      });
    }
  });

  noteElement.addEventListener('delete-note', async (e) => {
    const { id } = e.detail;
    const confirm = await showConfirm(
      'Apakah anda yakin ingin menghapus catatan ini?'
    );
    if (confirm) {
      anime({
        targets: noteElement,
        opacity: [1, 0],
        scale: [1, 0.8],
        duration: 250,
        easing: 'easeInBack',
        complete: async () => {
          showLoading();
          const success = await deleteNote(id);
          await hideLoading();
          if (success) {
            showToast('Catatan berhasil dihapus');
            await loadAndDisplayNotes();
          }
        },
      });
    }
  });
}

function displayNotes(notes, animateNoteId = null) {
  const activeContainer = document.getElementById('active-notes-container');
  const archivedContainer = document.getElementById('archived-notes-container');

  activeContainer.innerHTML = '';
  archivedContainer.innerHTML = '';

  const activeNotes = notes.filter((note) => !note.archived);
  const archivedNotes = notes.filter((note) => note.archived);

  if (activeNotes.length === 0) {
    activeContainer.innerHTML =
      '<p class="empty-message">Tidak ada catatan aktif.</p>';
  } else {
    activeNotes.forEach((note) => {
      const noteElement = document.createElement('note-item');
      noteElement.note = note;
      noteElement.setAttribute('archived', note.archived);
      attachNoteListeners(noteElement, note);
      activeContainer.appendChild(noteElement);

      if (note.id === animateNoteId) {
        noteElement.style.opacity = 0;
        noteElement.style.transform = 'scale(0.8)';
        anime({
          targets: noteElement,
          opacity: [0, 1],
          scale: [0.8, 1],
          duration: 250,
          easing: 'easeOutExpo',
        });
      }
    });
  }

  if (archivedNotes.length === 0) {
    archivedContainer.innerHTML =
      '<p class="empty-message">Tidak ada catatan arsip.</p>';
  } else {
    archivedNotes.forEach((note) => {
      const noteElement = document.createElement('note-item');
      noteElement.note = note;
      noteElement.setAttribute('archived', note.archived);
      attachNoteListeners(noteElement, note);
      archivedContainer.appendChild(noteElement);

      if (note.id === animateNoteId) {
        noteElement.style.opacity = 0;
        noteElement.style.transform = 'scale(0.8)';
        anime({
          targets: noteElement,
          opacity: [0, 1],
          scale: [0.8, 1],
          duration: 250,
          easing: 'easeOutExpo',
        });
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  showLoading();
  await loadAndDisplayNotes();
  await hideLoading();

  document
    .querySelector('app-bar')
    .addEventListener('search-changed', async (e) => {
      const query = e.detail.query.toLowerCase().trim();
      if (query === '') {
        await loadAndDisplayNotes();
        return;
      }
      const allNotes = await getAllNotes();

      const filtered = allNotes.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.body.toLowerCase().includes(query)
      );

      displayNotes(filtered);
    });

  document
    .querySelector('note-form')
    .addEventListener('note-submitted', async (e) => {
      showLoading();
      const { title, body } = e.detail;
      const newNote = await createNote(title, body);
      await hideLoading();
      if (!newNote) return;
      showToast('Catatan berhasil ditambahkan');
      await loadAndDisplayNotes(newNote.id);
    });
});
