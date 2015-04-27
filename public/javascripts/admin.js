$(document).on('ready', function(){
	$('#profileImgDeleteBtn').on('click', function(){
		console.log('asd')
		$(this).closest('#userProfileImgEdit').find('img').attr('src', '/profiles/none.jpg');
		$('input[name="avatar_old"]').val('none.jpg');
		$(this).addClass('hide');
	})
})