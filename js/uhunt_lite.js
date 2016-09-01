"use strict";

/*global $, io, alert, MD5, window, document, localStorage */

var MD5=function(e){function m(h,g){var j,i,n,l,k;n=h&2147483648;l=g&2147483648;j=h&1073741824;i=g&1073741824;k=(h&1073741823)+(g&1073741823);if(j&i)return k^2147483648^n^l;return j|i?k&1073741824?k^3221225472^n^l:k^1073741824^n^l:k^n^l}function o(h,g,j,i,n,l,k){h=m(h,m(m(g&j|~g&i,n),k));return m(h<<l|h>>>32-l,g)}function p(h,g,j,i,n,l,k){h=m(h,m(m(g&i|j&~i,n),k));return m(h<<l|h>>>32-l,g)}function q(h,g,j,i,n,l,k){h=m(h,m(m(g^j^i,n),k));return m(h<<l|h>>>32-l,g)}function r(h,g,j,i,n,l,k){h=m(h,m(m(j^
(g|~i),n),k));return m(h<<l|h>>>32-l,g)}function s(h){var g="",j="",i;for(i=0;i<=3;i++){j=h>>>i*8&255;j="0"+j.toString(16);g+=j.substr(j.length-2,2)}return g}var f=[],t,u,v,w,a,b,c,d;e=function(h){h=h.replace(/\r\n/g,"\n");for(var g="",j=0;j<h.length;j++){var i=h.charCodeAt(j);if(i<128)g+=String.fromCharCode(i);else{if(i>127&&i<2048)g+=String.fromCharCode(i>>6|192);else{g+=String.fromCharCode(i>>12|224);g+=String.fromCharCode(i>>6&63|128)}g+=String.fromCharCode(i&63|128)}}return g}(e);f=function(h){var g,
j=h.length;g=j+8;for(var i=((g-g%64)/64+1)*16,n=Array(i-1),l=0,k=0;k<j;){g=(k-k%4)/4;l=k%4*8;n[g]|=h.charCodeAt(k)<<l;k++}g=(k-k%4)/4;l=k%4*8;n[g]|=128<<l;n[i-2]=j<<3;n[i-1]=j>>>29;return n}(e);a=1732584193;b=4023233417;c=2562383102;d=271733878;for(e=0;e<f.length;e+=16){t=a;u=b;v=c;w=d;a=o(a,b,c,d,f[e+0],7,3614090360);d=o(d,a,b,c,f[e+1],12,3905402710);c=o(c,d,a,b,f[e+2],17,606105819);b=o(b,c,d,a,f[e+3],22,3250441966);a=o(a,b,c,d,f[e+4],7,4118548399);d=o(d,a,b,c,f[e+5],12,1200080426);c=o(c,d,a,b,f[e+
6],17,2821735955);b=o(b,c,d,a,f[e+7],22,4249261313);a=o(a,b,c,d,f[e+8],7,1770035416);d=o(d,a,b,c,f[e+9],12,2336552879);c=o(c,d,a,b,f[e+10],17,4294925233);b=o(b,c,d,a,f[e+11],22,2304563134);a=o(a,b,c,d,f[e+12],7,1804603682);d=o(d,a,b,c,f[e+13],12,4254626195);c=o(c,d,a,b,f[e+14],17,2792965006);b=o(b,c,d,a,f[e+15],22,1236535329);a=p(a,b,c,d,f[e+1],5,4129170786);d=p(d,a,b,c,f[e+6],9,3225465664);c=p(c,d,a,b,f[e+11],14,643717713);b=p(b,c,d,a,f[e+0],20,3921069994);a=p(a,b,c,d,f[e+5],5,3593408605);d=p(d,
a,b,c,f[e+10],9,38016083);c=p(c,d,a,b,f[e+15],14,3634488961);b=p(b,c,d,a,f[e+4],20,3889429448);a=p(a,b,c,d,f[e+9],5,568446438);d=p(d,a,b,c,f[e+14],9,3275163606);c=p(c,d,a,b,f[e+3],14,4107603335);b=p(b,c,d,a,f[e+8],20,1163531501);a=p(a,b,c,d,f[e+13],5,2850285829);d=p(d,a,b,c,f[e+2],9,4243563512);c=p(c,d,a,b,f[e+7],14,1735328473);b=p(b,c,d,a,f[e+12],20,2368359562);a=q(a,b,c,d,f[e+5],4,4294588738);d=q(d,a,b,c,f[e+8],11,2272392833);c=q(c,d,a,b,f[e+11],16,1839030562);b=q(b,c,d,a,f[e+14],23,4259657740);
a=q(a,b,c,d,f[e+1],4,2763975236);d=q(d,a,b,c,f[e+4],11,1272893353);c=q(c,d,a,b,f[e+7],16,4139469664);b=q(b,c,d,a,f[e+10],23,3200236656);a=q(a,b,c,d,f[e+13],4,681279174);d=q(d,a,b,c,f[e+0],11,3936430074);c=q(c,d,a,b,f[e+3],16,3572445317);b=q(b,c,d,a,f[e+6],23,76029189);a=q(a,b,c,d,f[e+9],4,3654602809);d=q(d,a,b,c,f[e+12],11,3873151461);c=q(c,d,a,b,f[e+15],16,530742520);b=q(b,c,d,a,f[e+2],23,3299628645);a=r(a,b,c,d,f[e+0],6,4096336452);d=r(d,a,b,c,f[e+7],10,1126891415);c=r(c,d,a,b,f[e+14],15,2878612391);
b=r(b,c,d,a,f[e+5],21,4237533241);a=r(a,b,c,d,f[e+12],6,1700485571);d=r(d,a,b,c,f[e+3],10,2399980690);c=r(c,d,a,b,f[e+10],15,4293915773);b=r(b,c,d,a,f[e+1],21,2240044497);a=r(a,b,c,d,f[e+8],6,1873313359);d=r(d,a,b,c,f[e+15],10,4264355552);c=r(c,d,a,b,f[e+6],15,2734768916);b=r(b,c,d,a,f[e+13],21,1309151649);a=r(a,b,c,d,f[e+4],6,4149444226);d=r(d,a,b,c,f[e+11],10,3174756917);c=r(c,d,a,b,f[e+2],15,718787259);b=r(b,c,d,a,f[e+9],21,3951481745);a=m(a,t);b=m(b,u);c=m(c,v);d=m(d,w)}return(s(a)+s(b)+s(c)+
s(d)).toLowerCase()};


/* Felix Halim <felix.halim@gmail.com> */

var uhunt = {
  base_url: 'http://uhunt.felix-halim.net'
}; // uhunt namespace

uhunt.util = {
  time: function () { return new Date().getTime(); },
  now: function () { return uhunt.util.to_uts(uhunt.util.time()); },
  to_uts: function (t) { return Math.floor(t / 1000); },
  parseInt: function (v) { v = parseInt(v, 10); return isNaN(v) ? 0 : v; },
  escape_html: function (s) {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/\\/g, '&#92;')
      .replace(/\//g, '&#47;')
      .replace(/'/g, '&#39;');
  },
  unescape_html: function (s) {
    return s
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#92;/g, '\\')
      .replace(/&#47;/g, '/')
      .replace(/&#39;/g, '\'');
  },
  delta_time: 0, // to make sure the desktop time is later than server time (so no negative time shown)
  adjust_delta_time: function (t) {
    uhunt.util.delta_time = Math.max(uhunt.util.delta_time || 0, t - uhunt.util.now());
  },
  apply_color_class: function (a) {
    var p = uhunt.probs.num(uhunt.util.parseInt(a.innerHTML));
    $(a).removeClass().addClass(uhunt.tpl.prob_color_class(p));
  },
  safe_parse_json: function (json_text) {
    return JSON.parse(uhunt.util.unescape_html(json_text));
  }
};

uhunt.rpc = (function () {
  var host = 'http://uhunt.felix-halim.net';
  function ajax(path, data, cb) {
    $.ajax({ url: host + path, cache: false, data: data, dataType: 'json', success: cb, timeout: 60000,
      error: function (jqXHR, textStatus, errorThrown) {
        console.error(textStatus + " " + errorThrown);
        setTimeout(function () { ajax(path, data, cb); }, 10000); // retry in 10 seconds
      }
    });
  }
  return {
    problem_by_num : function(pnum, cb) { ajax('/api/p/num/' + pnum, {}, cb); },
    problems: function (cb) { ajax('/api/p', {}, cb); },
    psubs: function (pids, sbt_lo, sbt_hi, cb) { ajax('/api/p/subs/' + pids.join(',') + '/' + sbt_lo + '/' + sbt_hi, {}, cb); },
    psubs_limit: function (pid, sbt_lo, sbt_hi, limit, cb) { ajax('/api/p/subs/' + pid + '/' + sbt_lo + '/' + sbt_hi + '/' + limit, {}, cb); },
    subs_since: function (uid, sid, cb) { ajax('/api/subs/'+uid, {sid:sid}, cb); },
    subs_pids: function (uids, pids, cb) { ajax('/api/subs-pids/' + uids.join(',') + '/' + pids.join(',') + '/0', {}, cb); },
    subs_nums : function(uids, pnums, cb){ ajax('/api/subs-nums/' + uids.join(',') + '/' + pnums.join(',') + '/0', {}, cb); },
    ranklist: function(uid, nabove, nbelow, cb) { ajax('/api/ranklist/'+uid+'/'+nabove+'/'+nbelow, {}, cb); },
    pranknearby: function(pid, uid, nabove, nbelow, cb) { ajax('/api/p/ranklist/'+pid+'/'+uid+'/'+nabove+'/'+nbelow, {}, cb); },
    prank: function(pid, start, count, cb) { ajax('/api/p/rank/'+pid+'/'+start+'/'+count, {}, cb); },
    subs_count: function (pid, sbt, back, jump, cb) { ajax('/api/p/count/'+pid+'/'+sbt+'/'+back+'/'+jump, {}, cb); },
    solved_bits: function(unames, cb) {
      if (uhunt.util.parseInt(unames[0]) === unames[0]) {
        ajax('/api/solved-bits/' + unames.join(','), {}, cb);
      } else {
        ajax('/api/solved-bits', {unames:JSON.stringify(unames)}, cb);
      }
    },
  };
}());


uhunt.observer = (function() { // the observer pattern: http://en.wikipedia.org/wiki/Observer_pattern
  var callbacks = [];
  return {
    add_listener: function (key, callback) {
      if (!callbacks[key]) { callbacks[key] = []; }
      callbacks[key].push(callback);
    },
    notify: function (key) {
      if (callbacks[key]){
        var messages = Array.prototype.slice.call(arguments, 1);
        $.each(callbacks[key], function(i,cb) { cb.apply(this, messages); });
      } else {
        alert('Observer key not found: ' + key);
      }
    }
  };
}());


// Creates new User object that maintains its statistics
uhunt.NewUser = function () {
  var pid_key = {}; // index by pid, then by sid : pid_key[pid][sid] = {ver,run,mem,sbt,lan}
  var pid_stats = {}; // the stats of this pid : ac, nos, ntry, last_sbt, rank, first_ac_sbt, mrun, mmem
  var sid2pid = {}; // index by sid; sid2pid[sid] = pid
  var sids = [];
  var sorted_sids = true;  // the list of sids, and the sorted flag
  var name = false;
  var uname = false;

  // retrieve the last submission id of the current user
  function lastId() { return (sids.length > 0) ? sids[sids.length-1] : 0; }

  // new submissions should update this wrapper using this method
  function update(s) {
    // console.log(s);
    if (!name || name !== s.name) { name = s.name; }
    if (!uname || uname !== s.uname) { uname = s.uname; }
    if (!pid_key[s.pid]) { pid_key[s.pid] = {}; }
    pid_stats[s.pid] = false;   // reset the stats when this pid is updated
    pid_key[s.pid][s.sid] = s;
    if (!sid2pid[s.sid]) {
      if (sorted_sids && s.sid < lastId()) { sorted_sids = false; }
      sids.push(s.sid);
    }
    sid2pid[s.sid] = s.pid;
  }

  // loop through all problem ids contained in this user's submissions
  function each_pid(pid, f) {
    if (typeof pid == 'function') {
      for (var i in pid_key) if (pid_key.hasOwnProperty(i)) pid(i);
    } else if (pid_key[pid]) {
      $.each(pid_key[pid], f);
    }
  }

  // return a statistics of the problem submitted by the user
  function stats(pid) {
    if (pid_stats[pid]) { return pid_stats[pid]; }
    var st = { ac:false, nos:0, ntry:0, last_sbt:-1e100,
      rank:1e100, first_ac_sbt:1e100, mrun:1e100, mmem:1e100 };
    var p = pid_key[pid]; if (!p) { return st; }
    var sid;
    for (sid in p){
      var s = p[sid];
      st.nos++;
      st.last_sbt = Math.max(st.last_sbt, s.sbt);
      if (s.ver === 90){ // 90 means accepted
        st.ac = true;
        st.first_ac_sbt = Math.min(st.first_ac_sbt, s.sbt);
        st.mrun = Math.min(st.mrun, s.run);
//        st.mmem = Math.min(st.mmem, s.mem);
        st.rank = Math.min(st.rank, s.rank);
      }
    }
    if (!st.ac) { st.ntry = st.nos; } // all the subs are the number of try
    else { $.each(p,function(sid,s){ if (s.sbt < st.first_ac_sbt) { st.ntry++; } }); } // ntry before ac
    pid_stats[pid] = st;
    return st;
  }

  // the number of submissions of the user
  function nos(){ return sids.length; }

  // the histogram of various verdicts
  function substats_count() {
    var cnt = {}, pid, sid;
    for (pid in pid_key) if (pid_key.hasOwnProperty(pid)) {
      var p = pid_key[pid];
      for (sid in p){
        var s = p[sid];
        if (!cnt[s.ver]) { cnt[s.ver] = 0; }
        cnt[s.ver]++;
      }
    }
    return cnt;
  }

  // loop through the last 'n' submissions of this user
  function each_last_subs(n,f) {
    if (!sorted_sids){
      sorted_sids = true;
      sids.sort(function(a,b){ return a-b; });
    }
    var i;
    for (i=0; i<n && i<sids.length; i++){
      var sid = sids[sids.length-i-1];
      var pid = sid2pid[sid];
      f(i,sid,pid,pid_key[pid][sid]);
    }
  }

  return {
    update: update,
    lastId: lastId,
    each_pid: each_pid,
    stats: stats,
    nos: nos,
    substats_count: substats_count,
    each_last_subs: each_last_subs,
    name: function(){ return name; },
    uname: function(){ return uname; }
  };
};

uhunt.periodic_update = function (ms) {
  uhunt.observer.notify('periodic_update_' + ms);
  setTimeout(function () { uhunt.periodic_update(ms); }, ms);
};


// for storing values that persist across page reload
uhunt.db = {
  keys: { // list of valid keys to store
    'uhunt_prob_search_max_subs': 'int',
    'uhunt_prob_search_max_rank': 'int',
    'uhunt_prob_search_subs_yours': 'bool',
    'uhunt_prob_search_subs_top': 'bool',
    'show_livesubs': 'bool',
    'livesubs_table_display': 'bool',
    'last_problem_reload': 'int',
    'probs': 'json',
    'username': 'string',
    'chat_invisible': 'bool',
    'uhunt_series_filter_uids': 'json',
    'uhunt_widget_filter_uids_chk': 'bool',
    'uhunt_widget_highlight_uids_chk': 'bool',
    'uhunt-code': 'string',
    'logged-in': 'int',
    'livesub-nshow': 'int',
    'series_index': 'int',
    'cpbook_show': 'string',
    'cpbook_chapter': 'int',
    'cpbook_edition': 'int',
    'show_last_submissions': 'int',
    'vcshadow-view': 'int',
    'vcshadow-sortby': 'string',
    'vcshadow-sortasc': 'bool',
    'vcshadow-n': 'int',
    'show_solved': 'string',
    'sort_desc': 'bool',
    'sort_column': 'string',
    'np_view_which': 'int',
    'show_next_problems': 'int',
    'selected_volume': 'int',
    'ranklist-nabove': 'int',
    'ranklist-nbelow': 'int',
    'cmp_expr1': 'string',
    'cmp_expr2': 'string',
    'cmp_expr3': 'string',
    'generate-number': 'int',
    'vcontest_picker_show_unsolved': 'bool',
  },
  set: function(key, val){
    if (val === null || val === undefined) alert('Sets db to null/undefined for ' + key);
    try {
      switch (uhunt.db.keys[key]) {
        case 'int': localStorage[key] = val; break;
        case 'string': localStorage[key] = val; break;
        case 'bool': localStorage[key] = val? '1' : '0'; break;
        case 'json': localStorage[key] = JSON.stringify(val); break;
        default: alert('Set key not defined: ' + key); break;
      }
    } catch (e){
      console.error(JSON.stringify(e));
    }
  },
  get: function(key){
    switch (uhunt.db.keys[key]) {
      case 'int': return uhunt.util.parseInt(localStorage[key]);
      case 'string': return localStorage[key];
      case 'bool': return localStorage[key] === '1';
      case 'json': 
        var val = localStorage[key];
        return val? JSON.parse(localStorage[key]) : null;
      default: alert('Get key not defined: ' + key); break;
    }
  },
  exists: function (key) {
    return localStorage[key] !== null && localStorage[key] !== undefined;
  },
  unset: function (key) {
    localStorage.removeItem(key);
  }
};

uhunt.algorithmist = (function() {
  var algorithmist_list = [
    119,
    10058,
    10306, 10341,
    10672,
    11235, 11292, 11450, 11506, 11512, 11517, 11947, 11974 ],
    algorithmist_exists = [], i;

  for (i = 0; i < algorithmist_list.length; i++) {
    algorithmist_exists[algorithmist_list[i]] = true;
  }

  return {
    exists: function(num) { return algorithmist_exists[num]; },
    link: function(num) { return '<a class="nou" target="_blank" href="http://www.algorithmist.com/index.php/UVa_'+num+'">&pi;</a>'; }
  };
}());

uhunt.tpl = {};
uhunt.tpl.verdict = (function() {
  var arr = [
    [10,"SubmissionErr","SE","#000000"],    // OT
    [15,"Can't be judged","CJ","#000000"],    // OT
    [20,"In queue","QU","#000000"],       // OT
    [30,"Compile error","CE","#AAAA00"],
    [35,"Restricted function","RF","#000000"],  // OT
    [40,"Runtime error","RE","#00AAAA"],
    [45,"Output limit","OL","#000066"],
    [50,"Time limit","TL","#0000FF"],
    [60,"Memory limit","ML","#0000AA"],
    [70,"Wrong answer","WA","#FF0000"],
    [80,"PresentationE","PE","#666600"],
    [90,"Accepted","AC","#00AA00"]
  ];
  var long_name = [], short_name = [], color = [], code = {}, i;
  for (i = 0; i < arr.length; i++){
    long_name[arr[i][0]] = arr[i][1];
    short_name[arr[i][0]] = arr[i][2];
    color[arr[i][0]] = arr[i][3];
    code[arr[i][2]] = arr[i][0];
  }
  return {
    name: function(i){ return long_name[i] || '- In queue -'; },
    sname: function(i){ return short_name[i] || 'OT'; },
    color: function(i){ return color[i] || '#000000'; },
    code: function(sname){ return code[sname] || false; }
  };
}());

uhunt.tpl.numbers_to_discussions = function (m) {
  var s = '', i, k, msg = m.split(' ');
  for (i = 0; i < msg.length; i++){
    var prefix = '', suffix = '';
    for (k = 0; k < msg[i].length; k++){
      var ch = msg[i].charAt(k);
      if (suffix.length > 0) { suffix += ch; }
      else if (('0'<=ch && ch<='9') || ('a'<=ch && ch<='z') || ('A'<=ch && ch<='Z')) { prefix += ch; }
      else { suffix += ch; }
    }
    if (i>0) { s += ' '; }
    if (uhunt.probs.num(prefix)){
      var p = uhunt.probs.num(prefix);
      s += uhunt.tpl.problem_link(p) + ' (' + uhunt.tpl.problem_rt(p.pid,'r',true) + '|' +
        uhunt.tpl.discuss_link(p.num,false,'d',true) + ')' + uhunt.util.escape_html(suffix);
    } else {
      s += uhunt.util.escape_html(msg[i]);
    }
  }
  return s;
}

uhunt.tpl.language = function(i){
  switch (i) {
    case 1 : return 'ANSI C';
    case 2 : return 'Java';
    case 3 : return 'C++';
    case 4 : return 'Pascal';
    case 5 : return 'C++11';
  }
  return '- ? -';
};

uhunt.tpl.duration = function (delta) {
  var dur = Math.max(0,Math.floor(delta / 1000 / 60));
  if (dur < 60) { return dur + 'm'; }
  dur = Math.floor(dur / 60);
  if (dur < 24) { return dur + 'h'; }
  if (dur < 24 * 30) { return Math.floor(dur / 24) + 'd'; }
  return Math.floor(dur / 24 / 30) + 'M';
};

uhunt.tpl.format_ms = function(ms, lan){
  if (!ms && ms!==0) { ms = '-'; }
  else if (ms > 100000) { ms = '- ? -'; }
  else {
    var sec = Math.floor(ms/1000); ms %= 1000;
    ms = sec + '.' + (ms<10?'00':(ms<100?'0':'')) + ms;
  }
  switch (uhunt.util.parseInt(lan)) {
    case 1: return '<span style="color:darkorange">' + ms + '</span>';
    case 2: return '<span style="color:red">' + ms + '</span>';
    case 3: return '<span style="color:blue">' + ms + '</span>';
    default: return ms;
  }
};

uhunt.tpl.format_time_v = function(w,back) {
  if (back<=5 && w < 60) { return Math.ceil(w) + ' seconds'; }
  if (back<=4 && w < 60*60) { return Math.floor(w/60) + ' minutes'; }
  if (back<=3 && w < 24*60*60) { return Math.floor(w/60/60) + ' hours ' + (Math.floor(w/60)%60) + ' minutes'; }
  if (back<=2 && w < 30*24*60*60) { return Math.floor(w/60/60/24) + ' days'; }
  if (back<=1 && w < 365*24*60*60) { return Math.floor(w/60/60/24/30) + ' months'; }
  return false;
};

uhunt.tpl.discuss_link = function(num,hide_hint,txt,nospace){
  var s = '';

  if (!hide_hint && uhunt.algorithmist.exists(num)) {
    s += uhunt.algorithmist.link(num) + (nospace ? '|' : ' | ');
  }

  if (uhunt.udebug.exists(num)) {
    s += ' <a class="nou" target="_blank" href="http://www.udebug.com/UVa/' +
      num + '"><img src="http://uhunt.felix-halim.net/images/udebug3.png"></a>' +
      (nospace ? '|' : ' | ');
  }

  if (!txt) { txt = 'discuss'; }
  return s + '<a class="nou" target="_blank" href="http://acm.uva.es/board/search.php?keywords='+num+'">'+txt+'</a>';
};

uhunt.tpl.format_date = function(t){
  var d = new Date(t*1000);
  var mm = d.getMonth()+1;  if (mm<10) { mm = '0'+mm; }
  var dd = d.getDate();   if (dd<10) { dd = '0'+dd; }
  var hh = d.getHours();    if (hh<10) { hh = '0'+hh; }
  var nn = d.getMinutes();  if (nn<10) { nn = '0'+nn; }
  return d.getFullYear()+'-'+mm+'-'+dd+' '+hh+':'+nn;
};

uhunt.tpl.digit = function(t) {
  t = Math.floor(t);
  if (t < 10) { return '0' + t; }
  return t;
};

uhunt.tpl.format_dhms = function(t, detail){
  var ret = '', day = false;
  if (t >= 60*60*24) {
    ret += Math.floor(t / 60/60/24) + 'd';
    t %= 60*60*24;
    day = true;
  }
  if (!detail && day) { return ret; }
  ret += uhunt.tpl.digit(t / 60/60);
  if (!day) {
    t %= 60*60;
    ret = ret + ':' + uhunt.tpl.digit(t / 60);
  }
  return ret;
};

uhunt.tpl.format_time = function(t,back){
  t -= uhunt.util.delta_time;
  var w = uhunt.util.now() - t;
  if (back<=5 && w < 60) { return Math.ceil(w) + ' secs ago'; }
  if (back<=4 && w < 60*60) { return Math.floor(w/60) + ' mins ago'; }
  if (back<=3 && w < 24*60*60) { return Math.floor(w/60/60) + ' hours ago'; }
  if (back<=2 && w < 30*24*60*60) { return Math.floor(w/60/60/24) + ' days ago'; }
  if (back<=1 && w < 365*24*60*60) { return Math.floor(w/60/60/24/30) + ' months ago'; }
  return uhunt.tpl.format_date(t);
};

uhunt.tpl.prob_color_class = function(p) {
  if (!p) { return 'sub_none'; }
  var st = uhunt.subs.stats(p.pid);
  var ago = (uhunt.util.now() - st.last_sbt) / 60 / 60 / 24;
  return (st.ac ? 'sub_ac' : st.ntry ? 'sub_wa' : 'sub_none') + ' ' + 
    ((ago <= 2) ? 'sub_2d' : (ago <= 7) ? 'sub_7d' : (ago <= 31) ? 'sub_1m' : (st.mrun == p.mrun)? 'sub_best' : '');
};

// http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=24&page=show_problem&problem='+pid
uhunt.tpl.problem_link = function(p) {
  var url = 'http://uva.onlinejudge.org/external/'+Math.floor(p.num/100)+'/'+p.num+'.html';
  return '<a class="prob '+uhunt.tpl.prob_color_class(p)+'" num="'+p.num+'" href="'+url+'" target="_blank">'+p.num+'</a>';
};

uhunt.tpl.problem_title = function(pid,title,width){
  return '<span class="ellipsis" style="width:'+width+'px"><a target="_blank" style="color:black; text-decoration:none" '+
    'href="http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=24&page=show_problem&problem='+
    pid+'">'+title+'</a></span>';
};

uhunt.tpl.problem_ntd = function(p,run,sbt,width){
  if (!p) { return '-'; }
  return '<span style="float:right; padding-right:5px">' + uhunt.tpl.discuss_link(p.num) + '</span>' +
      '&nbsp;<span>' + uhunt.tpl.problem_link(p,run,sbt) + ' - ' + uhunt.tpl.problem_title(p.pid,p.tit,width) + '</span>';
};

uhunt.tpl.problem_rt = function(pid,run,is_txt){
  return '<a target="_blank" class="nou" href="http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=problem_stats&problemid='+
        pid+'&category=24">' + (is_txt?run:uhunt.tpl.format_ms(run)) + '</a>';
};

uhunt.tpl.format_ver = function(v){
  return '<b style="color:'+uhunt.tpl.verdict.color(v)+'">' + uhunt.tpl.verdict.name(v) + '</b>';
};

uhunt.tpl.sub_row = function(p,sub,width,back){
  return '<tr style="height:18px"><td>' + uhunt.tpl.problem_ntd(p,sub.run,sub.sbt,width) + '</td>' +
      '<td>&nbsp;' + uhunt.tpl.format_ver(sub.ver) +'</td>' +
      '<td align=center>' + uhunt.tpl.language(sub.lan) +'</td>' +
      '<td align=center>' + uhunt.tpl.format_ms(sub.run) +'</td>' +
      '<td align=center>' + (p?uhunt.tpl.problem_rt(p.pid,p.mrun):'-') +'</td>' +
      '<td align=center'+(sub.ver===90?(' data-sid="'+sub.sid+'"'):'')+'>' + uhunt.tpl.rank(sub.rank) +'</td>' +
      '<td align=center>' + uhunt.tpl.format_time(sub.sbt,back) + '</td></tr>' ;
};

uhunt.tpl.usub_row = function(p,sub,width,back){
  return '<tr style="height:18px"><td align=right>' + sub.sid + '&nbsp;</td>' +
      '<td align=center'+(sub.ver===90?(' data-sid="'+sub.sid+'"'):'')+'>' + uhunt.tpl.rank(sub.rank) +'</td>' +
      '<td>&nbsp;' + uhunt.tpl.username(sub.uid, sub.name + ' (' +sub.uname + ')', width) + '</td>' +
      '<td>&nbsp;' + uhunt.tpl.format_ver(sub.ver) +'</td>' +
      '<td align=center>' + uhunt.tpl.language(sub.lan) +'</td>' +
      '<td align=center>' + uhunt.tpl.format_ms(sub.run) +'</td>' +
      '<td align=center>' + uhunt.tpl.format_time(sub.sbt,back) + '</td></tr>' ;
};


uhunt.tpl.bar = function(p,w,h){
  var a = Math.floor(p/100*w), b = w - a;
  return '<table onclick="return true;" cellpadding="0" cellspacing="0">'+
    '<tr><td>'+
      '<table border="1" cellspacing="0" cellpadding="0" style="width:'+w+'px; height:'+h+'px; display:inline-table; margin:0; padding:0">'+
        '<tr><td style="width:'+a+'px; background-color:green; border:0"></td>'+
          '<td style="width:'+b+'px; border:0;"></td></tr></table>'+
    '</td><td><tt style="margin-left:2px">'+(p<10?'&nbsp;&nbsp;':(p<100?'&nbsp;':''))+ p + '%</tt></td></tr></table>';
};

uhunt.tpl.rank = function(rank){
  return rank === -1? ' - ' : rank;
};

uhunt.tpl.name = function(name,width){
  return "<span class='ellipsis' style='display:inline-block; width:"+width+"px'>"+ name + "</span>";
};

uhunt.tpl.username = function(id,username,width){
  return "<span class='ellipsis' style='display:inline-block; width:"+width+"px'>"+
    "<a target='_blank' class='nou' uid='"+id+"' href='" + uhunt.base_url+ "/id/"+id+"'>"+
     (username || '--- no username ---') + "</a></span>";
};

uhunt.tpl.ranklist_row = function(nth,uid,name,uname,ac,nos,act,bold){
  return (bold?'<tr style="font-weight:bold">':'<tr>') +
    '<td align=center>' + nth + '</td>' +
    '<td>' + uhunt.tpl.name(name, 200) + '</td>' +
    '<td>' + uhunt.tpl.username(uid, uname, 100) + '</td>' +
    '<td align=center>' + ac + '</td>' +
    '<td align=center>' + nos + '</td>' +
    '<td align=center>' + (act[0] || '-') + '</td>' +
    '<td align=center>' + (act[1] || '-') + '</td>' +
    '<td align=center>' + (act[2] || '-') + '</td>' +
    '<td align=center>' + (act[3] || '-') + '</td>' +
    '<td align=center>' + (act[4] || '-') + '</td></tr>';
};

uhunt.Livesubs = function (id, capacity) {
  var shown = 0;    // Number of rows shown in the livesubs
  var maxShown = 5;
  var trs = {};
  var sorted_subs = [];
  var cached_tbody;

  function tbody() {
    if (!cached_tbody) { cached_tbody = $('#' + id + '_tbody'); }
    return cached_tbody;
  }

  function equals(s1, s2) {
    return s1.sid === s2.sid && 
      s1.pid === s2.pid && 
      s1.uid === s2.uid && 
      s1.name === s2.name && 
      s1.uname === s2.uname && 
      s1.ver === s2.ver && 
      s1.run === s2.run && 
      s1.lan === s2.lan && 
      s1.rank === s2.rank && 
      s1.sbt === s2.sbt;
  }

  function livesub_tds(sub, pwidth, uwidth) {
    var p = uhunt.probs.pid(sub.pid), plink = p ? uhunt.tpl.problem_link(p) : '- ? -';
    if (uhunt.algorithmist.exists(p.num)) pwidth -= 22;
    if (uhunt.udebug.exists(p.num)) pwidth -= 22;
    return '<td>' + sub.sid + '</td>' +
      '<td align="right">' + plink + '</td>' +
      '<td>' + (p?('<span style="float:right">'+uhunt.tpl.discuss_link(p.num)+'&nbsp;</span> &nbsp;' + 
                uhunt.tpl.problem_title(p.pid,p.tit,pwidth)):'- ? -') + '</td>' +
      '<td style="padding:1px 0 0 0; margin:0">&nbsp;' + uhunt.tpl.username(sub.uid, sub.name + ' (' +sub.uname + ')', uwidth) + '</td>' +
      '<td>&nbsp;' + uhunt.tpl.format_ver(sub.ver) + '</td>' +
      '<td align="center">' + uhunt.tpl.language(sub.lan) + '</td>' +
      '<td align="center">' + uhunt.tpl.format_ms(sub.run) + '</td>' +
      '<td align="center">' + (p?uhunt.tpl.problem_rt(p.pid,p.mrun):'- ? -') + '</td>' +
      '<td align="center">' + uhunt.tpl.rank(sub.rank) + '</td>' +
      '<td align="center" class="uhunt_widget_update_sbt" data-sbt="'+ sub.sbt +'">' +  uhunt.tpl.format_time(sub.sbt,2) + '</td>';
  }

  this.show = function(n) {
    n = n || uhunt.db.get('livesub-nshow') || 5;
    uhunt.db.set('livesub-nshow', n);
    var els = [];
    shown = Math.min(maxShown = n, sorted_subs.length);
    for (var i = 0; i < shown; i++) {
      var sub = sorted_subs[sorted_subs.length - i - 1];
      // console.log(sub.sid);
      if (!trs[sub.sid]) {
        trs[sub.sid] = $('<tr style="height:18px">'+ livesub_tds(sub, 125, 200) +'</tr>');
      } else {
        trs[sub.sid].html(livesub_tds(sub, 125, 200)).show();
      }
      els.push(trs[sub.sid]);
    }
    // console.log('update display ' + els.length);
    if (els.length) { tbody().empty().append(els); }
  };

  function animate(tr) {
    try {
      if (tr.data('animating')) { return; }
      tr.data('animating',true);
      tr.effect("highlight", {}, 3000, function(){ tr.data('animating',false); });
    } catch (ex){
      console.error(ex);
    }
  }

  this.update_display = function () {
    // console.log(sorted_subs);
    this.show();
  }

  // Update the submission. If the sub exists, replace it, otherwise, put at the top.
  this.update = function(sub, update_display) {
    if (!sub) { console.error('no sub'); return; }
    var lo = 0, hi = sorted_subs.length;
    while (lo < hi) {
      var mid = (lo + hi) >> 1;
      if (sorted_subs[mid].sid < sub.sid) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }
    if (lo == sorted_subs.length) {
      sorted_subs.push(sub);
      shown++;
    } else if (sorted_subs[lo].sid == sub.sid) {
      if (equals(sorted_subs[lo], sub)) { return; }
      sorted_subs[lo] = sub;
    } else if (lo == 0 && sorted_subs.length == capacity) {
      return; // No need to insert as it will soon be removed.
    } else {
      if (sorted_subs.length - lo > 50) {
        console.error("Slipped in, lo = " + lo + ", len = " + sorted_subs.length);
      }
      sorted_subs.push(sub);
      for (var i = sorted_subs.length - 1; i > lo; i--) {
        sorted_subs[i] = sorted_subs[i - 1];
      }
      sorted_subs[lo] = sub;
      shown++;
    }

    if (sorted_subs.length > capacity) {
      var last_sub = sorted_subs.shift();
      if (trs[last_sub.sid]) {
        trs[last_sub.sid].remove();
        delete trs[last_sub.sid];
      }
    }

    if (shown > maxShown) {
      if (shown <= sorted_subs.length) {
        var out_sid = sorted_subs[sorted_subs.length - shown].sid;
        if (trs[out_sid]) { trs[out_sid].hide(); }
      }
      shown--;
    }

    // TODO: remove
    if (Math.random() < 0.001) {
      var trs_size = 0; for (var j in trs) { trs_size++; }
      if (trs_size > sorted_subs.length) {
        console.error('trs leak %d > %d', trs_size, sorted_subs.length);
      }
    }
    
    if (update_display && sorted_subs.length - lo <= maxShown) {
      if (!trs[sub.sid]) {
        trs[sub.sid] = $('<tr style="height:18px">'+ livesub_tds(sub, 125, 200) +'</tr>');
        tbody().prepend(trs[sub.sid]);
      } else {
        trs[sub.sid].html(livesub_tds(sub, 125, 200));
      }
      animate(trs[sub.sid]);
    }
  };

  this.toggle = function (id) {
    var t = $('#'+id+'_table');
    var dir = { direction:'up', speed:'fast' };
    if (t.is(":hidden")){
      $('#'+id+'_a').toggle('slide', dir, function () {
        uhunt.db.set('show_livesubs', true);
        t.toggle('slide', dir);
      });
    } else {
      uhunt.db.set('show_livesubs', false);
      t.toggle('slide', dir, function () { $('#'+id+'_a').toggle('slide', dir); });
    }
  };

  this.render = function (title, columns, show, handle_id) {
    var cols = {
      sid: '<th width="60" align="left">&nbsp; #<th width="40" align="right">&nbsp;',
      prob: '<th width="180" align="left">&nbsp; Problem Title',
      user: '<th width="205" align="left">&nbsp; User (username)',
      ver: '<th width="110" align="left">&nbsp; Verdict',
      lan: '<th width="60">Lang',
      run: '<th width="50">Time',
      mrun: '<th width="50">Best',
      rank: '<th width="50">Rank',
      sbt: '<th width="120">Submit Time'
    };
    var c = '';
    for (var i = 0; i < columns.length; i++) {
      c += cols[columns[i]];
    }
    var s = '';
    for (var i = 0; i < show.length; i++) {
      if (i) s += '|';
      s += '<a style="text-decoration:none; color:white" href="javascript:uhunt.livesubs[' + handle_id +
        '].show(' + show[i] + ')">&nbsp;' + ((show[i] > 1e9) ? 'ALL' : show[i]) + '&nbsp;</a>';
    }
    return '<a href="javascript:uhunt.livesubs['+ handle_id +'].toggle(\''+id+
      '\')" style="text-decoration:none; display:none" id="'+id+'_a">View Live Submissions</a>' +
    '<table id="'+id+'_table" width="100%" style="border: 1px solid #AAA; " cellpadding="1">\
  <thead><tr class="tablebar">\
    <th align="left" colspan="10" height="25"><span style="float:right; font-weight:normal">Show : ' + s + '&nbsp; </span> &nbsp; ' + 
    title + ' <a style="font-weight:normal; color:white; text-decoration:none" href="javascript:uhunt.livesubs['+ handle_id +'].toggle(\''+id+'\')">(hide)</a>\
    <tr class="tablesubar">' + c +'\
  </thead>\
  <tbody id="'+id+'_tbody" class="alt_colors" style="font-family:verdana; font-size:11px"></tbody>\
</table>';
  };
};

uhunt.init = function () {
  uhunt.subs = uhunt.NewUser();

  // update the submit time periodically
  uhunt.observer.add_listener('periodic_update_60000', function () {});
  uhunt.observer.add_listener('periodic_update_1000', function () {
    $('.uhunt_widget_update_sbt').each(function(i,a){ a = $(a);
      var prev = a.html(), next = uhunt.tpl.format_time(uhunt.util.parseInt(a.data('sbt')), 2);
      if (prev != next) a.html(next);
    });
  });

  uhunt.periodic_update(1000);
  uhunt.periodic_update(60000);
};

$(window).unload(function () {
  uhunt.observer.notify('window_unload');
});
