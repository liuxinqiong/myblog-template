/**
 * Created by sky on 2017/6/15.
 */
(function ($) {
    var ms = {
        init: function (target, args) {
            return (function () {
                ms.fillHtml(target, args);
                ms.bindEvent(target, args);
            })();
        },
        //填充html
        fillHtml: function (target, args) {
            return (function (target, args) {
                var totalsubpageHtml = "";
                /************************START*********************/
                if (args.currPage > 1) {
                    totalsubpageHtml += "<li class='prev'><a href='javascript:void(0);'>&laquo;</a></li>";
                }

                // 页码大于等于4的时候，添加第一个页码元素
                if (args.currPage >= 4 && args.totalPage != 4) {
                    totalsubpageHtml += "<li class='normal'><a href='javascript:void(0);'>1</a></li>";
                }
                /* 当前页码>4, 并且<=总页码，总页码>5，添加“・・・”*/
                if (args.currPage > 4 && args.currPage <= args.totalPage && args.totalPage > 5) {
                    totalsubpageHtml += "<li><a href='javascript:void(0);'>...</a></li>";
                }
                /* 当前页码的前两页 */
                var start = args.currPage - 2;
                /* 当前页码的后两页 */
                var end = args.currPage + 2;

                if ((start > 1 && args.currPage < 4) || args.currPage == 1) {
                    end++;
                }
                if (args.currPage > args.totalPage - 4 && args.currPage >= args.totalPage) {
                    start--;
                }

                for (; start <= end; start++) {
                    if (start <= args.totalPage && start >= 1) {
                        if (start != args.currPage) {
                            totalsubpageHtml += "<li class='normal'><a href='javascript:void(0);'>" + start + "</a></li>";
                        } else {
                            totalsubpageHtml += "<li class='normal active'><a href='javascript:void(0);'>" + start + "</a></li>";
                        }
                    }
                }

                if (args.currPage + 2 < args.totalPage - 1 && args.currPage >= 1 && args.totalPage > 5) {
                    totalsubpageHtml += "<li><a href='javascript:void(0);'>...</a></li>";
                }

                if (args.currPage != args.totalPage && args.currPage < args.totalPage - 2 && args.totalPage != 4) {
                    totalsubpageHtml += "<li class='normal'><a href='javascript:void(0);'>" + args.totalPage + "</a></li>";
                }

                if (args.currPage < args.totalPage) {
                    totalsubpageHtml += "<li class='next'><a href='javascript:void(0);'>&raquo;</a></li>";
                }
                $(target).find(".pagination").html(totalsubpageHtml);
            })(target, args);
        },
        //绑定事件
        bindEvent: function (target, args) {
            return (function (target, args) {
                target.on("click", "li.normal", function (event) {
                    var current = parseInt($(this).text());
                    ms.fillHtml(target, {
                        "currPage": current,
                        "totalPage": args.totalPage
                    });
                    if (typeof(args.backFn) == "function") {
                        args.backFn(current);
                    }
                });
                //上一页
                target.on("click", "li.prev", function () {
                    var current = parseInt($(this).parent().find('li.active>a').text());
                    ms.fillHtml(target, {
                        "currPage": current - 1,
                        "totalPage": args.totalPage
                    });
                    if (typeof(args.backFn) == "function") {
                        args.backFn(current - 1);
                    }
                });
                //下一页
                target.on("click", "li.next", function () {
                    var current = parseInt($(this).parent().find('li.active>a').text());
                    ms.fillHtml(target, {
                        "currPage": current + 1,
                        "totalPage": args.totalPage
                    });
                    if (typeof(args.backFn) == "function") {
                        args.backFn(current + 1);
                    }
                });

            })(target, args);
        }
    }
    $.fn.createPage = function (options) {
        ms.init(this, options);
    }
})(jQuery);
