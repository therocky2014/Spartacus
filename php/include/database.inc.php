<?php
    require_once 'config.inc.php';
    $g_dbLink = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT);
    $error = mysqli_connect_error();
    if ($error)
    {
        die('Unable to connect to DB');
    }