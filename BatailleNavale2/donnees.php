<?php 
	session_start();

	function etatcase($id){
		return $_SESSION["ordi"][$id];
	}
	echo etatcase($_GET["id"]);
?>

