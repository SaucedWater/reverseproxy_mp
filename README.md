# 🛡️ Mastering Reverse Proxy for Web Server Protection

![Group](https://img.shields.io/badge/Group-48-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![Last Updated](https://img.shields.io/badge/Last%20Updated-Dec%202025-orange?style=for-the-badge)

> [!TIP]
> **Viewing Tip:** Press `Ctrl` + `Shift` + `V` (in VS Code) to toggle the formatted preview of this file.

---

## 📖 Table of Contents
- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Installation & Branches](#-installation--branches)

---

## 🧐 Overview
This project demonstrates the implementation of a secure Reverse Proxy architecture to protect web servers. It integrates monitoring, intrusion detection, and visualization tools to ensure a robust security posture.

---

## 💻 Tech Stack
The following technologies are utilized in this deployment:

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Reverse Proxy** | ![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white) | Handles load balancing and proxying. |
| **Security** | ![ModSecurity](https://img.shields.io/badge/ModSecurity-Embed-critical?style=flat-square) | Web Application Firewall (WAF). |
| **SIEM / IDS** | ![Wazuh](https://img.shields.io/badge/Wazuh-blue?style=flat-square) | Security monitoring and intrusion detection. |
| **Visualization** | ![Grafana](https://img.shields.io/badge/Grafana-F46800?style=flat-square&logo=grafana&logoColor=white) | Dashboard for visualizing logs and metrics. |

---

## 🏗️ System Architecture
*Current planned architecture as of 22/12/2025.*

![System Architecture Diagram](highlevelArchi.png)

> **Note:** The architecture above illustrates the flow from the external client through the Nginx reverse proxy to the backend web servers.

---

## 🛠️ Installation & Branches

To view the specific configuration for each component, please navigate to the respective branches:

| Server / Service | Branch Name | Direct Link |
| :--- | :--- | :--- |
| **Reverse Proxy** | `reverseproxy` | [Go to Branch ->](../../tree/reverseproxy) |
| **Web Server A** | `webservera` | [Go to Branch ->](../../tree/webservera) |
| **Web Server B** | `webserverb` | [Go to Branch ->](../../tree/webserverb) |
| **DNS Server** | `dns` | [Go to Branch ->](../../tree/dns) |
| **DHCP Server** | `dhcp` | [Go to Branch ->](../../tree/dhcp) |
| **Wazuh Rules** | `wazuhrules` | [Go to Branch ->](../../tree/wazuhrules) |
