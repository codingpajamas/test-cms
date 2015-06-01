jQuery(document).on('ready', function(){
	jQuery('#profileImgDeleteBtn').on('click', function(){ 
		jQuery(this).closest('#userProfileImgEdit').find('img').attr('src', '/profiles/none.png');
		jQuery('input[name="avatar_old"]').val('none.png');
		jQuery(this).addClass('hide');
	});

	var editor = new MediumEditor('.editable', {
		buttons: ['header1', 'header2', 'bold', 'italic', 'quote', 'anchor',, 'orderedlist', 'unorderedlist', 'removeFormat ']
	});

	// add image upload plugin to the medium editor
	/*
	$('.editable').mediumInsert({
		editor: editor,
		addons: {
			images: {
				imagesUploadScript: '/writer/blogs/upload', 
				imagesDeleteScript: '/writer/blogs/deleteupload',
				captions: true,
            	captionPlaceholder: 'Type caption for image (optional)'
			},
			embeds: {
				oembedProxy: 'http://medium.iframe.ly/api/oembed?iframe=1'
			},
			tables: {}
		}
	});
	*/
	
	$('.editable').mediumInsert({
		editor: editor,
		addons: {
			images: {
				label: '<span class="fa fa-camera"></span>',
				uploadScript: '/writer/blogs/upload',
				deleteScript: '/writer/blogs/deleteupload',
				fileUploadOptions: { 
	                url: '/writer/blogs/upload', 
	                acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i 
	            },
	            uploadCompleted: function ($el, data) {
	            	console.log($el);
	            	console.log(data);
	            }
			}
		}
	});

	$('.editable').on('input', function() { 
	  	var allContents = editor.serialize();
		var elContent = allContents["blogContentBox"].value;
		$('#blogTextArea').val(elContent);
	});
})