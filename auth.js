document.addEventListener('DOMContentLoaded', function () {
    const authForm = document.getElementById('auth-form');
    const loginButton = document.getElementById('loginButton');

    loginButton.addEventListener('click', async () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // Successful login, handle accordingly (redirect, UI changes, etc.)
                console.log('Login successful');
            } else {
                // Handle unsuccessful login (show error message, etc.)
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    });
});
