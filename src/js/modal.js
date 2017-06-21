/**
 * Created by sky on 2017/6/21.
 */
$("#myModal").on("show.bs.modal",function(e){
    var button=$(e.relatedTarget);
    var url=button.data("url");
    $(this).find(".modal-footer a").attr("href",url);
});
