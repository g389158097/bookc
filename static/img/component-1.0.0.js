/**
 * 选项卡tab切换
 */
$.fn.tab= function(options, callback){
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

    if($.isFunction(options)){
      callback = options;
    }

    options= $.extend(true, defaults, options);

    var tabNav= $self.find(options.tabNav),

        tabNavItem= tabNav.find(options.tabNavItem),

        tabBody= $self.find(options.tabBody),
        tabItem= tabBody.find(options.tabItem),
        emit= options.emit,
        activeClass= options.activeClass;
    var activeIndex = 0;
    //绑定事件
    tabNav.on(emit, options.tabNavItem, change);

    //切换
    function change(e){
      var e= e || window.event;
      activeIndex= $(this).index();
      tabNavItem.removeClass(activeClass);
      tabNavItem.eq(activeIndex).addClass(activeClass);
      tabItem.removeClass(activeClass);
      tabItem.eq(activeIndex).addClass(activeClass);

      if($.isFunction(callback)){
          callback.call(tabItem.eq(activeIndex), tabNavItem.eq(activeIndex));
      }
    }
  });

  return this;
}

/**
 * 自定义滚动条
 */
$.fn.scrollBar= function(options){

  var scrollHandler;

  $(this).each(function(index, item){
    var scrollBarTpl,
        scrollDragTpl;


    var $self = $(this);

    var hasBind = $self.data("binded"); //是否有生成过滚动条
    var scrollContent = $self.find(".scroll-content");

    if(hasBind || scrollContent.height() == 0) return;

    $self.data("binded", 1);

    if(!scrollContent.height()) return;

    var proportion = $self.height() / scrollContent.height() ;

    var selfHeigh = $self.height(),
        scrollDragTplHeight = 0;

    var isHover = false;

    //postion的区间范围
    var range = {
      min: 0,
      max: 0
    },


    //鼠标区间
    mouseRange = {
      starty: 0,
      endY: 0
    }

    //设置拖动条的比例
    proportion = proportion> 1? 1: proportion.toFixed(2);

    //设置拖动条的高度
    scrollDragTplHeight = proportion * selfHeigh;

    //设置拖动条top的极限范围
    range.max = selfHeigh- scrollDragTplHeight;

    scrollBarTpl = $self.find(".scroll-bar");
    scrollDragTpl = $self.find(".scroll-drag");

    if(scrollBarTpl.length == 0){
      scrollBarTpl = $("<div class='scroll-bar'></div>");
      scrollDragTpl = $('<div class="scroll-drag"></div>');
      scrollBarTpl.append(scrollDragTpl);
    }

    scrollDragTpl.height(scrollDragTplHeight);

    //添加到DOM
    $self.append(scrollBarTpl);

    //现在滚动条离顶部高度

    scrollDragTpl.on("mousedown", function(e){
      var e= e || event;

      mouseRange.starty = e.pageY;
      nowTop= scrollDragTpl.position().top;

      isHover = true;
    });

    $(window).on("mousemove", function(e){
      var e= e || event;

      if(!isHover) return;

      mouseRange.endY = e.pageY;

      var gap =nowTop + mouseRange.endY - mouseRange.starty;
      gap = correctRange(gap);

      scroll(gap);

      e.preventDefault&& e.preventDefault();
      return false;
    }).on("mouseup", function(){
      isHover = false;
    });

    $self.bind("mousewheel", function(e) {
      var e= e || event;
      e.preventDefault&& e.preventDefault();

      var delta = e.wheelDelta || -e.detail ||e.originalEvent.wheelDelta;

      nowTop= scrollDragTpl.position().top;
      nowTop += delta > 0 ?  -10 : 10;
      nowTop = correctRange(nowTop);
      scroll(nowTop);

      return false;
    });

    function scroll(gap){

      scrollDragTpl.css({
        top: gap
      });

      scrollContent.css({
        marginTop: gap / proportion * -1
      });

    }

    //纠正范围
    function correctRange(gap){

      if(gap < range.min){
        gap = 0;
      }

      if(gap > range.max){
        gap = range.max;
      }

      return gap;
    }

  });

};

/**
 * 自定义多选框
 */
$.fn.checkbox = function(){
  $(this).each(function(index, item){
    var $self = $(item);
    $self.on("click", function(){
      if(!$(this).hasClass("disable")){
        $(this).toggleClass("checked");
      }
    })
  })
};

/**
 * 自定义单选
 */

$.fn.radio= function(){
  $(this).each(function(index, item){
    var $self = $(item);
    $self.on("click", ".options-item", function(){
        $self.find(".options-item").removeClass("selected");
        $(this).addClass("selected");
    })
  });
};

/**
 * 自定义下拉框
 */

$.fn.selectItem = function () {
    $(this).each(function (index, item) {
        var $self = $(item);
        var defaultText = $self.find(".default");
        var selectMore = $self.find(".select-more");

        defaultText.on("click", function (e) {

            var e = e || event;
            e.preventDefault && e.preventDefault();
            e.stopPropagation && e.stopPropagation();
            selectMore.addClass("visible");
        });

        selectMore.on("click", ".text", function (e) {

            var e = e || event;
            e.preventDefault && e.preventDefault();
            e.stopPropagation && e.stopPropagation();

            var text = $(this).text();
            var val = $(this).attr("value");
            defaultText.find(".text").text(text);
            defaultText.find(".text").attr("value", val);

            selectMore.removeClass("visible");

            return false;
        });

        $(document).on("click", function () {

            selectMore.removeClass("visible");
        });

    });
};

//textarea placeHoder
$.fn.placeholder = function(options){

  var defaults = {
    placeholder: ".placeholder",
    input: ".textarea"
  };

  options= $.extend(true, defaults, options);

  $(this).each(function(index, item){


    var $self = $(item);
    var placeholder = $self.find(options.placeholder);
    var input = $self.find(options.input);

    input.on("keyup", function(){
      var text = $(this).val() || $(this).html();
      if(text !== ""){
        placeholder.hide();
      }else{
        placeholder.show();
      }
    });

    placeholder.on("click", function(){
      input.focus();
    });

  });
};

