FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev \
    libzip-dev libpq-dev zip unzip wget \
    && docker-php-ext-install pdo pdo_mysql intl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN curl -1sLf 'https://dl.cloudsmith.io/public/symfony/stable/setup.deb.sh' | bash \
    && apt-get update \
    && apt-get install -y symfony-cli

WORKDIR /backend

COPY composer.json composer.lock symfony.lock ./

RUN composer install --optimize-autoloader --no-scripts

COPY . .

RUN composer run-script post-install-cmd --no-interaction || true

RUN mkdir -p var/cache var/log \
    && chmod -R 777 var


