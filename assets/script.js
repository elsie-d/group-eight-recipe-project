var saveBtn = document.querySelector('.saveBtn');
var editBtn = document.querySelector('.editbtn');

$(function () {
    $(".editBtn").on("click", function)
}
$(function () {
    $(".saveBtn").on("click", function() {
      var inputValue = $(this).siblings("textarea").val();
      var key = $(this).parent().attr("id");
      localStorage.setItem(key, inputValue);
      console.log(localStorage.getItem(key));
    })  

      $("textarea").each(function() {
        var key =$(this).parent().attr("id");
        var savedValue = localStorage.getItem(key);
        if (savedValue) {
          $(this).val(savedValue);
        }
      })
    });   