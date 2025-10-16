e# TODO: Fix Admin Login and Registration

## Issue
- Admin registration does not store credentials.
- Admin login only accepts hardcoded emails ('admin@pharmacy.com' or 'admin').
- Password is not verified during login.
- Registered admins cannot log in to the admin dashboard.

## Plan
1. Modify AdminRegister.jsx to store admin credentials in localStorage.
2. Modify AdminLogin.jsx to authenticate against stored admin data, including password verification.
3. Ensure registered admins can log in successfully.

## Steps
- [x] Update AdminRegister.jsx to save admin data to localStorage.
- [x] Update AdminLogin.jsx to check stored admins and verify password.
- [x] Test registration and login flow.
## Steps
- [x] Update AdminRegister.jsx to save admin data to localStorage.
- [x] Update AdminLogin.jsx to check stored admins and verify password.
- [ ] Test registration and login flow.
