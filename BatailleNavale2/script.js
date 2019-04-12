let plateau=[];
let plateaujouer=[];
let compteur=0;//remplir le plateau
let edition=true; //pour placer les bateaux au debut
let gagne=0
while(plateau.length !=100){//remplir le plateau
	plateau[compteur]=0;
	compteur++;
}
compteur=0;
while(plateaujouer.length !=100){//remplir le plateau
	plateaujouer[compteur]=0;
	compteur++;
}

let bt1 = new Object(); let bt2 = new Object(); let bt3 = new Object(); let bt4 = new Object(); let bt5 = new Object(); let bt6 = new Object();
bt1.size = 5; bt2.size = 4; bt3.size = 3; bt4.size = 3; bt5.size = 2; bt6.size = 2; //longueur de chaque bateau
bt1.id=1; bt2.id=2; bt3.id=3; bt4.id=4; bt5.id=5; bt6.id =6;
let flotte=[bt1,bt2,bt3,bt4,bt5,bt6];
let current_edit = 0; //stocker l'id du bateau en train d'être placé
let case1=null;
	
	function genereTableau(){
		let texte="<table class='table'>";
		for (let i = 0; i <10; i++) {
			texte+="<tr>";
			for (let j = 0;j<10; j++) {
				texte += "<td class='td' onclick='jouer("+(10*i+j)+")' id='"+(10*i+j)+"'>";
			}
			texte+="</tr>";
		}
		texte+="</table>";
		document.getElementById("jeu").innerHTML= texte;
	}
//-1=tiré; 0=rien; 1,2,...=bateau

	function jouer(id){
		if (!gagne) {
			if (edition) { // on place les bateaux en 2 clics
				if(case1 == null){ // stocke la premiere case cliquée
					if (plateau[id]==0) {				
						case1=id;
						document.getElementById(case1).style.backgroundColor = "green"; // indicateur pour les gens qui louchent...
					}else alert("Case indisponible!\nSélectionner une autre case.");
				}else { // stoche la 2eme case
					console.log(plateau[id]);
					let save = []; // backup pour la vérification
					let isFree = true; // stocke réussite ou échec de la vérification
					if ((Math.abs(id-case1) == flotte[current_edit].size-1) && (Math.floor(id/10) == Math.floor(case1/10))) { //si longueur egale à celle du bateau qu'on pose en longueur ET sur la même ligne
						console.log("longueur case1="+case1+" case2="+id);
						if (id<case1) { // intervertit au cas où on met les 2 cotes
							console.log("GAUCHE");
							//case1=id;
							//id=case1+flotte[current_edit].size-1;
							for (var i = id; i <= case1; i++) { // on met image + plateau a jour
								//Début vérification superposition
								save[save.length] = i;
								if (plateau[i] == 0) {
									plateau[i]=flotte[current_edit].id;
								}
								else {
									alert("Case(s) indisponible(s)!");
									for (let j=0; j<save.length-1; j++) { //on reset les cases déjà animées
										document.getElementById(save[j]).style.backgroundColor = "blue";
										plateau[save[j]]=0;
									}
									document.getElementById(case1).style.backgroundColor = "green"; // on remet l'indicateur pour les poissons rouges
									isFree = false;
									break;
								}
								//Fin vérification superposition
								if (isFree) {
									document.getElementById(case1).style.backgroundColor = "blue";
									document.getElementById(id).innerHTML='<center><img src="gauche.png"></center>';
									document.getElementById(case1).innerHTML='<center><img src="droite.png"></center>';
									for (var z = id+1; z < id+(flotte[current_edit].size-1); z++) {
										document.getElementById(z).innerHTML='<center><img src="mil.png"></center>';
									}
								}
							}
						}else {
							console.log("DROITE");

							for (var i = case1; i <= id; i++) { // on met image + plateau a jour
								//Début vérification superposition
								save[save.length] = i;
								if (plateau[i] == 0) {
									plateau[i]=flotte[current_edit].id;
								}
								else {
									alert("Case(s) indisponible(s)!");
									for (let j=0; j<save.length-1; j++) { //on reset les cases déjà animées
										document.getElementById(save[j]).style.backgroundColor = "blue";
										plateau[save[j]]=0;
									}
									document.getElementById(case1).style.backgroundColor = "green"; // on remet l'indicateur pour les poissons rouges
									isFree = false;
									break;
								}
								if (isFree) {
									document.getElementById(case1).style.backgroundColor = "blue";
									document.getElementById(case1).innerHTML='<center><img src="gauche.png"></center>';
									document.getElementById(id).innerHTML='<center><img src="droite.png"></center>';
									for (var z = case1+1; z < case1+(flotte[current_edit].size-1); z++) {
										document.getElementById(z).innerHTML='<center><img src="mil.png"></center>';
									}
								}
								//Fin vérification superposition
							}
						}
						if (isFree) {
							current_edit++;
							case1=null;
						} //si !isFree on ne compte pas la clic et on conserve case1
					}else if (Math.abs(id-case1)== (flotte[current_edit].size-1) *10) {//si longueur egale à celle du bateau qu'on pose en hauteur
						console.log("hauteur case1="+case1+" case2="+id);
						if (id<case1) {
							console.log("HAUT");
							for (var i = id; i <= case1; i+=10) {
								save[save.length] = i;
								if (plateau[i] == 0) {
									plateau[i]=flotte[current_edit].id;
								}
								else {
									alert("Case(s) indisponible(s)!");
									for (let j=0; j<save.length-1; j++) {
										document.getElementById(save[j]).style.backgroundColor = "blue";
										plateau[save[j]]=0;
									}
									document.getElementById(case1).style.backgroundColor = "green";
									isFree = false;
									break;
								}
							}
							if (isFree) {
								document.getElementById(case1).style.backgroundColor = "blue";
								document.getElementById(id).innerHTML='<center><img src="haut.png"></center>';
								document.getElementById(case1).innerHTML='<center><img src="bas.png"></center>';
								for (var i = id+10; i < id+(flotte[current_edit].size-1)*10; i+=10) {
									document.getElementById(i).innerHTML='<center><img src="mili.png"></center>';
								}
							}
						}else {
							console.log("BAS");
							for (var i = case1; i <= id; i+=10) {
								save[save.length] = i;
								if (plateau[i] == 0) {
									plateau[i]=flotte[current_edit].id;
								}else {
									alert("Case(s) indisponible(s)!");
									for (let j=0; j<save.length-1; j++) {
										document.getElementById(save[j]).style.backgroundColor = "blue";
										plateau[save[j]]=0;
									}
									document.getElementById(case1).style.backgroundColor = "green";
									isFree = false;
									break;
								}
							}
							if (isFree) {
								document.getElementById(case1).style.backgroundColor = "blue";
								document.getElementById(case1).innerHTML='<center><img src="haut.png"></center>';
								document.getElementById(id).innerHTML='<center><img src="bas.png"></center>';
								for (var i = case1+10; i < case1+(flotte[current_edit].size-1)*10; i+=10) {
									document.getElementById(i).innerHTML='<center><img src="mili.png"></center>';
								}
							}
						}
						if (isFree) {
							current_edit++;
							case1=null;
						}
					}else{// position trop grand
						alert("replace 2ème case");
					}
					if (current_edit==6) { // on joue après avoir mis les 6 bateaux
						edition=false;
						setTimeout(miseajourordi,1000);
					}

				}


				//show();
			}else{
				new simpleAjax("donnees.php", "get", "id="+id,sucess);
				setTimeout(miseajourplayer,1000);
			}	//setTimeout(miseajourordi,1000);
		}
	}


	
	function checkgagne(tab){
		gagne=0;
		for(var place in tab){
			if (place==1 || place==2 ||place==3|| place==4 ||place==5|| place==6) {
				gagne=1;
			}
		}
	}

	function miseajourplayer(){ // on voit le plateau du joueur
		for (let i = 0; i < 100; i++) {
			let num=plateau[i];
			
			if (num==0) {
				document.getElementById(i).innerHTML='';
			}else if(num==-1){
				document.getElementById(i).innerHTML='<center><img src="Boom.png"></center>';
			}else if(num==-2){
				document.getElementById(i).innerHTML='<center><img src="rate.png"></center>';
			}else if(num==plateau[i+1]&&num!=0 &&num!=-1 &&num!=-2 &&(plateau[i-1]==null||plateau[i-1]==0 || plateau[i-1]==-1||plateau[i-1]==-2)){
				document.getElementById(i).innerHTML='<center><img src="gauche.png"></center>';
			}else if(num==plateau[i-1]&&num!=0 &&num!=-1 &&num!=-2 &&(plateau[i+1]==null||plateau[i+1]==0 || plateau[i+1]==-1||plateau[i+1]==-2)){
				document.getElementById(i).innerHTML='<center><img src="droite.png"></center>';
			}else if(num==plateau[i-10]&&num!=0 &&num!=-1 &&num!=-2 &&(plateau[i+10]==null||plateau[i+10]==0 || plateau[i+10]==-1||plateau[i+10]==-2)){
				document.getElementById(i).innerHTML='<center><img src="bas.png"></center>';
			}else if(num==plateau[i+10]&&num!=0 &&num!=-1 &&num!=-2 &&(plateau[i-10]==null||plateau[i-10]==0 || plateau[i-10]==-1||plateau[i-10]==-2)){
				document.getElementById(i).innerHTML='<center><img src="haut.png"></center>';
			}else if(num==plateau[i+1]){
				document.getElementById(i).innerHTML='<center><img src="mil.png"></center>';
			}else if(num==plateau[i+10]){
				document.getElementById(i).innerHTML='<center><img src="mili.png"></center>';
			}
		}
	}
	function miseajourordi(){ // on voit le plateau de l'ordi
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
	}

	function sucess(request){
		let id= request.responseURL.split("=")[1];
		console.log(id);
		let result=request.responseText;
		console.log(result);
		if (plateaujouer[id]!=-1 && plateaujouer[id]!=-2) {
					if (result!=0){
						document.getElementById(id).innerHTML='<center><img src="Boom.png"></center>';
						plateaujouer[id]=-1;
					}else{
						document.getElementById(id).innerHTML='<center><img src="rate.png"></center>';
						plateaujouer[id]=-2;
					}
					//tour=0;
				}
				else{
					alert("refaire");
				}
	}

	function show() {
		for (let i=0; i<plateau.length; i++) {
			document.getElementById(i).innerHTML = plateau[i];
		}
	}


window.onload = genereTableau;