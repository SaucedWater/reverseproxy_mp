# 🛡️ Wazuh Rules & AI Integration

![Branch](https://img.shields.io/badge/Branch-Wazuh%20Rules-blue?style=for-the-badge)
![Tech](https://img.shields.io/badge/Tech-Wazuh-blue?style=for-the-badge&logo=wazuh&logoColor=white)
![Tech](https://img.shields.io/badge/Tech-Python-3776AB?style=for-the-badge&logo=python&logoColor=white)

> [!NOTE]
> This branch hosts the custom **Wazuh** detection rules and the **Ollama** integration scripts. It defines how security events are detected and forwarded to the AI model for analysis.

---

## 📂 Content Overview

Below are the scripts and rule files required to bridge Wazuh with the Ollama API and define custom alerts.

| File / Directory | Description |
| :--- | :--- |
| **`integration/`** | Directory containing external integration scripts and wrappers. |
| **`integration/custom-ollama.py`** | The Python script that interfaces between the Wazuh Manager and the Ollama API. |
| **`integration/custom-ollama`** | The shell wrapper/executable config required by Wazuh to trigger the Python script. |
| **`wazuh_rules/`** | Directory storing custom XML detection rules. |
| **`wazuh_rules/local_rules.xml`** | The specific Wazuh rules file defining alert conditions and integration triggers. |

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
