'use strict';

export function initCard15(card) {
  if (card.classList.contains('initialized')) return;
  card.classList.add('initialized');

  const dropZone = document.getElementById('drop-zone');
  const fileName = document.querySelector('.file-name');
  const cloud = document.querySelector('.cloud-icon');
  const loading = document.querySelector('.loading-icon');
  const done = document.querySelector('.done-icon');
  const loadingBar = document.querySelector('.loading-bar');
  const uploadBtn = document.querySelector('.upload-btn');
  const uploadInput = document.querySelector('#upload-file');

  uploadInput.addEventListener('click', (e) => {
    // e.preventDefault();
  });
  dropZone.addEventListener(
    'drag dragstart dragend dragover dragenter dragleave drop',
    (e) => {
      e.preventDefault();
    }
  );

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.backgroundColor = 'hsl(0, 0.00%, 29.40%)';
  });

  dropZone.addEventListener('dragleave', (e) => {
    dropZone.style.backgroundColor = 'transparent';
  });

  let isDropped = false;

  dropZone.addEventListener('change', (e) => {
    dropZone.style.backgroundColor = 'transparent';
    cloud.style.display = 'none';

    if (e.target.files[0]) {
      [...e.target.files].forEach((file, i) => {
        fileName.innerHTML = `${file.name}`;
        isDropped = true;
      });
    }
  });

  uploadBtn.addEventListener('click', uploadFiles);

  function uploadFiles() {
    if (uploadBtn.innerHTML === 'Done') {
      return;
    } else if (isDropped) {
      dropZone.style.display = 'none';
      uploadBtn.innerHTML = 'Uploading...';
      loading.style.opacity = '0.5';
      loading.classList.add('animation');
      loadingBar.classList.add('animation');
      setTimeout(() => {
        loading.style.opacity = '0';
        done.style.opacity = '0.5';
        uploadBtn.innerHTML = 'Done';
      }, 4000);
    } else {
      cloud.style.display = 'none';
      fileName.innerHTML = 'Drop a file first!';
    }
  }
}
