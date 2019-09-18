$(function() {
  var result = $("#user-search-result");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    result.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`
    result.append(html);
  }

  function removeUser(add_id, add_name) {
    var html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value=${add_id}>
                  <p class='chat-group-user__name'>${add_name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    $('.chat-group-form__field--right.group-member').append(html);
  }


  $('#user-search-field').on("keyup", function() {
    var input = $('#user-search-field').val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $('#user-search-result').empty();
    if (users.length !== 0) {
      users.forEach(function(user){
        appendUser(user);
      });
    }
    else {
      appendErrMsgToHTML("一致するユーザーが見つかりません");
    }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });

  $('.chat-group-form__field--right').on('click', '.user-search-add', function() {
    var add_id = $(this).data('user-id');
    var add_name = $(this).data('user-name');

    $(this).parent().remove();
    removeUser(add_id, add_name);
  });

  $('.group-member').on('click', '.user-search-remove', function() {
    $(this).parent().remove();
  });

});
