<?php
    require_once 'include/database.inc.php';
    $query = "SELECT * FROM gladiators";
    $result = mysqli_query($g_dbLink, $query);
    if ($result)
    {
        $i = 1;
        while ($row = $result -> fetch_assoc())
        {
            echo $i . '. ' . $row['gladiators_name'] . ', ' . $row['attack'] . '<br />';
            $i++;
        }
    }