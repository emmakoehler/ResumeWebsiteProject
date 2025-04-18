Emma Koehler – Resume Website Project
This project is a personal resume website built using HTML, CSS, and JavaScript, deployed using Cloudflare Pages. I also used Cloudflare Workers to add dynamic functionality like tracking resume downloads and allowing users to submit messages.

Live Site
You can view the deployed website here:
https://resumewebsiteproject.pages.dev

Project Structure
/ResumeWebsite: Contains all static site assets, including HTML, CSS, JavaScript, images, and my resume PDF.

/worker: Contains the Cloudflare Worker script (index.js) that manages API routes for tracking downloads and handling user-submitted notes.

Features Implemented
Resume Download Button: A button allows users to download my resume. A Cloudflare Worker is designed to track each download.

Note Submission Form: Visitors can leave a message through a form, which is sent to the Worker and stored in memory. The five most recent notes are displayed on the page. 

Download Counter: Displays the total number of times the resume has been downloaded.

How to Run and Test Locally
Clone the repository:

bash
git clone https://github.com/emmakoehler/ResumeWebsiteProject.git
Navigate to the project directory:

bash
cd ResumeWebsiteProject
To preview the static site locally, you can use a simple server (such as VS Code's Live Server extension) and open index.html.

To run the Worker locally:

Install wrangler if not already installed.

Navigate to the /worker folder and run:

nginx
wrangler dev
Notes
Cloudflare Pages is used to host the static site.

Cloudflare Workers handle the backend logic for tracking downloads and storing visitor notes.

The resume download currently redirects back to the homepage instead of downloading the file. This issue is under active debugging.
