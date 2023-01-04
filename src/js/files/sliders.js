/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Navigation, Pagination, Lazy, Autoplay, EffectFade } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Инициализация слайдеров
function initSliders() {
	// Перечень слайдеров
	// Проверяем, есть ли слайдер на стронице
	if (document.querySelector('.body-main-slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.body-main-slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Pagination, Lazy],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			// autoHeight: true,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			loop: true,
			//preloadImages: false,
			lazy: {
				loadPrevNext: true,
			},

			/*
			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагинация
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.swiper-button-prev',
				nextEl: '.swiper-button-next',
			},

			// Брейкпоинты
			/*
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			// События
			on: {
				init: function () {
					const controlls = document.querySelector('.body-main-slider__controll').children;
					for (let index = 0; index < controlls.length; index++) {
						controlls[index].innerHTML = ('0' + (index + 1)).slice(-2);
					}
				}
			}
		});
	}

	if (document.querySelector('.gallary__slider')) {
		let gallerySlider = new Swiper('.gallary__slider', {
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Lazy, Autoplay],
			autoplay: {
				delay: 3000,
				stopOnLastSlide: false,
				disableOnInteraction: false,
			},
			freeMode: {
				// enabled: true,
			},
			observer: true,
			observeParents: true,
			// slidesPerView: 4,
			slidesPerView: "auto",
			spaceBetween: 32,
			autoHeight: false,
			speed: 1000,
			//touchRatio: 0,
			//simulateTouch: false,
			// loop: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
			},
			// Arrows
			/*
			navigation: {
				nextEl: '.about__more .more__item_next',
				prevEl: '.about__more .more__item_prev',
			},
			*/
			breakpoints: {
			},
			on: {
				slideChange: function (swiper) {

				}
			}
		});

		function gallerySliderFix() {
			const gallarySlider = document.querySelector('.gallary__slider');
			const gallarySliderCoord = gallarySlider.getBoundingClientRect();
			const clientWidth = document.documentElement.clientWidth;
			const width = clientWidth - gallarySliderCoord.left;
			gallarySlider.style.width = width + 'px';
		}
		window.addEventListener("resize", gallerySliderFix);
		gallerySliderFix();
		gallerySlider.update();
	}

	if (document.querySelector('.body-bar-slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.body-bar-slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Pagination, Lazy],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			// autoHeight: true,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			loop: true,
			//preloadImages: false,
			lazy: {
				loadPrevNext: true,
			},

			/*
			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагинация
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.swiper-button-prev',
				nextEl: '.swiper-button-next',
			},

			// Брейкпоинты
			/*
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			// События
			on: {
				init: function () {
					const controlls = document.querySelector('.body-bar-slider__controll').children;
					for (let index = 0; index < controlls.length; index++) {
						controlls[index].innerHTML = ('0' + (index + 1)).slice(-2);
					}
				}
			}
		});
	}

	if (document.querySelector('.hours__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.hours__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Lazy, Autoplay, EffectFade],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			// autoHeight: true,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			loop: true,
			//preloadImages: false,
			lazy: {
				loadPrevNext: true,
			},


			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 4000,
				disableOnInteraction: false,
			},


			// Пагинация
			// pagination: {
			// 	el: '.swiper-pagination',
			// 	clickable: true,
			// },

			// Скроллбар

			/* 			scrollbar: {
							el: '.swiper-scrollbar',
							draggable: false,
						}, */


			// Кнопки "влево/вправо"
			// navigation: {
			// 	prevEl: '.swiper-button-prev',
			// 	nextEl: '.swiper-button-next',
			// },

			// Брейкпоинты
			/*
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			// События
			on: {
				init: function () {
				}
			}
		});
	}

	if (document.querySelector('.offer__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.offer__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Lazy, Autoplay, EffectFade],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			// autoHeight: true,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			loop: true,
			//preloadImages: false,
			lazy: {
				loadPrevNext: true,
			},


			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 4000,
				disableOnInteraction: false,
			},


			// Пагинация
			// pagination: {
			// 	el: '.swiper-pagination',
			// 	clickable: true,
			// },

			// Скроллбар

			/* 			scrollbar: {
							el: '.swiper-scrollbar',
							draggable: false,
						}, */


			// Кнопки "влево/вправо"
			// navigation: {
			// 	prevEl: '.swiper-button-prev',
			// 	nextEl: '.swiper-button-next',
			// },

			// Брейкпоинты
			/*
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			// События
			on: {
				init: function () {
				}
			}
		});
	}

	if (document.querySelector('.letter-above-picture')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.letter-above-picture', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Lazy, Autoplay, EffectFade],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			// autoHeight: true,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			loop: true,
			//preloadImages: false,
			lazy: {
				loadPrevNext: true,
			},


			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 4000,
				disableOnInteraction: false,
			},


			// Пагинация
			// pagination: {
			// 	el: '.swiper-pagination',
			// 	clickable: true,
			// },

			// Скроллбар

			/* 			scrollbar: {
							el: '.swiper-scrollbar',
							draggable: false,
						}, */


			// Кнопки "влево/вправо"
			// navigation: {
			// 	prevEl: '.swiper-button-prev',
			// 	nextEl: '.swiper-button-next',
			// },

			// Брейкпоинты
			/*
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			// События
			on: {
				init: function () {
				}
			}
		});
	}
}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});