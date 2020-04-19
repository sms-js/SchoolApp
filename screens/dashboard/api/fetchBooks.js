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
