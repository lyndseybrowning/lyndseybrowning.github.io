module.exports = (data, pageSize) => {
    return data.reduce((pages, item, index) => {
        if (index % pageSize === 0) {
            const page = data.slice(index, index + pageSize);

            pages.push(page);
        }

        return pages;
    }, []);
};
