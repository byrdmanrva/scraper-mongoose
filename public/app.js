$.getJSON("/articles", function(data) {
    for (var i = 0; i < data.length; i++) {
        $("#articles").prepend("<div data-id='" + data[i]._id + "'>" + "<h2>" + data[i].title + "</h2><a href=https://snowboarding.transworld.net" + data[i].link + "'>Read Article</a><br><button class='btn btn-outline-success btn-sm' id='makenote' data-id='" + data[i]._id + "'>Make Note</button><button class='btn btn-outline-success btn-sm' id='viewnote' data-id='" + data[i]._id + "'>View Note</button></div>");
    }
  });

$(document).on("click", "#scrape", function () {
    $("#articles").empty();
    $.get("/scrape");
    $.getJSON("/articles", function(data) {
        for (var i = 0; i < data.length; i++) {
            $("#articles").prepend("<div data-id='" + data[i]._id + "'>" + "<h2>" + data[i].title + "</h2><a href=https://snowboarding.transworld.net" + data[i].link + "'>Read Article</a><br><button class='btn btn-outline-success btn-sm' id='makenote' data-id='" + data[i]._id + "'>Make Note</button><button class='btn btn-outline-success btn-sm' id='viewnote' data-id='" + data[i]._id + "'>View Note</button></div>");
        }
    });
});
  
  
$(document).on("click", "#makenote", function() {
    $("#notes").empty();
    var thisId = $(this).attr("data-id");
      $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      .then(function(data) {
        console.log(data);
        $("#notes").append("<a class='notetext'>" + data.title + "</a>");
        $("#notes").append("<input id='titleinput' name='title' type='name' class='form-control' placeholder='Name'>");
        $("#notes").append("<textarea id='bodyinput' name='body' class='form-control'placeholder='Comment' rows='10'></textarea>");
        $("#notes").append("<button type='button' data-id='" + data._id + "' id='savenote' class='btn btn-outline-danger'>Save Comment</button>")
        if (data.note) {
          $("#titleinput").val(data.note.title);
          $("#bodyinput").val(data.note.body);
        }
      });
});
  
$(document).on("click", "#savenote", function() {
    var thisId = $(this).attr("data-id");
      $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        title: $("#titleinput").val(),
        body: $("#bodyinput").val()
      }
    })
      .then(function(data) {
        console.log(data);
        $("#notes").empty();
      });
  
    $("#titleinput").val("");
    $("#bodyinput").val("");
});
  
$(document).on("click", "#viewnote", function() {
    $("#notes").empty();
    var thisId = $(this).attr("data-id");
      $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      .then(function(data) {
        console.log(data);
        $("#notes").append("<a id='notetitle' class='notetext'>" + data.title + "</a></br>");
        $("#notes").append("<a class='notetext'>" + "Name: " + data.note.title + "</a></br>");
        $("#notes").append("<a class='notetext'>" + "Comment: " + data.note.body + "</a>");
      });
});