# Cheat Sheet Cisco Packet Tracer — Explications détaillées & Exemples

---

## 1. Modes de configuration

- **enable**  
  Passe du mode utilisateur (user EXEC) au mode privilégié (privileged EXEC), nécessaire pour modifier la configuration.

- **configure terminal** (`conf t`)  
  Permet d’entrer en mode de configuration globale pour modifier les paramètres du routeur ou switch.

- **exit**  
  Permet de sortir du mode actuel (ex : sortir du mode interface pour revenir au mode global).

- **end**  
  Permet de revenir directement au mode privilégié depuis n’importe quel mode de configuration.

- **write** / **copy running-config startup-config**  
  Sauvegarde la configuration en cours (running-config) dans la NVRAM (startup-config), pour la conserver après un redémarrage.

**Exemple :**
```shell
enable
configure terminal
!
exit
write
```

---

## 2. Configuration du nom d’hôte

```shell
hostname SW1
```
Donne le nom "SW1" à l’équipement (ici un switch).

---

## 3. Configuration des interfaces

```shell
interface g0/1
ip address 192.168.1.1 255.255.255.0
no shutdown
exit
```
- Attribue l’IP `192.168.1.1/24` à l’interface GigabitEthernet0/1 et l’active.

**Exemple sur plusieurs interfaces :**
```shell
interface g0/1
ip address 10.0.0.1 255.255.255.252
no shutdown
exit
interface g0/2
ip address 192.168.10.1 255.255.255.0
no shutdown
exit
```

---

## 4. Configuration d’une interface Loopback

```shell
interface loopback0
ip address 1.1.1.1 255.255.255.255
exit
```
- Crée une interface virtuelle toujours UP, utile pour les tests ou en tant qu'ID du routeur.

---

## 5. VLAN

### Création et configuration :
```shell
vlan 10
name SERVEURS
exit
```

### Affecter un VLAN à un port :
```shell
interface f0/2
switchport mode access
switchport access vlan 10
exit
```

### Trunk :
```shell
interface g0/1
switchport mode trunk
switchport trunk allowed vlan 10,20,30
exit
```

---

## 6. Routage statique

```shell
ip route 192.168.2.0 255.255.255.0 10.0.0.2
```
- Route tout le trafic destiné au réseau `192.168.2.0/24` via 10.0.0.2 (next-hop).

---

## 7. DHCP (Dynamic Host Configuration Protocol)

Permet d’attribuer automatiquement des adresses IP aux clients du réseau.

### Configuration de base d’un serveur DHCP sur un routeur :

```shell
ip dhcp excluded-address 192.168.1.1 192.168.1.10
ip dhcp pool LAN
 network 192.168.1.0 255.255.255.0
 default-router 192.168.1.1
 dns-server 8.8.8.8
 lease 7
```
- **ip dhcp excluded-address** : Plage d’adresses à ne pas attribuer (réservées à des serveurs, imprimantes, etc.).
- **ip dhcp pool [Nom]** : Crée un pool DHCP nommé.
- **network** : Précise le réseau et le masque utilisé pour la distribution.
- **default-router** : Adresse de la passerelle à fournir aux clients.
- **dns-server** : Adresse du serveur DNS à fournir aux clients.
- **lease [jours]** : Durée du bail d’adresse IP (en jours).

**Exemple complet :**
```shell
ip dhcp excluded-address 192.168.1.1 192.168.1.10
ip dhcp pool LAN
 network 192.168.1.0 255.255.255.0
 default-router 192.168.1.1
 dns-server 8.8.8.8
 lease 7
```

Pour vérifier les baux actifs :
```shell
show ip dhcp binding
```

---

## 8. Ping & Tests de connectivité

- **ping [adresse_ip]**  
  Permet de vérifier la connectivité.
  ```shell
  ping 8.8.8.8
  ```

- **traceroute [adresse_ip]**  
  Affiche le chemin des paquets.
  ```shell
  traceroute 8.8.8.8
  ```

---

## 9. Affichage & Dépannage

| Commande                | Explication                                    |
|-------------------------|------------------------------------------------|
| show running-config     | Montre la configuration active en mémoire      |
| show startup-config     | Montre la configuration sauvegardée (NVRAM)    |
| show ip interface brief | Résumé des interfaces et IP                    |
| show vlan brief         | Liste des VLANs configurés                     |
| show interfaces         | Détails techniques des interfaces              |
| show version            | Infos matérielles et logicielles de l’équipement |

**Exemples :**
```shell
show ip interface brief
show vlan brief
show running-config
```

---

## 10. Sécurité de base

```shell
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
- Mot de passe pour l’accès privilégié, la console et les accès distants (telnet/ssh).

---

## 11. Subnetting rapide

| Masque CIDR | Masque décimal        | Nb d’adresses / sous-réseau |
|-------------|-----------------------|-----------------------------|
| /24         | 255.255.255.0         | 256                         |
| /25         | 255.255.255.128       | 128                         |
| /26         | 255.255.255.192       | 64                          |
| /30         | 255.255.255.252       | 4                           |

**Exemple :**
Pour découper 192.168.1.0/24 en sous-réseaux de 64 adresses :
- 192.168.1.0/26 : 192.168.1.0 – 192.168.1.63
- 192.168.1.64/26 : 192.168.1.64 – 192.168.1.127
- etc.

---

## 12. Divers

| Commande                        | Utilité                       |
|----------------------------------|-------------------------------|
| reload                          | Redémarre l’appareil          |
| erase startup-config             | Efface la configuration NVRAM |
| clock set 19:10:00 4 JUN 2025   | Définit la date/heure         |

---

## 13. Astuce

- Utilise `?` après une commande partielle pour voir les options possibles.
- Utilise la touche TAB pour compléter automatiquement les commandes.

---