FROM wordpress:latest
RUN rm -rf /usr/local/etc/php/conf.d/opcache-recommended.ini
COPY . /var/www/html/wp-content/themes/acn_ml
EXPOSE 80

