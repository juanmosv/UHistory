function handleClientLoad(){gapi.load("client:auth2")}var IbrowseModel=function(){function e(i,r){r==i.length-1?n(i[r].id,i,r,t):n(i[r].id,i,r,e)}function t(){r(c,F,p),r(c,C,d),b=a(c),function(){var e=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],t=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(i=0;i<p.length;i++)e[p[i][0].getHours()]+=p[i][1].length,t[p[i][0].getHours()]++;for(i=0;i<e.length;i++)e[i]=(e[i]/t[i]).toFixed(1);D=e}(),function(){var e=[0,0,0,0,0,0,0],t=[0,0,0,0,0,0,0];for(i=0;i<d.length;i++)e[d[i][0].getDay()]+=d[i][1].length,t[d[i][0].getDay()]++;for(i=0;i<e.length;i++)e[i]=(e[i]/t[i]).toFixed(0);e.push(e.splice(0,1)[0]),y=e}(),function(){var e=f(),t=[],n=0;for(i=0;i<e.length;i++)i<10?t.push(e[i]):i<e.length-1?n+=e[i][1]:(n+=e[i][1],t.push(["Other",n]));T=t}(),function(){var e=g(),t=[];for(i=0;i<e.length;i++){t.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);var n=0;for(j=0;j<90;j++){for(k=0;k<24;k++)for(l=0;l<p[k+n][2].length;l++)p[k+n][2][l][0]==e[i][0]&&(t[i][k]+=p[k+n][2][l][1]);n+=24}for(m=0;m<t[i].length;m++)t[i][m]=(t[i][m]/90).toFixed(1)}for(i=0;i<t[t.length-1].length;i++)for(t[t.length-1][i]=D[i],j=0;j<t.length-2;j++)t[t.length-1][i]-=t[j][i],t[t.length-1][i]=t[t.length-1][i].toFixed(1);w=t}(),function(){var e=g(),t=[],n=[];for(i=0;i<e.length;i++){for(t.push([0,0,0,0,0,0,0]),n=[0,0,0,0,0,0,0],j=0;j<d.length;j++){for(k=0;k<d[j][2].length;k++)d[j][2][k][0]==e[i][0]&&(t[i][d[j][0].getDay()]+=d[j][2][k][1]);n[d[j][0].getDay()]++}for(j=0;j<t[i].length;j++)t[i][j]=(t[i][j]/n[j]).toFixed(0);t[i].push(t[i].splice(0,1)[0])}for(i=0;i<t[t.length-1].length;i++)for(t[t.length-1][i]=y[i],j=0;j<t.length-2;j++)t[t.length-1][i]-=t[j][i];x=t}(),notifyObservers("dataReady"),h(d[d.length-1])}function n(e,t,i,n){gapi.client.request({path:"/drive/v2/files/"+e,method:"GET",callback:function(e,r){var o=gapi.auth.getToken(),s=new XMLHttpRequest;s.open("GET",e.downloadUrl,!0),s.setRequestHeader("Authorization","Bearer "+o.access_token),s.onreadystatechange=function(e){if(4==s.readyState&&200==s.status){var r=s.response.substring(s.response.indexOf("\n")+1);(function(e){var t;for(t=0;t<e.length;t++){var i=new Array;i.push(e[t][0],e[t][4],e[t][2],parseFloat(e[t][1])),c.push(i)}})(r=$.csv.toArrays(r,{separator:"|@|@",delimiter:"```"})),n&&n(t,i+1)}},s.send()}})}function r(e,t,n){n.length=0;var r=new Date;r.setDate(r.getDate()-90),r.setHours(0),r.setMinutes(0),r.setSeconds(0),r.setMilliseconds(0);var o=r.dst(),s=new Date;for(s.setDate(s.getDate()+1),s.setHours(0),s.setMinutes(0),s.setSeconds(0),s.setMilliseconds(0);r<s;r.setTime(r.getTime()+t)){t==C&&o!=r.dst()&&(1==o?(r.setHours(0),r.setDate(r.getDate()+1)):1==r.dst()&&r.setHours(0)),o=r.dst();var u=new Array;for(u.push(new Date(r.getTime())),u[1]=[],i=0;i<e.length;i++)e[i][3]>=r.getTime()&&e[i][3]<r.getTime()+t&&u[1].push(e[i]);u.push(a(u[1])),n.push(u)}}function o(e,t){var n=[];for(i=0;i<t.length;i++){var r=[];r.push(t[i][0]);var o=t[i][1].filter(function(t){if(t[1].indexOf(e.toLowerCase())>=0||t[2].indexOf(e.toLowerCase())>=0)return t});r.push(o),n.push(r)}return n}function s(e){O=e,H=o(e,d),S=o(e,p),M=o(e,[v])[0],notifyObservers("searchComplete")}function a(e){var t=new Array;for(j=0;j<e.length;j++){var i=$("<a>").prop("href",e[j][1]).prop("hostname");t.push(i)}var n=new Array;t.forEach(function(e){n[e]=(n[e]||0)+1});var r=new Array;for(key in n)""!=key?r.push([key,n[key]]):r.push(["local files",n[key]]);return r.sort(function(e,t){return t[1]-e[1]}),r}function u(e){var t=0;for(i=0;i<e.length;i++)e[i][1].length>t&&(t=e[i][1].length);return t}function h(e){v=e,s(O)}function f(){return b}function g(){return T}var c=[],d=[];this.days=d;var p=[];this.hours=p;var v,y,D,T,w,x,O="",H=[],S=[],M=[],A="monthCalendar",b=[],F=36e5,C=864e5;setTimeout(function(){c=[],chrome.identity.getAuthToken({interactive:!1},function(t){null!=t&&(gapi.auth.setToken({access_token:t}),gapi.client.load("drive","v3").then(function(){c.length=0,gapi.client.drive.files.list({q:"trashed = false and name contains 'UHB' and name contains 'txt'",fields:"nextPageToken, files(id, name)"}).then(function(t){e(t.result.files,0)})}))})},1e3);this.search=s,this.toJSON=function(e){var t={};for(i=0;i<e.length;i++)t[Math.round(e[i][0].getTime()/1e3)]=e[i][1].length;return t},this.removeUrl=function(e){function t(t){for(i=0;i<t.length;i++)for(j=0;j<t[i][1].length;j++)t[i][1][j][1]===e&&t[i][1].splice(j,1)}t(p),t(d),t(H),t(S),notifyObservers("itemRemoved")},Date.prototype.stdTimezoneOffset=function(){var e=new Date(this.getFullYear(),0,1),t=new Date(this.getFullYear(),6,1);return Math.max(e.getTimezoneOffset(),t.getTimezoneOffset())},Date.prototype.dst=function(){return this.getTimezoneOffset()<this.stdTimezoneOffset()},this.setSelectedItem=h,this.setCurrentView=function(e){A=e},this.getSiteRanking=f,this.getTop=g,this.getDailyTop=function(){return x},this.getHourlyTop=function(){return w},this.getDailyAverages=function(){return y},this.getHourlyAverages=function(){return D},this.getDailyMax=function(){return u(d)},this.getDaysSearchMax=function(){return u(H)},this.getHourlyMax=function(){return u(p)},this.getHoursSearchMax=function(){return u(S)},this.getDaysSearch=function(){return H},this.getHoursSearch=function(){return S},this.getSelectedItemSearch=function(){return M},this.getCurrentView=function(){return A},this.getLastSearchString=O;var z=[];notifyObservers=function(e){for(var t=0;t<z.length;t++)z[t].update(e)},this.addObserver=function(e){z.push(e)}};