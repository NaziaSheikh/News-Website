const API_KEY = "6840753be003469199eae95ad9199cef";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}
function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
  
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

   

    

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    })
}
let curSelect=null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    curSelect?.classList.remove('active');
    curSelect=navItem;
    curSelect.classList.add('active');
}
const searchbutton=document.getElementById("search-button");
const searchtext=document.getElementById("search-text");
searchbutton.addEventListener("click",handler);
searchbutton.addEventListener("keypress",handler);
function handler(event){
    const query=searchtext.value;
    if(!query) return;
    fetchNews(query);
    curSelect?.classList.remove("active");
    curSelect=null;
}

function togglefun()
{
    
    let element=document.body;
    element.classList.toggle("dark");
   const btn=document.getElementById("toggle");
    const initial="Switch to Dark";

   if(btn.textContent.toLowerCase().includes(initial.toLowerCase()))
   {
    btn.innerHTML="Switch to Light";
    btn.style.backgroundColor='white';
    btn.style.color='black';
   }
   else{
    btn.textContent=initial;
    btn.style.backgroundColor='black';
    btn.style.color='white';
   }
    
}