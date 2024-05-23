class Pagination {
    currentPage: number;
    nextPage: number | null;
    previousPage: number | null;
    totalCount: number;
    totalPages: number;

    constructor(params: {
        totalCount: number;
        currentPage: number;
        pageSize: number;
    }) {
        const { totalCount, currentPage, pageSize } = params;

        this.currentPage = currentPage;
        this.totalPages = Math.ceil(totalCount / pageSize);
        this.nextPage =
            currentPage === this.totalPages ? null : currentPage + 1;
        this.previousPage = currentPage === 1 ? null : currentPage - 1;
        this.totalCount = totalCount;
    }
}

export { Pagination };
