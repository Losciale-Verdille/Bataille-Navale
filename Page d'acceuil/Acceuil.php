<?php 
	session_start();
?>
<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta charset="utf-8">
		<title>Acceuil</title>
		<meta name="author" content="Losciale-Verdille">
		<meta name="viewport" content="width=device-width; initial-scale=1.0">
	</head>
	<body>
	<h1>Bataille Navale</h1>
	<hr>
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
