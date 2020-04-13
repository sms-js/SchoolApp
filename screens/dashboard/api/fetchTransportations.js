import {BASE_URL} from '../../../utils/config';

export async function fetchTransportations() {
  try {
    const response = await fetch(BASE_URL + '/TransportationController.php', {
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
      console.log(responseJson['transportations']);
      //let transportations = [{}];
      return responseJson['transportations'];
    } else {
      //return 'error !';
      alert(responseJson['transportations']['error']);
    }
  } catch (error) {
    return error;
  }
}
