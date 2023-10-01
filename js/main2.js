// Отображение лент с погодой
// Проходимся по каждому блоку и прослушиваем нажатие на кнопку moreDownLine
let moreDownLine = document.querySelectorAll('.moreDownLine');

const windowInnerWidthLines = document.documentElement.clientWidth;

for (let i = 0; i < moreDownLine.length; i++) {
    moreDownLine[i].onclick = function() {
        if (window.getComputedStyle(moreDownLine[i]).getPropertyValue("transform") == "none") {
            // Добавляем ленту 
            const lines = document.querySelectorAll('article');
            if (windowInnerWidthLines < 1440)
            {
                // Для мобильной версии с последовательным отображение лент
                let j = i*4 + 2;
                if (lines[j].style.display == "block")
                {
                    lines[j + 1].style.display = "block";
                    moreDownLine[i].style = "transform: rotate(180deg);";
                } else {
                    lines[j].style.display = "block";
                }
            } else {
                // Для компа
                lines[i*4 + 3].style.display = "block";
                moreDownLine[i].style = "transform: rotate(180deg);";
            }
        } else {
            // Удаляем ленту
            moreDownLine[i].style = "transform: none";
            const lines = document.querySelectorAll('article');
            if (windowInnerWidthLines < 1440)
            {
                // На мобильной версии
                for (let j = (i*4 + 2); j < (i*4 + 4); j++)
                {
                    lines[j].style.display = "none";
                }
            } else {
                // На компьютерной версии
                let j = i*4 + 3;
                lines[j].style.display = "none";

            }
        }
    }
}

// Просмотр версии (мобильная/компьютерная)
// И отображение нужного количества лент
if (windowInnerWidthLines < 1440)
{
    for (let i = 0; i < aside.length; i++)
    {
        const lines = document.querySelectorAll('article');
        for (let i = 2; i < lines.length; i += 4)
        {
            lines[i].style.display = "none";
            lines[i+1].style.display = "none";
        }
    }
} else {
    for (let i = 0; i < aside.length; i++)
    {
        const lines = document.querySelectorAll('article');
        for (let i = 3; i < lines.length; i += 4)
        {
            lines[i].style.display = "none";
        }
    }
}


// Реализация слайдера
const slider = []
for (let i = 0; i < 12; i++)
{
    slider[i] = document.querySelector(`#slider${i}`);
}
let sliderItems = [];
for (let i = 0; i < slider.length; i++)
{
    sliderItems[i] = Array.from(slider[i].children);
}

const btnNext = document.querySelectorAll('.arrowRight');
const btnPrev = document.querySelectorAll('.arrowLeft');

function displayWindowSize() {
    for (let i = 0; i < slider.length; i++)
    {
        sliderItems[i].forEach(function (slide, index) {
            const windowInnerWidth = document.documentElement.clientWidth;
            let t = 17;
            if (windowInnerWidth < 1440) t = 3;
            // Скрываем ненужные слайды
            if (index >= t) {
                slide.classList.add('hide');
            } else {
                slide.classList.remove('hide');
            }

            //Добавляем индексы
            slide.dataset.index = index;

            // Добавляем дата атрибут active для первого / активного слайда
            sliderItems[i][0].setAttribute('data-active', '');
        });
    }
}


window.addEventListener("resize", displayWindowSize);

displayWindowSize();

for (let i = 0; i < btnNext.length; i++)
{
    btnNext[i].onclick = function () {
        const currentSlide = slider[i].querySelector('[data-active]');
        const currentSlideIndex = +currentSlide.dataset.index;
        const windowInnerWidth = document.documentElement.clientWidth;
        let t = 17;
        if (windowInnerWidth < 1440) t = 3;
        // Показываем след слайд
        let nextSlideIndex;
        if (currentSlideIndex + t < sliderItems[i].length) {
            nextSlideIndex = currentSlideIndex + t;
            let nextActiveIndex = currentSlideIndex + 1;
            // Скрываем текущий слайд
            currentSlide.classList.add('hide');
            currentSlide.removeAttribute('data-active');
            const nextSlide = slider[i].querySelector(`[data-index="${nextSlideIndex}"`);
            nextSlide.classList.remove('hide');
            const nextActive = slider[i].querySelector(`[data-index="${nextActiveIndex}"]`);
            nextActive.setAttribute('data-active', '');
        }
    }
}

for (let i = 0; i < btnPrev.length; i++)
{
    btnPrev[i].onclick = function() {
        const currentSlide = slider[i].querySelector('[data-active]');
        const currentSlideIndex = +currentSlide.dataset.index;
        const windowInnerWidth = document.documentElement.clientWidth;
        let t = 16;
        if (windowInnerWidth < 1440) t = 2; 
        // Показываем след слайд
        let nextSlideIndex;
        if (currentSlideIndex - 1 >= 0) {
            nextSlideIndex = currentSlideIndex - 1;
            // Скрываем текущий слайд
            const lastSlideIndex = currentSlideIndex + t;
            const lastSlide = slider[i].querySelector(`[data-index="${lastSlideIndex}"`);
            if (lastSlide) lastSlide.classList.add('hide');
            currentSlide.removeAttribute('data-active');
            const nextSlide = slider[i].querySelector(`[data-index="${nextSlideIndex}"`);
            if (nextSlide) nextSlide.classList.remove('hide');
            nextSlide.setAttribute('data-active', '');
        }
    }
}