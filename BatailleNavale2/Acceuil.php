<?php 
	session_start();
?>
<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta charset="utf-8">
		<title>Acceuil</title>
		<meta name="author" content="Losciale-Verdille">
		<link rel="stylesheet" type="text/css" href="style.css">
	</head>
	<body>
	<h1>Bataille Navale</h1>
	<br>
	<h2>Commencer une partie</h2>
	<form action="Jeu.php" method="post">
		Nom du joueur :
		<br>
		<input type="text" name="joueur">
		<br>
		<br>
		<input type="submit" value="Jouer !">
	</form>
	</body>
</html>