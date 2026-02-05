
export class Book {
    #id;
    #title;
    #author;
    #favorite;
    #url;
    #updateCallback;

    constructor(id, title, author, favorite = false, updateCallback = null) {
        this.#id = id;
        this.#title = title;
        this.#author = author;
        this.#favorite = favorite;
        this.#updateCallback = updateCallback;

        
        this.#url = `https://js-2-71cea-default-rtdb.europe-west1.firebasedatabase.app/book/${this.#id}.json`;
    }

    render(wrapper) {
        const bookDiv = document.createElement('div');
        const h2 = document.createElement('h2');
        const p = document.createElement('p');
        const delBtn = document.createElement('button');
        const favBtn = document.createElement('button');

       
        favBtn.innerText = this.#favorite ? '★ Favorit' : '☆ Favorit';
        favBtn.style.color = this.#favorite ? 'gold' : 'black';

        bookDiv.id = this.#id;
        bookDiv.classList.add('book');

        h2.innerText = this.#title;
        p.innerText = `Författare: ${this.#author}`;
        delBtn.innerText = 'Radera';

     
        delBtn.addEventListener('click', async () => {
            bookDiv.remove(); 
            try {
                await this.deleteBook(); 
            } catch (err) {
                console.error(err);
            }
        });

  
        favBtn.addEventListener('click', async () => {
            this.#favorite = !this.#favorite;

          
            favBtn.innerText = this.#favorite ? '★ Favorit' : '☆ Favorit';
            favBtn.style.color = this.#favorite ? 'gold' : 'black';

            
            if (this.#updateCallback) this.#updateCallback(this.#id, this.#favorite);

         
            try {
                await this.updateFavorite();
            } catch (err) {
                console.error(err);
            }
        });

        bookDiv.append(h2, p, delBtn, favBtn);
        wrapper.append(bookDiv);
    }

 
    async deleteBook() {
        const options = { method: 'DELETE' };
        const response = await fetch(this.#url, options);
        if (!response.ok) throw new Error("Fel vid radering: " + response.status);
        console.log(`Boken med ID "${this.#id}" raderad från Firebase`);
    }


    async updateFavorite() {
        const options = {
            method: 'PATCH',
            body: JSON.stringify({ favorite: this.#favorite }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        };
        const response = await fetch(this.#url, options);
        if (!response.ok) throw new Error("Fel vid uppdatering av favorit: " + response.status);
        const data = await response.json();
        console.log("Favorit uppdaterad:", data);
    }
}
