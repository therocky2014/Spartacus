<?php
    require_once 'include/database.inc.php';
    $name = trim(strip_tags($_POST['user']));
    $score = trim(strip_tags($_POST['score']));
    $query = "INSERT INTO players(name, score) VALUES('$name', $score)";
    mysqli_query($g_dbLink, $query);