import Swal from 'sweetalert2';

const BASE_URL = 'https://notes-api.dicoding.dev/v2';

function showError(message) {
  Swal.fire({
    icon: 'error',
    title: 'Oops!',
    text: message,
    confirmButtonColor: '#d33',
  });
}

export async function getAllNotes() {
  try {
    const [activeRes, archivedRes] = await Promise.all([
      fetch(`${BASE_URL}/notes`),
      fetch(`${BASE_URL}/notes/archived`),
    ]);

    if (!activeRes.ok || !archivedRes.ok)
      throw new Error('Gagal mengambil data catatan');

    const activeData = await activeRes.json();
    const archivedData = await archivedRes.json();

    return [...activeData.data, ...archivedData.data];
  } catch (error) {
    showError('Terjadi kesalahan saat mengambil data: ' + error.message);
    return [];
  }
}

export async function createNote(title, body) {
  try {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body }),
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message || 'Gagal menambahkan catatan');
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    showError('Terjadi kesalahan saat membuat catatan: ' + error.message);
    return null;
  }
}

export async function deleteNote(id) {
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error('Gagal menghapus catatan');

    return true;
  } catch (error) {
    showError('Terjadi kesalahan saat menghapus catatan: ' + error.message);
    return false;
  }
}

export async function archiveNote(id) {
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
      method: 'POST',
    });

    if (!response.ok) throw new Error('Gagal mengarsipkan catatan');

    return true;
  } catch (error) {
    showError('Terjadi kesalahan saat mengarsipkan catatan: ' + error.message);
    return false;
  }
}

export async function unarchiveNote(id) {
  try {
    const response = await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
      method: 'POST',
    });

    if (!response.ok) throw new Error('Gagal mengaktifkan catatan');

    return true;
  } catch (error) {
    showError('Terjadi kesalahan saat mengaktifkan catatan: ' + error.message);
    return false;
  }
}
