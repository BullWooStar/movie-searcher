import "../scss/main.scss";

const input = document.querySelector(".search input");
const searchButton = document.querySelector("header button");
const detailPage = document.querySelector(".detailPage");
const apiKey = "7035c60c&s";

//디테일페이지
const detailPageButton = document.querySelector(".detailPage .inner button");
const detailPoster = document.querySelector(".detailPage .inner .poster img");
const detailTitle = document.querySelector(".detailPage .inner .title span");
const detailYear = document.querySelector(".detailPage .inner .year span");

detailPageButton.addEventListener("click", () => {
  detailPage.classList.add("hidden");
});

//영화불러오고 화면 띄우기

async function getMovie(title) {
  try {
    const { data } = await axios({
      url: `https://www.omdbapi.com?apikey=${apiKey}=${title}&type=movie`, //apikey= 가 아니라 &  //키까지 묶을것인가 밸류까지만 묶을것인가 스탠다드설정
      method: "GET",
    });

    const movies = data.Search;

    // 영화박스 만들기
    for (let i = 0; i < movies.length; i++) {
      const createNewSearchBox = document.createElement("div");
      createNewSearchBox.classList.add("searchBox", `searchBox${i}`);
      createNewSearchBox.innerHTML = `<div class="poster"><img src="" alt=""></div>
            <div class="title"><div></div></div>
            <div class="year"><span></span></div>`;
      const searchPage = document.querySelector(".searchPage");
      searchPage.append(createNewSearchBox);

      //박스에 내용채워넣기
      const searchPoster = document.querySelector(
        `.searchPage .searchBox${i} .poster img`
      );
      const searchTitle = document.querySelector(
        `.searchPage .searchBox${i} .title div`
      );
      const searchYear = document.querySelector(
        `.searchPage .searchBox${i} .year span`
      );

      searchPoster.src = movies[i].Poster;
      searchTitle.textContent = movies[i].Title;
      searchYear.textContent = movies[i].Year;
    }
    document.querySelector(".main .inner button").classList.remove("hidden");

    //디테일페이지

    const searchBox = document.querySelectorAll(".searchBox");

    searchBox.forEach((el) => {
      el.addEventListener("click", () => {
        detailPage.classList.remove("hidden");
        detailPoster.src = el.firstChild.firstChild.src;
        detailTitle.innerHTML = el.childNodes[2].firstChild.textContent;
        detailYear.innerHTML = el.lastChild.firstChild.textContent;
      });
    });
  } catch {
    document.querySelector(".main .inner button").classList.add("hidden");
    document.querySelector(".nothingPage").classList.add("hidden");
    alert("찾으시는 영화가 없습니다");
  }
}

//검색버튼

searchButton.addEventListener("click", () => {
  document.querySelector(".nothingPage").classList.add("hidden");
  document.querySelector(".searchPage").classList.remove("hidden");
  document.querySelector(".searchPage").innerHTML = "";
  getMovie(`"${input.value}"`);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.querySelector(".nothingPage").classList.add("hidden");
    document.querySelector(".searchPage").classList.remove("hidden");
    document.querySelector(".searchPage").innerHTML = "";
    getMovie(`"${input.value}"`);
  }
});

//영화 리스트 불러오기

async function getMoviePage(title, page, pageID) {
  try {
    const { data } = await axios({
      url: `https://www.omdbapi.com?apikey=${apiKey}=${title}&type=movie&page=${page}`,
      method: "GET",
    });

    const movies = data.Search;

    // 영화박스 만들기
    for (let i = 0; i < movies.length; i++) {
      const createNewSearchBox = document.createElement("div");
      createNewSearchBox.classList.add(
        "searchBox",
        `searchBox${i}pageID${pageID}`
      );
      createNewSearchBox.innerHTML = `<div class="poster"><img src="" alt=""></div>
                <div class="title"><div></div></div>
                <div class="year"><span></span></div>`;
      const searchPage = document.querySelector(".searchPage");
      searchPage.append(createNewSearchBox);

      //박스에 내용채워넣기
      const searchPoster = document.querySelector(
        `.searchPage .searchBox${i}pageID${pageID} .poster img`
      );
      const searchTitle = document.querySelector(
        `.searchPage .searchBox${i}pageID${pageID} .title div`
      );
      const searchYear = document.querySelector(
        `.searchPage .searchBox${i}pageID${pageID} .year span`
      );

      searchPoster.src = movies[i].Poster;
      searchTitle.textContent = movies[i].Title;
      searchYear.textContent = movies[i].Year;
    }

    //디테일페이지
    const searchBox = document.querySelectorAll(".searchBox");

    searchBox.forEach((el) => {
      el.addEventListener("click", () => {
        detailPage.classList.remove("hidden");
        detailPoster.src = el.firstChild.firstChild.src;
        detailTitle.innerHTML = el.childNodes[2].firstChild.textContent;
        detailYear.innerHTML = el.lastChild.firstChild.textContent;
      });
    });
  } catch {
    document.querySelector(".main button").classList.add("hidden");
    alert("더 이상 리스트가 없습니다");
  }
}

//리스트추가버튼이벤트

const listButton = document.querySelector(".main button");

let pageCounter = 2;

listButton.addEventListener("click", () => {
  getMoviePage(`"${input.value}"`, pageCounter, pageCounter);
  pageCounter = pageCounter + 1;
});
