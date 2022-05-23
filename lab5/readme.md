
Selamat malam Pak Adin, Tim Asdos, dan teman-teman semuanyaa!

Pada thread ini, saya akan menjelaskan mengenai eksplorasi lab yang telah saya lakukan.

Instalasi Nginx pada Virtual Machine

Pertama, kita perlu menginstall dulu nginx agar bisa digunakan pada virtual machine.

sudo apt update
sudo apt install nginx
Konfigurasi port listen 58433

Selanjutnya, saya melakukan konfigurasi port agar nginx listen pada port 58433 ( port yang memiliki domain)

nano /etc/nginx/sites-available/default
dan mengubah port 80 menjadi port 58433 sebagai berikut



Setela itu, kita perlu melakukan restart pada service nginx agar perbaruan konfigurasi kita dapat digunakan.

/etc/init.d/nginx restart
Memastikan server nginx dapat diakses

Saya akan membuka website untuk memastikan bahwa server nginx telah berjalan dengan baik. Website tersebut dapat diakses melalui http://host-1906398433-port-58433.proxy.infralabs.cs.ui.ac.id/ 

Konfigurasi reverse proxy

Selanjutnya, kita akan mengimplementasikan reverse proxy pada vm kita. Kali ini, saya akan mencoba menambahkan 2 app dari tugas1 pada path /tugas-1/ dan tugas 2 (lab4) melalui path /

nano /etc/nginx/sites-available/default


Note: jangan lupa untuk menambahkan front-slash pada akhir alamat proxy pass, karena saya sempat tidak berhasil karena lupa menambahkan ini 😁 Mungkin dari teman-teman ada yang mengerti kenapa harus ditambahkan ? 

Memastikan server proxy dapat diakses

Setelah seluruh konfigurasi selesai, saatnya memastikan website kita dapat diakses tanpa vpn ui melalui url berikut:

Tugas 1 : http://host-1906398433-port-58433.proxy.infralabs.cs.ui.ac.id/tugas-1/

Tugas 2 (lab 4) : http://host-1906398433-port-58433.proxy.infralabs.cs.ui.ac.id/

Sekian eksplorasi yang dapat saya sampaikan. Terima kasih atas perhatiannya. 

Salam,

Fayaad

Referensi : 

- https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-debian-10

- Thread teman-teman yang sudah mengisi forum sebelumnya 😆
