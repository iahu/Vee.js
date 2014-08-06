// just do it.
var $form = $('form');
var vee = new Vee();
vee.addPatt('ceditor', function () {
	return $(this).text() !== '';
});
vee.addPatt('value', function () {
	return $(this).filter(':checked').length;
});
vee.addNode({
	el: $('#contact', $form),
	patt: 'no_empty',
	msg: '请输入正确的联系人姓名'
});
vee.addNode({
	el: $('#tel', $form),
	patt: 'telephone',
	msg: '请输入正确的手机号'
});
vee.addNode({
	el: $('[name=gender]', $form),
	patt: 'value',
	msg: '请选择性别'
});
vee.addNode({
	el: $('#description', $form),
	patt: 'no_empty',
	evt: 'input',
	msg: '问题描述为空'
});
vee.addNode({
	el: $('#xy', $form),
	patt: 'value',
	msg: '请同意协议'
});
$(vee).on('pass.vee fail.vee', function(event, el, patt, msg) {
	event.preventDefault();
	if (event.type === 'pass') {
		showErr(el, true);
	} else {
		showErr(el, msg);
	}
});
$form.submit(function(event) {
	event.preventDefault();
	vee.verifyAll(function (ret, fails) {
		if (ret) {
			alert('通过');
			$form.trigger('pass.vee');
		} else {
			$form.trigger('fail.vee');
		}
	});
});

function showErr(el, msg) {
	var $el = $(el).last();
	var icon = msg === true ? true : false;
	var $tip = $('<div class="validator-msg"></div>');
	var _html = '';

	msg = msg || $el.data('msg') || '';
	$el.closest('.input-row').find('.validator-msg').remove();

	if ( icon ) {
		$tip.addClass('pass-vee');
		_html = $tip.html( '<i class="validator-icon icon-true"></i>' );
		$el.closest('.input-row').append(_html);
	} else {
		$tip.addClass('fail-vee');
		_html = ['<i class="validator-icon icon-false"></i>',
					'<div class="validator-inner">',
					msg,
					'</div>'].join('');

		$tip.html( _html );
		$el.closest('.input-row').append($tip);
	}
}