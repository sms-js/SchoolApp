import {BASE_URL} from '../../../utils/config';

export async function fetchPages() {
  try {
    const response = await fetch(BASE_URL + '/StaticPagesController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'all',
      }),
    });
    //if (response.ok) {
    const responseJson = await response.json();

    function decodeHtml(str) {
      var map = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#039;': "'",
      };
      return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function (m) {
        return map[m];
      });
    }

    let pages = [];

    for (let i = 0; i < responseJson['static pages'].length; i++) {
      pages.push({
        id: responseJson['static pages'][i]['id'],
        pageTitle: responseJson['static pages'][i]['pageTitle'],
        pageContent: decodeHtml(responseJson['static pages'][0]['pageContent']),
        pageActive: responseJson['static pages'][i]['pageActive'],
      });
    }

    console.log(pages);
    return pages;
    /*}else{
        return('error !');
      }*/
  } catch (error) {
    return error;
  }
}
