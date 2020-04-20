import {BASE_URL} from '../../../utils/config';

export async function fetchAllMessages(userId) {
  try {
    const response = await fetch(BASE_URL + '/MessagesController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'all',
        userId: userId,
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson['all messages']);
      //let allMessages = [{}];
      return responseJson['all messages'];
    } else {
      //return 'error !';
      alert(responseJson['all messages']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function fetchSentMessages(userId) {
  try {
    const response = await fetch(BASE_URL + '/MessagesController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'sent',
        userId: userId,
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      // console.log(responseJson['sent messages']);
      //let sentMessages = [{}];
      return responseJson['sent messages'];
    } else {
      //return 'error !';
      alert(responseJson['sent messages']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function fetchRecievedMessages(userId) {
  try {
    const response = await fetch(BASE_URL + '/MessagesController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'recieved',
        userId: userId,
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      //console.log(responseJson['recieved messages']);
      //let recievedMessages = [{}];
      return responseJson['recieved messages'];
    } else {
      //return 'error !';
      alert(responseJson['recieved messages']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function fetchMessageSender(userId) {
  try {
    const response = await fetch(BASE_URL + '/MessagesController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'sender',
        userId: userId,
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      //console.log(responseJson['user']);
      //let recievedMessages = [{}];
      return responseJson['user'];
    } else {
      //return 'error !';
      alert(responseJson['user']['error']);
    }
  } catch (error) {
    return error;
  }
}
