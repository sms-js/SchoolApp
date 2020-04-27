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
    /*
    // WebView

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
    if (response.ok) {
      let newsTab = [];

      for (let i = 0; i < responseJson['all news'].length; i++) {
        newsTab.push({
          id: responseJson['all news'][i]['id'],
          newsTitle: responseJson['all news'][i]['newsTitle'],
          newsText: decodeHtml(responseJson['all news'][i]['newsText']),
          newsFor: responseJson['all news'][i]['newsFor'],
          newsDate: responseJson['all news'][i]['newsDate'],
          creationDate: responseJson['all news'][i]['creationDate'],
        });
      }

      return newsTab;
    } else {
      //return response.error;
      alert(responseJson['all news']['error']);
    }*/

    // data

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

      for (let i = 0; i < responseJson['all news'].length; i++) {
        a = JSON.stringify(responseJson['all news'][i]['newsText']);
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
          id: responseJson['all news'][i]['id'],
          newsTitle: responseJson['all news'][i]['newsTitle'],
          newsText: news,
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

export async function fetchUserNews(role) {
  try {
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

export async function fetchNews(role) {
  try {
    const response = await fetch(BASE_URL + '/NewsController.php', {
      method: 'post',
      header: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        view: 'get',
        role: role,
      }),
    });

    const responseJson = await response.json();
    //console.log(responseJson['news']);

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

      for (let i = 0; i < responseJson['news'].length; i++) {
        a = JSON.stringify(responseJson['news'][i]['newsText']);
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
          id: responseJson['news'][i]['id'],
          newsTitle: responseJson['news'][i]['newsTitle'],
          newsText: news,
          newsFor: responseJson['news'][i]['newsFor'],
          newsDate: responseJson['news'][i]['newsDate'],
          creationDate: responseJson['news'][i]['creationDate'],
        });
        news = '';
      }
      console.log(newsTab);

      return newsTab;
    } else {
      //return response.error;
      alert(responseJson['news']['error']);
    }
  } catch (error) {
    return error;
  }
}
