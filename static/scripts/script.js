$(function() {
  populatePosts();
});

function populatePosts() {
  $.ajax({
    url: '/posts'
  }).done(function(response) {
    var template = $('#post-template').html();
    response.forEach(function(post) {
      var newPost = $(template).clone();
      $(newPost).find('.title').html(post[1]);
      $(newPost).find('.author').html(post[0]);
      $(newPost).find('.body').html(post[2]);
      $(newPost).find('.likes').html(post[3]);
      $(newPost).find('.like-button').on('click', function incrementLikeCount() {
          $.ajax({
          url: '/like/' + post[4]
        }).done(function() {
          $(newPost).find('.likes').html(++post[3]);
        });
      });
     $('#post-list').append(newPost);
     $(newPost).find('.remove-post').on('click', function deletePost() {
       $.ajax({
         url:'/delete/' + post[4]
       }).done(function() {
         $(newPost).remove();
       });
     });
     $(newPost).find('.title').on('click', function visToggle(){
       if ($(newPost).find('.hide').css('display') == 'none') {
         $(newPost).find('.hide').css('display','block');
       } else {
         $(newPost).find('.hide').css('display','none');
       }
      });
    });
  });
}
