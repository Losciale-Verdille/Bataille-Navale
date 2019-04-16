let plateau=[];
	let plateaujouer=[];
	let memoireordi=null;
	let compteur=0;//remplir le plateau
	let edition=true; //pour placer les bateaux au debut
	let gagne=0;
	let handler=0;
	let reussi=0;//19 max
	let coulé = []; //bateaux coulés du joueur (indice dans flotte)
	while(plateau.length !=100){//remplir le plateau
		plateau[compteur]=0;
		plateaujouer[compteur]=0
		compteur++;
	}
	//Initialisation des bateaux pour le jeu
	let bt1 = new Object(); let bt2 = new Object(); let bt3 = new Object(); let bt4 = new Object(); let bt5 = new Object(); let bt6 = new Object();
	bt1.size = 5; bt2.size = 4; bt3.size = 3; bt4.size = 3; bt5.size = 2; bt6.size = 2;
	bt1.id=1; bt2.id=2; bt3.id=3; bt4.id=4; bt5.id=5; bt6.id =6;
	bt1.xy=[];bt2.xy=[];bt3.xy=[];bt4.xy=[];bt5.xy=[];bt6.xy=[];
	let flotte=[bt1,bt2,bt3,bt4,bt5,bt6];
	let current_edit = 0; //stocker l'id du bateau en train d'être placé
	let case1=null;

	//Génére le code HTML du plateau de jeu
	function genereTableau(){
		let texte="<p id=\"info\"></p><table class='table'>";
		for (let i = 0; i <10; i++) {
			texte+="<tr>";
			for (let j = 0;j<10; j++) {
				texte += "<td class='td' onclick='jouer("+(10*i+j)+")' id='"+(10*i+j)+"'>";
			}
			texte+="</tr>";
		}
		texte+="</table>";
		document.getElementById("jeu").innerHTML= texte;
		document.getElementById("info").innerHTML="Placez un bateau de "+flotte[current_edit].size+" cases de long";
	}

	//Vérifie que les bateaux sont placés correctement
	//Notamment qu'il ne se croise ou ne se superpose pas
	//Gère l'animation des bateaux lorsque le positionnement
	//des bateaux est correct
	function superposition(case1,case2,increment,isFree,inv){
		let save = [];
		for (var i = case1; i <= case2; i+=increment) { // on met image + plateau a jour
			save[save.length] = i;
			if (plateau[i] == 0) {
				plateau[i]=flotte[current_edit].id;
			}else {
				alert("Case(s) indisponible(s)! Replacez votre 2ème clic pour former un bateau de "+flotte[current_edit].size+" cases de long.");
				for (let j=0; j<save.length-1; j+=increment) { //on reset les cases déjà animées
					document.getElementById(save[j]).style.backgroundColor = "blue";
					plateau[save[j]]=0;
				}
				//on remet le repère du 1er clic
				if (inv) {
					document.getElementById(case2).style.backgroundColor = "green";
				}else{
					document.getElementById(case1).style.backgroundColor = "green";
				}
				isFree = false;
				return isFree;
			}
		}
		if (isFree) {
			flotte[current_edit].xy=save;
			document.getElementById(case1).style.backgroundColor = "blue";
			document.getElementById(case2).style.backgroundColor = "blue";
			if (increment==1) {
				document.getElementById(case1).innerHTML='<center><img src="gauche.png"></center>';
				document.getElementById(case2).innerHTML='<center><img src="droite.png"></center>';
			}else{
				document.getElementById(case1).innerHTML='<center><img src="haut.png"></center>';
				document.getElementById(case2).innerHTML='<center><img src="bas.png"></center>';					
			}
			for (var z = case1+increment; z < case1+(flotte[current_edit].size-1)*increment; z+=increment) {
				if (increment==1) {
					document.getElementById(z).innerHTML='<center><img src="mil.png"></center>';
				}else{
					document.getElementById(z).innerHTML='<center><img src="mili.png"></center>';
				}
			}
		}
		return isFree;
	}
	
	//Gère les paramètres de la fonction précédente
	//Aide au placement des bateaux en début de partie
	function placement(case1,case2,isFree,increment){
		if (case2<case1) { 
			isFree=superposition(case2,case1,increment,isFree,1);
		}else{
			isFree=superposition(case1,case2,increment,isFree,0);
		}
		if (isFree) {
			current_edit++;
			if (current_edit<6) {
				document.getElementById("info").innerHTML="Placez un bateau de "+flotte[current_edit].size+" cases";
			}
			return null;
		}
		return case1;
	}


	function jouer(id){
		if ((!gagne) && handler!= null) {
			if (edition) { // on place les bateaux en 2 clics
				if(case1 == null){ // stocke la premiere case cliquée
					if (plateau[id]==0) {				
						case1=id;
						document.getElementById(case1).style.backgroundColor = "green"; // Repère 1er clic
					}else {
						alert("Case indisponible!\nSélectionner une autre case.");
					}
				}else { // stocke la 2eme case
					let isFree = true;
					if ((Math.abs(id-case1) == flotte[current_edit].size-1) && (Math.floor(id/10) == Math.floor(case1/10))) { //si longueur egale à celle du bateau qu'on pose en longueur ET sur la même ligne
						case1=placement(case1,id,isFree,1);
					}else if (Math.abs(id-case1)== (flotte[current_edit].size-1) *10) {//si longueur egale à celle du bateau qu'on pose en hauteur
						case1=placement(case1,id,isFree,10);
					}else{// Erreur de placement
						alert("Dimension invalide!\nRéessayez en replaçant votre 2ème clic.\nRappel : Un bateau long de "+flotte[current_edit].size+" cases doit être placé!");
					}
					if (current_edit==6) { // on joue après avoir mis les 6 bateaux
						edition=false;
						document.getElementById("info").innerHTML="A vous de jouer !";
						setTimeout(miseajourordi,500);
					}
				}
			}else{
				new simpleAjax("donnees.php", "get", "id="+id,sucess);
			}	
		}else{
			console.log("fin");
		}
	}

	//Vérifie qu'il ne reste plus de bateau non coulé
	function checkgagne(tab){
		gagne=1;
		for(var place in tab){
			if (tab[place]==1 || tab[place]==2 ||tab[place]==3|| tab[place]==4 ||tab[place]==5|| tab[place]==6) {
				gagne=0;
			}
		}
		if (gagne) {
			onWin("Vous avez perdu...");
		}
	}

	//Aniamation plateau du joueur après jeu de l'ordinateur
	function miseajourplayer(){ 
		document.getElementById("info").innerHTML="A l'adversaire de jouer !";
		coupOrdi();// on voit le plateau du joueur
		for (let i = 0; i < 100; i++) {
			let num=plateau[i];
			if (num==0) {
				document.getElementById(i).innerHTML='';
			}else if(num==-1){
				document.getElementById(i).innerHTML='<center><img src="Boom.png"></center>';
			}else if(num==-2){
				document.getElementById(i).innerHTML='<center><img src="rate.png"></center>';
			}else if(num==plateau[i+1]&&num!=0 &&num!=-1 &&num!=-2 &&(plateau[i-1]!=num)){
				document.getElementById(i).innerHTML='<center><img src="gauche.png"></center>';
			}else if(num==plateau[i-1]&&num!=0 &&num!=-1 &&num!=-2 &&(plateau[i+1]!=num)){
				document.getElementById(i).innerHTML='<center><img src="droite.png"></center>';
			}else if(num==plateau[i-10]&&num!=0 &&num!=-1 &&num!=-2 &&(plateau[i+10]!=num)){
				document.getElementById(i).innerHTML='<center><img src="bas.png"></center>';
			}else if(num==plateau[i+10]&&num!=0 &&num!=-1 &&num!=-2 &&(plateau[i-10]!=num)){
				document.getElementById(i).innerHTML='<center><img src="haut.png"></center>';
			}else if(num==plateau[i+1]){
				document.getElementById(i).innerHTML='<center><img src="mil.png"></center>';
			}else if(num==plateau[i+10]){
				document.getElementById(i).innerHTML='<center><img src="mili.png"></center>';
			}else{
				document.getElementById(i).innerHTML='<center><img src="seul.png"></center>';
			}
		}
		checkgagne(plateau);
		checkCoulé(plateau);
		setTimeout(miseajourordi,2000);
	}

	//Tir de l'ordinateur
	function coupOrdi(){
		let compteur=0;
		let coup=null;
		if (memoireordi==null) {
			coup=Math.floor(Math.random()*Math.floor(100));
			while (plateau[coup]== -1 || plateau[coup]== -2){
				coup=Math.floor(Math.random()*Math.floor(100));
			}
		}else{
			coup=memoireordi;
			while(coup==memoireordi){
				compteur++;
				switch(Math.floor(Math.random()*Math.floor(4))){
					case 0:
						if (plateau[coup+1]!=-1 &&plateau[coup+1]!=-2&& coup+1<100) {
							coup+=1;
						}
						break;
					case 1:
						if (plateau[coup-1]!=-1 &&plateau[coup-1]!=-2&& coup-1>=0) {
							coup-=1;
						}
						break;
					case 2:
						if (plateau[coup-10]!=-1 &&plateau[coup-10]!=-2 && coup-10>=0) {
							coup-=10;
						}
						break;
					case 3:
						if (plateau[coup+10]!=-1 &&plateau[coup+10]!=-2&& coup+10<100) {
							coup+=10;
						}	
						break;
				}
				if (compteur==20) {
					while (plateau[coup]== -1 || plateau[coup]== -2){
						coup=Math.floor(Math.random()*Math.floor(100));
					}
					break;
				}
			}
		}
		console.log(coup);
		if(plateau[coup]==0){
				plateau[coup]=-2;
		}else{
			plateau[coup]=-1;	
			memoireordi=coup;
		}

	}

	//Animation plateau de l'ordinateur après le tir du joueur
	function miseajourordi(){
		document.getElementById("info").innerHTML="A vous de jouer !";
		handler=0; // on voit le plateau de l'ordi
		for (let i = 0; i < 100; i++) {
			let num=plateaujouer[i];
			if (num==0) {
				document.getElementById(i).innerHTML='';
			}else if(num==-1){
				document.getElementById(i).innerHTML='<center><img src="Boom.png"></center>';
			}else{
				document.getElementById(i).innerHTML='<center><img src="rate.png"></center>';
			}
		}
		//
	}

	//Message de victoire
	function onWin(msg){
		document.getElementById("resultat").innerHTML=msg +"\n<a href='Jeu.php'>Recommencer</a>";
	}

	//Gère la réponse Ajax liée au plateau de l'ordinateur
	function sucess(request){
		let id= request.responseURL.split("=")[1];
		let result=request.responseText;
		if (plateaujouer[id]!=-1 && plateaujouer[id]!=-2) {
					if (result!=0){
						document.getElementById(id).innerHTML='<center><img src="Boom.png"></center>';
						reussi++;
						plateaujouer[id]=-1;
						if (reussi==19) {
							gagne=1;
							onWin("Vous avez gagné");
							new simpleAjax("score.php", "post", "");
						}
					}else{
						document.getElementById(id).innerHTML='<center><img src="rate.png"></center>';
						plateaujouer[id]=-2;
					}
					if (!gagne) {
						handler=null;
						setTimeout(miseajourplayer,500);
					}
				}
				else{
					alert("Case indisponible au tir! Réessayez");
				}
	}

	//Vérifie qu'un bateau du joueur a coulé
	function checkCoulé(tab) {
		let check1 = true; let check2 = false;
		for (let i=0; i<flotte.length; i++) {
			for (let k=0; k<coulé.length; k++) {
				if (i==coulé[k]) check1=false;
			}
			if (check1) {
				bat = flotte[i];
				for (let j=0; j<bat.xy.length; j++) {
					if (tab[bat.xy[j]] != -1) check2 = false;
				}
				if (check2) {
					alert("Votre bateau de taille "+bat.size+" a coulé!");
					coulé[coulé.length] = i;
				}
				check2 = true;
			}
			check1 = true;
		}
	}

window.onload = genereTableau;
