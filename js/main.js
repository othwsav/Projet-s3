let $ = e => document.querySelector(e),
    $$ = e => document.querySelectorAll(e),
    topOff = e => e.getBoundingClientRect().top,
    WH = window.innerHeight;

// get siblings function
let getSiblings =  e => {
    let siblings = [];
    if(!e.parentNode) {
        return siblings;
    }
    let sibling  = e.parentNode.firstChild;
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== e) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }
    return siblings;
};

// scroll to section when clicking on nav link
[...$$(`[data-to]`)].map(el => {
    el.addEventListener('click', e => {
        $(`#${e.target.getAttribute("data-to")}`).scrollIntoView({ behavior: 'smooth' });
    })
})

// scroll event that watch fixed nav and sync nav links with the scrolled position
window.addEventListener("scroll", e => {
    if(window.scrollY > 700)
        $(".fixed").classList.add("show")
    else
        $(".fixed").classList.remove("show");


    let idsOf =[...$$("section")].filter(el => topOff(el) > -(WH/2)).map(el => el.id);
    


    getSiblings($(`[data-to="${idsOf[0]}"]`)).map(e => {
        e.classList.remove("active")
    })
    $(`[data-to="${idsOf[0]}"]`).classList.add("active")

    
})