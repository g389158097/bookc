var protocol = document.location.protocol;
$(document).ready(function () {
    /*顶部导航栏下拉*/
    $(".slide-down").hover(function(){
      $(this).find(".slide-content").stop().slideDown(300)
      $(this).addClass("active");
    }, function(){
      var $this= $(this);
      $(this).find(".slide-content").stop().slideUp(300,function(){
        $this.removeClass("active");
      })
    });

    //搜索框获得焦点显示热门搜索
    ;(function(){
      var searchArea= $("#searchArea"),
          searchInput= searchArea.find(".search-input"),
          searchHots= searchArea.find(".search-hots"),
          searchBtn= searchArea.find(".search-btn");

        searchInput.on("focus", function () {
        searchHots.show();
      }).on("input", function (evt) {
          var keys = "";
          var tid = "";
          if ($(this).val().length > 0) {
              $.ajax({
                  type: 'post',
                  url: '/ajax/ashx/GetRelateWord.ashx?t=1',
                  data: { keyword: $(this).val() },
                  dataType: 'json',
                  cache: false,
                  success: function (json) {
                      if (json&&json.length > 0) { //正确返回
                          for (var i = 0; i < json.length; i++) {
                              keys += "<li><a href=\"" + json[i].url + "\">" + json[i].title.replace("<span>", "<span class=\"highlight\">") + "</a></li>";

                              $(".hots-list").html(keys);
                          }
                      }
                  },
                  error: function (result, status) {
                  }
              });
          }
      });;

      $(document).bind('mousedown', function (event) {
          var $target = $(event.target);
          if ((!($target.parents().andSelf().is('.search-hots'))) && (!$target.is(searchInput))) {
              searchHots.hide();
          }
      })
      //在这里写搜索的事件
      searchBtn.on("click", function () { location.href = "http://s.sfacg.com/?Key=" + encodeURIComponent(searchInput.val()) + "&S=1&SS=0"; });

      searchInput.on("keydown", function (evt) {
          evt = evt ? evt : (window.event ? window.event : null);
          if (evt.keyCode == 13 && searchInput.is(":focus"))
              location.href = "http://s.sfacg.com/?Key=" + encodeURIComponent(searchInput.val()) + "&S=1&SS=0";
      });
    })();
    LoginUserInfo();
});
var isLogin = false;
function LoginUserInfo() {
    $.ajax({
        url: protocol + '//passport.sfacg.com/Ajax/GetLoginInfo.ashx',
        dataType: 'jsonp',
        jsonp: "callback",
        success: function (json) {
            isLogin = json[0].login;
            if (json[0].login == "false") {
                $(".normal-link").html('您好，SF游客　<a href="http://passport.sfacg.com/Register.aspx">注册</a>　<a href="http://passport.sfacg.com/Login.aspx">登录</a></li>');
            }
            else {
                $(".user-mask img:eq(0)").attr("src", json[0].avatar);
                $(".normal-link").html('<a href="//passport.sfacg.com/">个人中心</a><a href="http://p.sfacg.com/u/' +
            json[0].name + '">火袋</a><a href="http://i.sfacg.com/MyNovel/">我的SF</a>');
            }
        },
        error: function (result, status) {
        }
    });
}