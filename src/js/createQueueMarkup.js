import { apiService } from '../index';
import { createMarkup } from './createWatchedMarkup';
import deleteFromList from './deleteFromList';

import getRefs from './get-refs';
const refs = getRefs();

export default async function createQueueMarkup() {
  let dataArr = [];
  const queueArr = JSON.parse(localStorage.getItem('Queue'));
  if (queueArr === null) {
    refs.movies.innerHTML = '';
    return;
  } else {
    for (let i = 0; i < queueArr.length; i++) {
      const data = await apiService.getMovieByID(queueArr[i]);
      dataArr.push(data);
    }
    createMarkup(dataArr);
  }
  changeActiveQueueBtn();
}

function changeActiveQueueBtn() {

  const watchedBtn = document.getElementById('watched');
  const queueBtn = document.getElementById('queue');

  watchedBtn.classList.replace('button-orange', 'button-white');
  watchedBtn.classList.remove('button-active');
  // watchedBtn.setAttribute("disabled", "false");
  

  queueBtn.classList.replace('button-white', 'button-orange');
  queueBtn.classList.add('button-active');
  // queueBtn.setAttribute("disabled", "true");
}

