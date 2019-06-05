	//Pop
	//@currWin {弹出窗口}  {jquery对象}
	//@clickNode {触发弹出窗口按钮} {jquery对象}
	//@closeNode {关闭弹出窗口  右上角按钮} {jquery对象}
	//@triggerCloseNode {触发弹出窗口关闭按钮} {jquery对象}
	//@noScroll {浏览器是否有滚动条  默认有滚动条} {boolean}
	//@isBg {浏览器是否有滚动条  默认没有} {boolean}
	function hdfPop(config){
		var currWin = config.currWin;
		var clickNode = config.clickNode;
		var closeNode = config.closeNode;
		var triggerCloseNode = config.triggerCloseNode;
		var noScroll = config.noScroll || false;
		var isBg = config.isBg || false;
		
		//定义format函数
		String.prototype.format = function() {
		  var args = arguments;
		  return this.replace(/{(\d+)}/g, function(match, number) { 
			return typeof args[0][number] != 'undefined'
			  ? args[0][number]
			  : '{' + number + '}'
			;
		  });
		};
		
		if(clickNode){
			clickNode.bind('click',initPop);
		}else{
			initPop()
		}		
		
		function initPop(){
			if(noScroll){
				$('html').css('overflow','hidden');
			}
			getCurrWinPosition(currWin);
			if(isBg){
				getGrayFullBackground();
			}
			$(window).scroll(function(){getCurrWinPosition(currWin)});
			$(window).resize(function(){getCurrWinPosition(currWin)});
			if(triggerCloseNode){
				triggerCloseNode.bind('click',afterClose);
			}
			if(closeNode){
				closeNode.bind('click',afterClose);
			}
		}
		
		function afterClose(){
			if(noScroll){
				$('html').css('overflow','auto')
			}
			currWin.hide();
			if(isBg){
				$('#scrollBox').remove();
			}
			$(window).unbind('scroll').unbind('resize');
		}
		//获得弹窗位置，让其居中显示；
		function getCurrWinPosition(currWin){
			 var browserWidth=$(window).width();
			 var browserHeight=$(window).height();
			 var currentWidth=currWin.outerWidth();
			 var currentHeight=currWin.outerHeight();
			 var scrollLeft=$(window).scrollLeft();
			 var scrollTop=$(window).scrollTop();
			 var left=scrollLeft+(browserWidth-currentWidth)/2;
			 var top=scrollTop+(browserHeight-currentHeight)/2;
			 currWin.css({left:left,top:top}).show();
		}
		//得到弹窗灰色背景
		function getGrayFullBackground(){
		   var height=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight)
		   var node=$('<div id="scrollBox" style="width:100%; background:#666; z-index:2; position:absolute; left:0px; top:0px; height:{0}"></div>'.format([height+'px']));
		   $('body').append(node);
		   $('#scrollBox').css({opacity:'0.7'})
		}
	}
