<?php

function unzip_db($file_name) {

		//unzip db
			$buffer_size = 1000000; // read 4kb at a time
			$out_file_name = str_replace('.gz', '', $file_name); 

			// Open our files (in binary mode)
			$file = gzopen($file_name, 'rb');
			$out_file = fopen($out_file_name, 'wb'); 

			// Keep repeating until the end of the input file
			while (!gzeof($file)) {
					// Read buffer-size bytes
					// Both fwrite and gzread and binary-safe
					fwrite($out_file, gzread($file, $buffer_size));
			}

			// Files are done, close files
			fclose($out_file);
			gzclose($file);

}

function geoip_db() {
	try {
			//download db
			$dir_base =  str_replace('lib', '', __DIR__);
			$url  = 'http://geolite.maxmind.com/download/geoip/database/GeoLite2-Country.mmdb.gz';
			$path =  $dir_base.'/GeoLite2-Country.mmdb.gz';
			$ch = curl_init($url);

			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

			$data = curl_exec($ch);

			curl_close($ch);

			file_put_contents($path, $data);
			$file_name = $path;
			unzip_db($file_name);
			
		return true;
	} catch(Exception $e) {
		return $e->getMessage();
	}

}
