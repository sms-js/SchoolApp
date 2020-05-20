import {BASE_URL} from '../../../utils/config';
import {userInfo} from '../../../utils/userInfo';
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

/*export async function fetchPollsForAll() {
  try {
    const response = await fetch(BASE_URL + '/PollsController.php', {
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
      console.log(responseJson['all polls']);
      //let allPolls = [{}];
      return responseJson['all polls'];
    } else {
      //return 'error !';
      alert(responseJson['all polls']['error']);
    }
  } catch (error) {
    return error;
  }
}

export async function fetchUserPolls(role) {
  try {
    const response = await fetch(BASE_URL + '/PollsController.php', {
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
    if (response.ok) {
      console.log(responseJson[role + ' polls']);
      //let userPolls = [{}];
      return responseJson[role + ' polls'];
    } else {
      //return 'error !';
      alert(responseJson[role + ' polls']['error']);
    }
  } catch (error) {
    return error;
  }
}*/
export async function fetchPolls(role) {
  try {
    const response = await fetch(BASE_URL + '/PollsController.php', {
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
    if (response.ok) {
      console.log('///////////////////////////');
      console.log(responseJson['polls']);
      let poll = [];
      let options = [];
      let users = [];
      let opts = responseJson['polls'][0]['pollOptions'];
      opts = opts.extract('[', ']');
      //console.log(opts);
      while (opts != '') {
        let opt = opts.extract('', '}');
        opts = opts.substring(opt.length + 2);
        opt = opt.extract('{', '');
        //console.log(opt);
        let title = opt.extract('', ',');
        let count = '';
        let perc = '';
        if (title != '') {
          opt = opt.substring(title.length + 1);
          title = title.extract('"title":', '');
          title = title.extract('"', '"');
          // console.log(title);
          count = opt.extract('', ',');
          opt = opt.substring(count.length + 1);
          count = count.extract('"count":');
          //console.log(count);
          perc = opt.extract('"perc":', '');
          //console.log(opts);
          let usrs = responseJson['polls'][0]['userVoted'];
          //console.log(usrs);
          usrs = usrs.extract('[', ']');
          while (usrs != '') {
            //console.log(usrs);
            let usr = usrs.extract('', ',');
            if (usr == '') {
              users.push(usrs);
              usrs = usrs.substring(usrs.length);
            } else {
              users.push(usrs);
              usrs = usrs.substring(usr.length + 1);
            }
          }
          //console.log(users);
          //console.log(usrs);
          //poll['usersVote'] = 1;
          poll.push({
            title: title,
            count: count,
            perc: perc,
            usersVoted: 1,
            users: users,
          });
          //poll['users'] = users;
        } else {
          title = opt.extract('"title":', '');
          title = title.extract('"', '"');
          opt = opt.substring(title.length + 1);

          //poll['usersVote'] = 0;
          poll.push({title: title, usersVoted: 0});
          // console.log(title);
        }
      }
      /*let usrs = responseJson['polls'][0]['userVoted'];
      console.log(usrs);
      if (usrs != '') {
      } else {
      }*/
      console.log(poll);
      return poll;
    } else {
      //return 'error !';
      alert(responseJson['polls']['error']);
    }
  } catch (error) {
    return error;
  }
}
