# Kubernetes - projekt
### Pawel Sakaluk

---

Przykładowa konfiguracja kubernetesa zapewniająca działanie (dodawanie imion do baz danych) i komunikację następujących elementów:
* `React` _(zbudowana i postawiona na `nginx`)_
* `Express`
* `MongoDB`
* `Redis`

---

Komunikację z całym systemem zapewnia usługa `Ingress`, która potrzebuje do poprawnego działania kontrolera, w tym przypadku `ingress-nginx`.

Nasłuchuje on na porcie _80_ i przekierowuje zapytania wewnątrz klastra do `nginx` odpowiedzialnego za frontend (port _80_) lub do backendu (port _5000_).

Poszczególne aplikacje są dostępne wewnątrz klastra dzięki usłudze `ClusterIP`.

---

Aplikacje konfigurowane są na podstawie przekazywanych im w deploymencie zmiennych środowiskowych, pochodzących z map konfiguracyjnych.

---

Zarówno frontend jak i backend mają ustawione po _2_ repliki, żeby w razie ewentualnych problemów i oczekiwania na ponowne uruchomienie poda nie nastąpiła przerwa w działaniu aplikacji. Ponadto poszczególne pody zostają trochę odciążone, dzięki podziałowi ruchu komunikacji.

Baza danych `MongoDB` ma dodatkowo zapewnioną trwałość danych.