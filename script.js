const mainImg = document.querySelector('.large__image img')
const smallImg = document.querySelectorAll(".small__images img")
let imgs = [];

async function getData() {
  const url = "https://mystormnet.site/api/get_products_list/";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    let json = await response.json();
    let results = json['results'];
    console.log(results);
    for (const i in results) {
      if(i>=15) return;
      smallImg[i].src = results[i]['image_prev']
      mainImg.src = smallImg[0].src;
    }
  } catch (error) {
    console.error(error.message);
  }
}
getData();


for (const element of smallImg) {
  element.addEventListener('click',(e) => {
    mainImg.src = e.target.src;
  })
}

// JavaScript
class Slider {
  constructor(selector) {
      this.slider = document.querySelector(selector);
      this.slides = this.slider.querySelector('.small__images');
      this.prevBtn = this.slider.querySelector('.prev');
      this.nextBtn = this.slider.querySelector('.next');
      this.slideCount = this.slides.children.length;
      this.currentIndex = 0;this.slideWidth = 200; // Фиксированная ширина слайда
      this.gap = 20; // Промежуток между слайдами
      this.slidesPerView = 3; // Количество видимых слайдов
      
      // Вычисляем ширину одного шага (3 слайда + промежутки)
      this.stepWidth = (this.slideWidth + this.gap) * this.slidesPerView;

      // Устанавливаем начальные стили
      this.slides.style.gap = `${this.gap}px`;
      Array.from(this.slides.children).forEach(slide => {
          slide.style.width = `${this.slideWidth}px`;
      });

      // Привязка обработчиков событий
      this.prevBtn.addEventListener('click', () => this.prevSlide());
      this.nextBtn.addEventListener('click', () => this.nextSlide());
  }

  moveToSlide(index) {
      // Проверка границ
      const maxIndex = Math.max(0, Math.ceil(this.slideCount / this.slidesPerView) - 1);
      
      if (index < 0) {
          this.currentIndex = maxIndex-2;
      } else if (index > maxIndex-2) {
          this.currentIndex = 0;
      } else {
          this.currentIndex = index;
      }

      // Перемещение слайдов
      const translateX = -this.currentIndex * this.stepWidth;
      this.slides.style.transform = `translateX(${translateX}px)`;
  }

  prevSlide() {
      this.moveToSlide(this.currentIndex - 1);
  }

  nextSlide() {
      this.moveToSlide(this.currentIndex + 1);
  }
  // Обновление размеров при изменении окна (опционально)
  handleResize() {
      window.addEventListener('resize', () => {
          this.moveToSlide(this.currentIndex);
      });
  }
}

// Инициализация слайдера
const slider = new Slider('.box');
slider.handleResize();