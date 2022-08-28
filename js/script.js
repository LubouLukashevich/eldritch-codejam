//Глобальные флаги и переменные
let isAncient = false; //выбран древний
let nameAncient = ''; //имя выбранного древнего
//let startVisible = false; //видимость кнопки Замешать колоду
let cardsAll = []; //все карты от уровня сложности
let resultCardSet = []; //итоговый набор карт
let c = 0; //счетчик кликов по рубашке
let tracker = []; //трекер состояния колоды


//Выбор Древнего
const title = document.querySelector('.header');
const titleDiv = document.createElement('div');
titleDiv.textContent = 'Выберите Древнего'.toUpperCase();
title.prepend(titleDiv); 
//Изображения Древних
const listAncients = document.querySelector('.ancientsList');
import ancientsData from '../data/ancients.js';
ancientsData.forEach(el => { 
    const div = document.createElement('div');
    listAncients.append(div); 
    div.classList.add('ancients');
    const img = document.createElement('img');
     div.append(img); 
     img.classList.add('ancientsFace');
     img.src = el.cardFace;
     img.title = el.name; 
     img.id = el.id;
     img.addEventListener('click', choiceAncients);
    })


function choiceAncients(card) {
    const currentChoice = card.currentTarget.id;
    let elem = document.getElementById(currentChoice);
    if (currentChoice !== nameAncient) { 
    isAncient = true;
        if (nameAncient !== '') {
            let elemOld = document.getElementById(nameAncient);
            elemOld.classList.remove('ancientsFaceChoice');
            elemOld.classList.add('ancientsFace');
            clear();
        }
    nameAncient = currentChoice;
    elem.classList.toggle('ancientsFaceChoice');
    clear();
    }
    else
    { isAncient = false;
      nameAncient = '';
      elem.classList.remove('ancientsFaceChoice');
      elem.classList.add('ancientsFace');
      clear();
    }
    startVisible();
}

//Кнопка замешать колоду
const buttonDiv = document.querySelector('.level');
const buttonStart= document.createElement('button');
buttonStart.textContent = 'Замешать колоду'.toUpperCase();
buttonStart.classList.add('start');
buttonStart.classList.add('invisible');
buttonDiv.append(buttonStart);
buttonStart.addEventListener('click', startGame);

//Появление и скрытие кнопки Замешать колоду
function startVisible() {
    if (isAncient) {buttonStart.classList.remove('invisible');}
    else {buttonStart.classList.add('invisible');
    footer.classList.add('invisible');
}
}

//Загрузка данных колоды Древнего
function cardSet() {
    let set = [];
    ancientsData.forEach(el => { 
        if (nameAncient === el.name) {
         for  (let key in el.firstStage) {
             set.push(el.firstStage[key])
         }
         for  (let key in el.secondStage) {
            set.push(el.secondStage[key])
        }
        for  (let key in el.thirdStage) {
            set.push(el.thirdStage[key])
        }
        }
        })
    return set;
}

//Cокрытие трекера и карт
const footer = document.querySelector('.footer');
footer.classList.add('invisible');

//Таблица трекер
const stage1 = document.querySelector('.stage1');
const stage2 = document.querySelector('.stage2');
const stage3 = document.querySelector('.stage3');
const table = document.querySelector('.cardSet');
function tableImage(arr) {
    let c = 0;
    for (let j = 1; j < 6; j+=2) {
    for (let i = 0; i < 3; i++) {
    table.rows[j].cells[i].textContent = arr[c];
    c += 1;    
    }
    }
 if ((arr[0] + arr[1] + arr[2]) === 0) {stage1.classList.add('stageFinish')};
 if ((arr[3] + arr[4] + arr[5]) === 0) {stage2.classList.add('stageFinish')};
 if ((arr[6] + arr[7] + arr[8]) === 0) {stage3.classList.add('stageFinish')};
}

//Первернутая стопка рубашкой вверх
const back = document.querySelector('.back');
const backFace = document.createElement('img');
back.append(backFace); 
backFace.classList.add('backFace');
backFace.src = '../assets/mythicCardBackground.png';
backFace.addEventListener('click', showCard);


//Генерация колоды стандарт
import cardsDataGreen from '../data/mythicCards/green/index.js';
import cardsDataBrown from '../data/mythicCards/brown/index.js';
import cardsDataBlue from '../data/mythicCards/blue/index.js';
function collectCards() {
    let arrGreen = [];
    let arrBrown = [];
    let arrBlue = [];
    let i = 0;
    cardsDataGreen.forEach(el => { 
        if (el.id === 'green' + (i+1)) {arrGreen[i] = i + 1;
        i+=1;}
        })
    i = 0;
    cardsDataBrown.forEach(el => { 
        if (el.id === 'brown' + (i+1)) {arrBrown[i] = i + 1;
        i+=1;}
        })
    i = 0;
    cardsDataBlue.forEach(el => { 
        if (el.id === 'blue' + (i+1)) {arrBlue[i] = i + 1;
        i+=1;}
        })
    let arrGreenShuffle = shuffle(arrGreen);
    let arrBrownShuffle = shuffle(arrBrown);
    let arrBlueShuffle = shuffle(arrBlue);
    return [arrGreenShuffle, arrBrownShuffle, arrBlueShuffle];
}

function shuffle(array) {
   return array.sort(() => Math.random() - 0.5);
  }


//Показ колоды

let g = 0;
let b = 0;
let s = 0;
function startGame() {
cardsAll = collectCards();
let currentCards = cardSet();
tracker = currentCards.slice(0);
tableImage(currentCards); 
footer.classList.remove('invisible'); 
backFace.classList.remove('invisible');
card.classList.add('invisible');
c = 0;
resultCardSet = stage(currentCards[0], currentCards[1], currentCards[2]);
resultCardSet.push(...stage(currentCards[3], currentCards[4], currentCards[5]));
resultCardSet.push(...stage(currentCards[6], currentCards[7], currentCards[8]));
}

function stage(gf, bf, sf) {
let stageNumber = [];
for (let i = 0; i < gf + bf + sf; i++) {
    stageNumber[i] = i;
}
shuffle(stageNumber);
let i = 0;
let stageCards = {};
while ( gf !== 0) {
    stageCards[i] = `green${cardsAll[0][g]}`;
    g += 1;
    gf -= 1;
    i += 1;
   }
while ( bf !== 0) {
    stageCards[i] = `brown${cardsAll[1][b]}`;
    b += 1;
    bf -= 1;
    i += 1;
   }
while ( sf !== 0) {
    stageCards[i] = `blue${cardsAll[2][s]}`;
    s += 1;
    sf -= 1;
    i += 1;
   }
let result = [];
for (let i = 0; i < stageNumber.length; i++) {
    result[i] = stageCards[stageNumber[i]];
}
return result;
}



//Показ карты по клику
const cardsSet = document.querySelector('.cards');
const card = document.createElement('img');
cardsSet.append(card);
card.classList.add('cardFace');  
card.classList.add('invisible');  
c = 0; //счетчик кликов
function showCard() {
    card.classList.remove('invisible');  
    switch (resultCardSet[c].slice(0,2)) {
        case 'gr' : card.src = `../assets/MythicCards/green/${resultCardSet[c]}.png`;
        (tracker[0] !== 0) ? tracker[0] -=1 : (tracker[3] !== 0) ? tracker[3] -=1 : tracker[6] -=1;
        break;
        case 'br' : card.src = `../assets/MythicCards/brown/${resultCardSet[c]}.png`;
        (tracker[1] !== 0) ? tracker[1] -=1 : (tracker[4] !== 0) ? tracker[4] -=1 : tracker[7] -=1;
        break;
        case 'bl' : card.src = `../assets/MythicCards/blue/${resultCardSet[c]}.png`;
        (tracker[2] !== 0) ? tracker[2] -=1 : (tracker[5] !== 0) ? tracker[5] -=1 : tracker[8] -=1;
    }
    tableImage(tracker); 
   if (c === resultCardSet.length - 1) {backFace.classList.add('invisible');};
   c +=1;
}

function clear() {
footer.classList.add('invisible');
stage1.classList.remove('stageFinish');
stage2.classList.remove('stageFinish');
stage3.classList.remove('stageFinish');
cardsAll = []; 
resultCardSet = []; 
}