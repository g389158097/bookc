var protocol = document.location.protocol;
function GetNovelID(url) {
    var reg = /http:\/\/(?:.+)\/Novel\/(\d{1,})\/?(?:.+)?/gi;
    return url.replace(reg, "$1");
}
var cid = 0;
var burl = window.location.href;
reg = /http\:\/\/book\.sfacg\.com\/Novel\/(?:\d+)\/(?:\d+)\/(\d+)(\/)?/g
if(reg.test(burl))
{
	cid = burl.replace(/http\:\/\/book\.sfacg\.com\/Novel\/(?:\d+)\/(?:\d+)\/(\d+)(\/)?/g,"$1");
}
var movetimes = 0;
var mw = $.browser.mozilla ? "DOMMouseScroll" : "mousewheel";
var isCount = false;
var tMutext = true;
$.ajax({
    dataType: 'jsonp',
    jsonp: "callback",
    url: protocol + '//p.sfacg.com/ajax/ViewCount.ashx',
    data: { id: novelID, cid: cid },
    cache: false,
    global: false,
    success: function (info) {

    },
    error: function (result, status) {
    }
});
$(document).mousemove(function (event) {
    movetimes++;
    if (movetimes > 200) {
        $(document).unbind("mousemove");
        $('body').unbind(mw);
        $.ajax({
            type: 'post',
            url: '/ajax/ashx/Counter.ashx',
            data: { id: novelID, t: 1, cid: cid },
            dataType: 'text',
            cache: false,
            global: false,
            success: function (info) {
                HandleTicketBouns(info);
            },
            error: function (result, status) {
            }
        });
    }
});
$('body').bind(mw, function () {
    movetimes += 50;
    if (movetimes >= 200) {
        $(document).unbind("mousemove");
        $('body').unbind(mw);
        $.ajax({
            type: 'post',
            url: '/ajax/ashx/Counter.ashx',
            data: { id: novelID, t: 1, cid: cid },
            dataType: 'text',
            cache: false,
            global: false,
            success: function (info) {
                HandleTicketBouns(info);
            },
            error: function (result, status) {
            }
        });
    }
});
function HandleTicketBouns(info) {
    if (info != "0") {
        var infos = info.split('|');
        CallWindow("randomTicket");

        $("#randomTicket a.btn").click(function () {
            if (tMutext) {
                tMutext = false;
                CloseWindow("randomTicket");
                $.ajax({
                    type: 'post',
                    url: '/ajax/ashx/GetTicketBouns.ashx',
                    data: { ts: infos[1], key: infos[2] },
                    dataType: 'text',
                    cache: false,
                    global: false,
                    success: function (info) {
                        if (info == "1")
                            alert("恭喜您成功获得一张月票!");
                        else if (info == "2")
                            alert("很遗憾,您未在2分钟内领取月票,本次月票领取机会已过期.");
                        else if (info == "3")
                            alert("参数校验出错.");
                        else if (info == "4")
                            alert("只有登录用户可以获取月票.");
                        else alert("发生了未知的错误.");
                        tMutext = true;
                    },
                    error: function (result, status) {
                        alert("网络通信过程出现异常.");
                        tMutext = true;
                    }
                });
            }
        });
    }
}