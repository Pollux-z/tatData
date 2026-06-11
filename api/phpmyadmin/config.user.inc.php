<?php
/**
 * phpMyAdmin configuration file
 */

// ตั้งค่าเซิร์ฟเวอร์ MySQL
$cfg['Servers'][1]['host'] = 'mysql';
$cfg['Servers'][1]['port'] = '3306';
$cfg['Servers'][1]['connect_type'] = 'tcp';
$cfg['Servers'][1]['compress'] = false;
$cfg['Servers'][1]['AllowNoPassword'] = false;

// ตั้งค่า UI
$cfg['DefaultLang'] = 'en';
$cfg['ThemeDefault'] = 'pmahomme';

// ตั้งค่าความปลอดภัย
$cfg['blowfish_secret'] = 'your-secret-key-here-32-characters-long';
$cfg['LoginCookieValidity'] = 3600; // 1 hour

// ตั้งค่าการอัปโหลด
$cfg['UploadDir'] = '/tmp/';
$cfg['SaveDir'] = '/tmp/';

// ตั้งค่าการแสดงผล
$cfg['MaxRows'] = 50;
$cfg['RowActionLinks'] = 'left';
$cfg['ShowChgPassword'] = true;
$cfg['ShowCreateDb'] = true;

// ตั้งค่า Export/Import
$cfg['Export']['compression'] = 'gzip';
$cfg['Import']['allow_interrupt'] = true;
?>