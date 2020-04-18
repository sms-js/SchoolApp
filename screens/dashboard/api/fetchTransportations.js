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
      return responseJson['transportations'];
    } else {
      alert(responseJson['transportations']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function fetchTransportation(id) {
  try {
    const response = await fetch(
      BASE_URL + '/TransportationGetController.php',
      {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          view: 'get',
          id: id,
        }),
      },
    );
    const responseJson = await response.json();
    if (response.ok) {
      return responseJson['transportation'];
    } else {
      alert(responseJson['transportation']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function fetchUserTransportation(id) {
  try {
    const response = await fetch(
      BASE_URL + '/TransportationGetController.php',
      {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          view: 'user',
          id: id,
        }),
      },
    );
    const responseJson = await response.json();
    if (response.ok) {
      return responseJson['transportation'][0]['transport'];
    } else {
      return 0;
    }
  } catch (error) {
    return error;
  }
}
