$(function() {

  function addUser(user){
    let html = `
    <div class="ChatMember clearfix">
      <p class="ChatMember__name">${user.name}</p>
      <div class="ChatMember__add ChatMember__button" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
    </div>
    `;
    $("#UserSearchResult").append(html);
  }
  function addNoUser(){
    let html = `
    <div class="ChatMember clearfix">
      <p class="ChatMember__name">ユーザーが見つかりません</p>
    </div>
    `;
    $("#UserSearchResult").append(html);
  }
  $("#UserSearch__field").on('keyup', function() {
    let input = $(this).val();
    $.ajax({
      type: 'GET',
      url: '/users',
      dataType: 'json',
      data: { keyword: input }
    })
    .done(function(users){
      $("#UserSearchResult").empty();
      if (users.length !== 0){
        users.forEach(function(user){
          addUser(user);
        })
      }else if(input === ""){
        return false;
      }else{
        addNoUser();
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました')
    });
  })

  function addMembers(name, id){
    let html = `
    <div class="ChatMember">
      <p class="ChatMember__name">${name}</p>
      <input name="group[user_ids][]" type="hidden" value="${id}" />
      <div class="ChatMember__remove ChatMember__button">削除</div>
    </div>
    `;
    $(".ChatMembers").append(html);
  }

  $("#UserSearchResult").on('click', '.ChatMember__add', function() {
    let parent = $(this).parent();
    parent.remove();
    let name = $(this).data('user-name');
    let id = $(this).data('user-id');
    console.log(name, id)
    addMembers(name, id);
  });

  $(".ChatMembers").on('click', '.ChatMember__remove', function(){
    let parent = $(this).parent();
    parent.remove();
  })
})