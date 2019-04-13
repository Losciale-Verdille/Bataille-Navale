<?php 
	session_start();

	function mettreajour($file){
		$joueur=$_SESSION["joueur"];
		$trouve=0;
		$classement = array();
		foreach (file($file) as $line) {
			$user_tab = explode(":",$line);
			$classement[$user_tab[0]] = [$user_tab[1],$user_tab[2]];
		}
		foreach ($classement as $key) {
			if ($key[0]==$joueur) {
				$key[1]+=1;
				$trouve=1;
			}
		}
		if (!$trouve) {
			$classement[] = [$joueur,1];
		}
		$texte="";
		for ($i=0; $i <sizeof($classement) ; $i++) { 
			$texte.=$i.":".$classement[$i][0].":".$classement[$i][1];
		}
		file_put_contents($file, $texte);

	}
	echo mettreajour("scores.csv");
?>
