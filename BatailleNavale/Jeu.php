<?php
	//A integrer dans le vrai jeu.php
	session_start();
	$_SESSION["joueur"] = $_POST["joueur"];
	function score_array($file) {
		$classement = array();
		foreach (file($file) as $line) {
			$user_tab = explode(":",$line);
			$classement[] = $user_tab;
		}
		return $classement;
	}
	function classer($tab) {
		$rep[] = $tab[0];
		for($i=0;$i<sizeof($tab);$i++){
			for($j=0;$j<sizeof($rep);$j++){
echo rep[0];
				if(tab[$i][1]<rep[$j][1]){
					$rep.splice($j,0,$tab[$i]);
				}
			}
		}
	return $rep;
	}
?>
<!DOCTYPE html>
<html lang="fr">
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
		$p=classer($p)[0][1];
echo $p; ?>
	</body>
</html>
