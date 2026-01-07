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

`Context:` This is website is for a Web Server [A or B] for the project Mastering Reverse Proxy for Web Server Protection. The GOAL of this project is to:
1. Have a working Reverse Proxy.
2. Working SOC Dashboard.
3. Secure and working and running website for both webb servers
4. Sell this reverse proxy and soc dashboard.


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
