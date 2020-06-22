$(function(){

  function buildHTML(message){
    if (message.image){
      let html = `<div class="Main-Middle__box_single">
      <ul class="Main-Middle__box_single_namelists">
        <li class="Main-Middle__box_single_namelists_name ">${message.user_name}</li>
        <li class="Main-Middle__box_single_namelists_date">${message.created_at}</li>
      </ul>
      <p class="Main-Middle__box_single_message">
        ${message.content}
      </p>
      <img class="Main-Middle__box_singe_message" src="${message.image}">
      </div>`
      
      return html;
    }else {
      let html = `<div class="Main-Middle__box_single">
      <ul class="Main-Middle__box_single_namelists">
        <li class="Main-Middle__box_single_namelists_name ">${message.user_name}</li>
        <li class="Main-Middle__box_single_namelists_date">${message.created_at}</li>
      </ul>
      <p class="Main-Middle__box_single_message">
        ${message.content}
      </p>
    </div>`
      return html;
    };
  }

  $(".Main-Bottom__form").on('submit', function(e){
    e.preventDefault();
    let message = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);

      $(".Main-Middle__box").append(html);
      $("form")[0].reset();
      $(".Main-Bottom__form_btn").prop("disabled", false);
      $(".Main-Middle").animate({ scrollTop: $('.Main-Middle__box')[0].scrollHeight});
    })
    .fail(function() {
      alert('メッセージ送信に失敗しました。');
    })
  })
});