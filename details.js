export class Details {
    id;
    constructor(id) {
        this.id = id;
    }

    async getDetails() {
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${this.id}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '1015fd453cmsh615aaadf1226984p1b9d25jsnd5b8da80645c',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            // console.log(result);
            
            return result;
        } catch (error) {
            console.error(error);
        }
    }
}

