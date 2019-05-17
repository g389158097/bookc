var dataLoad = {
    ticket: true,
    bonus: false,
    vote1: false,
    vote2: false,
    scmt: false,
    lcmt1: false,
    lcmt2: false
};
var valicodeInfo = {
    csessionid: "",
    sig: "",
    nc_token: "",
    nc_scene: "login"
};
$(function () {
    $(".tab").tab({
        emit: "click"
    }, function (navItem) {

        this.find(".scroll-box").scrollBar();
        switch (navItem.attr("tabName")) {
            case "ticket":
                if (!dataLoad.ticket) {
                    consume.getTicketInfo(novelID, ShowTicketInfo, function () { });
                    dataLoad.ticket = true;
                }
                break;
            case "bonus":
                if (!dataLoad.bonus) {
                    consume.getBonusInfo(novelID, ShowBonusInfo, function () { });
                    dataLoad.bonus = true;
                }
                break;
            case "vote1":
                if (!dataLoad.vote1) {
                    common.getVoteInfo(novelID, 0, ShowVoteInfo, function () { });
                    dataLoad.vote1 = true;
                }
                break;
            case "scmt":
                if (!dataLoad.scmt) {
                    comment.getCommentInfo(novelID, ShowCommentInfo, function () { });
                    dataLoad.scmt = true;
                }
                console.log(dataLoad.scmt);
                break;
            case "lcmt1":
                if (!dataLoad.lcmt1) {
                    comment.getCommentList(novelID, 0, 5, "long", 200, "addtime", ShowLongCommentList, function () { });
                    dataLoad.lcmt1 = true;
                }
                console.log(dataLoad.lcmt1);
                break;
            default:
                break;
        }
    });

    //小TAB切换
    $(".sub-tab").tab({
      tabNav: ".sub-tab-nav",  //切换导航
      tabNavItem: ".sub-nav-item", //导航项目
      tabBody: ".sub-tab-content", //内容盒子
      tabItem: ".sub-tab-item", //内容项目
      emit: "click"
    }, function (navItem) {

      this.find(".scroll-box").scrollBar();
      switch (navItem.attr("tabName")) {
          case "vote1":
              if (!dataLoad.vote1) {
                  common.getVoteInfo(novelID, 0, ShowVoteInfo, function () { });
                  dataLoad.vote1 = true;
              }
              break;
          case "vote2":
              if (!dataLoad.vote2) {
                  common.getHistoryVoteInfo(novelID, ShowHistoryVoteInfo, function () { });
                  dataLoad.vote2 = true;
              }
              break;
          case "lcmt1":
              if (!dataLoad.lcmt1) {
                  comment.getCommentList(novelID, 0, 5, "long", 200, "addtime", ShowLongCommentList, function () { });
                  dataLoad.lcmt1 = true;
              }
              break;
          case "lcmt2":
              if (!dataLoad.lcmt2) {
                  comment.getCommentList(novelID, 0, 5, "long", 200, "usenum", ShowLongCommentHotList, function () { });
                  dataLoad.lcmt2 = true;
              }
              break;
          default:
              break;
      }
      console.log(navItem.attr("tabName"));
    });


    //星星评分
    var doScore = $("#doScore");
    doScore.on("click", ".icn", function(){
      var $this = $(this);
      $this.prevAll().add($this).addClass("seleted");
      $this.nextAll().removeClass("seleted");
    });

    //添加印象
    var tagContainer = $("#tagContainer"),
        tagInput = tagContainer.find(".tag-input"),
        popularTag = $("#popularTag");

    tagInput.on("keyup", function(e){
      var e = e || event;
      var $this = $(this);
      var text = "";
      var defineTag;

      e.preventDefault || e.preventDefault();
      e.stopPropagation || e.stopPropagation();

      //如果按下空格
      if(e.keyCode === 32){
          text = $this.text();
          if (/^(\&nbsp;|\s)*\S+(\&nbsp;|\s)(\&nbsp;|\s)+$/gi.test(text)) {
          text = text.replace(/(&nbsp;|\s)*[\r\n]*/gi,"").trim();
          createDefinde(text);
          $this.html("&nbsp;");
        }

      }

      return false;

    });

    //点击删除标签
    tagContainer.on("click", ".close-btn", function(e){
      $(this).parent().remove();
    });

    //点击常用标签增加到自定义标签栏里面
    popularTag.on("click", ".dd", function(){
      var text = $(this).find(".text").text();

      createDefinde(text);
    });

    //生成自定义标签
    function createDefinde(txt){
      var defineTag = '<div class="define-tag">';
          defineTag += '<span class="text">'+ txt +'</span>';
          defineTag += '<a href="javascript:void(0);" class="icn close-btn">&#xe117;</a></div>';

          defineTag = $(defineTag);

      var tagList = tagContainer.find(".define-tag");

      tagInput.before(defineTag);

          // tagInput.height( tagContainer.height() );
    }

    //自定义滚动条
    $(".scroll-box").scrollBar();

    //自定义复选框
    $(".checkbox-item").checkbox();

    //自定义单选框
    $(".options-row").radio();

    $(".short-textarea").placeholder();

    $(".select-item").selectItem();
    


    var emojiBox = $("#emojiBox"),
        showEmojiBtn = $("#showEmojiBtn"),
        bigEmoji = $("#bigEmoji");

    //显示表情图
    showEmojiBtn.on("click", function (e) {
        var e = e || event;

        e.preventDefault || e.preventDefault();
        e.stopPropagation || e.stopPropagation();

        $(this).find(".icn-arrow-top").toggleClass("icn-arrow-down");
        emojiBox.toggleClass("hide");
        if (emojiBox.find(".emoji-item").length == 0) {
            var emojiList = "";
            for (var i = 1; i <= 52; i++)
                emojiList += '<li class="emoji-item" o="' + i.padLeft(3) + '"><img src="http://rs.sfacg.com/web/novel/images/images/emotion/SFGirl/'
                    + i.padLeft(3) + '.png" alt=""></li>';
            emojiBox.find(".emoji-list").html(emojiList);
        }
        return false;
    });

    $(document).on("click", function(){
      emojiBox.addClass("hide");
    });

    //表情动作-鼠标移到对于的表情，显示到大表情
    emojiBox.on("mouseover", ".emoji-item", function(){
      var $this = $(this);
      var src = $this.find("img").attr("src");
      var index = $this.index() % 6 /3;
      var style = {};


      if(index< 1){
        style = {
          top: 0,
          left: "auto",
          right: 0
        };
      }else{
        style = {
          top: 0,
          left: 0,
          right: "auto"
        };
      }

      bigEmoji.removeClass("hide")
                  .css(style)
                  .find("img")
                  .attr("src", src);
    });
    emojiBox.on("click", ".emoji-item", function () {
        $("#Body").val($("#Body").val() + "[em:sfgirl:" + $(this).attr("o") + "]");
    });
    bindData();
    bindEvents();
})

function bindData() {
    initialPointZone(novelID);
    consume.getTicketInfo(novelID, ShowTicketInfo, function () { });
    //consume.getBonusInfo(novelID, ShowBonusInfo, function () { });
    //common.getVoteInfo(novelID, 0, ShowVoteInfo, function () { });
    //common.getHistoryVoteInfo(novelID, ShowHistoryVoteInfo, function () { });
    consume.getFansList(novelID, ShowFansList, function () { });
    //comment.getCommentInfo(novelID, ShowCommentInfo, function () { });
    //comment.getCommentList(novelID, 0, 5, "long", 200, "addtime", ShowLongCommentList, function () { });
    //comment.getCommentList(novelID, 0, 5, "long", 200, "usenum", ShowLongCommentHotList, function () { });
}

function bindEvents() {
    //点赞
    $("#BasicOperation a:eq(1)").click(function () {
        if (!CheckLogin())
            return;
        $.ajax({
            type: 'get',
            url: '/ajax/ashx/AddStick.ashx',
            data: { stick: 1, nid: novelID },
            dataType: 'text',
            cache: false,
            success: function (info) {
                var infoList = info.split(',');
                if (infoList[0] == -2)
                    alert("您需要先登录才能执行该操作.");
                else if (infoList[0] == -1)
                    alert("提交的参数有误,请刷新後重新提交.");
                else if (infoList[0] == -3)
                    alert('您的当前登陆帐户积分太低,您需要至少积分5才能执行"喜欢"操作.');
                else if (infoList[0] == 0)
                    alert('您在本周已经"喜欢"过该作品了,您要等下周才能重新执行该操作.');
                else {
                    alert("提交成功!");
                    $(this).html(infoList[1]);
                }
            },
            error: function (result, status) {
                alert("网络故障,数据载入出错.");
            }
        });
    });

    //收藏
    $("#BasicOperation a:eq(2)").click(function () {
        if (!CheckLogin())
            return;
        var eid = novelID;
        var ptype = 2;
        $.ajax({
            url: 'https://p.sfacg.com/APP/API/BookSheet.ashx?op=getlistJ',
            data: { pocketType: ptype },
            dataType: 'jsonp',
            jsonp: "callback",
            success: function (json) {
                if (json.status == 200) { //成功返回
                    if (json.booksheets.length == 0)//新火袋
                        $("#addCollection div.options-item:eq(1)").click();
                    else $("#addCollection div.options-item:eq(0)").click();
                    CallWindow("addCollection");
                    var options = "";
                    for (var i = 0; i < json.booksheets.length; i++)
                        options += '<li><span class="text" value=' + json.booksheets[i].id + '>' + decodeURIComponent(json.booksheets[i].name) + '</span></li>';
                    $("#addCollection ul.select-more").html(options);
                    $("#addCollection ul.select-more span:eq(0)").click();

                    $("#addCollection .btn").unbind("click").click(function () {
                        if ($("#addCollection div.options-item:eq(0)").hasClass("selected")) //添加到已有火袋
                        {
                            console.log($("#addCollection div.select-item span.default .text").val());
                            $.ajax({
                                url: 'https://p.sfacg.com/APP/API/BookSheet.ashx?op=addbookJ',
                                data: { bookid: eid, typeid: $("#addCollection div.select-item span.default .text").val(), pocketType: ptype },
                                dataType: 'jsonp',
                                jsonp: "callback",
                                success: function (json) {
                                    if (json.status == 200) { //成功返回火袋
                                        alert("已收藏作品到火袋");
                                        CloseWindow("addCollection");
                                    }
                                    else {
                                        alert(json.msg);
                                    }
                                },
                                error: function (result, status) {
                                    alert("网络故障,数据载入出错.");
                                }
                            });
                        }
                        else //添加到新火袋
                        {
                            if ($("#addCollection .normal-input").val().length == 0 || $("#addCollection .normal-input").val().length > 30) {
                                alert("火袋名称必须为1-30个字符之间");
                                return;
                            }
                            $.ajax({
                                url: 'https://p.sfacg.com/APP/API/BookSheet.ashx?op=addJ',
                                data: { name: encodeURIComponent($("#addCollection .normal-input").val()), desc: encodeURIComponent($("#addCollection .normal-input").val()), pocketType: ptype },
                                dataType: 'jsonp',
                                jsonp: "callback",
                                success: function (json) {
                                    if (json.status == 200) { //成功返回火袋
                                        //添加内容到火袋
                                        $.ajax({
                                            url: 'https://p.sfacg.com/APP/API/BookSheet.ashx?op=addbookJ',
                                            data: { bookid: eid, typeid: json.typeid, pocketType: ptype },
                                            dataType: 'jsonp',
                                            jsonp: "callback",
                                            success: function (json) {
                                                if (json.status == 200) { //成功返回火袋
                                                    alert("已收藏作品到火袋");
                                                    CloseWindow("addCollection");
                                                }
                                                else {
                                                    alert(json.msg);
                                                }
                                            },
                                            error: function (result, status) {
                                                alert("网络故障,数据载入出错.");
                                            }
                                        });
                                    }
                                    else {
                                        alert(json.msg);
                                    }
                                },
                                error: function (result, status) {
                                    alert("网络故障,数据载入出错.");
                                }
                            });
                        }
                    });
                }
                else {
                    alert(json.msg);
                }
            },
            error: function (result, status) {
                alert("提交出错,请刷新后重试");
            }
        });
    });

    //分享
    $("#BasicOperation a:eq(3)").click(function () {
        CallWindow("shareBox");
    });

    //举报
    $("#BasicOperation a:eq(4)").click(function () {
        CallWindow("feedbackBox");
        $("#feedbackBox ul.select-more span:eq(0)").click();
        $("#feedbackBox .btn").unbind("click").click(function () {
            if ($("#feedbackBox textarea").val() == "") {
                alert("请填写反馈内容");
                return;
            }
            $.ajax({
                type: 'post',
                url: '/ajax/ashx/AddFeedBack.ashx',
                data: { feedback: $("#feedbackBox .normal-input").val() + "<br/>" + $("#feedbackBox textarea").val(), feedtype: $("#feedbackBox div.select-item span.default .text").val() },
                dataType: 'text',
                cache: false,
                success: function (info) {
                    alert(info);
                    CloseWindow("feedbackBox");
                },
                error: function (result, status) {
                    alert("提交出错,请刷新后重试");
                }
            });
        });
    });

    //印象
    var tagList = 0;
    $("a.icn_add").click(function () {
        if (!CheckLogin())
            return;
        var usualTag = "";
        if (tagList == 0) {
            $.ajax({
                type: 'get',
                url: '/ajax/ashx/GetTags.ashx',
                data: { nid: novelID },
                dataType: 'json',
                cache: false,
                success: function (json) {
                    tagList = json;
                    for (var i = 0; i < tagList.length; i++)
                        usualTag += '<dd class="dd"><span class="icn">&#xe909;</span><span class="text">' + tagList[i].TagName + '</span></dd>';
                    $("#popularTag span").html(usualTag);
                },
                error: function (result, status) {
                }
            });
        }
        else {
            for (var i = 0; i < tagList.length; i++)
                usualTag += '<dd class="dd"><span class="icn">&#xe909;</span><span class="text">' + tagList[i].TagName + '</span></dd>';
            $("#popularTag span").html(usualTag);
        }
        CallWindow("moreTagBox");
        $("#moreTagBox .btn").unbind("click").click(function () {
            var inputTag = "";
            for (var i = 0; i < $("div.define-tag").length; i++) {
                inputTag += $("div.define-tag:eq(" + i + ") .text").text() + " ";
            }
            if (inputTag == "")
                inputTag = $(".tag-input").text();
            if (inputTag == "") {
                alert("未填写印象");
                return;
            }
            console.log(inputTag);
            $.ajax({
                type: 'post',
                url: '/ajax/ashx/UpdateTags.ashx',
                data: { nid: novelID, tags: inputTag },
                dataType: 'text',
                cache: false,
                success: function (info) {
                    if (info == "1") {
                        alert("添加成功!");
                        CloseWindow("moreTagBox");
                    }
                    else if (info == "2") {
                        alert("单个印象不能超过6个字符!");
                    }
                    else if (info == "3") {
                        alert("印象只能为中文,英文字母或者数字");
                    }
                    else alert("返回数据出错,请刷新页面后重试!");
                },
                error: function (result, status) {
                    alert("连接服务器出错,请刷新页面后重试!");
                }
            });
        });
    });

    //月票
    $("a[action='voteTicket']").click(function () {
        if (!CheckLogin())
            return;
        $.ajax({
            type: 'get',
            url: '/ajax/ashx/GetTicketNum.ashx',
            data: null,
            dataType: 'text',
            cache: false,
            success: function (info) {
                $("#monthTicketBox .red").text(info);
            },
            error: function (result, status) {
            }
        });
        CallWindow("monthTicketBox");
        console.log("t="+$("#monthTicketBox .selected").attr("value"));
        $("#monthTicketBox .btn").unbind("click").click(function () {
            if ($("#monthTicketBox textarea").val() == "") {
                alert("请填写简短评论");
                return;
            }
            if ($("#monthTicketBox textarea").val().length > 140) {
                alert("简短评论请勿超过140字");
                return;
            }
            consume.addTicket(novelID, $("#monthTicketBox textarea").val(), $("#monthTicketBox .selected").attr("value"),
                function () { alert("月票提交成功!感谢您对本作品的支持"); CloseWindow("monthTicketBox"); }, function (msg) { alert(msg) });
        });
    });

    //月票说明
    $("#TicketTab div.btn-area a:eq(2)").click(function () {
        CallWindow("howGetTickect");
    });

    //打赏
    $("a[action='addBonus']").click(function () {
        //打开打赏界面
        consume.getFireMoney(function (money) { $("#rewardBox .red").html(money); CallWindow("rewardBox"); }, null);
        //提交打赏
        $("#rewardBox .btn").unbind("click").click(function () {
            console.log($("#rewardBox .selected").attr("value"));
            if (parseInt($("#rewardBox .red").html()) < parseInt($("#rewardBox .selected").attr("value")))
                consume.redirectPay("账号余额不足,是否前去充值?");
            else consume.rewardNovel(novelID, $("#rewardBox .selected").attr("value"), $("#rewardBox textarea").val(),
                function () { CloseWindow("rewardBox"); consume.getBonusInfo(novelID, ShowBonusInfo, function () { }); }, function (msg) { alert(msg); });
        });
    });

    //投票
    $("#VoteTab .btn").click(function () {
        var oids = "";
        if ($("#VoteTab div.sub-tab-item:eq(0) .checkbox-item").length > 0) {
            for (var i = 0; i < $("#VoteTab div.sub-tab-item:eq(0) .checkbox-item").length; i++)
                if ($("#VoteTab div.sub-tab-item:eq(0) .checkbox-item").eq(i).hasClass("checked"))
                    oids += i + ",";
        }
        else {
            for (var i = 0; i < $("#VoteTab div.sub-tab-item:eq(0) .options-item").length; i++)
                if ($("#VoteTab div.sub-tab-item:eq(0) .options-item").eq(i).hasClass("selected"))
                    oids += i + ",";
        }
            if (oids == "") {
                alert("请勾选投票选项.");
                return;
            }
        $.ajax({
            type: 'post',
            url: '/Ajax/ashx/VoteTicket.ashx',
            data: { vid: $(".votes-title").attr("voteId"), oids: oids },
            dataType: 'text',
            cache: false,
            success: function (info) {
                if (info == 0)
                    alert("投票成功!感谢您参与调查.");
                else if (info == 1)
                    alert("您已经投过票了.");
                else if (info == 2)
                    alert("该调查已经截止,不能继续投票.");
            },
            error: function (result, status) {
                alert("投票过程中出现未知错误,请刷新后重试.");
            }
        });
    });

    //评论
    bindCommentEvents();
}


function bindCommentEvents() {
    var mutex = true;
    $("#Body").focus(function () {
        CheckLogin();
    });

    $("#Body").keyup(function () {
        $("#commentWords").html($("#Body").val().length);
    });

    $(document).on("scroll", function () {
        if (dataLoad.scmt)
            return;
        else {
            var distance = $("#ShorCommentTab").offset().top - $(window).height() - $(document).scrollTop();
            if (distance < 0) {
                dataLoad.scmt = true;
                comment.getCommentInfo(novelID, ShowCommentInfo, function () { });
            }
        }
        //if ($(document).height() - $(this).scrollTop() - $(window).height() < 500) {
        //    if (mutex == 1)
        //        GetList(++page);
        //}
    });

    //发表评论
    $("#btAddComment").click(function () {
        if ($("#Body").val() == "") {
            alert("评论内容不能为空!");
            return;
        }
        if ($("#Body").val().length > 140) {
            alert("评论内容不能超过140字");
            return;
        }
        comment.addComment(novelID, 0, $("#Body").val(), function (json) {
            var cDate = new Date();
            var dateStr = cDate.getFullYear() + '-' + cDate.getMonth() + '-' + cDate.getDate() + ' ' + cDate.toLocaleTimeString();
            var cmtStr = '<div class="comment-item"><div class="user-mask fl"></div><div class="comment-main"><div class="link-area">'
        + '<a href="javscript:" class="link">你</a><a href="" class="link"></a>'
        + '<a href="" class="reply-btn">回复</a>'
        + '</div><div class="comment-date"><span class="date">' + dateStr + '</span>'
        + '</div><p class="comment-text">' + EmotionDecode($("#Body").val()) + '</p></div></div>';
            $("#ShortCmtList").prepend(cmtStr);
            alert("评论成功!");
            $("#Body").val("");
        }, function (msg) { alert(msg) }, function () { });
    });

    //回复
    $(document).on("click", "#ShortCmtList a.reply-btn", function () {
        $(".short-comment-reply").remove();
        var commentItem = $(this).parent().parent();
        var uname = '@'+commentItem.find("a.link:eq(0)").html()+":";
        commentItem.find(".comment-text:eq(0)").after('<div class="short-comment-reply"><textarea class="short-textarea">' + uname + '</textarea>'
                                         + '<div class="submit-area"><a href="javascript:" class="btn yellow">提交</a><a href="javascript:" class="link">取消关闭</a>'
                                         + '<span class="text">还可以输入<i class="yellow">' + (140 - uname.length) + '</i>个字</span></div></div>');
        $(".short-comment-reply a.link").click(function () {
            $(".short-comment-reply").remove();
        });
        $(".short-comment-reply").unbind("focus").focus(function () {
            CheckLogin();
        });
        $(".short-comment-reply textarea").unbind("keyup").keyup(function () {
            var left = 140 - $(".short-comment-reply textarea").val().length;
            if (left >= 0)
                $(".short-comment-reply i.yellow").html(left);
        });
        $(".short-comment-reply .btn").unbind("click").click(function () {
            var commentItem = $(this).parents("div.comment-item");
            if ($(".short-comment-reply textarea").val() == "") {
                alert("回复内容不能为空!");
                return;
            }
            if ($(".short-comment-reply textarea").val().length > 140) {
                alert("回复内容不能超过140字");
                return;
            }
            comment.addComment(novelID, commentItem.attr("cid"),
                $(".short-comment-reply textarea").val(), function (json) {
                    var cDate = new Date();
                    var dateStr = cDate.getFullYear() + '-' + cDate.getMonth() + '-' + cDate.getDate() + ' ' + cDate.toLocaleTimeString();
                    var replyItem = '<div class="short-comment-item"><div class="short-comment-hd link-area">'
                                  + '<a href="javascript:" class="link">你</a><span class="date">'
                                  + dateStr + '</span></div><p class="comment-text">' + $(".short-comment-reply textarea").val() + '</p></div>';
                    if (commentItem.find(".short-comment").length > 0) {
                        commentItem.find(".short-comment").prepend(replyItem);
                    }
                    else {
                        commentItem.find('.comment-main').append('<div class="short-comment">' + replyItem + '</div>');
                    }
                    $(".short-comment-reply").remove();
                }, function (msg) { alert(msg); },
                function () { });
        });
    });
}

//评分
function initialPointZone(novelID) {
    $("#starZoneOut").studyplay_star({ MaxStar: 10, CurrentStar: 0, Enabled: true, Index: 1 }, function (value) {
        starValue = value;
        if (CheckLogin()) {
            //评分
            $.ajax({
                type: 'get',
                url: '/ajax/ashx/AddPoint.ashx',
                data: { nid: novelID, point: starValue },
                dataType: 'text',
                cache: false,
                success: function (info) {
                    if (info == "0") {
                        alert("请登录再执行该操作!");
                    }
                    else {
                        alert("感谢您的评分!");
                    }
                },
                error: function (result, status) {
                    alert("评分连接服务器出错,请刷新页面后重试!");
                }
            });
        }
    });
    $.ajax({
        type: 'get',
        url: '/ajax/ashx/GetNovelPointSet.ashx',
        data: { nid: novelID },
        dataType: 'json',
        cache: false,
        success: function (json) {
            var starTd = $(".item-inner");
            for (i = 0; i < 10 && i < json.length; i++) {
                //starTd.eq(i).html("<small>" + json[i].rate + '%</small><span style="height:' + (60 * json[i].rate) / 100 + 'px;"></span><small>' + json[i].point + "</small>");
                starTd.eq(i).html('<div class="count">' + json[i].rate + '%</div><div class="fill" style="height: ' + json[i].rate + 'px;"></div><div class="order">' + (i + 1) + '</div>');
            }
        },
        error: function (result, status) {
        }
    });
}

//月票信息
function ShowTicketInfo(json) {
    $("#TicketTab div.text span").html("《" + json.tickets.NovelName + "》 本月月票：" + json.tickets.TicketNum + "张 | 本月排名：" + json.tickets.Rank + "名");
    if (json.tickets.TicketNum > 0) {
        $("#TicketTab div.left-part span.highlight").html("月票" + json.tickets.TicketNum);
        $("#noTicket").hide();
        $("#hasTicket").show();
        var tcrank = "";
        var novelNum = 0;
        for (var i = 0; i < json.tickets.NovelSet.length; i++) {
            var t = json.tickets.TicketNum - json.tickets.NovelSet[i].TicketNum;
            if (json.tickets.NovelSet[i].NovelID != novelID) {
                if (novelNum++ >= 2)
                    break;
                if (tcrank == "")
                    tcrank += '<div class="figure top-figure">';
                else tcrank += '<div class="figure">';
                tcrank += '<div class="pic"><a href="/Novel/' + json.tickets.NovelSet[i].NovelID
                        + '/"><img src="http://rs.sfacg.com/web/novel/images/NovelCover/Big/' + json.tickets.NovelSet[i].Cover
                        + '" class="block-img" alt=""></a></div><div class="content"><h4 class="book-title">'
                        + json.tickets.NovelSet[i].NovelName + '</h4><p class="summary small-profiles">'
                        + json.tickets.NovelSet[i].Intro + '...</p>'
                        + '<div class="bottom-row"><span class="highlight">月票' + json.tickets.NovelSet[i].TicketNum
                        + '</span><span>' + (t > 0 ? ' 落后本书' + t : ' 领先本书' + (-t)) + '票</span></div></div></div>';
            }
        }
        $("#TicketTab div.right-part").html(tcrank);
        var tclog = '';
        for (var i = 1; i <= json.tickets.VoteLogs.length; i++) {
            if (i % 2 != 0)
                tclog += '<li class="item"><div class="horn-row fl"><span class="icn"></span><span class="text">'
                     + '<i>' + json.tickets.VoteLogs[i - 1].NickName + '投了' + json.tickets.VoteLogs[i - 1].VoteNum + '票</i></span><i class="date">'
                     + json.tickets.VoteLogs[i - 1].VoteTime + '</i></div>';
            else tclog += '<div class="horn-row fr"><span class="icn"></span><span class="text">'
                     + '<i>' + json.tickets.VoteLogs[i - 1].NickName + '投了' + json.tickets.VoteLogs[i - 1].VoteNum + '票</i></span><i class="date">'
                     + json.tickets.VoteLogs[i - 1].VoteTime + '</i></div></li>';
        }
        $("#TicketTab ul.reward-list").html(tclog);
    }
    else {
        $("#noTicket").show();
        $("#hasTicket").hide();
    }
}

//打赏信息
function ShowBonusInfo(json) {
    bonusLoaded = true;
    if (json.bonus.TopOfferUser)
        $("#BonusTab div.text:eq(0)").html("《" + json.bonus.NovelName + "》 本月累计被打赏 " + json.bonus.OfferTimes + "次 | 本站排名：第" + json.bonus.Rank + "名 | "
            + json.bonus.TopOfferUser + " 赏 " + json.bonus.TopOffer + " 火券（单次最高）");
    else $("#BonusTab div.text:eq(0)").html("《" + json.bonus.NovelName + "》 本月累计被打赏 " + json.bonus.OfferTimes + "次 | 本站排名：第" + json.bonus.Rank + "名");
    if (json.bonus.OfferTimes > 0) {
        $("#noBonus").hide();
        $("#hasBonus").show();
        var brank = "";
        for (var i = 0; i < json.bonus.Customs.length; i++) {
            brank += '<li class="item"><div class="author-mask"><a href="http://p.sfacg.com/u/'
            + json.bonus.Customs[i].UserName + '" target="_blank"><img src="' + json.bonus.Customs[i].Avatar
            + '" alt="" class="block-img"></a></div><div class="item-content"><div class="book-title">' + json.bonus.Customs[i].NickName
            + '</div><div class="text">累计打赏：' + json.bonus.Customs[i].TotalOffer + '火券</div><div class="text">粉丝值：'
            + json.bonus.Customs[i].FansPoint + '</div></div><!-- 角标 --><div class="icn-corner">' + (i + 1) + '</div></li>';
        }
        $("#BonusTab ul.reward-top-list").html(brank);
        var blog = "";
        for (var i = 1; i <= json.bonus.VoteLogs.length; i++) {
            if (i % 2 != 0)
                blog += '<li class="item"><div class="horn-row fl"><span class="icn"></span><span class="text">'
                     + '<i>' + json.bonus.VoteLogs[i - 1].NickName + '打赏了' + json.bonus.VoteLogs[i - 1].VoteNum + '火券</i></span><i class="date">'
                     + json.bonus.VoteLogs[i-1].VoteTime + '</i></div>';
            else blog += '<div class="horn-row fr"><span class="icn"></span><span class="text">'
                     + '<i>' + json.bonus.VoteLogs[i - 1].NickName + '打赏了' + json.bonus.VoteLogs[i - 1].VoteNum + '火券</i></span><i class="date">'
                     + json.bonus.VoteLogs[i-1].VoteTime + '</i></div></li>';
        }
        $("#BonusTab ul.reward-list").html(blog);
    }
    else {
        $("#noBonus").show();
        $("#hasBonus").hide();
    }
}

//投票信息
function ShowVoteInfo(json) {
    if (json.status == 200) {//有投票
        $(".votes-title").attr("voteId", json.data.VoteID);
        $(".votes-title span:eq(0)").html(json.data.VoteTitle);
        $(".votes-title span:eq(1)").html("(本次投票截止：" + json.data.EndnTime + ")");
        $("#VoteNovel span").html("（已投票" + json.data.VoteNum + "人）");
        if (!json.data.IsMultiCheck)
            $("#voteOptions").removeClass("votes-multiple-box").addClass("votes-radios-box options-row");
        var optionsLeft = "";
        var optionsRight = "";
        for (var i = 0; i < json.data.Options.length; i++) {
            if (json.data.IsMultiCheck)
                optionsLeft += '<dl class="checkbox-item blic"><dt class="option"><span class="icn">&#xe116;</span>'
                           + '</dt><dd class="text">' + json.data.Options[i].OptionTitle + '</dd></dl>';            else optionsLeft += '<div class="options-item"><span class="icn_sprite icn_select"></span><span class="text">'
                           + json.data.Options[i].OptionTitle + '</span></div>';            optionsRight += '<div class="votes-box-row"><div class="hot-votes-progress"><div class="progress" style="width: ' + json.data.Options[i].Percent
                         + '%"></div></div><span class="hot-votes-count">' + json.data.Options[i].VoteNum + '票</span></div>';
        }
        $("#VoteTab div.votes-box-left").html(optionsLeft);
        $("#VoteTab div.votes-box-right").html(optionsRight);
        if (json.data.IsMultiCheck)
            $(".checkbox-item").checkbox();
        else $(".options-row").radio();
        $(".scroll-box").scrollBar();

    }
    else {
        $("#VoteTab div.sub-tab-item:eq(0)").html("当前暂无投票");
    }
}

//历史投票信息
function ShowHistoryVoteInfo(json) {
    if (json.status == 200) {//有投票
        var voteList = "";
        for (var i = 0; i < json.data.length; i++) {
            voteList += i == 0 ? '<div class="votes-box first">' : '<div class="votes-box">';
            voteList += '<div class="box-hd"><span class="text">'
                    + json.data[i].VoteTitle + '</span><span class="date">结束时间：'
                    + json.data[i].EndnTime + '</span></div><div class="box-bd"><div class="checkbox-area">';
            for (var j = 0; j < json.data[i].Options.length; j++) {
                voteList += '<dl class="checkbox-item disable checked block">'
                         + '<dt class="option"><span class="icn">&#xe116;</span></dt><dd class="text">'
                         + json.data[i].Options[j].OptionTitle + '</dd></dl>';
            }
            voteList += '</div><div class="btn-area"><a href="" class="btn yellow">查看结果</a></div></div></div>';
        }
        $("#VoteTab div.scroll-content:eq(1)").html(voteList);
    }
    else {
        $("#VoteTab div.sub-tab-item:eq(1)").html("暂无历史投票");
    }
}

//粉丝榜
function ShowFansList(json){
    var fList = "";
    if (json.status == 200) {
        for (i = 0; i < json.fansList.length; i++) {
            if (json.fansList[i].Avatar == "")
                fList += '<li class="fans-list"><i class="num">' + (i + 1).padLeft(2) + '</i><a href="http://p.sfacg.com/u/'
                     + json.fansList[i].UserName + '" class="text">' + json.fansList[i].NickName + '</a><span class="fans-count">'
                     + json.fansList[i].LevelName + '</span></li>';
            else fList += '<li class="top-author clearfix"><div class="mask"><a href="http://p.sfacg.com/u/'
                     + json.fansList[i].UserName + '"><img src="' + json.fansList[i].Avatar + '" class="block-img" alt=""></a></div>'
                     + '<div class="content"><p class="nickname-1">' + json.fansList[i].NickName + '<i class="vip vip' + json.fansList[i].VipLevel + '"></i></p>'
                     + '<p class="desc-1">粉丝值：' + json.fansList[i].FansPoint + '</p>'
                     + '<p class="desc-1">粉丝头衔：' + json.fansList[i].LevelName + '</p></div></li>';
        }
    }
    else {
        fList = "载入列表失败";
    }
    $("#FansList").html(fList);
}

//评论
function ShowCommentInfo(json) {
    $("#CommentNum div:eq(0)").html("简评（" + json.ShortCommentNum + "）");
    $("#CommentNum div:eq(1)").html("书评（" + json.LongCommentNum + "）");
    var shorCmt = "";
    for (var i = 0; i < json.ShortComments.length; i++) {
        shorCmt += '<div class="comment-item" cid=' + json.ShortComments[i].CommentID + '><div class="user-mask fl"><img src="'
                + json.ShortComments[i].Avatar + '" alt="" class="block-img"></div><div class="comment-main"><div class="link-area">'
                + '<a href="javscript:" class="link">' + json.ShortComments[i].DisplayName + '</a><span style="color:#FF33cc;margin-right: 10px;">'
                + json.ShortComments[i].RoleName + '</span>' + (json.ShortComments[i].IsStick ? '<a href="javascript:" class="link yellow">置顶</a>' : "")
                + (json.ShortComments[i].VipLevel > 0 ? '<img style="vertical-align:-2px;" src="http://rs.sfacg.com/web/novel/images/images/vip' + json.ShortComments[i].VipLevel
                + '.gif" title="VIP等级' + json.ShortComments[i].VipLevel + '用户">' : '') + '<a href="javascript:" class="reply-btn">回复</a>'
                + '</div><div class="comment-date"><span class="date">' + json.ShortComments[i].CreateTime + '</span>'
                + '</div><p class="comment-text">' + EmotionDecode(json.ShortComments[i].Content) + '</p></div></div>';
    }
    $("#ShortCmtList").html(shorCmt);
    //load reply
    for (var i = 0; i < json.ShortComments.length; i++) {
        if (json.ShortComments[i].ReplyNum > 0) {
            comment.getReplyList(json.ShortComments[i].CommentID, 0, 3, "desc", function (json) {
                var replyItem = '<div class="short-comment">';
                var cid = 0;
                for (var j = 0; j < json.Replys.length; j++) {
                    cid = json.Replys[j].CommentID;
                    replyItem += '<div class="short-comment-item"><div class="short-comment-hd link-area"><a href="javascript:" class="link">'
                              + json.Replys[j].DisplayName + '</a><span class="date">' + json.Replys[j].CreateTime + '</span><span style="color:#FF33cc;margin-right: 10px;">'
                              + json.Replys[j].RoleName + '</span>'+(json.Replys[j].VipLevel>0?'<img style="vertical-align:-2px;" src="http://rs.sfacg.com/web/novel/images/images/vip' + json.Replys[j].VipLevel
                              + '.gif" title="VIP等级' + json.Replys[j].VipLevel + '用户">':'')
                              + '<a href="javascript:" class="reply-btn">回复</a></div><p class="comment-text">'
                              + EmotionDecode(json.Replys[j].Content) + '</p></div>';
                }
                replyItem += '<div class="all-replay"><a href="/cmt/' + cid + '/" class="link">查看所有回复(' + json.ReplyNum
                          + ')</a></div>';
                replyItem += '</div>';
                $("div[cid=" + cid + "] .comment-main").append(replyItem);
            }, function (msg) { }, function () { });
        }
    };
}

//长评列表
function ShowLongCommentList(json) {
    var longCmt = "";
    for (var i = 0; i < json.Cmts.length; i++) {
        longCmt += '<div class="comment-item"><div class="user-mask fl"><img src="' + json.Cmts[i].Avatar
        + '" alt="" class="block-img"></div><div class="comment-main"><div class="comment-title"><a href="/cmt/'+json.Cmts[i].CommentID+'" class="text">'
        + json.Cmts[i].Title + '</a><span class="date fr">' + json.Cmts[i].CreateTime + '</span>'
        + '</div><div class="comment-date"><a href="" class="link">' + json.Cmts[i].DisplayName
        + '</a><div class="starlist"><div class="icn-bottom"><span class="icn"></span><span class="icn"></span>'
        + '<span class="icn"></span><span class="icn"></span><span class="icn"></span><span class="icn"></span><span class="icn"></span><span class="icn"></span>'
        + '</div><div class="icn-top" style="width: ' + json.Cmts[i].Point + '0%;"><span class="icn"></span><span class="icn"></span>'
        + '<span class="icn"></span>,<span class="icn"></span><span class="icn"></span><span class="icn"></span><span class="icn"></span><span class="icn"></span>'
        + '<span class="icn"></span><span class="icn"></span><span class="icn"></span></div></div></div>'
        + '<a  href="/cmt/'+json.Cmts[i].CommentID+'/"  class="comment-text">' + json.Cmts[i].Content + '</a><div class="comment-bottom clearfix"><div class="fr">'
        + '<a href="javascript:void(0);" class="good"><span class="icn">&#xe9a9;</span><span>' + json.Cmts[i].UsefulNum + '</span></a><span class="blue">回应('
        + json.Cmts[i].ReplyNum + ')</span></div></div></div></div>';
    }
    $("#LongComment div.comment-wall:eq(0)").html(longCmt);
}

function ShowLongCommentHotList(json) {
    var longCmt = "";
    for (var i = 0; i < json.Cmts.length; i++) {
        longCmt += '<div class="comment-item"><div class="user-mask fl"><img src="' + json.Cmts[i].Avatar
        + '" alt="" class="block-img"></div><div class="comment-main"><div class="comment-title"><a href="/cmt/'+json.Cmts[i].CommentID+'" class="text">'
        + json.Cmts[i].Title + '</a><span class="date fr">' + json.Cmts[i].CreateTime + '</span>'
        + '</div><div class="comment-date"><a href="" class="link">' + json.Cmts[i].DisplayName
        + '</a><div class="starlist"><div class="icn-bottom"><span class="icn"></span><span class="icn"></span>'
        + '<span class="icn"></span><span class="icn"></span><span class="icn"></span><span class="icn"></span><span class="icn"></span><span class="icn"></span>'
        + '</div><div class="icn-top" style="width: ' + json.Cmts[i].Point + '0%;"><span class="icn"></span><span class="icn"></span>'
        + '<span class="icn"></span>,<span class="icn"></span><span class="icn"></span><span class="icn"></span><span class="icn"></span><span class="icn"></span>'
        + '<span class="icn"></span><span class="icn"></span><span class="icn"></span></div></div></div>'
        + '<a  href="/cmt/'+json.Cmts[i].CommentID+'/"  class="comment-text">' + json.Cmts[i].Content + '</a><div class="comment-bottom clearfix"><div class="fr">'
        + '<a href="javascript:void(0);" class="good"><span class="icn">&#xe9a9;</span><span>' + json.Cmts[i].UsefulNum + '</span></a><span class="blue">回应('
        + json.Cmts[i].ReplyNum + ')</span></div></div></div></div>';
    }
    $("#LongComment div.comment-wall:eq(1)").html(longCmt);
}

function CheckLogin() {
    if (isLogin == "true")
        return true;
    else//未登录弹出登陆框
    {
        InitalSlipBar();
        CallWindow("loginBox");
        $("#loginBox .login-btn").unbind("click").click(function () {
            $("#LoginErr").hide();
            $("#EmptyName").hide();
            $("#EmptyPassword").hide();
            if ($("div.login-box .normal-input:eq(0)").val() == "") {
                $("#EmptyName").show();
                return;
            }
            if ($("div.login-box .normal-input:eq(1)").val() == "") {
                $("#EmptyPassword").show();
                return;
            }
            $.ajax({
                url: 'https://passport.sfacg.com/Ajax/QuickLoginCross.ashx',
                data: {
                    name: $("div.login-box .normal-input:eq(0)").val(), password: $("div.login-box .normal-input:eq(1)").val(),
                    session: valicodeInfo.csessionid, sig: valicodeInfo.sig, token: valicodeInfo.nc_token, scene: valicodeInfo.nc_scene,
                    al: $("#loginBox .checkbox-item").hasClass("checked")
                },
                dataType: 'jsonp',
                jsonp: "callback",
                success: function (json) {
                    console.log(json);
                    isLogin = json[0].login;
                    if (json[0].login == "false") //用户未登录
                    {
                        $("#LoginErr").html(json[0].msg);
                        $("#LoginErr").show();
                    }
                    else {
                        CloseWindow("loginBox");
                        LoginUserInfo();
                    }
                },
                error: function (result, status) {
                    console.log(result);
                    console.log(result);
                }
            });
        });
        return false;
    }
}
Number.prototype.padLeft = function (n, str) {
    return Array(n - String(this).length + 1).join(str || '0') + this;
}
$('#loading').ajaxStart(function () {
    $(this).show();
}).ajaxStop(function () {
    $(this).hide();
});

function CallWindow(windowsID) {
    $('<div class="ui-widget-overlay" style="height:' + $(document).height() + 'px"></div>').insertBefore("#" + windowsID);
    $("#" + windowsID).fadeIn();
    $("#" + windowsID + " a.close-btn:eq(0)").unbind("click").click(function () {
        CloseWindow(windowsID);
    });
}
//关闭窗口
function CloseWindow(windowsID) {
    $("#" + windowsID).prev().remove();
    $("#" + windowsID).fadeOut();
}
function EmotionDecode(body) {
    emoreg = /\[em\:sfgirl\:(\d+)\]/g;
    return body.replace(emoreg, "<img src=http://rs.sfacg.com/web/novel/images/images/emotion/sfgirl/$1.png />");
}

function ShowEmotion() {
    $("span[id='short_comment_content']").each(function () {

        $(this).html(EmotionDecode($(this).html()));
    });
}

function InitalSlipBar() {
    var nc = new noCaptcha();
    var nc_appkey = 'FFFF00000000016C7013';  // 应用标识,不可更改
    var nc_scene = 'login';  //场景,不可更改
    var nc_token = [nc_appkey, (new Date()).getTime(), Math.random()].join(':');
    var nc_option = {
        renderTo: '#slipBar',//渲染到该DOM ID指定的Div位置
        appkey: nc_appkey,
        scene: nc_scene,
        token: nc_token,
        callback: function (data) {// 校验成功回调
            valicodeInfo.csessionid = data.csessionid;
            valicodeInfo.sig = data.sig;
            valicodeInfo.nc_token = nc_token;
            valicodeInfo.nc_scene = nc_scene;
        }
    };
    nc.init(nc_option);
}