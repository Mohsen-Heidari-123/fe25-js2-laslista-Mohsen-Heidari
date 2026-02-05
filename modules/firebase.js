

const baseUrl = "https://js-2-71cea-default-rtdb.europe-west1.firebasedatabase.app/";

export const getAll = async () => {
    const url = baseUrl + "/book.json";
    const response = await fetch(url);
    if (!response.ok) throw new Error("Fel vid hämtning: " + response.status);
     return await response.json();
   
}

export const deleteNode = async (id) => {
    const url = baseUrl + '/book/' + id + '.json';
    const options = { method: 'DELETE' };

    const response = await fetch(url, options);
    const data = await response.json();
    console.log("Boken raderad:", data);
}


export const postBook = async (book) => {
    const url = baseUrl + "/book.json";
    const options = {
        method: "POST",
        body: JSON.stringify(book),
        headers: { "Content-Type": "application/json" }
    };

    const response = await fetch(url, options);
    if (!response.ok) throw new Error("Fel vid post: " + response.status);

    const data = await response.json();
    console.log("Ny bok tillagd:", data);
    return { id: data.name, ...book }; 
};
