
export default function createInfusionContact(contact, tags) {
		return $.ajax({
			url: '/wp-admin/admin-ajax.php',
			type: 'post',
			data: { action: 'infusion_contact', data: {...contact, tags} }
		});
}
