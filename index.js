$(function () {
    init();
    // 底部message层的隐藏
    $(".body-container .message .icon-guanbi").click(function () {
        $('.message').hide();
    });

    // affix js的调用
    $('#myAffix').affix({
        offset: {
            top: $('#myScrollspy').offset().top,
            // bottom: $('.footer').outerHeight(true)
        }
    });
    // affix插件的一个缺点，滚动时导航栏会变为fixed，宽度需要手动设定
    $('#myAffix').on('affixed.bs.affix', function () {
        $('.affix').css('width', $('.body-container .main-content .docs-navbar-container').innerWidth() - 30 + 'px');
    });

    // 左侧导航栏的展开和隐藏 + 内容块的切换
    $('.body-container .main-content .docs-navbar>ul>li>a').click(function (e) {
        // 切换内容块
        let id = $(this).attr("data-id");
        $('.main-article').hide();
        $('#'+id).show();

        // 三角图标的处理
        $('.body-container .main-content .docs-navbar>ul>li>a .iconfont').removeClass('totate90');
        if($(this).next('ul').length > 0){ // 当前点击有二级导航
            if (!$(this).next('ul').hasClass('in')) {
                $(this).children('.iconfont').addClass('totate90');
            } else {
                $(this).children('.iconfont').removeClass('totate90');
            }
        } else { // 当前点击无二级导航时把其它可折叠的隐藏
            $('.collapse').collapse('hide');
        }
    })

    // 二级导航栏的点击事件
    $('.second-nav li').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        // 关闭移动端导航栏
        if ($('.phone-screen').css('display') == 'block') {
            $('.phone-screen').hide();
        }
    });

    // 目录按钮
    $('.menu-btn-phone').click(function () {
        $('.phone-screen').show();
    });

    // 移动端model层点击 关闭导航栏
    $('.modal-self').click(function () {
        $('.phone-screen').hide();
    });

    // PC端监听切换显示模式
    var resizeTimer = null;
    $(window).resize(function (e) {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(fitScreen(), 100);
    });
});

// 初始化
function init() {
    $('.body-container .main-content .docs-navbar>ul>li:first-child').find('.iconfont').addClass('totate90');
    // $('.body-container .main-content .docs-navbar>ul>li:first-child').find('ul').show();
    $('.body-container .main-content .main article:first-child').show();
    fitScreen();
}

// 适配机型 / 屏幕大小
function fitScreen() {
    let windowWidth = $(window).width();
    switch (true) {
        case windowWidth < 768:
            // 超小屏幕
            $('#myScrollspy').addClass('phone-screen');
            break;
        case windowWidth >= 768:
            // 平板
            $('#myScrollspy').removeClass('phone-screen');
            break;
        case windowWidth >= 992:
            // 中等
            $('#myScrollspy').removeClass('phone-screen');
            break;
        case windowWidth >= 1200:
            // 大屏
            $('#myScrollspy').removeClass('phone-screen');
            break;
    }
}

