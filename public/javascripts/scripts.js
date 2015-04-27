$(document).on('ready', function(){

	// login form process
	$('#loginForm').on('submit', function(){
		var jLoginForm = $(this),
			strUrl = jLoginForm.attr('action'),
			jLoginError = jLoginForm.find('.loginError'),
			jLoginButton = jLoginForm.find('.loginButton'),
			strUsernameValue = jLoginForm.find('.loginUsername').val(),
			strPasswordValue = jLoginForm.find('.loginPassword').val(); 
		
		jLoginButton.addClass('btn-loading');
		$.ajax({
			url : strUrl,
			method : 'POST',
			data : {'username':strUsernameValue, 'password':strPasswordValue}
		}).done(function(data){ 
			
			jLoginButton.removeClass('btn-loading');

			if('error' == data.status){
				jLoginError.text(data.message).removeClass('hide');
			} else {
				jLoginError.text('').addClass('hide');
				console.log(data)
				window.location.href = data.redirect;
			}
		})

		return false;
	});


	// registration form process
	$('#registerForm').on('submit', function(){
		var jRegisterForm = $(this),
			strUrl = jRegisterForm.attr('action'),
			jRegisterError = jRegisterForm.find('.registerError'),
			jRegisterButton = jRegisterForm.find('.registerButton'),
			strUsernameValue = jRegisterForm.find('.registerUsername').val(),
			strPasswordValue = jRegisterForm.find('.registerPassword').val(),
			strFirstnameValue = jRegisterForm.find('.registerFirstname').val(),
			strLastnameValue = jRegisterForm.find('.registerLastname').val(); 
		
		jRegisterButton.addClass('btn-loading');

		$.ajax({
			url : strUrl,
			method : 'POST',
			data : {'username':strUsernameValue, 'password':strPasswordValue, 'firstname':strFirstnameValue, 'lastname':strLastnameValue}
		}).done(function(data){ 
			
			jRegisterButton.removeClass('btn-loading');

			if('error' == data.status){
				jRegisterError.text(data.message).removeClass('hide');
			} else {
				jRegisterError.text(data.message).addClass('text-center').removeClass('hide text-danger');
				jRegisterButton.attr('disabled','disabled');
			};
		})

		return false;
	});
})