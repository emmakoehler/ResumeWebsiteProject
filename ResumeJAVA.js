document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});



// Function to submit a note
async function submitNote() {
  const note = document.getElementById('noteInput').value;
  if (note.trim() === '') return alert('Please enter a note!');

  const response = await fetch('https://resume-worker.emma-elk321.workers.dev', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ note }),
  });

  if (response.ok) {
    alert('Note submitted!');
    loadNotes(); // Reload the notes after submission
  } else {
    alert('Failed to submit note!');
  }
}

// Function to load recent notes
async function loadNotes() {
  const response = await fetch('https://resume-worker.emma-elk321.workers.dev');
  const notes = await response.json();

  const notesContainer = document.getElementById('notesContainer');
  notesContainer.innerHTML = notes
    .map(note => `<p><strong>${new Date(note.timestamp).toLocaleString()}</strong>: ${note.note}</p>`)
    .join('');
}

// Load notes when the page loads
document.addEventListener('DOMContentLoaded', loadNotes);



// Function to track download count
async function trackDownload() {
  const response = await fetch('https://resume-worker.emma-elk321.workers.dev', {
    method: 'POST',
  });

  if (response.ok) {
    loadDownloadCount(); // Reload the count
  } else {
    alert('Failed to track download.');
  }
}

// Function to display download count
async function loadDownloadCount() {
  const response = await fetch('https://resume-worker.emma-elk321.workers.dev');
  const data = await response.json();

  document.getElementById('downloadCount').innerText = `Resume has been downloaded ${data.count} times.`;
}

// Load the download count when the page loads
document.addEventListener('DOMContentLoaded', loadDownloadCount);


