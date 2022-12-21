let makeButton = document.getElementById('make-button');
makeButton.addEventListener('click', function() {
  let uploadForm = document.getElementById('uploadForm');

  needTouch = document.getElementById('contrast-checkbox').checked;
  uploadForm.action = '/imgfordark?cont=' + (needTouch ? 't' : 'f');

  uploadForm.submit();
});