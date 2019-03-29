	<?php 
		session_start();
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
	<?php 
		function exist($word){
			$fichier=file("dico.txt");
			$a= explode(",", $fichier[0]);
			$i=count($a);
			for ($j=0; $j < $i; $j++) { 
				if($a[$j]==$word){
					return true;
				}
			}
			return false;
		}
		echo exist("cccc");
		?>
	</body>
</html>