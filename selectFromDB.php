<?php 
if(isset($_GET["id"]))
	$id = $_GET["id"];
else 
	die();
$server = 'localhost';  //SERVER
$username = 'root';  //USERNAME TO DATABASE
$password = ''; //PASSWORD TO DATABASE 
$database = 'aow'; //DATABASE NAME 
 
 
$link = mysql_connect($server, $username, $password); 
mysql_select_db($database, $link);
 
$fetch = mysql_query("SELECT * FROM age_of_war_score WHERE user_id='$id'", $link) or 
die(mysql_error()); 
 
$num = mysql_num_rows($fetch); 

if (empty($num)) {
   $send = null; 
} else { 
  // $send = mysql_result($fetch, 'name'); 
	$send = mysql_result($fetch, 0, 'score'); 
}
mysql_close($link);
header("Content-type: text/plain");
//header("Content-type: text/html");
echo $send;
?>