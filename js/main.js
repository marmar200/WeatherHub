// Меню 1-27стр
let buttonMenu = document.querySelector('#menuButton');
let menu = document.querySelector('#menu');

// Показ/Сокрытие меню
const toggleMenu = () => {
  menu.classList.toggle('show');
}

// Открытие меню на кнопку
buttonMenu.addEventListener('click', e => {
  e.stopPropagation();

  toggleMenu();
});

// Проверяем куда нажал пользователь
document.addEventListener('click', e => {
  let target = e.target;
  let its_menu = target == menu || menu.contains(target);
  let its_buttonMenu = target == buttonMenu;
  let menu_is_active = menu.classList.contains('show');
  
  if (!its_menu && !its_buttonMenu && menu_is_active) {
    toggleMenu();
  }
})


// Карточки с погодой
let aside = document.querySelectorAll('aside');

// Карточка (html)
const html = `<span class="card" id="tmp">
                    <div>
                    <article>
                        <h1 class="temp">+23°C</h1>
                        <h5>Ощущается как <c class="feelsLike">+21°C</c></h5>
                    </article>
                    <img src="img/sunwithcloud.png" alt="" class="sunwithcloud">
                    <h2 class="description">Облачно с прояснениями</h2>
                    <span class="span1">
                        <img src="img/GroupVeter.svg" alt="">
                        <h4 class="wind">2,0 м/с, св <d>порывы до 4 м/с</d></h4>
                        <img src="img/GroupStolb.svg" alt="" style="margin-top: 13px;">
                        <h4 style="position: relative; top: -5px;" class="presureMm">752 мм рт. ст.</h4>
                        <img src="img/GroupWater.svg" alt="" style="margin-top: 13px;">
                        <h4 style="position: relative; top: -5px;" class="presurePer">52% / 0 мм</h4>
                    </span>
                    <span class="span2" style="width: 121px;height: 132px;margin-left: 9px; margin-top: 0; position: relative; top: -5px;">
                        <img src="img/icons8-sunrise-arcade-96 1.png" alt="" >
                        <h3 class="sunrise">5:56</h3>
                        <img src="img/icons8-sun-96 1.png" alt="" >
                        <h3 class="sunMax">13ч 11мин</h3>
                        <img src="img/icons8-sunset-96 1.png" alt="" >
                        <h3 class="sunset">19:11</h3>
                    </span>
                    </div>
                    <p>Ист.: Yandex.Pogoda</p>
                </span>`

// Перезагрузка страницы
function reloadFunc () {
    location.reload();
}

window.addEventListener("resize", reloadFunc);

// Просматриваем события связанные с кнопками moreDown
let moreDown = document.querySelectorAll('.moreDown');

const windowInnerWidth = document.documentElement.clientWidth;

for (let i = 0; i < moreDown.length; i++) {
    moreDown[i].onclick = function() {
        if (window.getComputedStyle(moreDown[i]).getPropertyValue("transform") == "none") {
            // Добавление карточки
            if (windowInnerWidth < 1440)
            { 
                // Для мобильной версии
                const cards = document.querySelectorAll('.card');
                let j = i*3 + 1;
                // Последовательное отображение карточек
                if (cards[j].style.display == "inline-block")
                {
                    cards[j + 1].style.display = "inline-block";
                    moreDown[i].style = "transform: rotate(180deg);";
                    aside[i].insertAdjacentElement("beforeend", moreDown[i]);
                }
                else cards[j].style.display = "inline-block";

            }  else { 
                // Для компа
                aside[i].insertAdjacentHTML("beforeend", html);
                moreDown[i].style = "transform: rotate(180deg);";
                aside[i].insertAdjacentElement("beforeend", moreDown[i]);
            }
        } else {
            // Удаление карточек
            moreDown[i].style = "transform: none";
            if (windowInnerWidth < 1440)
            {
                // Для мобильной версии
                const cards = document.querySelectorAll('.card');
                for (let j = (i*3 + 1); j < (i*3 + 3); j++)
                {
                    cards[j].style.display = "none";
                }
            }  else { 
                // Для компа
                aside[i].querySelector('#tmp').remove();
            }
        }
    }
}


if (windowInnerWidth < 1440)
{
    // Просматриваем переход на мобильную версию
    // Удаляем лишние карточки из блоков
    for (let i = 0; i < aside.length; i++)
    {
        const cards = document.querySelectorAll('.card');
        for (let i = 0; i < cards.length; i++)
        {
            if (i != 0 && i != 3 && i != 6)
                cards[i].style.display = "none";
        }
    }
} 
