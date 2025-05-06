

function calculateTotalPages(totalCount:number, itemsPerPage=10) {
    if (totalCount === 0) return 0; // If there are no documents, there are no pages
    return Math.ceil(totalCount / itemsPerPage); // Round up to the nearest integer
  }
  