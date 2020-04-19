import {BASE_URL} from '../../../utils/config';

export async function fetchBooks() {
  try {
    const response = await fetch(BASE_URL + '/BooksController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'all',
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      //console.log(responseJson['all books']);
      //let allBooks = [{}];
      return responseJson['all books'];
    } else {
      //return 'error !';
      alert(responseJson['all books']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function typeFilterBooks(filter) {
  console.log('////////');
  try {
    const response = await fetch(BASE_URL + '/BooksController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: filter,
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson[filter + ' books']);
      //let allBooks = [{}];
      return responseJson[filter + ' books'];
    } else {
      //return 'error !';
      alert(responseJson[filter + ' books']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function availabilityFilterBooks(filter) {
  try {
    const response = await fetch(BASE_URL + '/BookSearchController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        searchValue: filter,
        searchCriteria: 'searchbystatus',
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson['books']);
      //let allBooks = [{}];
      return responseJson['books'];
    } else {
      //return 'error !';
      alert(responseJson['books']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function traditionalStatusBooks(filter) {
  try {
    const response = await fetch(BASE_URL + '/BookSearchController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        searchValue: filter,
        searchCriteria: 'searchbytstatus',
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson['books']);
      //let allBooks = [{}];
      return responseJson['books'];
    } else {
      //return 'error !';
      alert(responseJson['books']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function electronicStatusBooks(filter) {
  try {
    const response = await fetch(BASE_URL + '/BookSearchController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        searchValue: filter,
        searchCriteria: 'searchbyestatus',
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson['books']);
      //let allBooks = [{}];
      return responseJson['books'];
    } else {
      //return 'error !';
      alert(responseJson['books']['error']);
    }
  } catch (error) {
    return error;
  }
}

/*export async function priceFilterBooks(filter) {
  console.log('////////');
  try {
    const response = await fetch(BASE_URL + '/BookSearchController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        searchValue: filter,
        searchCriteria: 'searchbyprice',
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson['books']);
      //let allBooks = [{}];
      return responseJson['books'];
    } else {
      //return 'error !';
      alert(responseJson['books']['error']);
    }
  } catch (error) {
    return error;
  }
}*/

export async function searchBooks(searchValue, searchCriteria) {
  try {
    const response = await fetch(BASE_URL + '/BookSearchController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        searchValue: searchValue,
        searchCriteria: searchCriteria,
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      return responseJson['books'];
    } else {
      alert(responseJson['books']['error']);
    }
  } catch (error) {
    return error;
  }
}
