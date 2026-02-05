
export const filterFavorite = (books, value) => {
    if (value === "default") return books; 

    const result = {};
    for (const key in books) {
        if (books[key].favorite === true) {
            result[key] = books[key];
        }
    }
    return result;
};


export const sortBooks = (books, sortValue) => {
    const clone = { ...books };

    if (sortValue === "aö") {
        return Object.fromEntries(
            Object.entries(clone).sort(([, a], [, b]) => (a.title || "").localeCompare(b.title || ""))
        );
    } else if (sortValue === "öa") {
        return Object.fromEntries(
            Object.entries(clone).sort(([, a], [, b]) => (b.title || "").localeCompare(a.title || ""))
        );
    } else if (sortValue === "author-az") {
        return Object.fromEntries(
            Object.entries(clone).sort(([, a], [, b]) => (a.author || "").localeCompare(b.author || ""))
        );
    } else if (sortValue === "author-za") {
        return Object.fromEntries(
            Object.entries(clone).sort(([, a], [, b]) => (b.author || "").localeCompare(a.author || ""))
        );
    } else if (sortValue === "first-added") {
        return clone; 
    } else if (sortValue === "last-added") {
        return Object.fromEntries(Object.entries(clone).reverse());
    }

    return clone; 
};
