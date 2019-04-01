<?php
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
		<div id=score>
		<table>
		<th>Place</th><th>Joueur</th><th>Victoire(s)</th>
		<?php
			$p=score_array("scores.csv");
			arsort($p,SORT_NATURAL);
			$i = 1;
			foreach ($p as $key => $value) {
				$s = "<tr><td id='rank'>$i.</td>";
				$s .= "<td id='p_rank'>$key</td>";
				$s .= "<td id='v_rank'>$value</td></tr>";
				echo $s;
				$i++;
			}	
		?>
		</table>
		</div>
	</body>
</html>