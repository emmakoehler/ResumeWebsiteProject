document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
  });
});

// Load recent notes
async function loadNotes() {
  try {
    const response = await fetch('https://resume-worker.emma-elk321.workers.dev/comments'); // Use correct path

    if (!response.ok) {
      throw new Error(`Failed to load notes: ${response.status}`);
    }

    const data = await response.json();

    if (data.notes && Array.isArray(data.notes)) {
      document.getElementById('notesContainer').innerHTML = data.notes
        .map(note => `<p><strong>${new Date(note.timestamp).toLocaleString()}</strong>: ${note.note}</p>`)
        .join('');
    } else {
      document.getElementById('notesContainer').innerHTML = '<p>No notes available.</p>';
    }
  } catch (error) {
    console.error(error);
  }
}

// Submit a note
async function submitNote() {
  const note = document.getElementById('noteInput').value;
  if (note.trim() === '') return alert('Please enter a note!');

  try {
    const response = await fetch('https://resume-worker.emma-elk321.workers.dev/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note }),
    });

    if (response.ok) {
      alert('Note submitted!');
      loadNotes(); // Reload notes
    } else {
      throw new Error(`Failed to submit note: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
}

// Track resume downloads
async function trackDownload() {
  try {
    const response = await fetch('https://resume-worker.emma-elk321.workers.dev/trackDownload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ download: true }),
    });

    if (response.ok) {
      loadDownloadCount(); // Reload the count
    } else {
      throw new Error(`Failed to track download: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
}

// Load resume download count
async function loadDownloadCount() {
  try {
    const response = await fetch('https://resume-worker.emma-elk321.workers.dev/trackDownload'); // Use correct path

    if (!response.ok) {
      throw new Error(`Failed to load download count: ${response.status}`);
    }

    const data = await response.json();
    document.getElementById('downloadCount').innerText = `Resume has been downloaded ${data.count} times.`;
  } catch (error) {
    console.error(error);
  }
}

// Ensure notes and download count load when the page loads
document.addEventListener('DOMContentLoaded', loadNotes);
document.addEventListener('DOMContentLoaded', loadDownloadCount);
