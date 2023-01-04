// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

// window.addEventListener('load', function (e) {
//    this.document.body.insertAdjacentHTML('beforeend', `<div class="main-bg"></div>`);
// })

window.addEventListener("load", function (e) {
   const bg = document.querySelectorAll('[data-bg]');
   if (bg.length) {
      bg.forEach(bgItem => {
         bgItem.insertAdjacentHTML('afterbegin', `<div class="bg-item"></div>`);
      });

      // <initParalaxBg> =====================================================
      function initParalaxBg() {
         window.addEventListener('scroll', observeBgItems);

         function observeBgItems() {
            const bgItems = document.querySelectorAll('[data-bg]');
            for (const bgItem of bgItems) {
               if (!isVisible(bgItem)) continue;
               makeParalaxBgItem(bgItem);
            }
         }

         function makeParalaxBgItem(dataBg) {
            const itemBg = dataBg.querySelector('.bg-item');
            if (!itemBg) return;
            const dataBgCoord = dataBg.getBoundingClientRect();
            const heightClient = document.documentElement.clientHeight;
            const procentScroll = dataBgCoord.bottom / (dataBgCoord.height + heightClient) * 100;
            itemBg.style.cssText = `transform: translate3D(0,${-procentScroll * 0.8}%,0)`;
            // itemBg.style.cssText = `top: ${-procentScroll}%`;
         }
         setTimeout(() => observeBgItems(), 100)
      }
      initParalaxBg();
      // </initParalaxBg> =====================================================
   }
});
// <initButtonScroll> =================================================
function calcOffsetTop(el) {
   if (!el) return;
   if (!el.offsetParent) return el.offsetTop;
   return el.offsetTop + calcOffsetTop(el.offsetParent)
}
function initButtonScroll() {
   const buttonScroll = document.querySelector('button.mainslider__scroll');
   // console.log('el.offsetTop', document.querySelector('.mainpage__body').offsetTop);
   if (buttonScroll) {
      buttonScroll.onclick = function (e) {
         const el = document.querySelector('.mainpage__about');
         // el.scrollIntoView(false)
         // el.scrollIntoView({
         //    block: "start",
         //    inline: "nearest",
         //    behavior: "smooth"
         // })
         window.scrollTo({
            top: calcOffsetTop(el),
            behavior: "smooth"
         });
      }
   }
   const buttonScrollTop = document.querySelector('.footer__scroll button.scroll');
   if (buttonScrollTop) {
      buttonScrollTop.onclick = function () {
         window.scrollTo({
            top: 0,
            behavior: "smooth"
         });
      }
   }

   const buttonScrollBar = document.querySelector('.bar-slider__scroll button');
   if (buttonScrollBar) {
      buttonScrollBar.onclick = function () {
         const el = document.querySelector('.bar-page__reserv');
         // el.scrollIntoView(false)
         // el.scrollIntoView({
         //    block: "start",
         //    inline: "nearest",
         //    behavior: "smooth"
         // })
         window.scrollTo({
            top: calcOffsetTop(el),
            behavior: "smooth"
         });
      }
   }
}
initButtonScroll();
// </initButtonScroll> =================================================

function isVisible(elem) {
   const elemCoord = elem.getBoundingClientRect();
   const heightClient = document.documentElement.clientHeight;
   // return (elemCoord.bottom > 0 && elemCoord.bottom < heightClient) || (elemCoord.top > 0 && elemCoord.top < heightClient)
   return elemCoord.top <= heightClient && elemCoord.bottom >= 0
}

// <select-custom> ======================================================
function closeAllCustomSelect(e) {
   if (!e.target.closest('.custom-select')) {
      const allCustomSelect = document.querySelectorAll('.custom-select');
      for (const customSelect of allCustomSelect) {
         customSelect.classList.remove('custom-select_open');
      }
   };
}

function makeCustomSelect(selCastomEl) {
   const select = selCastomEl.querySelector('select');
   if (!select) return;

   const button = document.createElement('button');
   const itemsSelectedEl = makeItemsForCustomSelect(select, 'span', 'span', true);
   button.classList.add('custom-select__items-selected');
   button.appendChild(itemsSelectedEl);

   const itemsEl = makeItemsForCustomSelect(select, 'div', 'button');
   itemsEl.classList.add('custom-select__items');
   if (select.hasAttribute('data-scroll')) {
      itemsEl.classList.add('custom-select__items_scroll');
   }

   selCastomEl.appendChild(button);
   selCastomEl.appendChild(itemsEl);
   selCastomEl.onclick = clickCustomSelect;
}

function makeCustomSelects() {
   const selCustomEls = document.querySelectorAll('.custom-select');
   for (const selCustomEl of selCustomEls) {
      makeCustomSelect(selCustomEl);
   }
   if (selCustomEls) {
      document.addEventListener('click', closeAllCustomSelect);
   }
}

function clickCustomSelect(e) {
   e.preventDefault();
   if (e.target.closest('.custom-select__items')) {
      clickPseudoOption(e);
      // return
   }
   const selCustomEl = e.target.closest('.custom-select');
   if (!selCustomEl) return;
   selCustomEl.classList.toggle('custom-select_open');
}

function clickPseudoOption(e) {
   const customSelect = e.target.closest('.custom-select');
   const select = customSelect.querySelector('select');
   const currentPseudoOption = e.target.closest('[data-value]');
   if (!currentPseudoOption) return;

   resetSelectedInTtems(customSelect);

   for (const optionEl of select.options) {
      if (optionEl.value === currentPseudoOption.dataset.value) {
         currentPseudoOption.setAttribute('data-selected', '')
         optionEl.selected = currentPseudoOption.hasAttribute('data-selected');
      }
   }
   updateCustomSelect(customSelect);
   // customSelect.classList.remove('custom-select_open');
}

function resetSelectedInTtems(customSelect) {
   const itemsEl = customSelect.querySelector('.custom-select__items');
   if (!itemsEl) return;
   for (const pseudoOption of itemsEl.children) {
      pseudoOption.removeAttribute('data-selected');
   }
}

function updateCustomSelect(customSelect) {
   const select = customSelect.querySelector('select');

   const newItemsSelectedEl = makeItemsForCustomSelect(select, 'span', 'span', true);
   const itemsSelectedEl = customSelect.querySelector('.custom-select__items-selected > span');
   itemsSelectedEl.replaceWith(newItemsSelectedEl);

   // const newItemsEl = makeItemsForCustomSelect(select, false);
   // newItemsEl.classList.add('custom-select__items');
   // const itemsEl = customSelect.querySelector('.custom-select__items');
   // itemsEl.replaceWith(newItemsEl);
}

function makeItemsForCustomSelect(select, nameTagContainer = 'div', nameTagItem = 'div', isForItemsSelected = false) {
   const listEl = document.createElement(nameTagContainer)
   for (const optionEl of select.options) {
      if (isForItemsSelected && !optionEl.selected) continue;
      const pseudoOption = document.createElement(nameTagItem)
      if (optionEl.selected)
         pseudoOption.setAttribute('data-selected', '');
      pseudoOption.innerHTML = optionEl.hasAttribute('data-text')
         ? optionEl.dataset.text
         : optionEl.innerHTML;
      pseudoOption.dataset.value = optionEl.value;
      // pseudoOption.onmousedown = () => false;
      // if (!isForItemsSelected && select.hasAttribute('data-scroll')) {
      //    listEl.classList.add('custom-select__items_scroll');
      // }
      listEl.appendChild(pseudoOption);
   }
   return listEl;
}

makeCustomSelects();
// </select-custom> ======================================================
// <video> =============================================================
if (document.querySelector('.video-module')) {
   document.addEventListener("watcherCallback", function (e) {
      const entry = e.detail.entry;
      const targetEl = entry.target;
      if (targetEl.dataset.watch === 'video') {
         const player = targetEl.querySelector('video');
         if (entry.isIntersecting) {
            player.muted = true;
            player.play();
         } else {
            player.pause();
            targetEl.removeAttribute('data-paused');
            player.src = player.dataset.src;
         }
      }
   })
   document.querySelector('.video-module').addEventListener('click', function (e) {
      const videoModule = e.target.closest('.video-module');
      const player = videoModule.querySelector('video');
      if (!videoModule.hasAttribute('data-paused')) {
         player.src = player.dataset.full;
         player.muted = false;
         videoModule.dataset.paused = false;
      }
      if (player.paused)
         player.play()
      else player.pause();
      videoModule.dataset.paused = player.paused;
   })
}
// </video> =============================================================
// <video about-as> =================================================
if (document.querySelector('.video-about__video-module')) {
   document.addEventListener("watcherCallback", function (e) {
      const entry = e.detail.entry;
      const targetEl = entry.target;
      if (targetEl.classList.contains('video-about__video-module')) {
         const video = targetEl.querySelector('video');
         if (!entry.isIntersecting) {
            targetEl.removeAttribute('data-paused');
            video.load();
         }
      }
   })
   const videoContainer = document.querySelector('.video-about__video-module');
   const video = videoContainer.querySelector('video');
   videoContainer.addEventListener('click', function (e) {
      if (video.paused) {
         video.play()
      } else {
         video.pause();
      }
      videoContainer.dataset.paused = video.paused;
   })
}
// </video about-as> =================================================

// <button reply>
document.addEventListener('click', function (e) {
   const elem = e.target;
   if (!elem.classList.contains('comment__reply')) return;
   elem.insertAdjacentHTML('afterend', `<form action="" class="comment__form-reply form-reply">
										<div class="form-reply__head">
											<span class="form-reply__title">
												Reply to Nora Martin
											</span>
											<button class="form-reply__cancel-button">Cancel Reply</button>
										</div>
										<div class="form-reply__message">
											<textarea name="reply"></textarea>
										</div>
										<div class="form-reply__submit">
											<button class="button">Submit</button>
										</div>
									</form>`);
   elem.disabled = true;
   const form = elem.nextElementSibling;
   const textarea = form.querySelector('textarea');
   textarea.focus();
   const buttonCancel = form.querySelector('.form-reply__cancel-button');
   buttonCancel.onclick = function (e) {
      e.preventDefault();
      form.remove();
      elem.disabled = false;
   };
})
// </button reply>