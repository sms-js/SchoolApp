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
      console.log(responseJson['all books']);
      //let all books = [{}];
      return responseJson['all books'];
    } else {
      //return 'error !';
      alert(responseJson['all books']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function searchBooks(searchCriteria, searchValue) {
  try {
    const response = await fetch(BASE_URL + '/BookSearchController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        searchCriteria: searchCriteria,
        searchValue: searchValue,
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson['books']);
      //let all books = [{}];
      return responseJson['books'];
    } else {
      //return 'error !';
      alert(responseJson['books']['error']);
    }
  } catch (error) {
    return error;
  }
}
