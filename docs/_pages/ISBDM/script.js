// add an issue to the project

function openGithubIssue() {
  // Base URL for your GitHub repository and the web page URL
  var githubRepoUrl = "https://github.com/iflastandards/iflastandards.info";
  var webPageBaseUrl = "https://www.iflastandards.info/";
  var webPageUrl = window.location.href;
  const h3Content = getH3Content();

  // Extract the relative path from the web page URL and construct the GitHub source file path
  var relativePath = webPageUrl.replace(webPageBaseUrl, '');
  var filePath = "https://github.com/iflastandards/iflastandards.info/blob/master/docs/_pages" + getFullPath();


  var issueTitle = "Issue with the '" + h3Content + "' page"; // Use the last part of the path as the title
  var issueBody = `I found an issue on the web page at [${webPageUrl}](${webPageUrl}).\n\n` +
    `The source file can be found here: [${filePath}](${filePath})`;

  var fullUrl = `https://github.com/iflastandards/iflastandards.info/issues/new?` +
    `title=${encodeURIComponent(issueTitle)}&` +
    `body=${encodeURIComponent(issueBody)}`;

  window.open(fullUrl, "_blank");
}

function getFullPath() {
  // Get the complete URL path
  let path = window.location.pathname;
  // Normalize the path to ensure it ends with a slash if it's a directory
  // This is useful when 'index.html' is implied
  if (!path.endsWith('/')) {
    // If there's a dot after the last slash, it's likely a file; otherwise, assume it's a directory
    if (!path.substring(path.lastIndexOf('/')).includes('.')) {
      path += '/'; // Assume it's a directory and append a slash
    }
  }

  // Check if the path ends with 'index.html'
  if (path.endsWith('index.html')) {
    // If it does, just return the path as is
    return path;
  } else if (path.endsWith('/')) {
    // If the path is a directory (ends in a slash), append 'index.html'
    return path + 'index.html';
  } else {
    // For any other case, return the path without modification
    return path;
  }
}

function getH3Content() {
  // Select the h3 element
  const h3Element = document.querySelector("h3");

  // Check if the h3 element exists and has content
  if (h3Element && h3Element.textContent.trim() !== "") {
    return h3Element.textContent.trim();
  } else {
    return ""; // Return an empty string if h3 element is empty or not found
  }
}

// Initialize tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
