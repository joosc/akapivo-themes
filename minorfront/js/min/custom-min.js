jQuery(document).ready(function($){function a(a){var e=r(),t=i(a.target.id),n=a.value;void 0!==n.newValue&&(n=n.newValue),console.log(n);var o=n;l(e,t,o,!1),c(e,t)}function e(a){var e=r(),t=i(a.target.id),n=a.target.value;l(e,t,n,!0),c(e,t),console.log(n)}function t(a){var e=r(),t=i(a.target.id),n=a.target.value;l(e,t,n,!0),c(e,t)}function n(a,e){var t=r(),n=i(a.target.id),o=e?100:0;l(t,n,o,!1),c(t,n)}function r(){var a=$("#enquete-wrapper").data("enquete-id");return a}function o(){return""==p&&(p=$("#update-url").val()),p}function i(a){var e=a.split("-"),t=e[e.length-1];return t}function d(a){$('.branch[data-branch-completed="100"] .thumbnail img').each(function(a){var e=$(this);if(void 0!==e.attr("data-completed")){var t=e.attr("data-completed");e.attr("src",t),e.removeAttr("data-completed")}})}function c(a,e){var t=$("#tab"+e).attr("data-answered");if(0==t){if($("#tab"+e).attr("data-answered",1),$('a.dropdown[href="#tab'+e+'"]')){var n=$('a.dropdown[href="#tab'+e+'"]'),r=n.parent();r.attr("data-answered",1);var o=n.html();n.html('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span> '+o)}if($("#tab"+e+" p.lead")){var i=$("#tab"+e+" p.lead"),d=i.html();i.html('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span> '+d)}var c=$("#enquete-wrapper"),l=parseInt(c.attr("data-aantal-antwoorden"),10)+1,u=parseInt(c.attr("data-aantal-vragen"),10),s=Math.round(100*(l/u));c.attr("data-aantal-antwoorden",l),c.attr("data-enquete-completed",s);var p=$("#tab"+e).attr("data-branch"),h=$("#branch-"+p),v=parseInt(h.attr("data-aantal-antwoorden"),10)+1,g=parseInt(h.attr("data-aantal-vragen"),10),f=Math.round(100*(v/g));if(h.attr("data-aantal-antwoorden",v),h.attr("data-branch-completed",f),$("div[data-branch="+p+"] .modal-progress .progressbar")){var m=$("div[data-branch="+p+"] .progress-bar-tong");console.log(m),console.log(f),m.css("width",f+"%")}}}function l(a,e,t,n){var r=Cookie.read("enquete"+a),o=new Object;if(o.vraag_id=e,n?(t=t.clean(),t=t.stripScripts(),o.body=t):o.value=t,null==r){var i=new Array;i.push(o);var d=JSON.encode(i),r=Cookie.write("enquete"+a,d)}else{for(var c=Cookie.read("enquete"+a),l=JSON.decode(c),u=!1,s=0;s<l.length;s++){var p=l[s];p.vraag_id==e&&(u=!0,n?p.body=t:p.value=t)}u||l.push(o);var d=JSON.encode(l),r=Cookie.write("enquete"+a,d)}}function u(a){var e=r(),t=Cookie.read("enquete"+e);if(null!==t){var n=o(),i=JSON.decode(t);console.log(t),console.log(i),$.get(n+"/"+e+"/save/"+t).done(function(a){console.log(a),Cookie.dispose("enquete"+e),d(e)})}}var s=new Array,p="";$("[name='my-checkbox']").bootstrapSwitch(),$(".slider").slider({tooltip:"always",formatter:function(a){var e="";switch(a){case 0:e="helemaal niet";break;case 25:e="niet echt";break;case 50:e="geen mening";break;case 75:e="eerder wel";break;case 100:e="helemaal wel"}return e}}),$(".slider").on("slide change",function(e){$.doTimeout("doneSliding",1e3,function(){a(e)},!0)}),$(".radio").on("click",function(a){$.doTimeout("doneClicking",1e3,function(){e(a)},!0)}),$("input[name='my-checkbox']").on("switchChange.bootstrapSwitch",function(a,e){$.doTimeout("doneSwitching",1e3,function(){n(a,e)})}),$(".opentekstform").on("input",function(a){$.doTimeout("doneTyping",1e3,function(){t(a)},!0)}),$(".modal").on("hidden.bs.modal",function(a){u(a)})});