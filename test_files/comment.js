
function show_comment_pop(type, callback) 
{
    var isThank = 0;
    if (type == 'thanks')
    {
        isThank = 1;
    }
    $.cross_domain_ajax({
    cache: false,
    url: '//www.'+ urlprefix+'haodf.com/index/ajaxgetdoctorlist?showCommentPop=1&isthank='+isThank,
    success : function(data) 
    {
        $('#abc').html(data);
        showCommentDiv();
        $('#abc').show();
        if(undefined != callback)
        {
            callback(data);
        }
    }
    });
}
function showCommentDiv()
{
    var options={
                endPosition:{
                left:'center',
                top:'center'
                }
    };
    var dpwrap='<div class="dpwrap"></div>';
    $('body').append(dpwrap);
    var allHeight=document.body.scrollHeight;
    $('.dpwrap').css({position:"absolute",width:"100%",height:allHeight,background:"#333",opacity:"0.3",left:"0px",top:"0px"});
    $('.dp-float').myWin(options).show();
}

function ajaxgetDoctorlist(callback)
{
    var keyword = $('#commentdoctorname').val();
    var isthank = 0;
    if(typeof($('#comment_hidden_isthank').val())!="undefined")
    {
        isthank = $('#comment_hidden_isthank').val();
    }
    var search_type = '';
    if(typeof($('#comment_search_type').val())!="undefined")
    {
        search_type = $('#comment_search_type').val();
    }
    var search_id = '';
    if(typeof($('#comment_search_id').val())!="undefined")
    {
        search_id = $('#comment_search_id').val();
    }
	closeCommentPop();
    $.cross_domain_ajax(
    {
        cache: false,
        url: '//www.'+ urlprefix+'haodf.com/index/ajaxgetdoctorlist?doctorname='+keyword+'&isthank='+isthank+'&stype='+search_type+'&sid='+search_id,
        success : function(data) 
        {
            $('#abc').html(data);
            showCommentDiv();
            $('#abc').show();
            callback(data);
        }
    }
    );
}

function sethiddencomment(did, pid)
{
    $('#comment_hidden_did').val(did);
    $('#comment_hidden_pid').val(pid);
}

function toCommentDoctor(prefix)
{
    
    if ($('#comment_hidden_did').val()  == '' || $('#comment_hidden_did').val() == '')
    {
        alert('请选择您要点评的医生!');
    }
    else
    {
        top.location = '//www.'+prefix+'haodf.com/api/doctor/addcomment?doctor_id='+$('#comment_hidden_did').val()+'&doctor_id_primary='+$('#comment_hidden_pid').val()+'&addtype=showadd&comment_type='+$('#comment_hidden_isthank').val();

    }
}

function closeCommentPop()
{
    $('.dpwrap').hide();
    $('#abc').html('');
}

function keyDownSearch(event)
{
    if (event.keyCode==13)
    {
        ajaxgetDoctorlist();
    }
}

