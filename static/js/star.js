﻿var starValue = 0;
$.fn.studyplay_star=function(options,callback){
	//默认设置
    var settings = {
		MaxStar      :20,
		StarWidth    :16,
		CurrentStar  :5,
		Enabled: true,
        Index:1
		};	
	if(options) { jQuery.extend(settings, options); };
	var container = jQuery(this);
	container.css({"position":"relative"})
	.html('<ul class="studyplay_starBg"></ul>')	
	.find('.studyplay_starBg').width(settings.MaxStar*settings.StarWidth)
	.html('<li class="studyplay_starovering" style="width:' + settings.CurrentStar * settings.StarWidth + 'px; z-index:0;" id="studyplay_current' + settings.Index + '"></li>');
	if(settings.Enabled)
	{
	var ListArray = "";	
	for(k=1;k<settings.MaxStar+1;k++)
	{
		ListArray +='<li title="'+k+'.0分" class="studyplay_starON" style="width:'+settings.StarWidth*k+'px;z-index:'+(settings.MaxStar-k+1)+';"></li>';
	}
	container.find('.studyplay_starBg').append(ListArray)
	container.find('.studyplay_starON').hover(function(){											  
											  $(this).removeClass('studyplay_starON').addClass("studyplay_starovering");
											  $("#studyplay_current" + settings.Index).hide();
											  },
									  function(){
										  $(this).removeClass('studyplay_starovering').addClass("studyplay_starON");
										  $("#studyplay_current" + settings.Index).show();
										  })
	.click(function(){
					var studyplay_count = settings.MaxStar - $(this).css("z-index")+1;
					$("#studyplay_current" + settings.Index).width(studyplay_count * settings.StarWidth)
					//回调函数
					if (typeof callback == 'function') {
					callback(studyplay_count);
					return ;
					}
					})
 }	
}