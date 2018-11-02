
//jQuery.jFly-1.0
//@name：    jQuery.jFly
//@author：  jicanghai
//@create：  2014‎年‎7‎月‎17‎日
//@update：  2014年7月24日
(function ($) {
    jQuery.fn.extend({
        jFly: function (config) {
            //设定参数默认值
            config = $.extend(true, {
                animate: {
                    params: {},
                    orgparams: {},
                    speed: 1000,
                    easing: "swing"
                },
                timeEvent: {
                    delay: 0,
                    event: $.noop
                },
                dst: "left",//向哪个方向运动
                offset: 50,//位移多少像素
                isIn: true,//true为飞入，false为飞出
                callback: $.noop
            }, config);

            //插件初始化
            var $jq = this;//被操作的jQuery对象
            var dstEnum = {//运动方向枚举
                "up": 1,
                "down": -3,
                "right": -2,
                "left": 4
            };
            var dstArr = [];//最终方向数组 例up left
            //过滤互斥的方向和重复的方向
            $.each(config.dst.split(" "), function (i, str) {
                for (var j = 0; j <= 1; j++)
                    dstArr[str] || Math.abs(dstEnum[str]) % 2 == j && $.map(dstArr, function (n) { return Math.abs(dstEnum[n] % 2) == j ? n : null; }).length == 0 && dstArr.push(str);
            });
            //console.log("dstArr:",dstArr);
            var i, isHor, isAdd, cssName, cssOrgObj = {}, cssDstObj = {}, cssOpacity;
            for (i = 0; i < dstArr.length; i++) {
                isHor = dstEnum[dstArr[i]] % 2 === 0; //是否横着
                isAdd = dstEnum[dstArr[i]] > 0; //是否设定初始时css使用+=
                cssName = isHor ? "left" : "top"; //被操作的css属性名
                cssOpacity = config.isIn ? 1 : 0;
                cssOrgObj[cssName] = getIsAdd(isAdd) + config.offset + "px";
                cssDstObj[cssName] = getIsAdd(!isAdd) + config.offset + "px";
            }
            //执行动画
            setTimeout(function () { config.timeEvent.event($jq); }, config.timeEvent.delay);
            setOrgLocation($jq).animate($.extend(true, cssDstObj, { opacity: cssOpacity }, config.animate.params), config.animate.speed, config.animate.easing, function () {//
                config.callback($jq);
            });

            function getIsAdd(isadd) {
                return isadd ? "+=" : "-=";
            }

            function setOrgLocation($j) {
                //return (config.isIn) ? $j.css(cssOrgObj).fadeOut(0) : $j;
                return (config.isIn) ? $j.css($.extend(true, cssOrgObj, config.animate.orgparams)).css("opacity", 0) : $j;
            }
            return $jq;
        }
    });
})(jQuery);

/*
//Example：
<script type="text/javascript">
    $(function () {
        $(".text").jFly({
            dst: "down right",
            offset: 100,
            isIn: true,
            callback: function (j) { console.log("Animation is OK!", j); },
            timeEvent: {
                delay: 500,
                event: function (j) { console.log("timeEvent!", j); }
            }
        });
    });
</script>
<style type="text/css">
    .box { width: 500px; height: 500px; background: gray; position: relative; left: 30px; top: 30px; overflow: hidden; }
    .text { width: 200px; height: 200px; background: green; position: absolute; left: 50px; top: 50px; }
</style>
<div class="box">
    <div class="text"></div>
</div>
*/