## Быстрый старт

Приложение запускается при помощи docker compose, командой

```bash
docker compose up [-d]
```

и по умолчанию работает по http протоколу на 80 порту.

Приложение доступно по адресам:

| **`endpoint`** | описание |
| --- | --- |
| **`/`** | дашборд |
| **`/api`** | API приложения |
| **`/swagger`** | Интерактивная документация API |

---
<br>

## Полная установка

### Установка Docker

Производится согласно [официальной документации](https://docs.docker.com/engine/install/) для вашего дистрибутива

### Настройка файрвола

```bash
sudo ufw allow 80    # Для HTTP
sudo ufw allow 443   # Для HTTPS
sudo ufw enable
```

### Клонирование репозитория

```bash
git clone https://github.com/pravietis13/RobotStatsApp.git
cd RobotStatsApp
```

### Создание SSL сертификата

```bash
openssl req -new -x509 -key ssl/key.pem -out
openssl req -new -x509 -key ssl/key.pem -out ssl/cert.pem -days <количество дней дествия сертификата> -subj "/CN=<ip-адрес | домен>"
```

В файле nginx.conf закомментируйте строку `listen 80;`;

раскомментируйте `listen 443;` и 2 строки `ssl_sertificate…`  как в примере:

```yaml
...	
        #listen 80;
        listen 443 ssl;

        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;
...
```

### Запуск приложения

```bash
docker compose up [-d]
```

Приложение будет работать по https протоколу на 443 порту

и будет доступно по адресам:

| **`endpoint`** | описание |
| --- | --- |
| **`/`** | дашборд |
| **`/api`** | API приложения |
| **`/swagger`** | Интерактивная документация API |