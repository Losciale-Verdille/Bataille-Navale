<?php
	session_start();
	if(!isset($_POST["joueur"])){
		header("Location:Acceuil.php");
		exit();
	}
	$_SESSION["joueur"] = $_POST["joueur"];
	function score_array($file) {
		$classement = array();
		foreach (file($file) as $line) {
			$user_tab = explode(":",$line);
			$classement[$user_tab[1]] = $user_tab[2];
		}
		return $classement;
	}
	function Tableauordi(){
		$size=[5,4,3,3,2,2];
		$current_edit=0;
		$compteur=0;
		$adversaire=[];
		//On initialise le tableau de l'ordi
		while($compteur !=100) {
			$adversaire[$compteur]=0;
			$compteur++;
		}
		$compteur = 0;
		//Génération aléatoire de l'ordi
		while($current_edit !=6){
			$indice=rand(0,99);
			$direction=rand(0,1); //0=hauteur ou 1=longueur
			$isFree = true; // État de la vérificiation en cas de superposition
			//Placement du bateau dans le sens de la longueur
			if ($direction && $indice%10<11-$size[$current_edit] && $indice+$size[$current_edit]<100) {
				for ($i=$indice ; $i <$indice+$size[$current_edit]; $i++) {
					if ($adversaire[$i] == 0) $adversaire[$i]=$current_edit+1;
					else {// on reset et on verrouille l'incrémentation du compteur d'édition
						$isFree = false;
						while($compteur !=100) {
							if ($adversaire[$compteur] == $current_edit+1) $adversaire[$compteur] = 0;
							$compteur++;
						}
						$compteur = 0;
						break;
					}	
				}
				if ($isFree) $current_edit++;
			//Placement du bateau dans le sens de la hauteur
			}else if(!$direction && $indice<($size[$current_edit]+1)*10-1 && $indice+($size[$current_edit])*10<100) {
				for ( $i=$indice ; $i <$indice+($size[$current_edit])*10; $i+=10) {
					if ($adversaire[$i] == 0) $adversaire[$i]=$current_edit+1;
					else {// on reset et on verrouille l'incrémentation du compteur
						$isFree=false;
						while($compteur !=100){
							if ($adversaire[$compteur] == $current_edit+1) $adversaire[$compteur]=0;
							$compteur++;
						}
						$compteur = 0;
						break;
					}
				}
				if ($isFree) $current_edit++;
			}	
		}
		$current_edit=0;
		//provisoire
		$texte="";
		for ($i = 0; $i <10; $i++) {
			for ($j = 0; $j < 10; $j++) {
				$texte.=$adversaire[$i*10+$j].",";
			}
			$texte.="<br>";
			
		}
		return $adversaire;
	}

	$_SESSION["ordi"]=Tableauordi();
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
		<div ><p id="info"></p></div>
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
		<div><p id='resultat'></p></div>
		</div>
	</body>
</html>