# 🔄 Reverse Proxy Configuration

![Branch](https://img.shields.io/badge/Branch-Reverse%20Proxy-blue?style=for-the-badge)
![Tech](https://img.shields.io/badge/Tech-Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)

> [!NOTE]
> This branch contains the core **Nginx** configurations that handle load balancing, proxy passing, and traffic management for the architecture.

---

## 📂 Content Overview

Below are the critical directories and configuration files required to set up the proxy logic.

| File / Directory | Description |
| :--- | :--- |
| **`sites-available/`** | Stores all available virtual host configurations. |
| **`sites-enabled/`** | Stores symlinks to active configurations (standard Nginx structure). |
| **`reverseproxy.conf`** | Located in `sites-available/`. This is the primary config file defining the proxy rules. |

---

## 🧭 Branch Navigation

Quickly navigate between the different components of the project:

| Component | Branch Name | Link |
| :--- | :--- | :--- |
| **🏠 Main Project** | `main` | [Return to Main ->](../../tree/main) |
| **🌐 DNS Config** | `dns` | [Go to Branch ->](../../tree/dns) |
| **📡 DHCP Config** | `dhcp` | [Go to Branch ->](../../tree/dhcp) |
| **🖥️ Web Server A** | `webservera` | [Go to Branch ->](../../tree/webservera) |
| **🖥️ Web Server B** | `webserverb` | [Go to Branch ->](../../tree/webserverb) |
| **Wazuh Rules** | `wazuhrules` | [Go to Branch ->](../../tree/wazuhrules) |
