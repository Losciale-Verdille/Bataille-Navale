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
	
	function Tableauordi(){
		$size=[5,4,3,3,2,2];
		$current_edit=0;
		$compteur=0;
		$advsersaire=[];
		while($compteur !=100){//remplir le plateau
		$advsersaire[$compteur]=0;
		$compteur++;
		}
		while($current_edit !=6){
			$indice=rand(0,99);
			$direction=rand(0,1); //0 ou 1
			if ($direction && $indice%10<6){
				for ($i=$indice ; $i <$indice+$size[$current_edit]; $i++) {
					$advsersaire[$i]=$current_edit+1;
				}
				$current_edit++;
			}else if(!$direction && $indice<($size[$current_edit]+1)*10-1){
				for ( $i=$indice ; $i <$indice+($size[$current_edit])*10; $i+=10) {
					$advsersaire[$i]=$current_edit+1;
				}
				$current_edit++;
			}

		}
		$current_edit=0;
		//provisoire
		$texte="";
		for ($i = 0; $i <10; $i++) {

			for ($j = 0; $j < 10; $j++) {
				$texte.=$advsersaire[$i*10+$j].",";
			}
			$texte.="<br>";
			
		}
		echo $texte;
		return $advsersaire;
	}
	$ordi=Tableauordi();
?>

<!DOCTYPE html>
	<head>
		<meta charset="utf-8">
		<title>Bataille Navale</title>
		<meta name="author" content="Losciale-Verdille">
		<link rel="stylesheet" type="text/css" href="style.css">
		<script src="script.js"></script>
		<script src="simpleajax.js"></script>
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