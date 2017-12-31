"use strict";function handleClientLoad(){gapi.load("client:auth2",initClient)}function initClient(){null==gapi.auth.getToken()&&(signin(),signinStatusListener()),window.listen=setInterval(signinStatusListener,600)}function signin(){chrome.identity.getAuthToken({interactive:!0},function(e){null!=e&&(gapi.auth.setToken({access_token:e}),gapi.client.load("drive","v3"))})}function signout(){if(null!=gapi.auth.getToken()){var e=new XMLHttpRequest;e.open("GET","https://accounts.google.com/o/oauth2/revoke?token="+gapi.auth.getToken().access_token),e.send();var t=gapi.auth.getToken();chrome.identity.removeCachedAuthToken({token:t.access_token}),gapi.auth.setToken(null)}}function signinStatusListener(){var e=new Date;e.setDate(1),e.setMonth(e.getMonth()-1);var t=e.getMonth();e.setMonth(t-1);var n=e.getMonth();e.setMonth(n-1);var a=e.getMonth();null!=gapi.auth.getToken()?($("#auth-button").html("Sign Out"),$("#auth-button").css("display","inline-block"),$("#auth-button").css("margin-top","30px"),$("#auth-button").removeClass("btn-success"),$("#auth-button").addClass("btn btn-danger"),$("#backup-label").css("display","inline-block"),$(".btn-group").css("display","inline-block"),$("#backup-button1").html(monthNames[t]),$("#backup-button2").html(monthNames[n]),$("#backup-button3").html(monthNames[a]),$("#read-button").css("display","inline-block"),$("#read-button").addClass("btn btn-success"),$("#signin-status").html("Authorized / Signed in."),$("#signin-status").removeClass("alert-warning"),$("#signin-status").addClass("alert alert-info")):($("#auth-button").html("Sign In / Authorize"),$("#auth-button").css("display","inline-block"),$("#auth-button").css("margin-top","10px"),$("#auth-button").removeClass("btn-danger"),$("#auth-button").addClass("btn btn-success"),$("#backup-label").css("display","none"),$(".btn-group").css("display","none"),$("#read-button").css("display","none"),$("#signin-status").html("Unauthorized / Signed out."),$("#signin-status").removeClass("alert-info"),$("#signin-status").addClass("alert alert-warning"),$("#backup-status").css("display","none"))}var popupMod=angular.module("UHistoryPopup",[]);popupMod.config(["$compileProvider",function(e){e.aHrefSanitizationWhitelist(/^\s*(https?|ftp|file|chrome-extension):/)}]),popupMod.controller("PopupCtrl",["$scope","$window","$filter","$interval",function(e,t,n,a){e.authButtonHandler=function(){null==gapi.auth.getToken()?signin():signout()},e.backupButton1Handler=function(){t.monthdiff=1,e.checker(e.backupHelper)},e.backupButton2Handler=function(){t.monthdiff=2,e.checker(e.backupHelper)},e.backupButton3Handler=function(){t.monthdiff=3,e.checker(e.backupHelper)},e.readButtonHandler=function(){chrome.tabs.create({url:chrome.runtime.getURL("../html/index.html")})},e.checker=function(n){var a=new Date;a.setDate(1);var s="UHB"+a.getFullYear()+monthNames[a.getMonth()-t.monthdiff]+".txt";gapi.client.drive.files.list({q:"trashed = false and name = '"+s+"'",fields:"nextPageToken, files(id, name)"}).then(function(t){var a=t.result.files;if(angular.element($("#backup-status")).css("display","block"),a&&a.length>0)return angular.element($("#backup-status")).html("Backuped: "+s),angular.element($("#backup-status")).removeClass("alert-warning alert-danger"),angular.element($("#backup-status")).addClass("alert alert-success"),!0;if(!n)return!1;angular.element($("#backup-status")).html("Backuping ..."),angular.element($("#backup-status")).removeClass("alert-danger alert-success"),angular.element($("#backup-status")).addClass("alert alert-warning"),n();setInterval(e.progressChecker,200);return!1})},e.progressChecker=function(){e.checker()&&clearInterval(check)},e.backupHelper=function(){gapi.client.drive.files.list({q:"mimeType = 'application/vnd.google-apps.folder' and name = 'UHistoryBackup'",fields:"nextPageToken, files(id, name)"}).then(function(t){var n=t.result.files;if(n&&n.length>0)e.historyReader(n[0].id,e.saveToFolder);else{var a={name:"UHistoryBackup",mimeType:"application/vnd.google-apps.folder"};gapi.client.drive.files.create({resource:a}).then(function(t){switch(t.status){case 200:var n=t.result;e.historyReader(n.id,e.saveToFolder);break;default:console.log("Error creating the folder, "+t)}})}})},e.saveToFolder=function(e,n,a){var s="-------314159265358979323846",o="\r\n--"+s+"\r\n",i=new Date;i.setDate(1);var r="UHB"+i.getFullYear()+monthNames[i.getMonth()-t.monthdiff]+".txt",l=new FileReader;l.readAsBinaryString(e),l.onload=function(e){var t="application/octet-stream",i={name:r,mimeType:t,parents:[n]},u=btoa(l.result),c=o+"Content-Type: application/json\r\n\r\n"+JSON.stringify(i)+o+"Content-Type: "+t+"\r\nContent-Transfer-Encoding: base64\r\n\r\n"+u+"\r\n---------314159265358979323846--",d=gapi.client.request({path:"/upload/drive/v3/files",method:"POST",params:{uploadType:"multipart"},headers:{"Content-Type":'multipart/mixed; boundary="'+s+'"'},body:c});a||(a=function(e){console.log(e)}),d.execute(a)}},e.historyReader=function(n,a){var s=new Date,o=e.getLastMonthPeriod(s);chrome.history.search({text:"",maxResults:9999999,startTime:o[0].getTime(),endTime:o[1].getTime()},function(s){if(t.res=s,0===s.length)return angular.element($("#backup-status")).html("Backup failed! No history found in this month!"),angular.element($("#backup-status")).removeClass("alert-secondary alert-success"),angular.element($("#backup-status")).addClass("alert alert-danger"),void(t.errinfo=void 0);var o=Object.keys(s[0]);e.append(o.join("`|`|"));for(var i,r=0;r<s.length;r++){i="";for(var l=0;l<o.length;l++)i+="`|`|"+s[r][o[l]]+"`|`|",l!==o.length-1&&(i+="|@|@");e.append("\n"+i)}var u=new Blob([data.innerText],{type:"application/octet-steam"});a(u,n)})},e.append=function(e){t.data.appendChild(document.createTextNode(e))},document.addEventListener("DOMContentLoaded",function(){t.data=document.getElementById("data")}),e.getLastMonthPeriod=function(e){var n=[],a=new Date(e.getTime());a.setDate(1),a.setMonth(a.getMonth()-t.monthdiff),a.setHours(0),a.setMinutes(0),a.setSeconds(0),a.setMilliseconds(0);var s=new Date(a.getTime());return s.setMonth(s.getMonth()+1),n.push(new Date(a.getTime())),n.push(new Date(s.getTime())),n}}]);var monthNames=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];