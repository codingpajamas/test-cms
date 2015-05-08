jQuery(document).on('ready', function(){
	jQuery('#profileImgDeleteBtn').on('click', function(){
		console.log('asd')
		jQuery(this).closest('#userProfileImgEdit').find('img').attr('src', '/profiles/none.png');
		jQuery('input[name="avatar_old"]').val('none.png');
		jQuery(this).addClass('hide');
	});

	var editor = new MediumEditor('.editable', {});

	$('.editable').on('input', function() { 
	  	var allContents = editor.serialize();
		var elContent = allContents["blogContentBox"].value;
		$('#blogTextArea').val(elContent);
		console.log(elContent);
	});
})