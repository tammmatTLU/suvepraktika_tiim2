# Auditooriumite seadmete juhtimise/lülitamise lahendus 
## Antud projekt on loodud <a href="https://www.tlu.ee/dt">DTI </a> "tarkvaraarenduse projekt" aine raames
## Tiimi koosseis: Mattias Tamm, Vaiko Villiam Tuul, Armin Jaemaa, Martin Sütt, Kert-Jan Ots (benched), Peter Saan (on loan)

<h1 id="table-of-contents"> :book: Sisukord</h1>
<details open="open">
  <summary>Sisukord</summary>
  <ol>
    <li><a href="#project-summary"> ➤ Eesmärk </a></li>
    <li><a href="#project-tech"> ➤ Kasutatud Tehnoloogiad</a></li>
    <li><a href="#instructions"> ➤ Juhised käivitamiseks</a></li>
    <li><a href="#application-tests"> ➤ Testimine</a></li>
    <li><a href="#pictures"> ➤ Pildid rakendusest</a></li>
    <li><a href="#licence"> ➤ MIT litsents</a></li>
  </ol>
</details>

<a href="https://github.com/tammmatTLU/suvepraktika_tiim2/wiki">Blogi<a>

<h1 id="project-summary"> Eesmärk </h1>
<p>Antud toote eesmärk on vahetada välja Tallinna ülikooli auditooriumites olev seadmete juhtimise tarkvara. Rakendus on mõelnud tahvelarvutile ja peab olema võimeline sisse ja välja lülitada kindlas auditooriumis olevaid seadmeid ja hõlpsustama suures auditooriumis erinevate seadmete kasutamist. Antud tahvleid võib olla rohkem kui üks mis võivad dubleerida üksteist või täiesti eraldi seisev seade, kuid peab olema võimeline samas ruumis seadmeid kontrollida. Rakenduse Administraatoril on õigus teha rakenduses uusi kasutajaid/vaateid, muuta tahvlis olevate nuppude asetus ja kujundust.</p>

<h1 id="project-tech"> :desktop_computer: Tehnoloogiad </h1>
<p>
    <ul>
        <li>PHP 8.4.8</li>
        <li>symfony framework 5.11.0</li>
        <li>react 19.1.0</li>
        <li>react-dom 19.1.0</li>
        <li>react-redux 9.2.0</li>
        <li>react-rnd 10.5.2</li>
        <li>react-router-dom 7.6.2</li>
        <li>redux 5.0.1</li>
        <li>redux-undo 1.1.0</li>
    </ul>
</p>
<p>Arenduse jooksul kasutasime Dockerit versioon 28.1.1</p>

<h1 id="instructions">Juhised</h1>

## Projekti käivitamine Dockeriga:
- Ava oma lemmik terminal
- Klooni repo ja mine sinna sisse
- Loo vajalikud failid:
```bash
cd frontend
cp .env.example .env
```
- Tee kindlaks, et Docker ja Docker Compose on seadmes olemas
    - Testimiseks jooskuta `docker version` ja `docker compose version` ning hinda ise ;)
- Lõpetuseks jooksuta lihtsalt `docker compose up` või `docker compose up -d`, kui tekstisein sind häirib

## Ilma Dockerita:

### Eeltingimused
- Node.js (v16+)
- PHP (v8.1+)
- Composer
- MySQL
- Git

### 1. Paigaldus
```bash
git clone -b live-branch https://github.com/tammmatTLU/suvepraktika_tiim2.git
cd suvepraktika_tiim2
```
### 2. MariaDB andmebaasi seadistamine
Andmebaasi loomine ja kasutaja seadistamine
```bash
mysql -u root -p
```
```sql
CREATE DATABASE suvepraktika CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'suvekasutaja'@'localhost' IDENTIFIED BY 'asd1';
GRANT ALL PRIVILEGES ON suvepraktika.* TO 'suvekasutaja'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```
### 3. Backendi seadistamine
```bash
cd backend
composer install
```
Muuda .env faili andmebaasi seaded:
```ini
MARIADB_PORT=3306
MARIADB_HOST=127.0.0.1
MARIADB_USER=suvekasutaja
MARIADB_PASSWORD=asd1
MARIADB_DATABASE=suvepraktika
DATABASE_URL="mysql://suvekasutaja:asd1@127.0.0.1:3306/suvepraktika?serverVersion=mariadb-versiooninumber"
```
Andmebaasi migratsioonid ja seedimine
```bash
php bin/console doctrine:migrations:migrate -n
php bin/console doctrine:fixtures:load -n
```
### 4.Frontendi seadistamine
```bash
cd ../frontend
npm install
cp .env.example .env
```
### 5.Root kaustas projekti käivitamine
```bash
cd ../
npm install
npm run start
```

<h2 id="application-tests">Testimine</h2>
<p>GitHub repositooriumis on fail nimega "Testplaan.pdf" kus on kirjas meie testplaan. Kindlaid testjuhtumeid me ei jõudnud teha, ega kontrollida, kuid arenduse jooksul kasutasime manuaalset ja uuritavat testimist.</p>
<p><a href="https://github.com/tammmatTLU/suvepraktika_tiim2/blob/scripts/Testiplaan.pdf">Testplaan</a></p>

<h2 id="pictures">Pildid rakendusest</h2>

<h3>Admin põhivaade</h3>
<img src="https://github.com/tammmatTLU/suvepraktika_tiim2/blob/live-branch/Screenshots/Screenshot%202025-06-19%20111112.png" alt="admin_põhivaade"/>
<h3>Admin toa valiku leht</h3>
<img src="https://github.com/tammmatTLU/suvepraktika_tiim2/blob/live-branch/Screenshots/Screenshot%202025-06-19%20111136.png" alt="admin_toa_valik"/>
<h3>Admin kasutaja vaate redigeerimise leht</h3>
<img src="https://github.com/tammmatTLU/suvepraktika_tiim2/blob/live-branch/Screenshots/Screenshot%202025-06-19%20111511.png" alt="admin_redigeerimise_leht"/>
<h3>Kasutaja vaade redigeerimine</h3>
<img src="https://github.com/tammmatTLU/suvepraktika_tiim2/blob/live-branch/Screenshots/Screenshot%202025-06-19%20111555.png" alt="kasutaja_vaate_redigeerimine"/>
<h3>Nupu/teksti lisamine kasutaja vaatele</h3>
<img src="https://github.com/tammmatTLU/suvepraktika_tiim2/blob/live-branch/Screenshots/Screenshot%202025-06-19%20111518.png" alt="nupu_lisamine"/>
<h3>Nupu malli/käsu lisamine</h3>
<img src="https://github.com/tammmatTLU/suvepraktika_tiim2/blob/live-branch/Screenshots/Screenshot%202025-06-19%20111525.png" alt="nupu_malli_lisamine"/>
<h3>Kasutaja vaate terve lehe redigeerimine</h3>
<img src="https://github.com/tammmatTLU/suvepraktika_tiim2/blob/live-branch/Screenshots/Screenshot%202025-06-19%20111531.png" alt="Lehe_redigeerimine"/>
<h3>Vaate kopeerimine</h3>
<img src="https://github.com/tammmatTLU/suvepraktika_tiim2/blob/live-branch/Screenshots/Screenshot%202025-06-19%20111539.png" alt="Vaate_kopeerimine"/>
<h3>Admin seadmete juhtimise vaade</h3>
<img src="https://github.com/tammmatTLU/suvepraktika_tiim2/blob/live-branch/Screenshots/Screenshot%202025-06-19%20111611.png" alt="admin_seadmete_juhtimine"/>
<h3>Admini keskne kontrollpaneel</h3>
<img src="https://github.com/tammmatTLU/suvepraktika_tiim2/blob/live-branch/Screenshots/Screenshot%202025-06-19%20111626.png" alt="Admin_keskne_kontrollpaneel"/>
<h3>Kasutaja vaade</h3>
<img src="https://github.com/tammmatTLU/suvepraktika_tiim2/blob/live-branch/Screenshots/Screenshot%202025-06-19%20111652.png" alt="kasutaja_vaade"/>

<h2 id="licence"><a href="https://github.com/tammmatTLU/suvepraktika_tiim2/blob/live-branch/licence.md">MIT licence</a></h2>
