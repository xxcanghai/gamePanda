
//jquery.jShine
//@name：    jquery.jShine
//@author：  jicanghai
//@create：  2015年1月18日
//@update：  2015年1月19日
(function ($) {
    jQuery.fn.extend({
        jShine: function (speed, zoom) {
            //设定参数默认值
            var config = $.extend(true, {
                speed: 500,//动画速度
                zoom: 0.8//放大或缩小多少倍，1.1为放大10%，2为放大100%，0.1为缩小90%，0.9为缩小10
            }, (speed && $.isPlainObject(speed)) ? speed : {
                speed: speed,
                zoom: zoom
            });

            //插件初始化
            var $jq = this;//被操作的jQuery对象
            var minOpa = 0.1;//最低透明度
            var maxOpa = 0.99;//最高透明度

            //获取原始对象的Rectangle
            var orgWidth = $jq.width();
            var orgHeight = $jq.height();
            var orgLeft = parseInt($jq.css("left").replace(/[^\d.-]/g, ""));
            var orgTop = parseInt($jq.css("top").replace(/[^\d.-]/g, ""));

            //目标样式的Rectangle
            var dstWidth = orgWidth * config.zoom;
            var dstHeight = orgHeight * config.zoom;
            var dstLeft = orgLeft - ((dstWidth - orgWidth) / 2);
            var dstTop = orgTop - ((dstHeight - orgHeight) / 2);

            //原始样式及目标样式的CSS Object
            var dstCss = { opacity: minOpa, width: dstWidth + "px", height: dstHeight + "px", left: dstLeft + "px", top: dstTop + "px" };
            var orgCss = { opacity: maxOpa, width: orgWidth + "px", height: orgHeight + "px", left: orgLeft + "px", top: orgTop + "px" };

            //todo 1、当一个jq对象已经执行了jShine后，就不能再次调用jShine方法
            //有问题↓。
            //if ($jq.data("jShine") == undefined) {
            //    $jq.data("jShine", orgCss);
            //} else {
            //    return $jq;
            //}
            
            //todo 2、增加jShineStio函数，停止循环执行

            $jq.animate(dstCss, config.speed, function () {
                $jq.animate(orgCss, config.speed, function () {
                    $jq.jShine(config);
                });
            });

            return $jq;
        }
    });
})(jQuery);

/*
//Example：
*/