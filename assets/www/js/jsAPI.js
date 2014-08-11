var ROOT = 'https://aiesecapi.appspot.com/_ah/api';

function loadFirstPage() {
    gapi.client.userAPI.post.timeline({
        'PageToken': ''
    }).execute(
        function (resp) {
            if (resp.items) {
            	for (var i = 0; i < resp.items.length; i++){
            		createPost(resp.items[i].title,resp.items[i].ownerEmail,atob(resp.items[i].text),resp.items[i].image,resp.items[i].date);
            	}
            }
            if (resp.next) {
            	 document.getElementById("btnS").style.visibility = 'visible';
                 $('#hdnNextPage').val(resp.next);
            }
            else {
            	document.getElementById("btnS").style.visibility = 'hidden';
            }
        }
    )
}

function send(){
	$.ajax({
        url: '/',
        type: 'POST',
        data: '',
        cache: false,
        dataType: 'text',
        contentType: 'application/json',
        success: function (data) {
        	loadNextPage($('#hdnNextPage').val());
        },
        error: function (ts) {
        	 alert("ERROR");
        }
    });
return false;
}

function loadNextPage(cursor) {
    gapi.client.userAPI.post.timeline({
        'PageToken': cursor
    }).execute(
        function (resp) {
        	if (resp.items) {
            	for (var i = 0; i < resp.items.length; i++){
            		createPost(resp.items[i].title,resp.items[i].ownerEmail,atob(resp.items[i].text),resp.items[i].image,resp.items[i].date);
            	}
            }
            if (resp.next) {
            	 document.getElementById("btnS").style.visibility = 'visible';
                 $('#hdnNextPage').val(resp.next);
            }
            else {
            	document.getElementById("btnS").style.visibility = 'hidden';
            }
        }
    )
}


function createPost(title,user,description,image,date){
	/*var post = ' \
		<time class="cbp_tmtime"><span>'+date+'</span></time> \
		 <div class="cbp_tmicon cbp_tmicon-phone"></div> \
        <div class="cbp_tmlabel"> \
            <h2>'+title+'</h2> \
            <img src="'+image+'" width="100%" height="auto" /> \
            <p>'+description+'</p> \
        </div> \
	';*/
	var post = '<table style="width:100%;" border="0"> \
		<tr><td></td></tr> \
		<tr><td></td></tr> \
		<tr><td></td></tr> \
		<tr><td></td></tr> \
		<tr><td></td></tr> \
		<tr><td></td></tr> \
        <tr style="border-spacing:1px; padding-bottom:1em;"> \
	<td width="50%"></td> \
    <td width="50%"></td> \
</tr> \
<tr> \
	<td colspan="2" style="vertical-align:text-bottom;font-size:x-large"> \
        <div style="border-bottom: 3px solid #666;"> \
            <table style="width:100%" border="0"> \
                <tr> \
                    <td colspan="2" valign="bottom" style="color: #333;">'+title+'</td> \
                </tr> \
            </table> \
        </div> \
    </td> \
</tr> \
<tr> \
<td colspan="2">by: <em>'+user+'</em></td> \
</tr> \
<tr> \
    <td colspan="2"> \
        <div class="divimage" id="divimage" style="text-align: center"><img id="img" src="'+image+'" width="100%" height="auto" /></div> \
    </td> \
</tr> \
<tr> \
    <td colspan="2" style="text-align:justify;">'+description+'</td> \
</tr> \
<tr>  \
    <td style="color: #999;">'+date+'</td> \
    <td style="text-align: right"><em>Comentarios (0)</em> \
</tr> \
<tr><td></td></tr> \
<tr><td></td></tr> \
<tr><td></td></tr> \
<tr><td></td></tr> \
<tr><td></td></tr> \
<tr><td></td></tr> \
</table>'
	var li = document.createElement('li');
	li.innerHTML = post; 
	document.getElementById('luPost').appendChild(li);
}

function init() {
	var apisToLoad = 1;
    var callback = function () {
    	if(--apisToLoad == 0){
    		loadFirstPage();
    	}
    }
    gapi.client.load('userAPI', 'v1', callback, ROOT);
}