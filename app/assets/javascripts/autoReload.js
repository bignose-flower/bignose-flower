$(function(){

  let reloadMessages = function() {
    let last_message_id = $('.Main-Middle__box_single:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0){
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.Main-Middle__box_single').append(insertHTML);
        $(".Main-Middle").animate({ scrollTop: $('.Main-Middle__box')[0].scrollHeight});
      }
    })
    .fail(function(){
      alert('error');
    })
  }

  function buildHTML(message){
    if (message.image){
      let html = `<div class="Main-Middle__box_single" data-message-id=${message.id}>
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
      let html = `<div class="Main-Middle__box_single" data-message-id=${message.id}>
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
  setInterval(reloadMessages, 1000);
});