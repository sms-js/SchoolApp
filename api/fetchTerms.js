import {BASE_URL} from '../utils/config';
import userInfo from '../utils/userInfo';

export async function fetchTerms() {
  try {
    const response = await fetch(BASE_URL + '/TermsController.php', {
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
    String.prototype.extract = function (prefix, suffix) {
      s = this;
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
    } //let terms = s;
    //console.log(responseJson['terms'] /*[0]['fieldValue']*/);
    //let s = JSON.stringify(responseJson['terms'][0]['fieldValue']);
    //let s = responseJson['terms'][0]['fieldValue'];
    //s == s.extract('"', '"');
    //s = decodeHtml(s);
    /*let b = 'b';
    let c = '';
    let terms = '';
    while (b != '') {
      b = s.extract('', '\\n');
      s = s.substring(b.length + 4);
      c = c + b + '\n';
    }
    terms = c;*/ return decodeHtml(
      responseJson['terms'][0]['fieldValue'],
    );
    /*let s = JSON.stringify(responseJson['terms'][0]['fieldValue']);
    let x = s.extract('"', '"');
    let y = 'y';
    let z = '';
    let c = 0;
    while (y != '') {
      y = x.extract('<p>', '</p>');
      if (y.extract('', '&nbsp;') != '') {
        y = y.extract('', '&nbsp;') + y.extract('&nbsp;', '');
      } else {
      }
      if (y != '&nbsp;') {
        z = z + y + '\n\n';
      }
      if (x[0] != '\\' && x[1] != 'n' && x[2] != '\\' && x[3] != 'n') {
        x = x.substring(y.length + 7);
      } else {
        x = x.substring(y.length + 11);
      }
    }
    return z;*/
    /*}else{
      return('error !');
    }*/
  } catch (error) {
    return error;
  }
}
