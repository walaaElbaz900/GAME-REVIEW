
// console.log(loader)
export  class Game{

    category;
    constructor(category){
        this.category=category;
    }


   async getCategory(){
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${this.category}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '1015fd453cmsh615aaadf1226984p1b9d25jsnd5b8da80645c',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
    }
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        // console.log(result);
       

        return result;
    } catch (error) {
        console.error(error);
    }
};


}

// let v=new Game('sailing');
// v.getCategory()



