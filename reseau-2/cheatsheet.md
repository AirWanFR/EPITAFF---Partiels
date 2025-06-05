# Cheat Sheet Cisco Packet Tracer — Explications détaillées, Exemples et Syntaxe

---

## 1. Modes de configuration

- **enable**  
  Passe en mode privilégié (EXEC).  
  **Syntaxe :**  
  ```
  enable
  ```

- **configure terminal** (`conf t`)  
  Passe en mode de configuration globale.  
  **Syntaxe :**  
  ```
  configure terminal
  ```
  ou, plus court :
  ```
  conf t
  ```

- **exit**  
  Sort du mode courant.  
  **Syntaxe :**  
  ```
  exit
  ```

- **end**  
  Retourne directement en mode EXEC privilégié.  
  **Syntaxe :**  
  ```
  end
  ```

- **write** / **copy running-config startup-config**  
  Sauvegarde la configuration active.  
  **Syntaxe :**  
  ```
  write
  ```
  ou  
  ```
  copy running-config startup-config
  ```

---

## 2. Changer le nom de l'appareil (hostname)

**Syntaxe :**  
```
hostname <nom>
```
**Exemple :**  
```
hostname SW1
```

---

## 3. Configuration d'une interface IP

**Syntaxe :**  
```
interface <type><num>
 ip address <ip> <mask>
 no shutdown
exit
```
**Exemple :**  
```
interface g0/1
 ip address 192.168.1.1 255.255.255.0
 no shutdown
exit
```

---

## 4. Créer une interface Loopback

**Syntaxe :**  
```
interface loopback<num>
 ip address <ip> <mask>
exit
```
**Exemple :**  
```
interface loopback0
 ip address 1.1.1.1 255.255.255.255
exit
```

---

## 5. VLAN

### a) Créer un VLAN

**Syntaxe :**  
```
vlan <num>
 name <nom>
exit
```
**Exemple :**  
```
vlan 10
 name SERVEURS
exit
```

### b) Affecter un port à un VLAN

**Syntaxe :**  
```
interface <type><num>
 switchport mode access
 switchport access vlan <num>
exit
```
**Exemple :**  
```
interface f0/2
 switchport mode access
 switchport access vlan 10
exit
```

### c) Placer un port en trunk (multi-VLANs)

**Syntaxe :**  
```
interface <type><num>
 switchport mode trunk
 switchport trunk allowed vlan <liste_vlan>
exit
```
**Exemple :**  
```
interface g0/1
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30
exit
```

---

## 6. Trunk & Encapsulation Dot1Q (Router-on-a-Stick)

Pour router entre VLANs sur un seul port :

**Syntaxe :**  
```
interface <type><num>.<sousif>
 encapsulation dot1Q <vlan>
 ip address <ip> <mask>
exit
```
**Exemple :**  
```
interface g0/1.10
 encapsulation dot1Q 10
 ip address 192.168.10.254 255.255.255.0
exit
```

---

## 7. Routage statique

**Syntaxe :**  
```
ip route <réseau_dest> <masque> <next-hop>
```
**Exemple :**  
```
ip route 192.168.2.0 255.255.255.0 10.0.0.2
```

---

## 8. DHCP (serveur sur routeur)

**a) Exclure des adresses de la distribution**

**Syntaxe :**  
```
ip dhcp excluded-address <ip_debut> [ip_fin]
```
**Exemple :**  
```
ip dhcp excluded-address 192.168.1.1 192.168.1.10
```

**b) Créer un pool DHCP**

**Syntaxe :**  
```
ip dhcp pool <nom>
 network <réseau> <masque>
 default-router <ip_pass>
 dns-server <ip_dns>
 lease <jours>
```
**Exemple :**  
```
ip dhcp pool LAN
 network 192.168.1.0 255.255.255.0
 default-router 192.168.1.1
 dns-server 8.8.8.8
 lease 7
```

---

## 9. Sécurité de base (mots de passe)

**Syntaxe :**  
```
enable secret <motdepasse>
line console 0
 password <motdepasse>
 login
exit
line vty 0 4
 password <motdepasse>
 login
exit
service password-encryption
```
**Exemple :**  
```
enable secret cisco123
line console 0
 password consolepass
 login
exit
line vty 0 4
 password vtypass
 login
exit
service password-encryption
```

---

## 10. Vérification & dépannage

**Syntaxes utiles :**
- Afficher config active :
  ```
  show running-config
  ```
- Afficher config sauvegardée :
  ```
  show startup-config
  ```
- Résumé des interfaces :
  ```
  show ip interface brief
  ```
- Voir les VLANs :
  ```
  show vlan brief
  ```
- Infos interfaces détaillées :
  ```
  show interfaces
  ```
- Table MAC (sur switch) :
  ```
  show mac address-table
  ```
- Version IOS :
  ```
  show version
  ```

---

## 11. Ping & Traceroute

**Syntaxes :**
```
ping <ip>
traceroute <ip>
```
**Exemple :**
```
ping 8.8.8.8
traceroute 8.8.8.8
```

---

## 12. Commandes diverses

| Commande                        | Utilité                       |
|----------------------------------|-------------------------------|
| reload                          | Redémarre l’appareil          |
| erase startup-config             | Efface la configuration NVRAM |
| clock set <HH:MM:SS> <JJ> <MON> <AAAA> | Définit l’heure |

---

## 13. Subnetting rapide

| CIDR  | Masque décimal       | Nb d’adresses | Nb hôtes utilisables |
|-------|----------------------|---------------|---------------------|
| /24   | 255.255.255.0        | 256           | 254                 |
| /25   | 255.255.255.128      | 128           | 126                 |
| /26   | 255.255.255.192      | 64            | 62                  |
| /27   | 255.255.255.224      | 32            | 30                  |
| /28   | 255.255.255.240      | 16            | 14                  |
| /30   | 255.255.255.252      | 4             | 2                   |

---

## 14. Astuces

- Utilise `?` à n’importe quel moment pour voir les options possibles.
- Utilise la touche TAB pour compléter automatiquement les commandes.

---