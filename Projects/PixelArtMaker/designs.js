$(document).ready(function() {

    // variables
    const table = $('#pixel_canvas');
    var erase = false;
  
    // enables erase button
    $('#erase').click(function() {
      if (erase === true) {
        $('#erase').css("background", "white");
        erase = false;
      } else {
        $('#erase').css("background", "skyBlue");
        erase = true;
      }
    });
  
    // generates grid on submit
    $('input[type=submit]').on('click', function(event) {
      makeGrid();
      event.preventDefault();
      return false;
    });
  
    // adds color to cells using event listener
    table.on('mousedown', function(event) {
      event.preventDefault();
      if (event.which === 1) {
        if (erase === false) {
          let color = $('#colorPicker').val();
          $(event.target).css("background-color", color);
        } else {
          $(event.target).css("background-color", '#fff');
        }
      }
    });
  
    // @description generates Grid
    function makeGrid() {
      // removes previous table rows if already existing
      $('tr').remove();
      let height = $('#input_height').val();
      let width = $('#input_width').val();
      // generates rows with while loop
      let j = 0;
      while (j < height) {
        table.prepend("<tr></tr>");
        j++;
      }
      // generates cells with for loop
      for (var i = 0; i < width; i++) {
        $('tr').prepend("<td></td>");
      }
    }
  
  });