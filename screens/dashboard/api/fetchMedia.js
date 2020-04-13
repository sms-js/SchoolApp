import {BASE_URL} from '../../../utils/config';

export async function fetchAlbums() {
  try {
    const response = await fetch(BASE_URL + '/MediaController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'allalbums',
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson['media albums']);
      //let mediaAlbums = [{}];
      return responseJson['media albums'];
    } else {
      //return 'error !';
      alert(responseJson['media albums']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function fetchAlbumChildren(albumId) {
  try {
    const response = await fetch(
      BASE_URL + '/MediaAlbumChildrenItemController.php',
      {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          view: 'albumchildren',
          albumId: albumId,
        }),
      },
    );
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson['media albums children']);
      //let albumChildren = [{}];
      return responseJson['media albums children'];
    } else {
      //return 'error !';
      alert(responseJson['media albums children']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function fetchAlbumItems(albumId) {
  try {
    const response = await fetch(
      BASE_URL + '/MediaAlbumChildrenItemController.php',
      {
        method: 'post',
        header: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          view: 'itemchildren',
          albumId: albumId,
        }),
      },
    );
    const responseJson = await response.json();

    if (response.ok) {
      console.log(responseJson['media items children']);
      //let albumMediaItems = [{}];
      return responseJson['media items children'];
    } else {
      //return 'error !';
      alert(responseJson['media items children']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function fetchItems() {
  try {
    const response = await fetch(BASE_URL + '/MediaController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'allitems',
      }),
    });
    const responseJson = await response.json();
    if (response.ok) {
      console.log(responseJson['media items']);
      //let mediaItems = [{}];
      return responseJson['media items'];
    } else {
      //return 'error !';
      alert(responseJson['media items']['error']);
    }
  } catch (error) {
    return error;
  }
}
