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
		<h1 style="text-align: center">Bataille Navale</h1>
		<hr>

		<div id="rules">
			<h2>Comment démarrer une partie</h2>
			<p>Pour démarrer une partie, vous devrez entrer votre nom dans l'emplacement prévu à cet effet sur votre droite. Cet identifiant nous permet d'établir un classement pour comparer vos victoires par rapport aux autres joueurs!</p>
			<p>Une fois votre nom renseigné, vous accéderez à la partie vous permettant de placer vos bateaux sur un plateau de 100 cases. La procédure est guidée par un indicateur situé au dessus du plateau</p>
			<br>
			<h2>Règles du jeu</h2>
			<p>Après avoir placé vos bateaux, vous affronterez votre adversaire tour par tour. Une case bleu signifie que la case n'a pas été jouée, <img id ="legende" src="Boom.png"> indique qu'un bateau a été touché et <img id="legende" src="rate.png"> indique qu'aucun bateau n'a été touché lors du tir dans cette case.</p>
			<p>Le gagnant est celui qui coule tout les bateaux de son adversaire.</p>
			<p>PREPAREZ VOS MISSILES, QUE LA BATAILLE COMMENCE !!!</p>
		</div>

		<div id="start">
			<h2>Commencer une partie</h2>
			<form action="Jeu.php" method="post">
				Entrer votre nom ici :
				<br>
				<input type="text" name="joueur">
				<br>
				<br>
				<input type="submit" value="Jouer !">
			</form>
		<img src="bateau.jpg"> 
		</div>

	</body>
</html>
