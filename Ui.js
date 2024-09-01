import { Game } from "./Game.js";
import { Details } from "./details.js";

let categories = Array.from(document.querySelectorAll('.navbar-nav li a'));
let myRow = document.querySelector('.games .row');
let closeDetails;
let cards = []; // Initialize as an empty array
 let loader=document.querySelector('.loade');
 let load=document.querySelector('.load');
class Ui {

    async displayGames(val) {
        let x = new Game(val);
        let games = await x.getCategory();
        loader.classList.add('d-none')
        console.log(games);

        let cartona = '';
        for (let i = 0; i < games.length; i++) {
            cartona += `
                    <div class="col-sm-6 col-md-4 col-lg-3">
                <div class="card h-100 m-auto" id="${games[i].id}">
                    <div class="m-2">
                        <img src="${games[i].thumbnail}" class="w-100 rounded" alt="Game Thumbnail">
                    </div>
                    <div class="card-body text-white">
                        <div class="card-title d-flex justify-content-between">
                            <h5>${games[i].developer}</h5>
                            <p class="px-2 rounded-3 bg-primary text-white">Free</p>
                        </div>
                        <p class="card-text text-center">${games[i].short_description}</p>
                        <div class="footer d-flex justify-content-between">
                            <p class="px-2 rounded mt-2 bg-secondary text-white">${games[i].genre}</p>
                            <p class="px-2 rounded mt-2 bg-secondary text-white">${games[i].platform}</p>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
        myRow.innerHTML = cartona;

        // Update the cards array after displaying games
        cards = Array.from(document.getElementsByClassName('card'));
        console.log(cards); // Now this will log the populated cards array

        // Update event listeners for cards
        updateCardEventListeners();
    }

    async displayDetails(id) {
        let myDetails = new Details(id);
        let details = await myDetails.getDetails();
        load.classList.add('d-none')
        console.log(details);

        document.querySelector('.conntent').innerHTML = `
                  <i class="fa-solid fa-xmark text-danger position-absolute end-0 me-5 p-2 rounded"></i>
    <div class="row text-white">
      <div class="col-md-4">
        <p class="fs-1">Details Game</P>
         <div class="stack">
            <div class="card">
              <img
                src="${details.screenshots[0].image}"
                alt=""  class="w-100"/>
            </div>
            <div class="card">
              <img
                src="${details.screenshots[1].image}"
                alt="" />
            </div>
            <div class="card">
              <img
                src="${details.screenshots[2].image}"
                alt="" />
            </div>
             <div class="card">
              <img
                src="${details.thumbnail}"
                alt="" />
            </div>
            
          </div>

      </div>
      <div class="col-md-8  titles">
        <h3>${details.title} </h3>
        <p>Category :<span class="rounded-2 px-2">${details.genre}</span></p>
        <p>Platform :<span class="rounded-2 px-2">${details.platform}</span></p>
        <p>Status :<span class="rounded-2 px-2">${details.status}</span></p>
        <p>${details.description}</p>

        <a class="btn btn-primary" href="${details.
            game_url
            }">Show Game</a>
      </div>







      
      
         
        
    </div>

            `;

        // Reassign the closeDetails variable after updating the DOM
        closeDetails = document.querySelector('.details i');

        // Add click event listener to closeDetails
        closeDetails.addEventListener('click', function () {
            document.querySelector('.header').classList.remove('d-none');
            document.querySelector('.games').classList.remove('d-none');
            document.querySelector('.details').classList.add('d-none');
            load.classList.remove('d-none');
        });






        const stack = document.querySelector(".stack");
        const cards = Array.from(stack.children)
            .reverse()
            .filter((child) => child.classList.contains("card"));

        cards.forEach((card) => stack.appendChild(card));

        function moveCard() {
            const lastCard = stack.lastElementChild;
            if (lastCard.classList.contains("card")) {
                lastCard.classList.add("swap");

                setTimeout(() => {
                    lastCard.classList.remove("swap");
                    stack.insertBefore(lastCard, stack.firstElementChild);
                }, 1200);
            }
        }

        let autoplayInterval = setInterval(moveCard, 4000);

        stack.addEventListener("click", function (e) {
            const card = e.target.closest(".card");
            if (card && card === stack.lastElementChild) {
                card.classList.add("swap");

                setTimeout(() => {
                    card.classList.remove("swap");
                    stack.insertBefore(card, stack.firstElementChild);
                }, 1200);
            }
        });

    }
}

let myUi = new Ui();

// Call displayGames and wait for it to finish before further actions
(async () => {
    await myUi.displayGames('mmorpg');

    // Set up event listeners for category links
    for (let i = 0; i < categories.length; i++) {
        categories[i].addEventListener('click', async function (e) {
            loader.classList.remove('d-none')
            console.log(e.target.name);
            console.log(e.target)
            document.querySelector('.active').classList.remove('active')
            e.target.classList.add('active');
            await myUi.displayGames(e.target.name);
        });
    }
})();

// Function to update event listeners for cards
function updateCardEventListeners() {
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', function () {
            document.querySelector('.header').classList.add('d-none');
            document.querySelector('.games').classList.add('d-none');
            document.querySelector('.details').classList.remove('d-none');
            myUi.displayDetails(this.id);
        });
    }
}






// window.addEventListener('load', function() {
//     console.log('Whole page loaded, including all resources');
//     this.document.querySelector('.loade').classList.add('d-none')
// });