$(document).on('ready', function(){
	$('#profileImgDeleteBtn').on('click', function(){
		console.log('asd')
		$(this).closest('#userProfileImgEdit').find('img').attr('src', '/profiles/none.png');
		$('input[name="avatar_old"]').val('none.png');
		$(this).addClass('hide');
	})
})