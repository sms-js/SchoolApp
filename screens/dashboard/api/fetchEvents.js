/* eslint-disable no-extend-native */
import {BASE_URL} from '../../../utils/config';

export async function fetchEventsForAll() {
  try {
    const response = await fetch(BASE_URL + '/EventsController.php', {
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
      let eventsTab = [];

      for (let i = 0; i < responseJson['all events'].length; i++) {
        eventsTab.push({
          id: responseJson['all events'][i]['id'],
          eventTitle: responseJson['all events'][i]['eventTitle'],
          eventDescription: decodeHtml(responseJson['all events'][i]['eventDescription']),
          eventFor: responseJson['all events'][i]['eventFor'],
          eventPlace: responseJson['all events'][i]['enentPlace'],
          eventDate: responseJson['all events'][i]['eventDate'],
        });
      }

      return eventsTab;
    } else {
      //return response.error;
      alert(responseJson['all events']['error']);
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
      let events = '';
      let eventsTab = [];

      for (let i = 0; i < responseJson['all events'].length; i++) {
        a = JSON.stringify(responseJson['all events'][i]['eventDescription']);
        a = a.extract('"', '"');
        a = decodeHtml(a);
        b = 'b';
        while (b != '') {
          b = a.extract('', '\\n');
          a = a.substring(b.length + 4);
          c = c + b + '\n';
        }
        events = c;
        b = '';
        c = '';
        eventsTab.push({
          id: responseJson['all events'][i]['id'],
          eventTitle: responseJson['all events'][i]['eventTitle'],
          eventDescription: events,
          eventFor: responseJson['all events'][i]['eventFor'],
          eventPlace: responseJson['all events'][i]['enentPlace'],
          eventDate: responseJson['all events'][i]['eventDate'],
        });
        events = '';
      }

      console.log(eventsTab);

      return eventsTab;
    } else {
      //return response.error;
      alert(responseJson['all events']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function fetchUserEvents(role) {
  try {
    const response = await fetch(BASE_URL + '/EventsController.php', {
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
    //console.log(responseJson[role + ' events']);

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
      let events = '';
      let eventsTab = [];

      for (let i = 0; i < responseJson[role + ' events'].length; i++) {
        a = JSON.stringify(
          responseJson[role + ' events'][i]['eventDescription'],
        );
        a = a.extract('"', '"');
        a = decodeHtml(a);
        b = 'b';
        while (b != '') {
          b = a.extract('', '\\n');
          a = a.substring(b.length + 4);
          c = c + b + '\n';
        }
        events = c;
        b = '';
        c = '';
        eventsTab.push({
          id: responseJson[role + ' events'][i]['id'],
          eventTitle: responseJson[role + ' events'][i]['eventTitle'],
          eventDescription: events,
          eventFor: responseJson[role + ' events'][i]['eventFor'],
          eventPlace: responseJson[role + ' events'][i]['enentPlace'],
          eventDate: responseJson[role + ' events'][i]['eventDate'],
        });
        events = '';
      }
      console.log(eventsTab);

      return eventsTab;
    } else {
      //return response.error;
      alert(responseJson[role + ' events']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function fetchEvents(role) {
  try {
    const response = await fetch(BASE_URL + '/EventsController.php', {
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
    console.log(responseJson['events']);

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
      let events = '';
      let eventsTab = [];

      for (let i = 0; i < responseJson['events'].length; i++) {
        a = JSON.stringify(responseJson['events'][i]['eventDescription']);
        a = a.extract('"', '"');
        a = decodeHtml(a);
        b = 'b';
        while (b != '') {
          b = a.extract('', '\\n');
          a = a.substring(b.length + 4);
          c = c + b + '\n';
        }
        events = c;
        b = '';
        c = '';
        eventsTab.push({
          id: responseJson['events'][i]['id'],
          eventTitle: responseJson['events'][i]['eventTitle'],
          eventDescription: events,
          eventFor: responseJson['events'][i]['eventFor'],
          eventPlace: responseJson['events'][i]['enentPlace'],
          eventDate: responseJson['events'][i]['eventDate'],
        });
        events = '';
      }
      //console.log(eventsTab);

      //return eventsTab;
      return responseJson['events'];
    } else {
      //return response.error;
      alert(responseJson['events']['error']);
    }
  } catch (error) {
    return error;
  }
}
