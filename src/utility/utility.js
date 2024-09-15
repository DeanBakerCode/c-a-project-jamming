const generateRandomString = (length) => {
	let randomString = '';
	const characters = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	for (let i = 0; i < length; i++) {
		randomString += characters[Math.floor(Math.random() * characters.length)];
	}
	console.log(`random string: ${randomString}`);
	return randomString;
};

export { generateRandomString };
