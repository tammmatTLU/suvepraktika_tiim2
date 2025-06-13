# 2. tiimi suvepraktika hoidla
# Auditooriumite seadmete juhtimise/lülitamise lahendus 
## Tiimi koosseis: Mattias Tamm, Vaiko Villiam Tuul, Armin Jaemaa, Martin Sütt, Kert-Jan Ots

[Blogi](https://github.com/tammmatTLU/suvepraktika_tiim2/wiki/blogi)

### Projekti arendamiseks
- Tee kindlaks, et seadmes on olemas Node ja NPM ning PHP ja Composer
    - Node ja NPM on mugavaim laadida endale NVM (Node Version Manager) kaudu, aga saab ka teisiti
    - [PHP](https://www.php.net/manual/en/install.php) ja [Composeri](https://getcomposer.org/)
    alla laadimisel soovime teile kollektiivselt edu
- Ava terminal meie projekti kaustas ja jooksuta:
```bash
cd frontend
cp .env.example .env
npm i
cd ../backend
composer install
```
- Ava projekt oma lemmikus koodiredaktoris ja anna tuld

### Projekti käivitamine Dockeriga
- Ava oma lemmik terminal
- Loo vajalikud failid:
```bash
cd frontend
cp .env.example .env
```
- Tee kindlaks, et Docker ja Docker Compose on seadmes olemas
    - Testimiseks jooskuta `docker version` ja `docker compose version` ning hinda ise ;)
- Lõpetuseks jooksuta lihtsalt `docker compose up` või `docker compose up -d`, kui tekstisein sind häirib
