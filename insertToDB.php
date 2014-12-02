<?php 
if(isset($_GET["id"])) {
	$explode = explode('?', $_GET['id']);
	$id = $explode[0];
	$score = explode('score=', $explode[1]);
	$score = $score[1];

	if($id === null)
		$id = 0;
	if($score === null)
		$score = 0;
} else { 
	die();
}
$server = 'localhost';  //SERVER
$username = 'root';  //USERNAME TO DATABASE
$password = ''; //PASSWORD TO DATABASE 
$database = 'aow'; //DATABASE NAME 
 
 
$link = mysql_connect($server, $username, $password); 
mysql_select_db($database, $link);
 
$fetch = mysql_query("INSERT INTO age_of_war_score (`id`,`user_id`,`score`) VALUES (NULL, '$id', '$score')", $link) or die(mysql_error());


if($fetch) {
	$send = true;
} else {
	$send = false;
}
mysql_close($link);
header("Content-type: text/plain");
//header("Content-type: text/html");
echo $send;
?>