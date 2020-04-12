/* eslint-disable no-extend-native */
import {BASE_URL} from '../../../utils/config';
import {userInfo} from '../../../utils/userInfo';

export async function fetchUserNews() {
  try {
    const role = userInfo[0]['role'];
    const response = await fetch(BASE_URL + '/NewsController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: role,
      }),
    });

    const responseJson = await response.json();
    //console.log(responseJson[role + ' news']);

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

    function decodeHtml(str) {
      var map = {
        '&eacute;': 'é',
        '&egrave;': 'è',
        '&agrave;': 'à',
        '&ccedil;': 'ç',
        '&ugrave;': 'ù',
        '&nbsp;': ' ',
      };
      return str.replace(
        /&eacute;|&egrave;|&agrave;|&ccedil;|&ugrave;|&nbsp;/g,
        function (m) {
          return map[m];
        },
      );
    }

    if (response.ok) {
      let a = '';
      let b = '';
      let c = '';
      let news = '';
      let newsTab = [];

      for (let i = 0; i < responseJson[role + ' news'].length; i++) {
        a = JSON.stringify(responseJson[role + ' news'][i]['newsText']);
        a = a.extract('"', '"');
        a = decodeHtml(a);
        b = 'b';
        while (b != '') {
          b = a.extract('', '\\n');
          a = a.substring(b.length + 4);
          c = c + b + '\n';
        }
        news = c;
        b = '';
        c = '';
        newsTab.push({
          id: responseJson[role + ' news'][i]['id'],
          newsTitle: responseJson[role + ' news'][i]['newsTitle'],
          newsText: news,
          newsFor: responseJson[role + ' news'][i]['newsFor'],
          newsDate: responseJson[role + ' news'][i]['newsDate'],
          creationDate: responseJson[role + ' news'][i]['creationDate'],
        });
        news = '';
      }
      console.log(newsTab);

      return newsTab;
    } else {
      //return response.error;
      alert(responseJson[role + ' news']['error']);
    }
  } catch (error) {
    return error;
  }
}
