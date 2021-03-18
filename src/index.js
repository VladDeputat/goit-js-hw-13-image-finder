import './styles.css';
import fetchContent from './js/apiService';
import markupTpl from './templates/markup.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { error } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
const galleryRef = document.querySelector('.gallery');
const formRef = document.querySelector('#search-form');
const loadMoreBtnRef = document.querySelector('.loadBtn');

let pageNum = 1;
let query = '';

formRef.addEventListener('submit', search);
loadMoreBtnRef.addEventListener('click', loadMore);
galleryRef.addEventListener('click', openLightbox);

function createMarkup(data) {
  galleryRef.insertAdjacentHTML('beforeend', markupTpl(data));
}

function search(event) {
  loadMoreBtnRef.classList.add('hidden');
  galleryRef.innerHTML = '';
  event.preventDefault();
  query = event.target.query.value;
  if (query.length === 0) {
    error({ text: 'Please, type something.' });
    return;
  }
  fetchContent(query, pageNum).then(res => {
    if (res.hits.length === 0) {
      error({ text: 'Wrong input.' });
      return;
    }
    createMarkup(res);
    loadMoreBtnRef.classList.remove('hidden');
  });
}

function loadMore() {
  pageNum += 1;
  fetchContent(query, pageNum).then(res => {
    createMarkup(res);
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  });
}

function openLightbox(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const instance = basicLightbox.create(
    `<img src=${e.target.dataset.href} width="800" height="600">`,
  );

  instance.show();
}
