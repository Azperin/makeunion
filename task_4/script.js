document.addEventListener("DOMContentLoaded", () => {
	// return;
	handleHashChange();
	window.addEventListener("hashchange", () => {
		handleHashChange();
	});
});

function handleHashChange() {
	document.querySelectorAll('main section').forEach((node) => node.style.display = 'none');
	
	if (location.hash) {
		loadUserProfile(location.hash.replace('#', ''));
	} else {
		loadUserList();
	};
};

function loadUserProfile(userId) {
	fetch(`https://jsonplaceholder.typicode.com/users/${ userId }`)
		.then(r => r.json())
		.then(user => {
			renderUserProfile(user);
		})
		.catch(e => {
			console.log(e);
		});
};

function renderUserProfile(user) {
	const userProfileTemplateElement = document.getElementById('user-profile-template');
	const userProfileContainer = document.querySelector('.user-profile');
	const userProfileElement = userProfileTemplateElement.content.cloneNode(true);
	userProfileContainer.innerHTML = '';
	userProfileContainer.style.display = 'grid';
	userProfileElement.querySelector('.profile-name > h2').textContent = user.name;
	userProfileContainer.appendChild(userProfileElement);
};

function loadUserList() {
	const userListElement = document.querySelector('.user-list');
	userListElement.style.display = 'grid';
	userListElement.innerHTML = '';
	
	fetch('https://jsonplaceholder.typicode.com/users')
		.then(r => r.json())
		.then(userList => {
			renderUserList(userList);
		})
		.catch(e => {
			console.log(e);
		});
};

function renderUserList(users) {
	const userListElement = document.querySelector('.user-list');
	let html = '';
	users.forEach(user => {
		html += `
			<div class="user-card">
				<figure>
					<img src="avatar.jpg" alt="аватар">
				</figure>
				<a class="user-name" href="#${ user.id }">${ user.name }</a>
			</div>
		`;
	});
	userListElement.innerHTML = html;
	
};

// const users = JSON.parse(localStorage.getItem('union_users') || "[]");