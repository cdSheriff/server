stream {
	upstream mosquitto {
	server 127.0.0.1:1883;
	}

server {
	listen 8883;

	proxy_pass mosquitto;

	#if ($request_method !~ ^(GET|HEAD|POST)$ )
	#{
	#	return 405;
	#}

	#server_name mqtt.cdsheriff.com;

	ssl_certificate			/etc/letsencrypt/live/cdsheriff.com/fullchain.pem;
	ssl_certificate_key		/etc/letsencrypt/live/cdsheriff.com/privkey.pem;

	#ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
	#ssl_prefer_server_ciphers on;
	#ssl_ciphers ‘EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH’;

	#location / {
	#	proxy_set_header		X-Real-IP	$remote_addr;
	#	proxy_set_header		Host		$http_host;
	#	proxy_pass				http://127.0.0.1:4000;
	#}

	#access_log /var/log/nginx/mqtt_access.log combined;
}
}