var saveBtn = document.querySelector('.saveBtn');
var editBtn = document.querySelector('.editbtn');


$(document).ready(function() {
    $(".editBtn").on("click", function() {
      var $contentEdit = $(".content");
      $contentEdit.attr("contenteditable", true);
    });
  
    $(".saveBtn").on("click", function() {
      var parent = $(this).parent().parent()  
      var inputValue = parent.html()
      var key = parent.attr("id");
      localStorage.setItem(key, inputValue);
      console.log(localStorage.getItem(key));
    });
  
    $("textarea").each(function() {
      var key = $(this).parent().attr("id");
      var savedValue = localStorage.getItem(key);
      if (savedValue) {
        $(this).val(savedValue);
      }
    });
  });