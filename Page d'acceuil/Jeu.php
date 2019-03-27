<?php
	//A integrer dans le vrai jeu.php
	session_start();
	$_SESSION["joueur"] = $_POST["joueur"];
?>
<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta charset="utf-8">
		<title>Jeu</title>
		<meta name="author" content="Losciale-Verdille">
		<meta name="viewport" content="width=device-width; initial-scale=1.0">
		<link rel="stylesheet" type="text/css" href="style.css">
		<script src="script.js"></script>
	</head>
	<body>
		<div id=jeu></div>
	</body>
</html>
