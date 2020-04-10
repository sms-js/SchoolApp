/* eslint-disable no-extend-native */
import {BASE_URL} from '../../../utils/config';

export async function fetchNewsForAll() {
  try {
    const response = await fetch(BASE_URL + '/NewsController.php', {
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

    String.prototype.extract = function (prefix, suffix) {
      let s = this;
      var i = s.indexOf(prefix);
      if (i >= 0) {
        s = s.substring(i + prefix.length);
      } else {
        return '';
      }
      if (suffix) {
        i = s.indexOf(suffix);
        if (i >= 0) {
          s = s.substring(0, i);
        } else {
          return '';
        }
      }
      return s;
    };
    if (response.ok) {
      let a = '';
      let b = '';
      let c = '';
      let news = '';
      let newsTab = [];

      for (let i = 0; i < responseJson['all news'].length; i++) {
        a = JSON.stringify(responseJson['all news'][i]['newsText']);
        a = a.extract('"', '"');
        while (a != '') {
          b = a.extract('&lt;p&gt;', '');
          c = b.extract('', '&lt;/p&gt;\\n');
          news = news + c;
          a = a.substring(c.length + 21);
          if (a[0] === '\\' && a[1] === 'n') {
            b = a.extract('', '&lt;p&gt;');
            news = news + '\n';
            a = a.substring(2);
          }

          (b = ''), (c = '');
        }
        newsTab.push({
          id: responseJson['all news'][i]['id'],
          title: responseJson['all news'][i]['newsTitle'],
          content: news,
          newsFor: responseJson['all news'][i]['newsFor'],
          newsDate: responseJson['all news'][i]['newsDate'],
          creationDate: responseJson['all news'][i]['creationDate'],
        });
        news = '';
      }
      console.log(newsTab);
      return newsTab;
    } else {
      //return response.error;
      alert(responseJson['all news']['error']);
    }
  } catch (error) {
    return error;
  }
}
