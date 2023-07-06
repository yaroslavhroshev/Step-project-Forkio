const headerContentWrapper = document.querySelector('.header__content-wrapper');
headerContentWrapper.addEventListener('click', e => e.preventDefault())

const dropDownMenu = headerContentWrapper.querySelector('.header__list--drop-down-menu');
const burgerMenu = headerContentWrapper.querySelector('.header__burger-menu');

function deleteActiveLink(element, className) {
    const active = element.querySelector(`.${className}`);
    if (active !== null) {
        active.classList.remove(`${className}`)
    }
}

burgerMenu.addEventListener('click', e => {
    e.target.classList.toggle('header__burger-menu--active');
    document.querySelector('.header__list--drop-down-menu').classList.toggle('hidden');
    
    if(dropDownMenu.classList.contains('hidden')) {
       deleteActiveLink(dropDownMenu, 'header__link--drop-down-item-active')
    }
})

document.body.addEventListener('click', e => {
    if (!dropDownMenu.classList.contains('hidden')) {
        if (e.target === burgerMenu) return
        if (e.target.closest('.header__list--drop-down-menu')) return
        if(burgerMenu.classList.contains('header__burger-menu--active')) {
            dropDownMenu.classList.add('hidden')
            burgerMenu.classList.remove('header__burger-menu--active')
            deleteActiveLink(dropDownMenu, 'header__link--drop-down-item-active')
        } else {
            return
        }
    }
})

dropDownMenu.addEventListener("click", e => {
    if(e.target === e.currentTarget) return
    if(e.target.closest('.header__link--drop-down-item').classList.contains('header__link--drop-down-item-active')) return
    
    const active = document.querySelector('.header__link--drop-down-item-active');
    if (active !== null) {
        active.classList.remove('header__link--drop-down-item-active');
    }
    e.target.closest('.header__link--drop-down-item').classList.add('header__link--drop-down-item-active')
})



const screen = window.matchMedia("(min-width:481px)");
const headerNavList = document.querySelector('.header__list');
const headerListItems = document.querySelectorAll('.header__item');
const headerListLinks = document.querySelectorAll('.header__link');

const drDownMenu = window.getComputedStyle(dropDownMenu);
const dropDownMenuStyle = drDownMenu.getPropertyValue("left");


function checkClass(element, className) {
    return element.classList.contains(`${className}`)    
}

function deleteClassForElement(element, className) {
    if(checkClass(element, `${className}`)) {
        element.classList.remove(`${className}`)
    }
}

function deleteClassForCollection(collection, className) {
    collection.forEach(collectionItem => {
        if(checkClass(collectionItem, `${className}`)) {
            collectionItem.classList.remove(`${className}`)
        }
    })
}

function addClassForElement(element, className) {
    if(!checkClass(element, `${className}`)) {
        element.classList.add(`${className}`)
    }
}

function addClassForCollection(collection, className) {
    collection.forEach(collectionItem => {
        if(!checkClass(collectionItem, `${className}`)) {
            collectionItem.classList.add(`${className}`)
        }
    })
}

if (screen.matches) {
    deleteClassForElement(headerNavList, 'header__list--drop-down-menu')
    deleteClassForElement(headerNavList, 'hidden')
    deleteClassForCollection(headerListItems, 'header__link--drop-down-item')
    deleteClassForCollection(headerListLinks, 'header__link--drop-down-link')
}

const body = document.querySelector(".js-body");

function changeDropDowmMenuPosition(jsMedia) {
    if (!jsMedia.matches) {
        const screenWidth = body.clientWidth;
        if (screenWidth > 320 && screenWidth < 481) {
            const calcPosition = (screenWidth - 320) / 2;
            dropDownMenu.style.left = `${-calcPosition + parseInt(dropDownMenuStyle)}px`;
        }
    } 
}

changeDropDowmMenuPosition(screen);

window.addEventListener('resize', () => {
    changeDropDowmMenuPosition(screen)
})

window.addEventListener('resize', () => {
    const active = document.querySelector('.header__link--drop-down-item-active');
    if (screen.matches) {
            deleteClassForElement(burgerMenu, 'header__burger-menu--active')
            deleteClassForElement(headerNavList, 'header__list--drop-down-menu')
            deleteClassForElement(headerNavList, 'hidden')
            deleteClassForCollection(headerListItems, 'header__link--drop-down-item')
            deleteClassForCollection(headerListLinks, 'header__link--drop-down-link')

            if(active) {
                active.classList.remove('header__link--drop-down-item-active');
            }
        } else {
            deleteClassForElement(burgerMenu, 'header__burger-menu--active')
            addClassForElement(headerNavList, 'header__list--drop-down-menu');
            addClassForElement(headerNavList, 'hidden');
            addClassForCollection(headerListItems, 'header__link--drop-down-item')
            addClassForCollection(headerListLinks, 'header__link--drop-down-link')
            if(active) {
                active.classList.remove('header__link--drop-down-item-active');
            }
        }
})

