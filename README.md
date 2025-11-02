# Deployment Guide/ Set Up Guide

Note: ctrl + shift + v to read this in markdown format

## First time? - Follow This!
1. `npm init -y`
2. `npm install -D tailwindcss`
3. `npx tailwindcss init`
4. Ensure everything is in `/web_srva` or `/web_srvb`!

## Recommended VSCODE Extensions
- **Tailwind CSS IntelliSense** (by Tailwind Labs) - Essential for autocomplete
- **PostCSS Language Support** - Syntax highlighting for @tailwind directives
- **PHP Intelephense** - For PHP autocomplete
- **Live Server** - To view stuff?

## Troubleshooting Guide
If `npx tailwindcss init` doesn't work..
1. Remove everything
    `Remove-Item -Recurse -Force node_modules, package-lock.json -ErrorAction SilentlyContinue`

2. Clear cache
    `npm cache clean --force`

3. Install Tailwind CSS v3 specifically
    `npm install -D tailwindcss@^3`

4. Now init should work
    `npx tailwindcss init`

## What is going on?
This may seem overwhelming at first, but let us break down everything.

`Context:` This is ebsite is for a Web Serevr [A or B] for the project Mastering Reverse Proxy for Web Server Protection. The GOAL of this project is to:
1. Have a working Reverse Proxy.
2. Working SOC Dashboard.
3. Secure and working and running website for both webb servers
4. Sell this reverse proxy and soc dashboard.

## What do these files and folders do?
Since we are using tailwind, there are json packages you can ignore.

1. Public folder [[public](web_srva/public)]

What it does: This is the ONLY folder NGINX can access. Everything else is hidden from the web.
index.php - Homepage (landing page, publicly accessible)

login.php - Login form (handles user authentication)
logout.php - Logout Form

dashboard.php - Protected page (only logged-in users can access)

css/styles.css - Built/compiled Tailwind CSS (served to browsers)

Security: ✅ Good! Only public/ is exposed to the web. Sensitive files (like config.php) are outside this folder.

2. Src folder [[src](web_srva/src)]
What it does: Contains files that get processed or are sensitive.
src/css/input.css

Raw Tailwind CSS with @tailwind directives
Gets compiled into public/css/styles.css
NOT accessible via web browser

src/php/config.php

Database connection credentials
Should contain PDO connection setup
CRITICAL: Must be outside public/ to prevent accidental exposure

src/php/auth.php - Authentication functions (login, logout, session checks)
Reusable code to protect pages

db.php - Database helper functions
security.php - Security utilities (CSRF, input sanitization)

3. Root Files

node_modules/ - NPM packages (Tailwind CSS). Never upload to server.

package.json - NPM config (scripts for building CSS)

tailwind.config.js - Tailwind configuration (which files to scan for classes)

.gitignore - Tells Git what NOT to commit (secrets, node_modules)

# Use Later - ignore for deployment
```
server {
    # ... your existing config ...
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # Prevent access to sensitive files
    location ~ /\.(env|git|htaccess) {
        deny all;
    }
    
    location ~ ^/(src|node_modules|vendor)/ {
        deny all;
    }
}
```
