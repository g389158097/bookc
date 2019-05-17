/**
 * carousel 轮播图
 */
//幻灯片

function Flash(json){
  this.oListContainer = json.listContainer || null;  //轮播图容器
  this.oListItem = json.listItem || this.oListContainer.find(".flash-list li");  //轮播图列表
  this.oDotArea = json.dotArea || null;  //轮播图控制点  不输入则不显示点
  this.sDotClass = json.dotClass || "dot"; //控制点显示样式
  this.sDotActive = json.dotActive || "active"; //当前控制点显示样式
  this.oLeftBtn = json.leftBtn || this.oListContainer.find(".ctrl-left"),
  this.oRightBtn = json.rightBtn || this.oListContainer.find(".ctrl-right");
  this.time = 5000;
  this.init();
}



Flash.prototype = {
  //设置轮播图水平居中
  setCenter : function () {
    var iWidth = this.oListItem.find("img").width();
  },
  //生成控制点
  setDot : function(){
    if(this.oDotArea){
      var sHtml = ""
      var sClass = this.sDotClass;
      this.oListItem.each(function () {
        sHtml +="<a href='javascript:void(0);' class='"+sClass+"'></a>";
      });
      this.oDotArea.append(sHtml).find("a").eq(0).addClass(this.sDotActive);;
    }
  },

  //切换点样式
  tabDot : function(index){
    var sA = this.oDotArea.find("a");
    sA.removeClass(this.sDotActive).eq(index).addClass(this.sDotActive);
  },

  hanlder : function(){
    var _this = this;
    var index = 0,
        iListLength = this.oListItem.length; //滚动列表的张数

    this.oListItem.eq(0).css({"z-index": 1, "opacity": 1});
    var timer = setInterval(autoMove,_this.time);//设置定时器

    //切换函数
    function move(){
      _this.oListItem.not(index).stop().animate({"opacity":0}).css({"z-index": 0});
      _this.oListItem.eq(index).stop().animate({"opacity":1}).css({"z-index": 1});
      _this.tabDot(index);
    }

    //自动切换
    function autoMove () {
      if (++index >= iListLength) {
        index = 0;
      }
      move();
    }

    //绑定点的事件函数
    this.oDotArea.on("mouseenter","a",function () {
      clearInterval(timer);
      timer = null;
      index = $(this).index();
      move();
    });

    this.oDotArea.on("mouseleave","a",function () {
      timer = setInterval(autoMove,_this.time);//设置定时器
    });

    //左按钮
    this.oLeftBtn.on("click",function () {
      clearInterval(timer);
      timer = null;
      if(--index < 0){
        index = iListLength-1;
      }
      move();
      timer = setInterval(autoMove,_this.time);//设置定时器
    })

    //左右钮
    this.oRightBtn.on("click",function () {
      clearInterval(timer);
      timer = null;
      autoMove();
      timer = setInterval(autoMove,_this.time);//设置定时器
      return false;
    })

  },


  //初始化
  init : function () {
    this.setCenter();
    this.setDot();
    //图片处理函数
    this.hanlder();
  }
}


/**
 * 选项卡tab切换
 * cmd模式
 */
$.fn.tab= function(options){
  var defaults= {
    tabNav: ".tab-nav",  //切换导航
    tabNavItem: ".nav-item", //导航项目
    tabBody: ".tab-content", //内容盒子
    tabItem: ".tab-item", //内容项目
    activeClass: "active", //显示的class
    emit: "mouseenter" //触发条件
  };


  $(this).each(function(){
    var $self= $(this);
    var options= $.extend(true, defaults, options),

        tabNav= $self.find(options.tabNav),

        tabNavItem= tabNav.find(options.tabNavItem),

        tabBody= $self.find(options.tabBody),
        tabItem= tabBody.find(options.tabItem),
        emit= options.emit,
        activeClass= options.activeClass;
    var activeIndex = 0;

    //绑定事件
    tabNav.on(emit, options.tabNavItem, change);

    //切换
    function change(e) {
      var e= e || window.event;
      activeIndex= $(this).index();
      tabNavItem.removeClass(activeClass);
      tabNavItem.eq(activeIndex).addClass(activeClass);
      tabItem.removeClass(activeClass);
      tabItem.eq(activeIndex).addClass(activeClass);

      tabItem.eq(activeIndex).find("img").lazyload();
    }
  });

  return this;
}


$(document).ready(function () {
    $("img").lazyload({
        effect: "fadeIn"
    });
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

      searchInput.on("focus", function(){
        searchHots.show();
      }).on("input", function (evt) {
          var keys = "";
          var tid = "";
          $.ajax({
              type: 'post',
              url: '/ajax/ashx/GetRelateWord.ashx?t=1',
              data: { keyword: $(this).val() },
              dataType: 'json',
              cache: false,
              success: function (json) {
                  if (json.length > 0) { //正确返回
                      for (var i = 0; i < json.length; i++) {
                          keys += "<li><a href=\"" + json[i].url + "\">" + json[i].title.replace("<span>", "<span class=\"highlight\">") + "</a></li>";

                          $(".hots-list").html(keys);
                      }
                  }
              },
              error: function (result, status) {
              }
          });
      });;

      $(document).bind('mousedown', function (event) {
          var $target = $(event.target);
          if ((!($target.parents().andSelf().is('.search-hots'))) && (!$target.is(searchInput))) {
              searchHots.hide();
          }
      })
      //在这里写搜索的事件
      searchBtn.on("click", function () { location.href = "http://s.sfacg.com/?Key=" + encodeURIComponent(searchInput.val()) + "&S=1&SS=0"; });

      document.onkeydown = function (evt) {
          evt = evt ? evt : (window.event ? window.event : null);
          if (evt.keyCode == 13)
              location.href = "http://s.sfacg.com/?Key=" + encodeURIComponent(searchInput.val()) + "&S=1&SS=0";
      }
    })();

    function LoginUserInfo() {
        $.ajax({
            url: '//passport.sfacg.com/Ajax/GetLoginInfo.ashx',
            dataType: 'jsonp',
            jsonp: "callback",
            success: function (json) {
                isLogin = json[0].login;
                if (json[0].login == "false") {
                    $(".normal-link").html('您好，SF游客　<a href="http://passport.sfacg.com/Register.aspx">注册</a>　<a href="http://passport.sfacg.com/Login.aspx">登录</a></li>');
                }
                else {
                    $(".user-mask img").attr("src", json[0].avatar);
                    $(".normal-link").html('<a href="//passport.sfacg.com/">个人中心</a><a href="http://p.sfacg.com/u/' +
                json[0].name + '">火袋</a><a href="http://i.sfacg.com/MyNovel/">我的SF</a>');
                }
            },
            error: function (result, status) {
            }
        });
    }
    LoginUserInfo();
    $(".tab").tab();

    /**
     * 幻灯片切换
     */
    new Flash({
      listContainer : $("#flashBox"),
      dotArea : $(".flash-dot")
    });
});

