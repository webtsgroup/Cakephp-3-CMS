function user(url) {
	var formData = getFormData('formUser');
	if ($.isEmptyObject(formData.error)) {
		$ajax(url, formData.data);
	} else {
		errorHandle('formUser', formData.error)
	}
}

function category(url) {
	var formData = getFormData('formCategory');
	if ($.isEmptyObject(formData.error)) {
		$ajax(url, formData.data);
	} else {
		errorHandle('formCategory', formData.error)
	}
}

function work(url) {
	var formData = getFormData('formWork');
	if ($.isEmptyObject(formData.error)) {
		$ajax(url, formData.data);
	} else {
		errorHandle('formWork', formData.error)
	}
}

function page(url) {
	var formData = getFormData('formPage');
	if ($.isEmptyObject(formData.error)) {
		$ajax(url, formData.data);
	} else {
		errorHandle('formPage', formData.error)
	}
}

function deleteImage(url, id, elm) {
  var yes = confirm('Are you sure?');
  if (yes) {
  	var success = $ajax(url + id, {}, true);
    //if (success) {
    $('#' + elm + '-' + id).remove();
    //}
  }
}

function addNewAccount(url)
{
	var formData = validatorFormData('addAccount');
	if(!formData.error) {
		if(!validateEmail(formData.data['email']))
		{
			showNotify('Email invalid');
			return;
		}
		$ajax(url, formData.data);
	}
}

function updateField(model, id, field, value) {
	var elm = $('#'+field);
	if(elm.attr('rel') == 'date') {
		var arr = value.split("-");
		var date = arr[1]+"/"+arr[0]+"/"+arr[2];
		date = new Date(date);
		value = date.getTime();
		var c = new Date();
		c = c.getTime();
		value = c - value;
	}
	$.ajax({
		url  : '/ajaxs/updateField',
		type : 'POST',
		data : {
      model : model ,
      id : id,
      field : field,
      value : value
    },
		dataType : 'json',
		success: function(data)
		{
			showNotify(data.message,true);
		}
	});
}

function changePass(url)
{
	var error = 0;
	var arr = ['old_pass', 'pass','re_pass'];
	var formData = {};
	$.each(arr,function(index,elm){
		var val = $('#'+elm).val();
		if( val == '')
		{
			showNotify('Insert '+elm);
			error++;
		}
		formData[elm] = val;
	});
	if(error == 0)	{
		if($ajax(url, formData, false))
		{
			$.each(arr,function(index,elm){
				$('#'+elm).val('');
			});
			showBoxChangePass();
		}
	}
}

function showBoxChangePass() {
	$('.elm-hide').toggle();
}