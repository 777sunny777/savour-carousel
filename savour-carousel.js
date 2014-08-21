/* ========================================================================
 * Plugin: savour-carousel.js
 * Author: sunny
 * Version: 1.0.0
 * Data: 2014-08-21 13:43
 * https://github.com/777sunny777/savour-carousel
 * ========================================================================
 * Relative
 * Myblog: http://777sunny777.github.io/sunnyblog/
 * Savour: https://github.com/savour/savour
 * ======================================================================== */

;(function($){
    $.fn.extend({
        "LBT": function(options){
            var $num_pics = $("#list li").length,
            options = $.extend({
                widthLBT: 600,
                heightLBT: 400
            },options);
            var widthLBT = options.widthLBT,
                heightLBT = options.heightLBT,
                picsWidth = $num_pics*widthLBT,
                leftHeight = parseInt(heightLBT/2),
                leftWidth = parseInt(0.01*widthLBT),
                rightHeight = leftHeight,
                rightWidth = widthLBT-80;
            $("#list img").attr({
                width: widthLBT,
                height: heightLBT
            });
            if ( widthLBT != 600 || heightLBT != 400 ) {
                $("#list").css({
                    width: widthLBT+"px",
                    height: heightLBT+"px"
                });
                $("#list .pics").css({
                    width: picsWidth+"px"
                });
                $("#list li").css({
                    width: widthLBT+"px"
                });
                $("#list .left").css({
                    left: leftWidth+"px",
                    top: "-"+leftHeight+"px"
                });
                $("#list .right").css({
                    left: rightWidth+"px",
                    top: "-"+rightHeight+"px"
                });
            };
            //开始循环
            setInterval(function(){  
                $("#list .pics").animate({  
                        'margin-left':'-'+widthLBT+'px'  
                    },  
                    'slow',  
                    function(){   
                        $(".pics").css({'margin-left':0}); 
                        //快速导航的active  
                        if ( $("#list .active").hasClass('end') ) {
                            $("#list .snav").removeClass('active');
                            $("#list .snav:eq(0)").addClass('active');
                        }else{
                            $("#list .active").next().addClass('active');
                            $("#list .active:eq(0)").removeClass('active');
                        };
                        //默认是从右往左方向，把第一个插入到最后一个去
                        $("#list li:eq(0)").clone().appendTo('.pics');
                        $("#list li:eq(0)").remove();   
                    });  
                },3000  
            ); 
            //点击左一个，先动画再转移位置
            $("#list .left").click(function(event) {
                //如果没有动画
                if ( !$("#list .pics").is(":animated") ){
                    $("#list .pics").animate({  
                        'margin-left':'-'+widthLBT+'px'  
                    },'slow',  
                    function(){   
                        $("#list .pics").css({'margin-left':0});
                        //快速导航的active  
                        if ( $("#list .active").hasClass('end') ) {
                            $("#list .snav").removeClass('active');
                            $("#list .snav:eq(0)").addClass('active');
                        }else{
                            $("#list .active").next().addClass('active');
                            $("#list .active:eq(0)").removeClass('active');
                        };
                        //默认是从右往左方向，把第一个插入到最后一个去
                        var first_pic = $("#list li:eq(0)");
                        $("#list li:eq("+($num_pics-1)+")").after(first_pic);   
                    });
                };
            });
            //点击右一个 先转移位置再动画
            $("#list .right").click(function(event) {
                //如果没有动画
                if ( !$("#list .pics").is(":animated") ){
                    //是从左往右方向，把最后一个插入到第一去
                    var last_pic = $("#list li:eq("+($num_pics-1)+")");
                    $("#list li:eq(0)").before(last_pic);
                    //把位置拉到原来的第一个 
                    $("#list .pics").css({
                        'margin-left':'-'+widthLBT+'px'
                    });
                    //快速导航的active  
                    if ( $("#list .active").hasClass('start') ) {
                        $("#list .snav").removeClass('active');
                        $("#list .snav:eq("+($num_pics-1)+")").addClass('active');
                    }else{
                        $("#list .active").prev().addClass('active');
                        $("#list .active:eq(1)").removeClass('active');
                    };
                    //动画把现在的第一个拉出来
                    $("#list .pics").animate({  
                        'margin-left':'0'  
                    },
                    'slow');
                };     
            });
            //下面的快速导航
            $("#list .snav").click(function(event) {
                //如果没有动画
                if ( !$("#list .pics").is(":animated") ){
                    //测出两个的序号
                    var $activeI = $("#list .active").index(".snav");
                    var $thisI = $(this).index("#list .snav"); 
                    //根据序号计算距离
                    var plus = parseInt($thisI) - parseInt($activeI);
                    if ( plus<0 ) { //相当于右击
                        for (i = 0; i < Math.abs(plus); i++) {
                            //是从左往右方向，把最后一个插入到第一去
                            var last_pic = $("#list li:eq("+($num_pics-1)+")");
                            $("#list li:eq(0)").before(last_pic);
                            //把位置拉到原来的第一个 
                            $("#list .pics").css({
                                'margin-left':'-'+widthLBT+'px'
                            });
                            //动画把现在的第一个拉出来
                            $("#list .pics").animate({  
                                'margin-left':'0'  
                            },
                            'fast');
                        };
                    }else{ //相当于左击
                        for (i = 0; i < plus; i++) {
                            $("#list .pics").animate({  
                                'margin-left':'-'+widthLBT+'px' 
                            },'fast',  
                            function(){   
                                $("#list .pics").css({'margin-left':0});
                                //默认是从右往左方向，把第一个插入到最后一个去
                                var first_pic = $("#list li:eq(0)");
                                $("#list li:eq("+($num_pics-1)+")").after(first_pic);   
                            });
                        };
                    };
                    //统一改变快速导航的active
                    $("#list .snav").removeClass('active');
                    $(this).addClass('active'); 
                };  
            });
            return this;
        }
    });
})(jQuery);