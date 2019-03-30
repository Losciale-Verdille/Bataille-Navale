let plateau=[];
let compteur=0;//remplir le plateau
let edition=true; //pour placer les bateaux au debut
while(plateau.length !=100){//remplir le plateau
	plateau[compteur]=0;
	compteur++;
}

let bt1 = new Object(); let bt2 = new Object(); let bt3 = new Object(); let bt4 = new Object(); let bt5 = new Object(); let bt6 = new Object();
bt1.size = 5; bt2.size = 4; bt3.size = 3; bt4.size = 3; bt5.size = 2; bt6.size = 2;
bt1.id= []; bt2.id= []; bt3.id= []; bt4.id= []; bt5.id= []; bt6.id = [];

let flotte=[bt1,bt2,bt3,bt4,bt5,bt6];
let current_edit = 1; //stocker l'id du bateau en train d'être placé
let cpt = 0;
	
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
		if (edition) {
			if (cpt == 0) {
				document.getElementById(id).innerHTML="5"; //à titre indicatif, pour dev
				document.getElementById(id).style.backgroundColor = "green";
				orientation(id,5);
			}			
			if (cpt == 1) {
				document.getElementById(id).innerHTML="4";
				orientation(id,4);
			}
			if (cpt == 2) {
				document.getElementById(id).innerHTML="3.1";
				orientation(id,3);
			}			
			if (cpt == 3) {
				document.getElementById(id).innerHTML="3.2";
				orientation(id,3);
			}
			if (cpt == 4) {
				document.getElementById(id).innerHTML="2.1";
				orientation(id,2);
			}
			if (cpt == 5) {
				document.getElementById(id).innerHTML="2.2";
				orientation(id,2);
			}
			if (cpt == 6) edition = false;
			cpt++;
		}else{
			if (plateau[id]!=-1) {
				if (plateau[id]!=0){
					document.getElementById(id).innerHTML='<center><img src="Boom.png"><center>';
				}else{
					document.getElementById(id).innerHTML='<center><img src="rate.png"><center>';
				}
				plateau[id]=-1;
			}
			else{
				alert("refaire");
			}
		}
	}

	function orientation(id,n) {
		let droite = id+(n-1);
		let gauche = id-(n-1);
		let bas = id+10*(n-1);
		let haut = id-10*(n-1);
		let choix = [];
		let orientation;
		// Vérification de la validité des choix
		if ((droite < 100) && (Math.floor(droite/10) == Math.floor(id/10))) choix[choix.length] = document.getElementById(droite);
		if ((gauche > 0) && (Math.floor(gauche/10) == Math.floor(id/10))) choix[choix.length] = document.getElementById(gauche);
		if (haut > 0) choix[choix.length] = document.getElementById(haut);
		if (bas < 100) choix[choix.length] = document.getElementById(bas);
		for (let i=0; i<choix.length; i++) {
			choix[i].innerHTML = "là";
			choix[i].onclick = function() {
				for (let j=0; j<choix.length; j++) {//efface les choix non selectionnés
					choix[j].innerHTML = null;
				}
				if (this.getAttribute("id")==droite) orientation = "droite";
				if (this.getAttribute("id")==gauche) orientation = "gauche";
				if (this.getAttribute("id")==haut) orientation = "haut";
				if (this.getAttribute("id")==bas) orientation = "bas";
				update(orientation,id,this.getAttribute("id"));
			};
		}
	}

	function isFree(id) {
		//verifie si la case est selectionnable en mode edition
	}

	//Actualise animation et état des cases du plateau
	function update(select,dep,arr) {
		let taille = arr-dep+1;
		if (select == "droite") {
			for (let i=dep; i<=arr; i++) {
				plateau[i] = taille;
			}
		}
		if (select == "gauche") {
			for (let i=arr; i<=dep; i++) {
				plateau[i] = taille;
			}
		}
		if (select == "haut") {
			for (let i=arr; i<=dep; i=i+10) {
				plateau[i] = taille;
			}
		}
		if (select == "bas") {
			for (let i=dep; i<=arr; i=i+10) {
				plateau[i] = taille;
			}
		}
		for (let i=0; i<plateau.length; i++) {
			if (plateau[i]!=0) {
				document.getElementById(i).style.backgroundColor = "grey";
			}
		}
	}

window.onload = genereTableau;
