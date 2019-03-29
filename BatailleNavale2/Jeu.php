<?php
	//A integrer dans le vrai jeu.php
	session_start();
	$_SESSION["joueur"] = $_POST["joueur"];

	function score_array($file) {
		$classement = array();
		foreach (file($file) as $line) {
			$user_tab = explode(":",$line);
			$classement[$user_tab[0]] = $user_tab[1];
		}
		return $classement;
	}



?>
<!DOCTYPE html>
	<head>
		<meta charset="utf-8">
		<title>Bataille Navale</title>
		<meta name="author" content="Losciale-Verdille">
		<link rel="stylesheet" type="text/css" href="style.css">
		<script src="script.js"></script>
	</head>
	<body>
		<div id=jeu></div>
		<div id=score></div>
	<?php $p=score_array("scores.csv");
			arsort($p);
			foreach ($p as $key => $value) {
				echo $key;
			}
			
		?>
	</body>
</html>